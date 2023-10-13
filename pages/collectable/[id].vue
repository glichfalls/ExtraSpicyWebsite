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
        Instances
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

const route = useRoute();
const { getById } = useEntity<Collectable>('collectables');

const CollectableInstanceTable: typeof HydraTable<CollectableInstance, keyof CollectableInstance> = HydraTable;
const instanceUrl: string = `/api/collectable_item_instances?collectable=${route.params.id}`;

const item = ref<Collectable|null>(null);

const load = async () => {
  if (route.params.id) {
    item.value = await getById(route.params.id as string);
  } else {
    item.value = null;
  }
};

const columns: any[] = [
  { title: 'Chat', align: 'start', sortable: true, key: 'chat' },
  { title: 'Owner', align: 'start', sortable: true, key: 'owner' },
];

await load();

</script>
