<template>
  <div class="min-h-[100vh]">
    <sidebar class="h-[100vh]" h-full>
      <v-main class="lg:px-0">
        <div class="px-4 py-6">
          <slot />
        </div>
      </v-main>
    </sidebar>
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
