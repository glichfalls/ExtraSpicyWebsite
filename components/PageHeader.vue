<template>
  <header class="header">
    <h1>乇❎ㄒ尺卂 丂🅱️丨匚ㄚ 丂🅱️卂爪( ﾟーﾟ) ♿️</h1>

    <login-modal v-if="!isLoggedIn" />
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
  @apply w-full max-w-[600px];
  @apply mx-auto;
  @apply flex justify-center gap-4;
  @apply bg-gray-800 text-gray-400 font-bold;
  @apply p-4;
  @apply lg:rounded-lg;
}
</style>
