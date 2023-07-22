<template>
  <div>
    <Dialog :static="true" :open="false" class="relative z-50" @close="setIsOpen">
      <div class="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel class="w-full max-w-sm rounded border border-gray-700 bg-gray-800 text-gray-400 rounded-lg p-4">
          <DialogTitle>
            <span class="text-lg font-bold text-white block mb-2">
              Telegram Login Required
            </span>
          </DialogTitle>
          <DialogDescription class="text-gray-400 text-sm">
            Share your Telegram username to receive a secure login link, ensuring quick and effortless access to your account
          </DialogDescription>

          <login-form @submit="setIsOpen(false)" />
        </DialogPanel>
      </div>
    </Dialog>
  </div>
</template>

<script setup>
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  DialogDescription
} from '@headlessui/vue';
import LoginForm from '~/components/auth/LoginForm.vue';

const isOpen = ref(false);

function setIsOpen (value) {
  isOpen.value = value;
}
</script>
