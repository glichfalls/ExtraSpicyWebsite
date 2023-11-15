<template>
  <tab-view>
    <tab-panel header="Details">
      <div class="flex justify-between items-start h-16">
        <span class="text-xl font-bold">Details</span>
      </div>
      <div class="flex gap-4">
        <item-image-form :input="item" @upload:success="load" class="w-4" />
        <item-form v-model="item" />
      </div>
    </tab-panel>
    <tab-panel header="Instances">
      <div class="flex justify-between items-start h-16">
        <span class="text-xl font-bold">Instances</span>
        <prime-button
            size="small"
            severity="secondary"
            label="Create instance"
            @click="openModal"
        />
      </div>
      <item-instance-table :url="instanceUrl" :columns="columns">
        <template #chat="{ data }">
          {{ data.name }}
        </template>
        <template #tradeable="{ data }">
          {{ data ? 'Yes' : 'No' }}
        </template>
        <template #expiresAt="{ data }">
          {{ formatExpiresAt(data) }}
        </template>
        <template #owner="{ data }">
          <span v-if="data">
            {{ data?.['@id'] }}
          </span>
          <span v-else>
            None
          </span>
        </template>
      </item-instance-table>
      <create-instance-modal
          v-if="createInstance && item !== null"
          :item="item"
          @close="closeModal"
          @success="reload"
      />
    </tab-panel>
  </tab-view>
</template>

<script setup lang="ts">
import Card from 'primevue/card';
import ItemForm from '~/components/form/ItemForm.vue';
import ItemImageForm from '~/components/form/ItemImageForm.vue';
import { Item, ItemInstance } from '~/contract/entity';
import HydraTable from '~/components/table/HydraTable.vue';
import PrimeButton from 'primevue/button';
import CreateInstanceModal from '~/components/entity/instance/CreateInstanceModal.vue';

const route = useRoute();
const { getById } = useEntity<Item>('items');

const ItemInstanceTable: typeof HydraTable<ItemInstance, keyof ItemInstance> = HydraTable;
const instanceUrl = computed((): string => `/api/item_instances?item=${route.params.id}`);

const item = ref<Item|null>(null);
const createInstance = ref<boolean>(false);

const load = async () => {
  if (route.params.id) {
    item.value = await getById(route.params.id as string);
  } else {
    item.value = null;
  }
};

const reload = () => {
  window.location.reload();
};

const openModal = () => {
  createInstance.value = true;
};

const closeModal = () => {
  createInstance.value = false;
};

const columns: any[] = [
  { title: 'Chat', align: 'start', sortable: true, key: 'chat' },
  { title: 'Tradable', align: 'start', sortable: true, key: 'tradeable'},
  { title: 'Expires', align: 'start', sortable: true, key: 'expiresAt'},
  { title: 'Owner', align: 'start', sortable: true, key: 'owner' },
];

const formatExpiresAt = (expiresAt: string|null): string => {
  if (!expiresAt) {
    return 'Never';
  }

  const date = new Date(expiresAt);
  if (date.getTime() < Date.now()) {
    return 'Expired';
  }
  const diff = date.getTime() - Date.now();
  const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
  return `in ${days} days`;
};

await load();

</script>
