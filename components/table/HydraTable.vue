<template>
  <v-data-table-server
      v-model:items-per-page="itemsPerPage"
      :items-length="total"
      :headers="allColumns"
      :items="rows"
      :loading="loading"
      @update:options="load"
  >
    <template v-for="column in columns" #[`item.${String(column.key)}`]="{ item } : { item: { selectable: T } }">
      <slot :name="column.key" :item="item.selectable" :value="item.selectable[column.key]">
        <td>
          {{ item.selectable[column.key] || '-' }}
        </td>
      </slot>
    </template>
    <template v-slot:item.actions="{ item }: { item: { selectable: T } }">
        <template v-for="action in actions">
          <nuxt-link v-if="action.type == 'view'" class="font-bold hover:text-primary" :to="action.path(item.selectable)">
            <icon name="heroicons-outline:eye" />
          </nuxt-link>
        </template>
    </template>
    <template v-slot:bottom>
      <v-pagination v-if="pageCount > 1" v-model="page" :length="pageCount" />
    </template>
  </v-data-table-server>
</template>
<script setup lang="ts" generic="T extends HydraEntity, K extends keyof T">
import { VDataTableServer } from 'vuetify/labs/VDataTable';
import { HydraResponse } from "~/contract/api";
import { HydraEntity } from '~/contract/entity';
import { Ref } from 'vue';

const { httpAuthGet } = useHttp();

export type ViewAction = {
  type: 'view',
  path: (item: T) => string,
}

export type DeleteAction = {
  type: 'delete',
}

export type HydraTableAction = ViewAction|DeleteAction;

export type Column = {
  title: string,
  key: K,
  sortable?: boolean,
  align?: 'start' | 'center' | 'end',
}

const props = defineProps<{
  data?: T[],
  url?: string,
  columns: Column[],
  actions?: HydraTableAction[],
}>();

const page = ref(1);
const itemsPerPage = ref(30);
const total = ref(0);
const loading = ref(false);
const filter = reactive<any>({
  search: {},
});

// https://github.com/vuejs/core/issues/2136#issuecomment-908269949
const rows = ref<T[]>(props.data || []) as Ref<T[]>;

watch(page, () => load({ page: page.value }));
watch(filter, () => debouncedLoading(), { deep: true });

const pageCount = computed(() => Math.ceil(total.value / itemsPerPage.value));

const allColumns = computed(() => {
  return [...props.columns, {
    title: 'Actions',
    key: 'actions',
    sortable: false,
    align: 'end',
  }];
});

const filterQuery = computed(() => {
  const query: any = {};
  for (const column in filter.search) {
    if (filter.search[column]) {
      query[column] = filter.search[column];
    }
  }
  return query;
});

const debounceTimeout = ref<any>(null);
const debouncedLoading = () => {
  if (debounceTimeout.value) {
    clearTimeout(debounceTimeout.value);
  }
  debounceTimeout.value = setTimeout(async () => {
    debounceTimeout.value = null;
    await load();
  }, 500);
}

const load = async ({
  page = 1,
  itemsPerPage,
  sortBy,
}: {
  page?: number;
  itemsPerPage?: number;
  sortBy?: string
} = {}) => {
  if (props.url) {
    try {
      loading.value = true;
      const response = await httpAuthGet<HydraResponse<T>>(props.url, {
        page: page,
        ...filterQuery.value,
      });
      rows.value = response['hydra:member'];
      total.value = response['hydra:totalItems'];
    } catch (e) {
      console.error(e);
    } finally {
      loading.value = false;
    }
  }
}

</script>

<style scoped lang="postcss">
.search-input {
  @apply bg-transparent text-white;
  @apply border-none focus:border-0 active:border-0;
  @apply text-xs font-normal;
}
</style>
