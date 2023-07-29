<template>
  <line-chart :data="dataset" :options="options" />
</template>

<script setup lang="ts">
import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip
} from 'chart.js';
import { Line as LineChart } from 'vue-chartjs';

ChartJS.register(
    Title,
    Tooltip,
    Legend,
    CategoryScale,
    PointElement,
    LinearScale,
    LineElement
);

defineProps({
  dataset: {
    type: Array,
    required: true,
  },
  options: {
    type: Object,
    required: true,
  },
});

</script>
