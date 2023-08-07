<template>
  <div class="min-h-[100vh]">
    <page-header />
    <v-main class="lg:px-0">
      <slot />
    </v-main>
    <page-footer />
  </div>
</template>

<style scoped lang="postcss">

main {
  @apply container mx-auto;
  @apply block;
  @apply py-4;
}

</style>
