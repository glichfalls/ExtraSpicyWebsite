<template>
  <header v-if="isLoggedIn" class="header">
    <div class="container">
      <mega-menu :model="items">
        <template #start>
          <div class="pr-10">
            <nuxt-link to="/">
              <img src="/branding/logo-sm.png" alt="Extra Spicy Spam" class="w-24" />
            </nuxt-link>
          </div>
        </template>
      </mega-menu>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useAuth } from '~/store/auth';
import { storeToRefs } from 'pinia';
import { MenuItem } from 'primevue/menuitem';

const { isLoggedIn } = storeToRefs(useAuth());

const items: MenuItem[] = [
  {
    label: 'Items',
    icon: 'pi pi-bitcoin',
    items: [
      [
        {
          label: 'Item Management',
          items: [
            { label: 'View', command: () => navigateTo('/items') },
            { label: 'Create', command: () => navigateTo('/items/create') },
          ]
        },
      ],
        [
          {
            label: 'Item Effects',
            items: [
              { label: 'View', command: () => navigateTo('/items/effects') },
              { label: 'Create', command: () => navigateTo('/items/effects/create') },
            ]
          },
        ]
    ]
  },
  {
    label: 'Ehre',
    icon: 'pi pi-fw pi-money-bill',
    items: [
      [
        {
          label: 'Stocks',
          items: [
            { label: 'Portfolio', command: () => navigateTo('/stocks/portfolio') }
          ]
        },
      ],
    ],
  },
  {
    label: 'Logout',
    icon: 'pi pi-fw pi-sign-out',
    command: () => navigateTo('/logout'),
  }
];

</script>

<style scoped lang="postcss">
.header {
  @apply w-full;
  @apply mx-auto;
  @apply flex flex-col items-center gap-4;
  @apply text-gray-400 font-bold;
  @apply pt-4 pb-0;
  @apply lg:rounded-lg;
}
:deep(.p-megamenu) {
  @apply bg-transparent;
  @apply border-0;
}
</style>
