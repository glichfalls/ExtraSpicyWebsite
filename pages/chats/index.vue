<template>
  <div>
    <h1>Chats</h1>
    <chat-table url="/api/chats" :columns="columns" :actions="actions" />
  </div>
</template>

<script setup lang="ts">
import HydraTable, { HydraTableAction, Column } from '~/components/table/HydraTable.vue';
import { Chat } from '~/contract/entity';

const ChatTable: typeof HydraTable<Chat, keyof Chat> = HydraTable;

const columns: Column[] = [
  { title: 'Chat Name', align: 'start', sortable: true, key: 'name' },
];

const actions: HydraTableAction[] = [
  { type: 'view', path: (item: Chat) => `/chats/${item.id}` },
]

</script>
