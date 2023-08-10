<template>
  <header v-if="isLoggedIn" class="header">
    <div class="container">
      <h1 >Extra Spicy Spam</h1>
      <div class="menu" @mouseleave="hoverItem = null">
        <div v-for="item in navigation" :key="item.name">
          <nuxt-link :to="item.href" @mouseover="() => open(item)">
            {{ item.name }}
          </nuxt-link>
          <template v-if="item.children">
            <div v-if="hoverItem?.href === item.href" class="submenu">
              <template v-for="itemChild in item.children" :key="itemChild.name">
                <nuxt-link :to="itemChild.href">
                  {{ itemChild.name }}
                </nuxt-link>
              </template>
            </div>
          </template>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useAuth } from '~/store/auth';
import { storeToRefs } from 'pinia';

type MenuItem = {
  name: string,
  href: string,
  children?: MenuItem[],
}

const { isLoggedIn } = storeToRefs(useAuth());
const hoverItem = ref<MenuItem|null>(null);

const navigation: MenuItem[] = [
  { name: 'Ehre', href: '/honor', children: [
      { name: 'Bank', href: '/bank' },
      { name: 'Casino', href: '/casino' },
      { name: 'Gamble', href: '/gamble' },
    ],
  },
  { name: 'Chats', href: '/chats', children: [
      { name: 'Users', href: '/users' },
      { name: 'Messages', href: '/messages' },
    ]
  },
  { name: 'Stocks', href: '/stocks', children: [
      { name: 'Portfolio', href: '/portfolio' },
    ]
  },
  { name: 'Sign out', href: '/logout' },
];

const open = (item: MenuItem) => {
  hoverItem.value = item?.children?.length ? item : null;
}

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
