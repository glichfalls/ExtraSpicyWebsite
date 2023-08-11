<template>
  <v-card>
    <v-layout class="!min-h-[calc(100vh-40px)]">
      <template v-if="isLoggedIn">
        <v-navigation-drawer theme="dark" rail permanent>
          <v-list density="comfortable" nav>
            <v-list-item
                v-for="item in navigation"
                :value="item.name"
                :active="isActive(item)"
                @click="() => navigate(item)"
            >
              <icon v-if="item?.icon" :name="item.icon" />
            </v-list-item>
          </v-list>
        </v-navigation-drawer>

        <template v-for="item in navigation">
          <v-navigation-drawer v-if="isActive(item) && item?.children">
            <v-list>
              <v-list-item
                  v-for="child in item?.children"
                  :title="child.name"
                  :active="isChildActive(child)"
                  @click="() => navigate(child)"
              />
            </v-list>
          </v-navigation-drawer>
        </template>
      </template>

      <slot />
    </v-layout>
  </v-card>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useAuth } from '~/store/auth';

const router = useRouter();
const route = useRoute();
const { user, isLoggedIn } = storeToRefs(useAuth());

type MenuItem = {
  name: string,
  href?: string,
  icon?: string;
  key?: string;
  children?: MenuItem[],
}

const active = ref<MenuItem|null>(null);

const navigate = async (item: MenuItem) => {
  await router.push(item?.href || item.children?.[0]?.href || '/');
  active.value = item;
}

const isActive = (item: MenuItem): boolean => {
  return !!item?.key && route.fullPath.startsWith(`/${item?.key}`);
}

const isChildActive = (item: MenuItem) => {
  return item.href == route.fullPath;
}

const navigation: MenuItem[] = [
  { name: 'Dashboard', href: '/', icon: 'mdi-view-dashboard' },
  { name: 'Ehre', href: '/honor', icon: 'material-symbols:swords-outline', children: [
      { name: 'Bank', href: '/bank' },
      { name: 'Casino', href: '/casino' },
      { name: 'Gamble', href: '/gamble' },
    ],
  },
  { name: 'Telegram', key: 'telegram', icon: 'mdi:telegram', children: [
      { name: 'Chats', href: '/telegram/chats'},
      { name: 'Messages', href: '/telegram/messages' },
    ]
  },
  { name: 'Stocks', key: 'stocks', href: '/stocks', icon: 'mdi-chart-line', children: [
      { name: 'Portfolio', href: '/portfolio' },
      { name: 'Stocks', href: '/stocks' },
    ],
  },
  { name: 'Admin', href: '/admin', icon: 'mdi-shield-account', children: [
      { name: 'Users', href: '/admin/users' },
      { name: 'Logs', href: '/admin/logs' },
    ],
  },
  { name: 'Sign out', href: '/logout', icon: 'mdi-logout' },
];

</script>
