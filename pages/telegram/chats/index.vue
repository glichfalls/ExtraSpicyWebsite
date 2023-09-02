<template>
  <card>
    <template #content>
      <chat-table
        url="/api/chats"
        :columns="columns"
        :actions="actions"
        @view="onView"
      />
    </template>
  </card>
</template>

<script setup lang="ts">
import Card from 'primevue/card';
import HydraTable from '~/components/table/HydraTable.vue';
import { Chat } from '~/contract/entity';
import { MenuItem } from 'primevue/menuitem';

const router = useRouter();

const ChatTable: typeof HydraTable<Chat, keyof Chat> = HydraTable;

const columns: any[] = [
  { title: 'Chat Name', align: 'start', sortable: true, key: 'name' },
];

const actions = [
  {
    label: 'View',
    icon: 'pi pi-fw pi-eye',
    name: 'view',
  }
];

const onView = (item) => router.push(`/telegram/chats/${item.id}`);

</script>
