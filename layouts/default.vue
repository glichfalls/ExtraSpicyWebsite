<template>
  <div class="h-full">
    <page-header />
    <prime-toast />
    <main>
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
import Breadcrumb from 'primevue/breadcrumb';
import PrimeToast from 'primevue/toast';
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
  return routes?.slice(0, -1).map((route, index) => ({
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
:deep(.p-breadcrumb) {
  @apply bg-transparent;
  @apply border-0;
}
</style>
