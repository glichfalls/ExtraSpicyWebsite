<template>
  <data-view
      title="test"
    :value="items"
    :layout="layout"
    :total-records="total"
    data-key="@id"
  >
    <template #header>
      <div class="flex justify-between">
        <div>
          <span class="text-xl text-white">
            All Items
          </span>
        </div>
        <DataViewLayoutOptions v-model="layout" />
      </div>
    </template>
    <template #list="slotProps">
      <div class="flex">
        {{ slotProps }}
      </div>
    </template>
    <template #grid="slotProps">
      <div class="col-12 sm:col-6 lg:col-12 xl:col-2 p-2">
        <div class="p-3 border-1 surface-border surface-card border-round">
          <img
              v-if="slotProps.data.imagePublicPath !== null"
              :src="path(slotProps.data.imagePublicPath)"
              :alt="slotProps.data.name"
              class="w-9 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-round"
              @error="event => event.target.src = '/images/default.png'"
          />
          <img v-else src="/images/default.png" alt="Default Image" />
          <span class="font-bold text-lg py-2 block">{{ slotProps.data.name }}</span>
          <span class="block">{{ slotProps.data.rarity.label }}</span>
          <p class="text-sm py-2 w-full overflow-hidden text-gray-100">{{ slotProps.data.description.slice(0, 50) + (slotProps.data.description.length > 50 ? '...' : '') }}</p>
          <prime-button label="edit" size="small" rounded @click="navigateTo(`/items/${slotProps.data['id']}`)" />
        </div>
      </div>
    </template>
  </data-view>
</template>

<script setup lang="ts">
import { ref, onMounted, Ref } from 'vue';
import DataView from 'primevue/dataview';
import PrimeButton from 'primevue/button';

import DataViewLayoutOptions from 'primevue/dataviewlayoutoptions';
import { HydraEntity, Item } from '~/contract/entity';
import { HydraResponse } from '~/contract/api';

const props = defineProps<{
  data?: Item[],
  url?: string,
}>();

const { httpAuthGet } = useHttp();
const config = useRuntimeConfig();

const path = (url: string) => `${config.public.apiUrl}/${url}`

const items = ref<Item[]>(props.data || []) as Ref<Item[]>;
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
      const response = await httpAuthGet<HydraResponse<Item>>(props.url, {
        page: page,
      });
      items.value = response['hydra:member'];
      total.value = response['hydra:totalItems'];
      console.log(items.value);
    } catch (e) {
      console.error(e);
    } finally {
      loading.value = false;
    }
  }
}

onMounted(() => load());

</script>
