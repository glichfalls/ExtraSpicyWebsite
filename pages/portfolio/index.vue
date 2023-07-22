<template>
  <div>
    <h1>Your Portfolio</h1>

    <ag-grid-vue
        class="ag-theme-alpine-dark w-full h-[300px]"
        :columnDefs="columnDefs"
        :serverSideDatasource="datasource"
    />

  </div>
</template>

<script setup lang="ts">
import { AgGridVue } from 'ag-grid-vue3';
import { HydraResponse } from '~/contract/api';

const { httpAuthGet } = useHttp();

const portfolios = ref(null);

const columnDefs = [
  { headerName: 'Owner', field: 'user.name' },
  { headerName: 'Chat', field: 'chat.name' },
];

const datasource = {
  async getRows(params) {
    console.log(JSON.stringify(params.request, null, 1));
    const response = await httpAuthGet<HydraResponse<any>>('/api/portfolios');
    params.successCallback(response['hydra:member'], response['hydra:totalItems']);
  }
};

const reload = async () => {
  const response = await httpAuthGet<HydraResponse<any>>('/api/portfolios');
  console.log(response);
  portfolios.value = response['hydra:member'];
}

</script>
