<template>
  <header v-if="isLoggedIn" class="header">
    <div class="container">
      <mega-menu :model="items">
        <template #start>
          <div class="pr-10">
            <h1>Extra Spicy Spam</h1>
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
    items: [
      [
        {
          label: 'Stocks',
          items: [
            { label: 'Portfolio', to: '/portfolio' }
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
    label: 'Chats',
  }
];

</script>

<style scoped lang="postcss">
.header {
  @apply w-full;
  @apply mx-auto;
  @apply flex flex-col items-center gap-4;
  @apply text-gray-400 font-bold;
  @apply p-4;
  @apply lg:rounded-lg;
}
.menu {
  @apply flex justify-start gap-4 mt-4;
  @apply relative;

  &:hover .submenu {
    @apply flex flex-col;
  }

  a {
    @apply text-white;
    @apply text-sm font-semibold;
  }
}
.submenu {
  @apply absolute top-full left-0;
  @apply bg-gray-800;
  @apply rounded-lg;
  @apply px-4 py-2 mt-1;
  @apply flex
}
</style>
