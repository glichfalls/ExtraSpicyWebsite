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
  @apply block;
  @apply p-2;
}

</style>
