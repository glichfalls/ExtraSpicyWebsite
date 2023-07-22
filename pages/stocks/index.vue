<template>
  <div>

    <h1 class="mb-3">Stocks</h1>

    <hydra-table
      url="/api/stocks"
      :columns="cols"
    />

  </div>
</template>

<script setup lang="ts">

import HydraTable from "~/components/table/HydraTable.vue";

const cols = [
  'symbol',
  'name',
  'type',
];

</script>
