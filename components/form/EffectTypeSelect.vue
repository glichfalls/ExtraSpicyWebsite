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

const { httpAuthGet } = useHttp();

const props = defineProps<{
  modelValue: string;
  label: string;
}>();

const effects = ref<{
  name: string,
  code: string
}[]>([]);

const value = ref<{
  name: string;
  code: string;
}>({
  name: '',
  code: '',
});

onBeforeMount(async () => {
  const types = await httpAuthGet<{[key: string]: string}>('/nft/effect-types');
  effects.value = Object.entries(types).map(([code, name]) => ({ code, name }));
  value.value = {
    name: effects.value.find((effect) => effect.code === props.modelValue)?.name || '',
    code: props.modelValue,
  }
});

watch(value, (newValue) => {
  emit('update:modelValue', newValue.code);
});

</script>
