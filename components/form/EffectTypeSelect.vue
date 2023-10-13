<template>
  <div class="w-full pt-6">
    <span class="p-float-label">
      <dropdown
          v-model="value"
          :options="effects"
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

const props = defineProps<{
  modelValue: string;
  label: string;
}>();

const effects = ref<{
  name: string,
  code: string
}[]>([
  { name: 'Luck', code: 'LUCK' },
  { name: 'Gamble Luck', code: 'GAMBLE_LUCK' },
]);

const value = ref<{
  name: string;
  code: string;
}>({
  name: effects.value.find((effect) => effect.code === props.modelValue)?.name || '',
  code: props.modelValue,
});

watch(value, (newValue) => {
  emit('update:modelValue', newValue.code);
});

</script>
