<template>
  <card>
    <template #content>
      <collectable-table
          url="/api/items"
          :columns="columns"
          :actions="actions"
          @view="onView"
      >
        <template #imagePublicPath="{ data }">
          <img v-if="data" :src="path(data)" alt="" class="h-12" />
        </template>
        <template #effects="{ data }">
          <div class="flex flex-wrap gap-2">
            <chip v-for="effect in data" :label="effect.name" />
          </div>
        </template>
        <template #description="{ data }">
          <div class="w-80 overflow-hidden truncate">
            <span>{{ data }}</span>
          </div>
        </template>
        <template #rarity="{ data }">
          <div class="w-80 overflow-hidden truncate">
            <span>{{ data.label }}</span>
          </div>
        </template>
        <template #id="{ data }">
          <div class="flex justify-end gap-4">
            <prime-button
                label="View"
                severity="primary"
                size="small"
                @click="router.push(`/items/${data}`)"
            />
            <prime-button
                label="Delete"
                severity="danger"
                size="small"
                @click="() => deleteCollectable(data)"
            />
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
import Chip from 'primevue/chip';
import { Item } from '~/contract/entity';

const router = useRouter();
const config = useRuntimeConfig();

const path = (url: string) => `${config.public.apiUrl}/${url}`

const CollectableTable: typeof HydraTable<Item, keyof Item> = HydraTable;

const columns: any[] = [
  { title: 'Image', align: 'start', sortable: true, key: 'imagePublicPath' },
  { title: 'Name', align: 'start', sortable: true, key: 'name' },
  { title: 'Rarity', align: 'start', sortable: true, key: 'rarity' },
  { title: 'Effects', align: 'start', sortable: false, key: 'effects' },
  { title: '', align: 'end', sortable: false, key: 'id' },
];

const actions = [
  {
    label: 'View',
    icon: 'pi pi-fw pi-eye',
    name: 'view',
  }
];

const onView = (item) => router.push(`/items/${item.id}`);

const deleteCollectable = (id: string) => {

}

</script>
