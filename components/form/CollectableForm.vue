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
    <chat-select
        v-if="input === null"
        v-model="formData.chat"
        label="Select Chat"
        :limit="1"
    />
    <user-select
        v-if="formData.chat.length === 1 && input === null"
        v-model="formData.users"
        :chat-id="formData.chat[0]['@id']"
        label="Select Owner(s)"
    />
    <effect-select
        v-model="formData.effects"
        label="Select Effects"
    />
    <div class="flex gap-10 my-3">
      <div class="flex items-center gap-3">
        <prime-checkbox v-model="formData.tradable" inputId="tradable" :binary="true" />
        <label for="tradable">Tradable</label>
      </div>
      <div class="flex items-center gap-3">
        <prime-checkbox v-model="formData.unique" inputId="unique" :binary="true" />
        <label for="unique">Unique</label>
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
import { User } from '~/store/auth';
import { Chat, Effect } from '~/contract/entity';
import { useToast } from 'primevue/usetoast';
import InlineMessage from 'primevue/inlinemessage';
import EffectSelect from '~/components/form/EffectSelect.vue';

const { httpPost, httpPut } = useHttp();
const toast = useToast();
const router = useRouter();

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
  tradable: boolean;
  unique: boolean;
  effects: Effect[];
  users: User[];
  chat: Chat[];
} = reactive({
  name: '',
  description: '',
  price: 0,
  tradable: false,
  unique: false,
  effects: [],
  chat: [],
  users: [],
});

if (props.input) {
  formData.name = props.input.name;
  formData.description = props.input.description;
  formData.price = props.input.price;
  formData.tradable = props.input.tradeable;
  formData.unique = props.input.unique;
  formData.effects = props.input.effects;
  formData.chat = [];
  formData.users = [];
}

const submit = () => {
  if (props.input) {
    return saveEdit();
  }
  return saveCreate();
};

const saveEdit = async () => {
  try {
    loading.value = true;
    await httpPut<string[]>(`/nft/${props.input.id}`, {
      ...formData,
      chat: undefined,
      users: undefined,
    });
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
    const response = await httpPost<string[]>('/nft', formData);
    if (response) {
      return router.push(`/collectable/${response[0]}`);
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
  formData.price = 0;
  formData.tradable = false;
  formData.unique = false;
  formData.chat = [];
  formData.users = [];
};

onBeforeUnmount(() => {
  resetForm();
});

</script>
