<template>
  <div v-if="!loading">
    <form-kit type="select" label="Chat" :options="chats" @change="(e) => chatId = e.target.value" />
    <div class="h-[50vh]">
      <line-chart :options="options" :dataset="dataset" />
    </div>
  </div>
</template>
<script setup lang="ts">
import LineChart from '~/components/chart/LineChart.vue';

const { httpAuthGet } = useHttp();
const route = useRoute();

const options = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    y: {
      beginAtZero: true,
    },
  },
};

const dataset = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'My First Dataset',
      data: [65, 59, 80, 81, 56, 55, 40],
      fill: false,
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.1,
    },
  ],
};

const loading = ref(false);
const chats = ref([]);
const chatId = ref(null);


const load = async (chatId: string) => {
  loading.value = true;
  chats.value = await httpAuthGet<any>('/api/chats');
  const response = await httpAuthGet<any>(`/api/charts/${chatId}/net-worth`);
  loading.value = false;
}

load(route.params.name);

</script>
