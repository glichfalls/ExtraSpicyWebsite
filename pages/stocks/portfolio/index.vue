<template>
  <div>
    <panel header="Chart">
      <template #icons>
        <button class="p-panel-header-icon p-link mr-2" @click="toggle">
          <span class="pi pi-cog" />
        </button>
        <overlay-panel ref="menuRef" :dismissable="false">
          <dropdown
            v-model="chatId"
            :options="chats"
            optionLabel="name"
            class="w-full md:w-14rem"
          />
        </overlay-panel>
      </template>
      <div class="h-[50vh]">
        <div v-if="loading" class="h-full">
          <Skeleton class="mb-2"></Skeleton>
          <Skeleton width="10rem" class="mb-2"></Skeleton>
          <Skeleton width="5rem" class="mb-2"></Skeleton>
          <Skeleton height="2rem" class="mb-2"></Skeleton>
          <Skeleton width="10rem" height="4rem"></Skeleton>
        </div>
        <chart
          v-else
          :data="dataset"
          :options="options"
          type="line"
          class="h-full"
        />
      </div>
    </panel>
  </div>
</template>

<script setup lang="ts">
import Chart from 'primevue/chart';
import { Portfolio } from '~/contract/entity';
import { HydraResponse } from '~/contract/api';
import Dropdown from 'primevue/dropdown';
import OverlayPanel from 'primevue/overlaypanel';
import ProgressSpinner from 'primevue/progressspinner';
import Skeleton from 'primevue/skeleton';

const { httpAuthGet } = useHttp();

const menuRef = ref<any>(null);
const data = ref<Portfolio[]>([]);
const loading = ref(true);
const chatId = ref<string|null>('all');

const toggle = (event: any) => {
  menuRef.value.toggle(event);
};

const chats = computed(() => {
  const all = data.value.map(portfolio => ({
    name: portfolio.chat.name,
  }));
  console.log(all);
  //const unique = all.filter(item => all.filter(n => n.name === item.name).length > 1);
  return [{ name: 'all' }, ...all];
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
  loading.value = true;
  const response = await httpAuthGet<HydraResponse<Portfolio>>('/api/portfolios');
  data.value = response['hydra:member'];
  loading.value = false;
};

load();

</script>
