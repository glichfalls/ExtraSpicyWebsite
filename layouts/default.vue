<template>
  <div class="h-full">
    <page-header />
    <main>
      <slot v-if="isLoggedIn" name="breadcrumb">
        <breadcrumb :home="home" :model="items" class="mb-4" />
      </slot>
      <slot />
    </main>
    <page-footer />
  </div>
</template>

<script setup lang="ts">
import Breadcrumb from 'primevue/breadcrumb';
import { MenuItem } from 'primevue/menuitem';
import { storeToRefs } from 'pinia';
import { useAuth } from '~/store/auth';

const route = useRoute();
const { t } = useI18n();
const { isLoggedIn } = storeToRefs(useAuth());

const home = ref({
  icon: 'pi pi-home',
  to: '/',
});

const items = computed<MenuItem[]>(() => {
  const routes = String(route.path).split('/').filter((route) => !!route);
  return routes?.map((route, index) => ({
    label: t(`routes.${route}`),
    to: `/${routes.slice(0, index + 1).join('/')}`,
  })) ?? [];
});

</script>

<style scoped lang="postcss">
main {
  @apply block;
  @apply container mx-auto;
  @apply px-4 lg:px-0 py-2;
}
</style>
