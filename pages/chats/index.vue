<template>
  <div>
    <h1>Chats</h1>
    <hydra-table url="/api/chats" :columns="columns">
      <template #actions="{ item }">
        <router-link :to="`/chats/${item.id}`" class="view">
          <icon name="heroicons-outline:eye" />
        </router-link>
      </template>
    </hydra-table>
  </div>
</template>

<script setup lang="ts">
import HydraTable from '~/components/table/HydraTable.vue';

const columns = [
    'id',
    'name',
];

</script>
