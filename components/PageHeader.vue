<template>
  <header v-if="isLoggedIn" class="header">
    <div class="container">
      <mega-menu :model="items">
        <template #start>
          <div class="pr-10">
            <nuxt-link to="/">
              <h1>Extra Spicy Spam</h1>
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
    label: 'Ehre',
    icon: 'pi pi-fw pi-money-bill',
    items: [
      [
        {
          label: 'Stocks',
          items: [
            { label: 'Portfolio', to: '/stocks/portfolio' }
          ]
        },
      ],
      [
        {
          label: 'Casino',
          items: [
            { label: 'Gamble' },
            { label: 'Roulette' },
          ]
        },
      ],
    ],
  },
  {
    label: 'Telegram',
    icon: 'pi pi-fw pi-send',
    items: [
      [
        {
          label: 'Chats',
          items: [
            { label: 'Chats', to: '/telegram/chats' },
          ]
        },
      ],
      [
          {
            label: 'Admin',
            items: [
              { label: 'Users', to: '' }
            ]
          },
      ],
    ],
  },
  {
    label: 'Logout',
    icon: 'pi pi-fw pi-sign-out',
    to: '/logout',
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
