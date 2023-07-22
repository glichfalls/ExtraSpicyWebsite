<template>
  <ag-grid-vue
      :rowData="rowData"
      :columnDefs="columnDefs"
      :defaultColDef="defaultColDef"
      :grid-options="{

      }"
  />
</template>
<script setup lang="ts">
import { AgGridVue } from 'ag-grid-vue3';
import "ag-grid-community/styles/ag-grid.css"; // Core grid CSS, always needed
import "ag-grid-community/styles/ag-theme-alpine.css"; // Optional theme CSS

const props = defineProps({
  data: {
    type: Array,
    required: true
  },
});

const rowData = reactive({});

const columnDefs = reactive({
  value: [
    { field: "make" },
    { field: "model" },
    { field: "price" }
  ],
});

const defaultColDef = {
  sortable: true,
  filter: true,
  flex: 1
};

</script>
