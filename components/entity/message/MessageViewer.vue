<template>
  <div class="message-viewer">
    <div class="message-viewer-wrapper" ref="chat" @scroll="handleScroll">
      <div v-if="loading" class="loader">
        <icon v-if="loading" name="svg-spinners:90-ring" />
      </div>
      <div v-for="message in reversedMessages" :key="message.id" class="message">
        <span class="user">{{ userDisplayName(message.user) }}</span>
        <span class="text">{{ message.message }}</span>
        <span class="timestamp">{{ formatDate(message.createdAt) }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { format } from 'date-fns';
import { HydraResponse } from '~/contract/api';
import { Message } from '~/contract/entity';
import { User } from '~/store/auth';

const props = defineProps({
  chatId: {
    type: String,
    required: true,
  },
});

const { httpAuthGet } = useHttp();

const chat = ref();
const loading = ref<boolean>(false);
const messages = ref<Message[]>([]);
const page = ref<number>(1);
const total = ref<number>(0);
const prevScrollHeight = ref<number>(0);

const formatDate = (date: string): string => format(new Date(date), 'HH:mm');
const formatChatDate = (date: string): string => format(new Date(date), 'd. MMM');

const reversedMessages = computed(() => messages.value.slice().reverse());

const url = computed(() => `/api/messages?chat.id=${props.chatId}`);

const userDisplayName = (user: User) => {
  if (user.name) {
    return user.name;
  }
  return user.firstName;
}

const load = async () => {
  try {
    loading.value = true;
    const response = await httpAuthGet<HydraResponse<Message>>(url.value);
    messages.value = response['hydra:member'];
    total.value = response['hydra:totalItems'];
    page.value = 1;
  } catch(error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
}

const loadMore = async () => {
  try {
    loading.value = true;
    const response = await httpAuthGet<HydraResponse<Message>>(url.value, {
      page: page.value + 1,
    });
    messages.value = [...messages.value, ...response['hydra:member']];
    total.value = response['hydra:totalItems'];
    page.value = page.value + 1;
  } catch(error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
}

const handleScroll = async () => {
  if (chat.value) {
    if (chat.value.scrollTop === 0 && messages.value.length < total.value) {
      prevScrollHeight.value = chat.value.scrollHeight;
      await loadMore();
      chat.value.scrollTop = chat.value.scrollHeight - prevScrollHeight.value;
    }
  }
}

onMounted(async () => {
  await load();
  scrollToBottom();
});

const scrollToBottom = (): void => {
  if (chat.value) {
    chat.value.scrollTop = chat.value.scrollHeight;
  }
}

</script>

<style scoped lang="scss">
.message-viewer {
  @apply w-full;
  @apply bg-gray-950 text-white;
  @apply p-4;
  @apply border border-gray-900 rounded-lg;
  @apply max-h-[600px];
  @apply overflow-hidden;
}
.message-viewer-wrapper {
  @apply flex flex-col items-start gap-4;
  @apply w-full h-full;
  @apply overflow-y-auto;
}
.loader {
  @apply w-full;
  @apply text-center;
  @apply py-1;
}
.message {
  @apply relative;
  @apply bg-gray-800;
  @apply flex-grow-0;
  @apply pr-16 pl-4;
  @apply py-2;
  @apply rounded-lg;
  @apply w-auto max-w-[600px];

  .user {
    @apply font-bold;
    @apply block;
  }

  .message {
    @apply text-sm;
  }

  .timestamp {
    @apply w-10;
    @apply absolute right-2 bottom-2;
    @apply text-xs;
  }

}
</style>
