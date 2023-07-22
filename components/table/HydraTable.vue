<template>
  <div>
    <flow-bite-table>
      <table-head>
        <table-head-cell v-for="column in columns" :key="column">
          {{ column }}
        </table-head-cell>
      </table-head>
      <table-body>
        <table-row v-for="item in filteredData" :key="item.id">
          <table-cell v-for="column in columns" :key="column">
            {{ item[column] }}
          </table-cell>
        </table-row>
      </table-body>
    </flow-bite-table>
    <flow-bite-pagination v-model="page" :total-items="total" :per-page="30" class="mt-4" />
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

const data = ref(props.data);

watch(page, async () => {
  await load(page.value);
});

const columns = computed(() => {
  const allColumns = data.value.length > 0 ? Object.keys(data.value[0]) : [];
  return props.columns.filter(column => allColumns.includes(column));
});

const filteredData = computed(() => {
  return data.value.map(item => {
    const filteredItem = {};
    for (const column of columns.value) {
      // Handle nested properties, e.g., "user.name"
      const keys = column.split('.');
      let value = item;
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

const load = async (page: number = 1) => {
  if (props.url !== null) {
    const response = await httpAuthGet<HydraResponse<any>>(props.url, {
      page: page,
    });
    data.value = response['hydra:member'];
    total.value = response['hydra:totalItems'];
  }
}

if (props.url) {
  await load();
}

</script>
