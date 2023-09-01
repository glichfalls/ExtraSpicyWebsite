<template>
  <NuxtLayout>
    <NuxtPage />
    <login-modal v-if="!isLoggedIn" />
  </NuxtLayout>
</template>

<script setup lang="ts">
import LoginModal from '~/components/auth/LoginModal.vue';
import { storeToRefs } from 'pinia';
import { useAuth } from '~/store/auth';
const { isLoggedIn } = storeToRefs(useAuth());
</script>


<style lang="postcss">
body {
  font-family: 'Inter', sans-serif;
  background-color: var(--surface-ground);
  @apply min-h-[100vh];
  @apply overflow-x-hidden max-w-[100vw];
}
html,body, #__nuxt, #__layout {
  @apply h-full;
}
</style>
