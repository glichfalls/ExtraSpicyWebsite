<template>
  <card>
    <template #content>
      <item-grid
        url="/api/items"
        @view="onView"
      />
    </template>
  </card>
</template>
<script setup lang="ts">
import Card from 'primevue/card';
import HydraTable from '~/components/table/HydraTable.vue';
import { Item } from '~/contract/entity';
import ItemGrid from '~/components/entity/item/ItemGrid.vue';

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
