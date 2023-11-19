<template>
  <data-view
    :value="viewItems"
    :layout="layout"
    :paginator="true"
    :rows="18"
    :total-records="loading ? 18 : total"
    data-key="@id"
  >
    <template #header>
      <div class="flex justify-between">
        <div class="flex items-center">
          <span class="text-xl text-white">
            All Items
          </span>
        </div>
        <div class="flex justify-start items-center gap-2">
          <router-link to="/items/create" class="p-button p-button-link">
            Create Item
          </router-link>
          <DataViewLayoutOptions v-model="layout" />
        </div>
      </div>
    </template>
    <template #list="slotProps">
      <div class="flex">
        {{ slotProps }}
      </div>
    </template>
    <template #grid="slotProps">
      <div v-if="loading" class="col-12 sm:col-6 lg:col-12 xl:col-4 p-2">
        <div class="p-4 border-1 surface-border surface-card border-round">
          <div class="flex flex-column align-items-center gap-3 py-5">
            <Skeleton class="w-9 shadow-2 border-round h-10rem" />
            <Skeleton class="w-9 shadow-2 border-round h-3rem" />
          </div>
        </div>
      </div>
      <div v-else class="col-12 sm:col-6 lg:col-12 xl:col-2 p-2">
        <div class="p-3 border-1 surface-border surface-card border-round">
          <img
              v-if="slotProps.data.imagePublicPath !== null"
              :src="path(slotProps.data.imagePublicPath)"
              :alt="slotProps.data.name"
              class="w-9 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-round"
              @error="(event: any) => event.target.src = '/images/default.png'"
          />
          <img v-else src="/images/default.png" alt="Default Image" />
          <div class="overflow-hidden h-10">
            <span class="font-bold text-lg py-2 block">{{ shorten(slotProps.data.name, 18) }}</span>
          </div>
          <span class="block">{{ slotProps.data.rarity.label }}</span>
          <div class="overflow-hidden h-14">
            <p class="text-sm py-2 w-fulltext-gray-100">
              {{ shorten(slotProps.data.description, 50) }}
            </p>
          </div>
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

const shorten = (text: string, maxLength: number): string => {
  if (text.length > maxLength) {
    return text.slice(0, maxLength).split(' ').slice(0, -1).join(' ') + '...';
  }
  return text;
}

const items = ref<Item[]>(props.data || []) as Ref<Item[]>;
const total = ref<number>(0);
const page = ref<number>(1);
const itemsPerPage = ref<number>(30);
const layout = ref<'list'|'grid'>('grid');
const loading = ref<boolean>(false);

const viewItems = computed(() => {
  if (loading.value) {
    return Array.from({ length: itemsPerPage.value }, () => ({}));
  }
  return items.value;
})

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
