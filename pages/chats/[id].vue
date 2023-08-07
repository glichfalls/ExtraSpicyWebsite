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

    <div class="flex mt-3 gap-4">
      <message-viewer :chatId="id" live class="w-1/2" />
      <div class="w-1/2">
        <h2>Member List</h2>
        <ul>
          <li v-for="user in chat?.users" :key="user.id">
            <span>{{ user.firstName }}</span>
            <span v-if="user.name">({{ user.name }})</span>
          </li>
        </ul>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">

import { Chat } from '~/contract/entity';
import { HydraResponse } from '~/contract/api';
import MessageViewer from '~/components/entity/message/MessageViewer.vue';

const route = useRoute();
const { httpAuthGet } = useHttp();

const id = route.params.id;

const { data: chat, refresh } = useApiFetch<Chat>(`/api/chats/${id}`);

</script>

<style scoped lang="scss">
.labels {
  @apply flex gap-2;
  @apply my-4;
}
.label {
  @apply bg-primary text-white;
  @apply py-1 px-3 rounded-full;
  @apply text-xs;
}
</style>
