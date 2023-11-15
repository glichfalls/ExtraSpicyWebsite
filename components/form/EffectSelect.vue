<template>
  <div class="w-full pt-4">
    <span class="p-float-label">
      <multi-select
          v-model="value"
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

const emit = defineEmits(['update:modelValue']);

const props = defineProps<{
  modelValue: Effect[];
  label: string;
}>();

const value = ref(props.modelValue);
const loading = ref(true);

const { getAll } = useEntity<Effect>('effects');

const effects = ref<Effect[]>(await getAll());

loading.value = false;

watch(value, (newValue) => {
  emit('update:modelValue', newValue);
});

</script>
