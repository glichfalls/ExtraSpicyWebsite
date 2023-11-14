<template>
  <div class="grid grid-cols-1 gap-6 pb-12">
    <card>
      <template #title>
        {{ item?.name }}
      </template>
      <template #content>
        <div v-if="item" class="grid grid-cols-2 gap-8">
          <item-form :input="item" />
          <item-image-form :input="item" @upload:success="load" />
        </div>
      </template>
    </card>
    <card>
      <template #title>
        <div class="flex justify-between items-center">
          <span>Instances</span>
          <div>
            <prime-button
                size="small"
                severity="secondary"
                label="Create instance"
                @click="openModal"
            />
          </div>
        </div>
      </template>
      <template #content>
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
            {{ data?.name ?? 'Nobody' }}
          </template>
        </item-instance-table>
        <create-instance-modal
            v-if="createInstance && item !== null"
            :item="item"
            @close="closeModal"
            @success="reload"
        />
      </template>
    </card>
  </div>
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
