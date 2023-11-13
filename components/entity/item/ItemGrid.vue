<template>
  <data-view
    :value="items"
    :layout="layout"
    :total-records="total"
    :paginator="true"
    :always-show-paginator="false"
    data-key="@id"
  >
    <template #header>
      <div class="flex justify-end">
        <DataViewLayoutOptions v-model="layout" />
      </div>
    </template>
    <template #list="slotProps">
      <div class="flex">
        {{ slotProps }}
      </div>
    </template>
    <template #grid="slotProps">
      <div class="w-1/4 p-4">
        <span>{{ slotProps.data }}</span>
      </div>
    </template>
  </data-view>
</template>

<script setup lang="ts" generic="T extends HydraEntity">
import { ref, onMounted, Ref } from 'vue';
import DataView from 'primevue/dataview';
import DataViewLayoutOptions from 'primevue/dataviewlayoutoptions';
import { HydraEntity } from '~/contract/entity';
import { HydraResponse } from '~/contract/api';

const props = defineProps<{
  data?: T[],
  url?: string,
}>();

const { httpAuthGet } = useHttp();

const items = ref<T[]>(props.data || []) as Ref<T[]>;
const total = ref<number>(0);
const page = ref<number>(1);
const itemsPerPage = ref<number>(30);
const layout = ref<'list'|'grid'>('grid');
const loading = ref<boolean>(false);

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
      });
      items.value = response['hydra:member'];
      total.value = response['hydra:totalItems'];
    } catch (e) {
      console.error(e);
    } finally {
      loading.value = false;
    }
  }
}

onMounted(() => load());

</script>
