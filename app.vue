<template>
  <NuxtLayout>
    <NuxtPage/>
    <login-modal v-if="!isLoggedIn" />
  </NuxtLayout>
</template>

<script setup lang="ts">
import LoginModal from '~/components/auth/LoginModal.vue';
import { storeToRefs } from 'pinia';
import { useAuth } from '~/store/auth';
const { isLoggedIn } = storeToRefs(useAuth());
</script>


<style lang="scss">
body {
  font-family: 'Inter', sans-serif;
  @apply bg-gray-900 text-gray-400 text-lg;
  @apply min-h-[100vh];
  @apply overflow-x-hidden max-w-[100vw];
}
h1, h2, h3, h4, h5, h6 {
  @apply text-gray-100 text-xl font-bold block;
}
</style>
