<template>
  <div class="w-full pt-6">
    <span class="p-float-label">
      <multi-select
          v-model="internalValue"
          :options="rarities.items"
          id="rarity"
          :optionLabel="(rarity: ItemRarity) => `${rarity.emoji} ${rarity.name}`"
          placeholder="select rarity"
          :loading="rarities.loading"
          :selection-limit="props.limit || 1"
          :show-toggle-all="false"
          class="w-full md:w-20rem"
      />
      <label v-if="label" id="rarity" for="rarity">{{ label }}</label>
    </span>
  </div>
</template>

<script setup lang="ts">
import MultiSelect from 'primevue/multiselect';
import { ItemRarity } from '~/contract/enum';

const { rarities } = useEnum();

const emit = defineEmits(['update:modelValue']);

const props = defineProps<{
  modelValue: ItemRarity|undefined;
  label?: string;
  limit?: number;
}>();

const internalValue = ref<ItemRarity[]>(props.modelValue ? [props.modelValue] : []);

watch(internalValue, (newValue) => {
  emit('update:modelValue', newValue);
});

</script>
