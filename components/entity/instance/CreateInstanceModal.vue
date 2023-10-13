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
        <span class="p-float-label mt-6 w-full">
        <prime-number v-model="formData.price" inputId="price" class="w-full" />
        <label for="price">Initial price</label>
      </span>
        <prime-button label="save" class="mt-6" @click="submit" />
      </div>
    </template>
  </Dialog>
</template>

<script setup lang="ts">
import Dialog from 'primevue/dialog';
import PrimeButton from 'primevue/button';
import { Chat, Collectable } from '~/contract/entity';
import ChatSelect from '~/components/form/ChatSelect.vue';
import UserSelect from '~/components/form/UserSelect.vue';
import { User } from '~/store/auth';
import PrimeNumber from 'primevue/inputnumber';

const props = defineProps<{ collectable: Collectable }>();

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
  price: number;
}>({
  chat: [],
  users: [],
  price: 0,
});

const submit = async () => {
  try {
    loading.value = true;
    await httpPost(`/nft/${props.collectable.id}/instances`, {
      chat: formData.chat[0].id,
      users: formData.users,
      price: formData.price,
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
