<template>
  <div>
    <h1>Chats</h1>
    <hydra-table :data="chats" />
  </div>
</template>

<script setup lang="ts">

import { HydraResponse } from '~/contract/api';
import { Chat } from '~/contract/entity';
import HydraTable from '~/components/table/HydraTable.vue';

const { httpAuthGet } = useHttp();

const chats = ref<Array<Chat>>([]);

onMounted(async () => {
  const response = await httpAuthGet<HydraResponse<Chat>>('/api/chats');
  chats.value = response['hydra:member'];
  console.log(chats.value);
});

</script>
