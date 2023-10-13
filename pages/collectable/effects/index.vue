<template>
  <card>
    <template #content>
      <effect-table
          url="/api/effects"
          :columns="columns"
          :actions="actions"
          @view="onView"
      >
        <template #id="{ data }">
          <div class="flex justify-end">
            <prime-button
                severity="primary"
                size="small"
                rounded
                @click="router.push(`/collectable/effects/${data}`)"
            >
              View
            </prime-button>
          </div>
        </template>
      </effect-table>
    </template>
  </card>
</template>
<script setup lang="ts">
import Card from 'primevue/card';
import HydraTable from '~/components/table/HydraTable.vue';
import PrimeButton from 'primevue/button';
import { Effect } from '~/contract/entity';

const router = useRouter();
const config = useRuntimeConfig();

const path = (url: string) => `${config.public.apiUrl}/${url}`

const EffectTable: typeof HydraTable<Effect, keyof Effect> = HydraTable;

const columns: any[] = [
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

const onView = (item) => router.push(`/collectable/effects/${item.id}`);

</script>
