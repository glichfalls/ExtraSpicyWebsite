<template>
  <div class="w-[100vw] h-[100vh] flex items-center justify-center">
    <div class="w-full max-w-[600px] mx-auto">
      <div class="flex flex-col items-center justify-center h-full">
        <div class="text-4xl font-bold text-center text-gray-100">404</div>
        <div class="text-2xl font-bold text-center text-gray-400">Page not found</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

const router = useRouter();

setTimeout(() => {
  router.push('/');
}, 2000);

</script>
