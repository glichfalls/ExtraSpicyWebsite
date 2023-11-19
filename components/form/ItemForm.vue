<template>
  <div class="flex flex-col items-start gap-1 w-full">
    <skeleton v-if="loading" />
    <template v-else>
          <span class="p-float-label w-full">
      <prime-input v-model="internalValue.name" id="name" class="w-full" />
      <label for="name">Name</label>
    </span>
      <span class="p-float-label mt-4 w-full">
      <prime-textarea v-model="internalValue.description" id="description" class="w-full" />
      <label for="description">Description</label>
    </span>
      <span class="p-float-label mt-4 w-full">
      <prime-number v-model="internalValue.price" inputId="price" class="w-full" />
      <label for="price">Initial price</label>
    </span>
      <rarity-select v-model="internalValue.rarity" :limit="1" id="description" class="w-full" label="Rarity" />
      <effect-select
          v-model="effects"
          label="Select Effects"
      />
      <div class="flex gap-10 my-3">
        <div class="flex items-center gap-3">
          <prime-checkbox v-model="internalValue.permanent" inputId="permanent" :binary="true" />
          <label for="tradable">Permanent</label>
        </div>
      </div>
      <prime-button type="submit" label="Save" class="mt-4" :loading="loading" @click.prevent="submit" />
    </template>
  </div>
</template>

<script setup lang="ts">
import PrimeButton from 'primevue/button';
import PrimeCheckbox from 'primevue/checkbox';
import PrimeNumber from 'primevue/inputnumber';
import PrimeTextarea from 'primevue/textarea';
import PrimeInput from 'primevue/inputtext';
import { Effect, Item, ItemEffect } from '~/contract/entity';
import { useToast } from 'primevue/usetoast';
import EffectSelect from '~/components/form/EffectSelect.vue';
import RaritySelect from '~/components/form/RaritySelect.vue';
import { Ref } from 'vue';

const { httpPost, httpPut } = useHttp();
const toast = useToast();
const router = useRouter();

interface Props {
  modelValue: Item|null;
  loading: boolean;
}

type ItemData = Partial<Item> & Required<Pick<Item, 'name' | 'description' | 'permanent' | 'price' | 'imagePublicPath' | 'attributes' | 'effects'>>;

const props = defineProps<Props>();
const emit = defineEmits(['update:modelValue']);

const loading = ref(false);

const defaultData = (): ItemData => ({
  name: '',
  description: '',
  permanent: true,
  price: null,
  effects: [],
  attributes: [],
  rarity: undefined,
  imagePublicPath: null,
});

const effects = ref<Effect[]>([]);
const itemEffects = computed((): Partial<ItemEffect>[] => {
  if (props.modelValue === null) {
    return [];
  }
  return effects.value.map((effect: Effect) => {
    return { effect, item: props.modelValue as Item };
  });
});

const internalValue: Ref<ItemData> = ref(props.modelValue ?? defaultData());

watch(internalValue, (newValue) => {
  emit('update:modelValue', newValue);
}, { deep: true });

watch(effects, () => {
  emit('update:modelValue', { ...internalValue.value, effects: itemEffects.value });
}, { deep: true });

watch(() => props.modelValue, (newValue: Item|null) => {
  console.log('item form props watch triggered', newValue);
  internalValue.value = newValue ?? defaultData();
  effects.value = newValue?.effects?.map((item) => item.effect) ?? [];
}, { immediate: true });

const submit = () => {
  if (props.modelValue?.id) {
    return saveEdit();
  }
  return saveCreate();
};

const normalized = computed(() => {
  const data: any = { ...internalValue.value, instances: undefined };
  data.price = internalValue.value.price?.toString() || null;
  data.effects = itemEffects.value.map((item: Partial<ItemEffect>) => {
    if (item?.['@id'] !== undefined) {
      return item['@id'];
    }
    return {
      effect: item.effect?.['@id'],
      item: item.item?.['@id'],
    }
  });
  return data;
});

const saveEdit = async () => {
  try {
    loading.value = true;
    if (internalValue.value['@id'] === undefined) {
      return saveCreate();
    }
    await httpPut(internalValue.value['@id'], normalized.value);
    toast.add({ severity: 'success', summary: 'Success Message', detail: 'Message Content', life: 3000, group: 'tr' });
  } catch (err) {
    toast.add({ severity: 'error', summary: 'Error', detail: err.message, life: 3000 });
  } finally {
    loading.value = false;
  }
};

const saveCreate = async () => {
  try {
    loading.value = true;
    const item = await httpPost<Item>('/api/items', normalized.value);
    if (item) {
      return router.push(`/items/${item.id}`);
    }
  } catch (err) {
    toast.add({ severity: 'error', summary: 'Error', detail: err.message, life: 3000 });
  } finally {
    loading.value = false;
  }
};

</script>
