<template>
  <div>
    <div v-for="sticker in stickers">
      <img :src="sticker.file.filePath" />
    </div>
  </div>
</template>

<script setup lang="ts">

import { HydraResponse } from '~/contract/api';
import { Sticker } from '~/contract/entity';

const { httpAuthGet } = useHttp();

const stickers = ref([]);

onMounted(async () => {
  stickers.value = await httpAuthGet<HydraResponse<Sticker>>('/api/stickers');
});

</script>
