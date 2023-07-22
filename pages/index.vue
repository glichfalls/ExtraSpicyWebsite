<template>
  <div v-if="isLoggedIn" class="w-full min-h-[50vh] flex flex-col gap-8 justify-center items-center">

    <button v-if="!rickroll" class="bg-primary text-white py-2 px-4 rounded hover:bg-primary-500" @click="rickroll = true;">
      Show Portfolio Charts
    </button>

    <div v-if="rickroll">

      <h1 class="text-center mb-4">
        Hops gno {{ user?.firstName }}
      </h1>

      <video playsinline autoplay controls>
        <source :src="video" type="video/mp4" />
      </video>
    </div>

  </div>
</template>

<script setup lang="ts">

import { useAuth } from '~/store/auth';
import video from '~/assets/video/rickroll.mp4';

const { isLoggedIn, user } = useAuth();

const rickroll = ref(false);

</script>
