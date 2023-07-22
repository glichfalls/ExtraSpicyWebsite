<template>
  <header v-if="isLoggedIn" class="header">
    <div class="container">
      <h1>乇❎ㄒ尺卂 丂🅱️丨匚ㄚ 丂🅱️卂爪( ﾟーﾟ) ♿️</h1>
      <div class="menu">
        <nuxt-link to="/">Home</nuxt-link>
        <nuxt-link to="/logout">Sign out</nuxt-link>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import LoginModal from '~/components/auth/LoginModal.vue';
import { useAuth } from '~/store/auth';
import { storeToRefs } from 'pinia';

const { isLoggedIn } = storeToRefs(useAuth());
</script>

<style scoped lang="scss">
.header {
  @apply w-full;
  @apply mx-auto;
  @apply flex flex-col items-center gap-4;
  @apply text-gray-400 font-bold;
  @apply p-4;
  @apply lg:rounded-lg;
}
.menu {
  @apply flex justify-start gap-4 mt-4;

  a {
    @apply text-white;
    @apply text-sm font-semibold;
  }
}
</style>
