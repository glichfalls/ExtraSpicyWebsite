<template>
  <div>
    <h1>Chats</h1>
    <hydra-table url="/api/chats" :columns="columns">
      <template #actions="{ item }">
        <router-link :to="`/chats/${item.id}`" class="view">
          <icon name="heroicons-outline:eye" />
        </router-link>
      </template>
      <template #name="{ item }">
        <td>
          {{ item.name }}
        </td>
      </template>
    </hydra-table>
  </div>
</template>

<script setup lang="ts">
import HydraTable from '~/components/table/HydraTable.vue';

const columns = [
  { title: 'Chat Name', align: 'start', sortable: true, key: 'name' },
];

</script>
