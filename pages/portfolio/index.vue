<template>
  <div>
    <h1>Portfolios</h1>

    <div class="flex mb-4">
      <form-kit type="select" label="Chat" :options="chats" @change="(e) => chatId = e.target.value" />
    </div>

    <div class="h-[50vh]">
      <line-chart :data="dataset" :options="options" />
    </div>
  </div>
</template>

<script setup lang="ts">
// @ts-ignore eslint-disable-next-line no-unused-vars
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
import { Portfolio } from '~/contract/entity';
import { HydraResponse } from '~/contract/api';

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  CategoryScale,
  PointElement,
  LinearScale,
  LineElement
);

const { httpAuthGet } = useHttp();

const data = ref<Portfolio[]>([]);
const chatId = ref<string|null>('all');

const chats = computed(() => {
  const all = data.value.map(portfolio => portfolio.chat.name);
  const nonUnique = all.filter(name => all.filter(n => n === name).length > 1);
  return ['all', ...new Set(nonUnique)];
});

const dataset = computed(() => {

  // random hex color with good contrast on black
  let colors = [
    '#ff0000', '#8f3bee', '#0000ff', '#ffff00', '#00ffff', '#ff00ff',
    '#ff8000', '#00ff80', '#ff1c1c', '#ff0080', '#80ff00', '#0080ff',
  ];

  const dates: { [key: string]: string } = {};

  const portfolios = data.value.filter((portfolio) => {
    if (chatId.value === 'all') {
      return true;
    }
    return portfolio.chat.name === chatId.value;
  });

  if (chatId.value === null) {
    chatId.value = portfolios[0].chat.name;
  }

  portfolios.forEach((portfolio) => {
    const transactions = portfolio.transactions;

    transactions.sort((a, b) => {
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    });

    transactions.forEach((t) => {
      const date = new Date(t.createdAt);
      dates[date.getTime()] = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
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

  const sets = portfolios.map((portfolio) => {
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
      name: portfolio.user.name || 'Unknown',
      color,
      points
    };
  });

  return {
    labels,
    datasets: sets.map((set: any) => ({
      label: set.name,
      borderColor: set.color,
      backgroundColor: set.color,
      data: set.points
    }))
  };
});

const options = {
  maintainAspectRatio: false,
  plugins: {
    legend: {
      labels: {
        color: '#ffffff',
        font: {
          family: 'Inter'
        }
      }
    }
  },
  scales: {
    x: {
      grid: {
        color: '#111111'
      },
      ticks: {
        color: '#ffffff'
      }
    },
    y: {
      grid: {
        color: '#111111'
      },
      ticks: {
        color: '#ffffff'
      },
      beginAtZero: true
    }
  }
};

const load = async () => {
  const response = await httpAuthGet<HydraResponse<Portfolio>>('/api/portfolios');
  data.value = response['hydra:member'];
};

await load();

</script>
