<template>
  <card>
    <template #title>
      Edit {{ item.name }} NFT
    </template>
    <template #content>
      <div class="grid grid-cols-2 gap-8">
        <collectable-form :input="item" />
        <collectable-image-form :input="item" @upload:success="load" />
      </div>
    </template>
  </card>
</template>

<script setup lang="ts">
import Card from 'primevue/card';
import { useToast } from "primevue/usetoast";
import CollectableForm from '~/components/form/CollectableForm.vue';
import CollectableImageForm from '~/components/form/CollectableImageForm.vue';

const route = useRoute();
const { getById } = useEntity('collectables');

const item = ref(null);

const load = async () => {
  if (route.params.id) {
    return await getById(route.params.id as string);
  }
  return null;
};

item.value = await load();

</script>
