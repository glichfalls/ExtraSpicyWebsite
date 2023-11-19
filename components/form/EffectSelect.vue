<template>
  <div class="w-full pt-4">
    <span class="p-float-label">
      <multi-select
          v-model="internalValue"
          :options="effects"
          optionLabel="name"
          placeholder="Select Effects"
          :loading="loading"
          class="w-full md:w-20rem"
          display="chip"
          :show-toggle-all="false"
      >
        <template #option="{ option }">
          <div class="flex items-center h-full">
            <span>
              {{ option.name }}
            </span>
          </div>
        </template>
      </multi-select>
      <label id="chat" for="">{{ label }}</label>
    </span>
  </div>
</template>
<script setup lang="ts">
import MultiSelect from 'primevue/multiselect';
import { Effect } from '~/contract/entity';

const props = defineProps<{
  modelValue: Effect[];
  label: string;
}>();

const emit = defineEmits(['update:modelValue']);

const { getAll } = useEntity<Effect>('effects');

const internalValue = ref<Effect[]>(props.modelValue);
const effects = ref<Effect[]>([]);
const loading = ref<boolean>(false);

watch(() => props.modelValue, (newValue: Effect[]) => {
  internalValue.value = newValue;
});

watch(internalValue, (newValue: Effect[]) => {
  emit('update:modelValue', newValue);
});

onBeforeMount(async () => {
  console.log('EffectSelect onBeforeMount');
  loading.value = true;
  effects.value = await getAll();
  loading.value = false;
});

</script>
