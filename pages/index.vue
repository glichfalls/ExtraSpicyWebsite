<template>
  <div class="w-full h-[50vh] flex justify-center items-center">
    <iframe
        v-if="isLoggedIn"
        width="560"
        height="315"
        src="https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?controls=0&autoplay=1"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen
    ></iframe>
  </div>
</template>

<script setup lang="ts">

import { useAuth } from '~/store/auth';

const { isLoggedIn, token } = useAuth();

</script>
