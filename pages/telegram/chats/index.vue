<template>
  <card>
    <template #content>
      <chat-table url="/api/chats" :columns="columns" :actions="actions" />
    </template>
  </card>
</template>

<script setup lang="ts">
import Card from 'primevue/card';
import HydraTable from '~/components/table/HydraTable.vue';
import { Chat } from '~/contract/entity';
import { MenuItem } from 'primevue/menuitem';

const ChatTable: typeof HydraTable<Chat, keyof Chat> = HydraTable;

const columns: any[] = [
  { title: 'Chat Name', align: 'start', sortable: true, key: 'name' },
];

const actions: MenuItem[] = [
  {
    label: 'Actions',
    items: [
      { label: 'View', icon: 'pi pi-eye', command: (event) => {
          console.log(event);
        } },
    ],
  }
]

</script>
