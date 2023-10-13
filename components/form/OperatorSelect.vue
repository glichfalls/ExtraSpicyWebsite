<template>
  <div class="w-full pt-6">
    <span class="p-float-label">
      <dropdown v-model="value" :options="operators" class="w-full md:w-14rem" />
      <label id="chat" for="">{{ label }}</label>
    </span>
  </div>
</template>
<script setup lang="ts">
import Dropdown from 'primevue/dropdown';

const emit = defineEmits(['update:modelValue']);

const props = defineProps<{
  modelValue: string;
  label: string;
}>();

const value = ref<string>(props.modelValue);

const operators = ['+', '-', '*', '/'];

watch(value, (newValue) => {
  emit('update:modelValue', newValue);
});

</script>
