<template>
  <div>
    <h1>{{ chat?.name }}</h1>

    <div class="labels">
      <span class="label">
        passive Ehre {{ chat?.config.passiveHonorEnabled ? 'enabled' : 'disabled' }}
      </span>
      <span class="label">
        {{ chat?.config?.passiveHonorAmount }} Ehre per hour
      </span>
    </div>

    <div class="flex sm:flex-col-reverse lg:flex-row mt-3 gap-4">
      <div class="w-full md:w-50">
        <message-viewer v-if="chat" :chatId="chat.id" />
      </div>
      <div class="w-full md:w-25">
        <h2>Member List</h2>
        <v-list item-props lines="two">
          <v-list-item
              v-if="chat?.users"
              v-for="user in chat.users"
              :key="user.id"
              :title="user.firstName || user.name"
              :subtitle="user.name"
          />
        </v-list>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">

import { Chat } from '~/contract/entity';
import { HydraResponseSingle } from '~/contract/api';
import MessageViewer from '~/components/entity/message/MessageViewer.vue';

const route = useRoute();
const { httpAuthGet } = useHttp();

const chat = ref<Chat|null>(null);

const loadChat = async () => {
  chat.value = await httpAuthGet<HydraResponseSingle<Chat>>(`/api/chats/${route.params.id}`);
}

onMounted(() => {
  loadChat();
});

</script>

<style scoped lang="scss">
.labels {
  @apply flex gap-2;
  @apply my-4;
}
.label {
  @apply text-white;
  @apply py-1 px-3 rounded-full;
  @apply text-xs;
}
</style>
