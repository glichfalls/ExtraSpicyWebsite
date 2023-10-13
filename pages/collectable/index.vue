<template>
  <card>
    <template #content>
      <collectable-table
          url="/api/collectables"
          :columns="columns"
          :actions="actions"
          @view="onView"
      >
        <template #imagePublicPath="{ data }">
          <img v-if="data" :src="path(data)" alt="" class="h-12" />
        </template>
        <template #id="{ data }">
          <div class="flex justify-end">
            <prime-button severity="primary" rounded  size="small" @click="router.push(`/collectable/${data}`)">
              View
            </prime-button>
          </div>
        </template>
      </collectable-table>
    </template>
  </card>
</template>
<script setup lang="ts">
import Card from 'primevue/card';
import HydraTable from '~/components/table/HydraTable.vue';
import PrimeButton from 'primevue/button';
import { Collectable } from '~/contract/entity';

const router = useRouter();
const config = useRuntimeConfig();

const path = (url: string) => `${config.public.apiUrl}/${url}`

const CollectableTable: typeof HydraTable<Collectable, keyof Collectable> = HydraTable;

const columns: any[] = [
  { title: 'Image', align: 'start', sortable: true, key: 'imagePublicPath' },
  { title: 'Name', align: 'start', sortable: true, key: 'name' },
  { title: 'Description', align: 'start', sortable: true, key: 'description' },
  { title: '', align: 'end', sortable: false, key: 'id' },
];

const actions = [
  {
    label: 'View',
    icon: 'pi pi-fw pi-eye',
    name: 'view',
  }
];

const onView = (item) => router.push(`/collectable/${item.id}`);

</script>
