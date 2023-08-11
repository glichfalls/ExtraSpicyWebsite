<template>
  <div class="message-viewer">
    <div class="message-viewer-wrapper" ref="chat" @scroll="handleScroll">
      <div v-if="loading" class="loader">
        <icon v-if="loading" name="svg-spinners:90-ring" />
      </div>
      <div v-for="message in reversedMessages" :key="message.id" class="message" :class="{ 'highlight': message.user.id == user?.id }">
        <span class="user">{{ userDisplayName(message.user) }}</span>
        <span class="text">{{ message.message }}</span>
        <span class="timestamp">
          <span class="text-[8px]">
            {{ formatChatDate(message.createdAt) }}
          </span>
          <span class="text-gray-200">
            {{ formatDate(message.createdAt) }}
          </span>
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { format } from 'date-fns';
import { HydraResponse } from '~/contract/api';
import { Message } from '~/contract/entity';
import { useAuth, User } from '~/store/auth';

const props = defineProps({
  chatId: {
    type: String,
    required: true,
  },
  live: {
    type: Boolean,
    default: false,
  },
});

const { user } = useAuth();
const { httpAuthGet } = useHttp();

const chat = ref();
const loading = ref<boolean>(false);
const messages = ref<Message[]>([]);
const page = ref<number>(1);
const total = ref<number>(0);
const prevScrollHeight = ref<number>(0);
const liveReloadInterval = ref<any>(null);

const formatDate = (date: string): string => format(new Date(date), 'HH:mm');
const formatChatDate = (date: string): string => format(new Date(date), 'd. MMM');

const reversedMessages = computed(() => messages.value.slice().reverse());

const url = computed(() => `/api/messages?chat.id=${props.chatId}`);

const latestMessageDate = computed(() => {
  return messages.value[0]?.createdAt;
});

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
    const params: any = {
      page: page.value + 1,
      'order[createdAt]': 'desc',
    };
    const response = await httpAuthGet<HydraResponse<Message>>(url.value, params, { cache: false });
    total.value = response['hydra:totalItems'];
    page.value = page.value + 1;

    // Calculate the scroll position before adding new messages
    const prevScrollTop = chat.value.scrollTop;

    messages.value = [...messages.value, ...response['hydra:member']];

    // Wait for the next render to calculate new scroll position
    await nextTick();

    // Calculate the scroll position difference after adding new messages
    const scrollTopDiff = chat.value.scrollTop - prevScrollTop;

    chat.value.scrollTop = chat.value.scrollHeight - scrollTopDiff;
  } catch(error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
}

const loadNew = async () => {
  try {
    loading.value = true;
    const params: any = {
      'order[createdAt]': 'asc',
    };
    if (latestMessageDate.value) {
      params['createdAt[strictly_after]'] = latestMessageDate.value;
    }
    const response = await httpAuthGet<HydraResponse<Message>>(url.value, params, { cache: false });
    messages.value = [...messages.value, ...response['hydra:member']];
  } catch(error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
}

const handleScroll = async () => {
  if (chat.value && !loading.value) {
    if (chat.value.scrollTop < 600 && messages.value.length < total.value) {
      await loadMore();
    }
  }
}

onMounted(async () => {
  await load();
  scrollToBottom();
  if (props.live) {
    liveReloadInterval.value = setInterval(async () => {
      //await loadNew();
    }, 3000);
  } else {
    if (liveReloadInterval.value) {
      clearInterval(liveReloadInterval.value);
    }
  }
});

onBeforeUnmount(() => {
  if (liveReloadInterval.value) {
    clearInterval(liveReloadInterval.value);
  }
});

const scrollToBottom = (): void => {
  if (chat.value) {
    chat.value.scrollTop = chat.value.scrollHeight;
  }
}

</script>

<style scoped lang="postcss">
.message-viewer {
  @apply flex;
  @apply w-full;
  @apply bg-gray-950 text-white;
  @apply p-4;
  @apply border border-gray-900 rounded-lg;
  @apply h-full max-h-[600px];
  @apply overflow-hidden;
}
.message-viewer-wrapper {
  @apply relative;
  @apply flex flex-col items-start gap-4;
  @apply w-full;
  @apply overflow-y-scroll;
}
.loader {
  @apply sticky top-1 right-1;
  @apply w-full;
  @apply text-right;
  @apply py-1 px-2;
}
.message {
  @apply relative;
  @apply bg-gray-800;
  @apply flex-grow-0;
  @apply pr-16 pl-4;
  @apply py-2;
  @apply rounded-md;
  @apply font-light;
  @apply w-auto max-w-[600px];

  &.highlight {
    @apply bg-primary-dark;
  }

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
    @apply text-xs leading-tight;
    @apply flex flex-col items-end;
  }
}
</style>
