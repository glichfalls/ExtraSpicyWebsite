<template>
  <div class="grid grid-cols-1 gap-6 pb-12">
    <card>
      <template #title>
        {{ item?.name }}
      </template>
      <template #content>
        <div v-if="item" class="grid grid-cols-2 gap-8">
          <collectable-form :input="item" />
          <collectable-image-form :input="item" @upload:success="load" />
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
        <collectable-instance-table :url="instanceUrl" :columns="columns">
          <template #chat="{ data }">
            {{ data.name }}
          </template>
          <template #owner="{ data }">
            {{ data?.name ?? 'Nobody' }}
          </template>
        </collectable-instance-table>
        <create-instance-modal
            v-if="createInstance && item !== null"
            :collectable="item"
            @close="closeModal"
            @success="reload"
        />
      </template>
    </card>
  </div>
</template>

<script setup lang="ts">
import Card from 'primevue/card';
import CollectableForm from '~/components/form/CollectableForm.vue';
import CollectableImageForm from '~/components/form/CollectableImageForm.vue';
import { Collectable, CollectableInstance } from '~/contract/entity';
import HydraTable from '~/components/table/HydraTable.vue';
import PrimeButton from 'primevue/button';
import CreateInstanceModal from '~/components/entity/instance/CreateInstanceModal.vue';

const route = useRoute();
const { getById } = useEntity<Collectable>('collectables');

const CollectableInstanceTable: typeof HydraTable<CollectableInstance, keyof CollectableInstance> = HydraTable;
const instanceUrl: string = `/api/collectable_item_instances?collectable=${route.params.id}`;

const item = ref<Collectable|null>(null);
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
  { title: 'Owner', align: 'start', sortable: true, key: 'owner' },
];

await load();

</script>
