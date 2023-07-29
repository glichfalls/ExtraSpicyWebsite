<template>
  <div>
    <h1>Users</h1>
    <hydra-table :url="url" :columns="cols" />
  </div>
</template>

<script setup lang="ts">
import HydraTable from '~/components/table/HydraTable.vue';

const url = '/api/users';

const cols = ['id', 'email', 'roles', 'createdAt', 'updatedAt'];

</script>
