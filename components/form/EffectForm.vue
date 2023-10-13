<template>
  <div class="flex flex-col items-start gap-2 w-full">
    <h3 class="text-lg font-bold">Edit details</h3>
    <span class="p-float-label mt-6 w-full">
      <prime-input v-model="formData.name" id="name" class="w-full" />
      <label for="name">Name</label>
    </span>
    <span class="p-float-label mt-6 w-full">
      <prime-textarea v-model="formData.description" id="description" class="w-full" />
      <label for="description">Description</label>
    </span>
    <span v-if="input === null" class="p-float-label mt-6 w-full">
      <prime-number v-model="formData.price" inputId="price" class="w-full" />
      <label for="price">Initial price</label>
    </span>
    <prime-button type="submit" label="Save" class="mt-4" :loading="loading" @click.prevent="submit" />
  </div>
</template>
<script setup lang="ts">
import PrimeButton from 'primevue/button';
import PrimeNumber from 'primevue/inputnumber';
import PrimeTextarea from 'primevue/textarea';
import PrimeInput from 'primevue/inputtext';

const props = defineProps({
  input: {
    type: Object,
    default: null,
  },
});

const loading = ref(false);

const formData: {
  name: string;
  description: string;
  price: number;
} = reactive({
  name: '',
  description: '',
  price: 0,
});

const submit = () => {

};

</script>
