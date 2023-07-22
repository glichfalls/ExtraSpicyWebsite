<template>
  <div class="">
    <h1>Error</h1>
  </div>
</template>

<script setup lang="ts">

const router = useRouter();

setTimeout(() => {
  router.push('/');
}, 2000);

</script>
