<template>
  <card>
    <template #title>
      Create a new Effect
    </template>
    <template #content>
      <effect-form />
    </template>
  </card>
</template>

<script setup lang="ts">
import Card from 'primevue/card';
import EffectForm from '~/components/form/EffectForm.vue';
</script>
