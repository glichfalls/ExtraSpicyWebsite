<template>
  <div>
    <div class="w-full h-[100vh] flex justify-center items-center">
      <iframe
          v-if="isLoggedIn"
          width="560"
          height="315"
          src="https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?controls=0"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen
      ></iframe>
    </div>
  </div>
</template>

<script setup lang="js">

import { useAuthMethods } from '~/composables/useAuthMethods';
import { useAuth } from '~/store/auth';

const route = useRoute();
const { tokenAuth } = useAuthMethods();

const { token } = route.query;

await tokenAuth(token);

const { isLoggedIn } = useAuth();

</script>
