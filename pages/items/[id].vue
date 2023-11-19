<template>
  <tab-view>
    <tab-panel header="Details">
      <div class="flex justify-between items-start h-16">
        <span class="text-xl font-bold">Details</span>
      </div>
      <div class="flex flex-col md:flex-row gap-6">
        <item-image-form :input="item" @upload:success="load" class="w-full lg:w-4" />
        <item-form v-model="item" :loading="loading" />
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
        <template #id="{ data }">
          <div class="flex justify-end">
            <prime-button
                severity="danger"
                size="small"
                label="delete"
                rounded
                @click="deleteInstance(data)"
            />
          </div>
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
import ItemForm from '~/components/form/ItemForm.vue';
import ItemImageForm from '~/components/form/ItemImageForm.vue';
import { Item, ItemInstance } from '~/contract/entity';
import HydraTable from '~/components/table/HydraTable.vue';
import PrimeButton from 'primevue/button';
import { useToast } from 'primevue/usetoast';
import CreateInstanceModal from '~/components/entity/instance/CreateInstanceModal.vue';

const route = useRoute();
const toast = useToast();
const { getById } = useEntity<Item>('items');
const { httpDelete } = useHttp();

const ItemInstanceTable: typeof HydraTable<ItemInstance, keyof ItemInstance> = HydraTable;
const instanceUrl = computed((): string => `/api/item_instances?item.id=${route.params.id}`);

const loading = ref(false);
const item = ref<Item|null>(null);
const createInstance = ref<boolean>(false);

const load = async () => {
  if (route.params.id) {
    loading.value = true;
    item.value = await getById(route.params.id as string);
    loading.value = false;
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
  { title: '', align: 'end', sortable: false, key: 'id' },
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

const deleteInstance = async (id: string) => {
  try {
    await httpDelete(`/api/item_instances/${id}`);
    toast.add({ severity: 'success', summary: 'Success Message', detail: 'Message Content', life: 3000, group: 'tr' });
  } catch (e) {
    toast.add({ severity: 'error', summary: 'Error', detail: e.message, life: 3000 });
  }
}

load();

</script>
