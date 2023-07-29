<template>
  <div>
    <flow-bite-table >
      <table-head>
        <table-head-cell v-for="column in columns" :key="column">
          <div class="flex items-center gap-4">
            <icon v-if="loading" name="svg-spinners:90-ring" />
            <span>{{ column }}</span>
            <input type="text"
              v-model="filter.search[column]"
              :disabled="loading"
              placeholder="Search"
              class="search-input"
            />
          </div>
        </table-head-cell>
        <table-head-cell />
      </table-head>
      <table-body>
        <table-row v-for="(item, k) in filteredData" :key="k">
          <table-cell v-for="column in columns" :key="k" class="text-left">
            <slot :name="`column-${column}`" :item="item">
              {{ item[column] }}
            </slot>
          </table-cell>
          <table-cell>
            <slot name="actions" :item="item" />
          </table-cell>
        </table-row>
      </table-body>
    </flow-bite-table>
    <flow-bite-pagination v-if="total > 30" v-model="page" :total-items="total" :per-page="30" class="mt-4" />
  </div>
</template>
<script setup lang="ts">
import {
  Table as FlowBiteTable,
  Pagination as FlowBitePagination,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow
} from 'flowbite-vue';
import { HydraResponse } from "~/contract/api";
import { HydraEntity } from '~/contract/entity';

const { httpAuthGet } = useHttp();

const props = defineProps({
  data: {
    type: Array,
    required: false,
    default: [],
  },
  url: {
    type: String,
    required: false,
    default: null,
  },
  columns: {
    type: Array,
    required: false,
    default: [],
  }
});

const page = ref(1);
const total = ref(0);
const loading = ref(false);
const filter = reactive<any>({
  search: {},
});

const rows = ref<HydraEntity[]>(props.data as HydraEntity[]);

watch(page, async () => {
  await load(page.value);
});

watch(filter, async () => {
  debouncedLoading();
}, { deep: true });

const filterQuery = computed(() => {
  const query: any = {};
  for (const column in filter.search) {
    if (filter.search[column]) {
      query[column] = filter.search[column];
    }
  }
  return query;
});

const columns = computed<string[]>(() => {
  const allColumns: string[] = rows.value.length > 0 ? Object.keys(rows.value[0]) : [];
  if (allColumns.length === 0) {
    return props.columns as string[];
  }
  return (props.columns as string[]).filter((column: string) => allColumns.includes(column));
});

const filteredData = computed(() => {
  return rows.value.map(item => {
    const filteredItem: any = {};
    for (const column of columns.value) {
      const keys = column.split('.');
      let value: any = item;
      for (const key of keys) {
        if (value && typeof value === 'object') {
          value = value[key];
        } else {
          value = undefined;
          break;
        }
      }
      filteredItem[column] = value;
    }
    return filteredItem;
  });
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

const load = async (page: number = 1) => {
  if (props.url !== null) {
    try {
      loading.value = true;
      const response = await httpAuthGet<HydraResponse<HydraEntity>>(props.url, {
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

if (props.url) {
  await load();
}

</script>

<style scoped lang="scss">
.search-input {
  @apply bg-transparent text-white;
  @apply border-none focus:border-0 active:border-0;
  @apply text-xs font-normal;
}
</style>
