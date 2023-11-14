<template>
  <Dialog v-model:visible="isOpen" modal :closable="false" class="min-w-[400px] max-w-[600px] w-2/3 lg:w-4 xl:w-3">
    <template #header>
      <span class="text-lg font-semibold text-white">
        <span v-if="submitted">Telegram Login Link sent</span>
        <span v-else>Telegram Login Required</span>
      </span>
    </template>
    <div class="w-full flex flex-col">
      <div class="w-2/3" v-if="submitted">
        We sent you a link to your Telegram account. Click on it to login.
        <span class="block mt-4" v-if="link">
          <a class="py-1 px-2 rounded text-gray-100 text-xs" :href="link">Open Link</a>
        </span>
      </div>
      <img src="/branding/logo-sm.png" alt="Extra Spicy Spam" class="absolute w-32 right-2 top-2" />
      <login-form v-if="!submitted" @submit="submit" />
    </div>
  </Dialog>
</template>

<script setup lang="ts">
import LoginForm from '~/components/auth/LoginForm.vue';

const submitted = ref(false);
const link = ref<string|null>(null);
const isOpen = ref<boolean>(true);

function submit(devLink: string|null) {
  link.value = devLink;
  submitted.value = true;
}
</script>
