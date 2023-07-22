<template>
  <div>
    <h1>Portfolios</h1>

    <div class="h-[50vh]">
      <line-chart :data="dataset" :options="options" />
    </div>
  </div>
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
  Tooltip,
} from 'chart.js';
import { Line as LineChart } from 'vue-chartjs';
import { useAuth } from "~/store/auth";
import { Portfolio } from "~/contract/entity";
import { HydraResponse } from "~/contract/api";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  CategoryScale,
  PointElement,
  LinearScale,
  LineElement,
);

const { httpAuthGet } = useHttp();
const { user } = useAuth();

const data = ref<Portfolio[]>([]);

const dataset = computed(() => {

  // random hex color with good contrast on black
  let colors = [
    '#ff0000', '#8f3bee', '#0000ff', '#ffff00', '#00ffff', '#ff00ff',
    '#ff8000', '#00ff80', '#ff1c1c', '#ff0080', '#80ff00', '#0080ff',
  ];

  const dates: { [key: string]: string } = {};

  data.value.forEach((portfolio) => {

    const transactions = portfolio.transactions;

    transactions.sort((a, b) => {
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    });

    transactions.forEach((t) => {
      const date = new Date(t.createdAt);
      dates[date.getTime()] = `${ date.getDate() }/${ date.getMonth() + 1 }/${ date.getFullYear() }`;
    });
  });

  // order by key
  Object.keys(dates).sort().forEach((key) => {
    const value = dates[key];
    delete dates[key];
    dates[key] = value;
  });

  // array of unique labels
  const labels = [...new Set(Object.values(dates))];

  const sets = data.value.map((portfolio) => {
    const transactions = portfolio.transactions;
    const color = colors[Math.floor(Math.random() * colors.length)];
    colors = colors.filter((c) => c !== color);

    transactions.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());

    let prev = 0;
    const points = labels.map((label) => {
      const sum = transactions.reduce((total, t) => {
        const date = new Date(t.createdAt);
        const key = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
        if (key === label) {
          return total + t.amount * t.price.price;
        }
        return total;
      }, 0);
      prev += sum;
      return prev;
    });

    return {
      name: portfolio.user.name,
      color,
      points,
    };
  });

  return {
    labels,
    datasets: sets.map((set) => ({
      label: set.name,
      // random color
      borderColor: set.color,
      backgroundColor: set.color,
      data: set.points,
    })),
  };
});

const options = {
  maintainAspectRatio: false,
  scales: {
    y: {
      grid: {
        color: '#ffffff',
      },
      ticks: {
        color: '#ffffff',
      },
      beginAtZero: true,
    },
  },
};

const load = async () => {
  const response = await httpAuthGet<HydraResponse<Portfolio>>('/api/portfolios', {
    'portfolio.user.id': user?.id,
  });

  data.value = response['hydra:member'];
  console.log(response);
}

await load();

</script>
