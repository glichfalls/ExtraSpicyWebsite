<template>
  <div class="message-viewer">
    <div class="message-viewer-wrapper" ref="chat" :class="{ 'locked': loading }">
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
const page = ref<number>(0);
const total = ref<number>(0);
const prevScrollHeight = ref<number>(0);
const liveReloadInterval = ref<any>(null);

const { y, isScrolling, arrivedState } = useScroll(chat);
const { top } = toRefs(arrivedState);

const formatDate = (date: string): string => format(new Date(date), 'HH:mm:ss');
const formatChatDate = (date: string): string => format(new Date(date), 'd. MMM');

const reversedMessages = computed(() => messages.value.slice().reverse());

const url = computed(() => `/api/messages?chat.id=${props.chatId}`);

watch(top, () => {
  console.log('top', top.value);
  if (!loading.value && top.value) {
    loadMore();
  }
});

const latestMessageDate = computed(() => {
  return messages.value[0]?.createdAt;
});

const userDisplayName = (user: User) => {
  if (user.name) {
    return user.name;
  }
  return user.firstName;
}

const loadMore = async () => {
  try {
    loading.value = true;
    const params: any = {
      page: page.value + 1,
      'order[createdAt]': 'desc',
      'itemsPerPage': 10,
    };
    console.log(`load page more ${page.value + 1}`);
    const response = await httpAuthGet<HydraResponse<Message>>(url.value, params, { cache: false });
    total.value = response['hydra:totalItems'];
    page.value = page.value + 1;
    console.log(messages.value.map(m => m.createdAt));
    const data = response['hydra:member'];
    messages.value = [...data, ...messages.value];
    console.log(messages.value.map(m => m.createdAt));
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

onMounted(async () => {
  await loadMore();
  scrollToBottom();
  if (props.live) {
    liveReloadInterval.value = setInterval(async () => {
      await loadNew();
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
    console.log('scroll to bottom', chat.value.scrollHeight);
    y.value = chat.value.scrollHeight;
  }
}

</script>

<style scoped lang="postcss">
.message-viewer {
  @apply flex;
  @apply w-full;
  @apply bg-gray-950 text-white;
  @apply border border-gray-900 rounded-lg;
  @apply h-full max-h-[600px];
  @apply overflow-hidden;
}
.message-viewer-wrapper {
  @apply relative;
  @apply flex flex-col items-start gap-4;
  @apply w-full;
  @apply overflow-y-scroll;
  @apply p-4;

  &.locked {
    @apply overflow-hidden;
  }
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
