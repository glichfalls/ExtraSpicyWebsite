<template>
  <div>
    <page-header />
    <main>
      <slot />
    </main>
    <footer>
      <slot name="footer" />
    </footer>
  </div>
</template>

<script setup lang="ts">

</script>
<style scoped lang="scss">

main {
  @apply container mx-auto;
  @apply block;
  @apply py-4;
}

</style>
