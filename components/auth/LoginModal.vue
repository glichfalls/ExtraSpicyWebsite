<template>
  <TransitionRoot
      :show="isOpen"
      as="template"
      enter="duration-300 ease-out"
      enter-from="opacity-0"
      enter-to="opacity-100"
      leave="duration-200 ease-in"
      leave-from="opacity-100"
      leave-to="opacity-0"
  >
    <Dialog class="relative z-50">
      <div class="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div class="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel class="w-full max-w-sm rounded border border-gray-700 bg-gray-800 text-gray-400 rounded-lg p-4">
          <DialogTitle>
            <span class="text-lg font-bold text-white block mb-2">
              <span v-if="!submitted">Telegram Login Required</span>
              <span v-else>Telegram Login Link sent</span>
            </span>
          </DialogTitle>
          <DialogDescription class="text-gray-400 text-sm">
            <span v-if="!submitted">
               Share your Telegram username to receive a secure login link, ensuring quick and effortless access to your account
            </span>
            <span v-else>
              We sent you a link to your Telegram account. Click on it to login.

              <span class="block mt-4" v-if="link">
                <a class="bg-primary py-1 px-2 rounded text-gray-100 text-xs" :href="link">Open Link</a>
              </span>
            </span>
          </DialogDescription>

          <login-form v-if="!submitted" @submit="submit" />
        </DialogPanel>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup lang="ts">
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  DialogDescription,
  TransitionRoot
} from '@headlessui/vue';
import LoginForm from '~/components/auth/LoginForm.vue';

const submitted = ref(false);
const link = ref(null);
const isOpen = ref(true);

function submit(devLink: string|null) {
  link.value = devLink;
  submitted.value = true;
}
</script>
