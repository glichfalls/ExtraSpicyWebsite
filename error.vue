<template>
  <nuxt-layout name="default">
    <div class="w-[100vw] h-[100vh] flex items-center justify-center">
      <div class="w-full max-w-[600px] mx-auto">
        <div class="flex flex-col items-center justify-center h-full">
          <div class="text-4xl font-bold text-center text-gray-100">{{ error?.statusCode }}</div>
          <div class="text-2xl font-bold text-center text-gray-400">{{ error?.message }}</div>
          <nuxt-link to="/" class="px-2 py-1 rounded-lg mt-4">
            Home
          </nuxt-link>
        </div>
      </div>
    </div>
  </nuxt-layout>
</template>

<script setup lang="ts">

const router = useRouter();
const error = useError();

if (error.value?.statusCode === 401) {
  router.push('/');
}

if (error.value?.statusCode === 404) {
  setTimeout(() => {
    router.push('/');
  }, 1000);
}

</script>
