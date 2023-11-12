<template>
  <Dialog v-model:visible="open" modal>
    <template #header>
      <span class="text-lg font-semibold text-white">
        <span>Create Item Instance</span>
      </span>
    </template>
    <template #default>
      <div class="w-full md:w-[400px] flex flex-col gap-3">
        <chat-select
            v-model="formData.chat"
            label="Select Chat"
            :limit="1"
        />
        <user-select
            v-if="formData.chat.length === 1"
            v-model="formData.users"
            :chat-id="formData.chat[0]['@id']"
            label="Select Owner(s)"
        />
        <div class="flex items-center gap-3">
          <prime-checkbox v-model="formData.tradeable" inputId="tradeable" :binary="true" />
          <label for="tradable">Tradeable</label>
        </div>
        <prime-button label="save" class="mt-6" @click="submit" />
      </div>
    </template>
  </Dialog>
</template>

<script setup lang="ts">
import Dialog from 'primevue/dialog';
import PrimeButton from 'primevue/button';
import { Chat, Item, ItemInstance } from '~/contract/entity';
import ChatSelect from '~/components/form/ChatSelect.vue';
import UserSelect from '~/components/form/UserSelect.vue';
import { User } from '~/store/auth';
import PrimeCheckbox from 'primevue/checkbox';

const props = defineProps<{ instance: Item }>();

const emit = defineEmits(['close', 'success']);

const { httpPost } = useHttp();

const open = ref<boolean>(true);
const loading = ref<boolean>(false);

watch(open, () => {
   emit('close');
});

const formData = reactive<{
  chat: Chat[];
  users: User[];
  tradeable: boolean;
  expiresAt: Date|null;
  payload: object|Array<any>;
}>({
  chat: [],
  users: [],
  tradeable: false,
  expiresAt: null,
  payload: [],
});

const submit = async () => {
  try {
    loading.value = true;
    await httpPost(`/nft/${props.instance.id}/instances`, {
      chat: formData.chat[0].id,
      users: formData.users,
      tradeable: formData.tradeable,
      expiresAt: formData.expiresAt,
      payload: formData.payload,
    });
    open.value = false;
    emit('success');
  } catch (err) {
    console.error(err);
  } finally {
    loading.value = false;
  }
}
</script>
