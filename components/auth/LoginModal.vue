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
  </TransitionRoot>
</template>

<script setup>
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  DialogDescription,
  TransitionRoot
} from '@headlessui/vue';
import LoginForm from '~/components/auth/LoginForm.vue';

const props = defineProps({
  open: Boolean,
});

const isOpen = ref(true);

function setIsOpen (value) {
  isOpen.value = value;
}
</script>
