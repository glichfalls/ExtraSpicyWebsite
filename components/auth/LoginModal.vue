<template>
  <Dialog v-model:visible="isOpen" modal header="Authentication" :closable="false">
    <div>
      <span class="text-lg font-bold text-white block mb-2">
        <span v-if="submitted">Telegram Login Link sent</span>
        <span v-else>Telegram Login Required</span>
      </span>
      <span v-if="submitted">
        We sent you a link to your Telegram account. Click on it to login.
        <span class="block mt-4" v-if="link">
          <a class="bg-primary py-1 px-2 rounded text-gray-100 text-xs" :href="link">Open Link</a>
        </span>
      </span>

      <login-form v-if="!submitted" @submit="submit" />
    </div>
  </Dialog>
</template>

<script setup lang="ts">
import Dialog from 'primevue/dialog';
import LoginForm from '~/components/auth/LoginForm.vue';

const submitted = ref(false);
const link = ref<string|null>(null);
const isOpen = ref<boolean>(true);

function submit(devLink: string|null) {
  link.value = devLink;
  submitted.value = true;
}
</script>
