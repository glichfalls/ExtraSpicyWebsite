<template>
  <div class="min-h-[100vh]">
    <page-header />
    <div class="px-4 py-6">
      <slot />
    </div>
    <page-footer />
  </div>
</template>

<style scoped lang="postcss">

main {
  @apply block;
}

</style>
<script setup lang="ts">
</script>
