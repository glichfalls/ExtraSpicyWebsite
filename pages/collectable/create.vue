<template>
  <card>
    <template #title>
      Create a new NFT
    </template>
    <template #content>
      <collectable-form />
    </template>
  </card>
</template>

<script setup lang="ts">
import Card from 'primevue/card';
import { useToast } from "primevue/usetoast";
import CollectableForm from '~/components/form/CollectableForm.vue';

const toast = useToast();

const onAdvancedUpload = () => {
  toast.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded', life: 3000 });
};

</script>
