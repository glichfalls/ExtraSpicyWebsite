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
    <rarity-select v-model="formData.rarity" :limit="1" id="description" class="w-full"  label="Rarity" />
    <effect-select
        v-if="input !== null"
        v-model="formData.effects"
        label="Select Effects"
    />
    <div class="flex gap-10 my-3">
      <div class="flex items-center gap-3">
        <prime-checkbox v-model="formData.permanent" inputId="permanent" :binary="true" />
        <label for="tradable">Permanent</label>
      </div>
    </div>
    <prime-button type="submit" label="Save" class="mt-4" :loading="loading" @click.prevent="submit" />
  </div>
</template>

<script setup lang="ts">
import PrimeButton from 'primevue/button';
import PrimeCheckbox from 'primevue/checkbox';
import ChatSelect from '~/components/form/ChatSelect.vue';
import PrimeNumber from 'primevue/inputnumber';
import UserSelect from '~/components/form/UserSelect.vue';
import PrimeTextarea from 'primevue/textarea';
import PrimeInput from 'primevue/inputtext';
import { Chat, Effect, Item } from '~/contract/entity';
import { useToast } from 'primevue/usetoast';
import EffectSelect from '~/components/form/EffectSelect.vue';
import RaritySelect from '~/components/form/RaritySelect.vue';
import { UnwrapNestedRefs } from '@vue/reactivity';
import { User } from '~/store/auth';
import { react } from '@babel/types';
import { ItemRarity, ItemRarityEnum } from "~/contract/enum";

const { httpPost, httpPut } = useHttp();
const toast = useToast();
const router = useRouter();

interface Props {
  input?: Item|null;
}

type ItemData = Partial<Item> & Required<Pick<Item, 'name' | 'description' | 'permanent' | 'price' | 'imagePublicPath' | 'attributes' | 'effects'>>;

const props = defineProps<Props>();

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

const formData: UnwrapNestedRefs<ItemData> = reactive(props.input ?? defaultData());

const submit = () => {
  if (props.input) {
    return saveEdit();
  }
  return saveCreate();
};

const normalized = computed(() => {
  const data: any = { ...formData };
  data.rarity = formData.rarity?.name || null;
  return data;
});

const saveEdit = async () => {
  try {
    loading.value = true;
    if (!props.input) {
      toast.add({ severity: 'error', summary: 'Error', detail: 'Item not found', life: 3000 });
      return;
    }
    await httpPut(props.input['@id'], normalized.value);
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

const resetForm = () => {
  formData.name = '';
  formData.description = '';
  formData.permanent = false;
  formData.price = null;
  formData.effects = [];
};

onBeforeUnmount(() => {
  resetForm();
});

</script>
