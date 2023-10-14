<template>
  <div class="w-full pt-6">
    <span class="p-float-label">
      <dropdown
          v-model="value"
          :options="priorities"
          optionLabel="name"
          class="w-full md:w-14rem"
      />
      <label id="chat" for="">{{ label }}</label>
    </span>
  </div>
</template>
<script setup lang="ts">
import Dropdown from 'primevue/dropdown';

const emit = defineEmits(['update:modelValue']);

defineProps<{
  modelValue: string;
  label: number;
}>();

const priorities = ref<{
  name: string,
  code: number
}[]>([
  { name: 'Low', code: 100 },
  { name: 'Medium', code: 500 },
  { name: 'High', code: 1000 },
]);

const value = ref<{
  name: string;
  code: number;
}>({
  name: '',
  code: 100,
});

watch(value, (newValue) => {
  emit('update:modelValue', newValue.code);
});

</script>
