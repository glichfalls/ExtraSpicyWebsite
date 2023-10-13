<template>
  <div class="mt-4">

    <form class="flex flex-col justify-start items-start w-full" @submit.prevent="submit">
      <div class="w-full flex flex-col gap-2">
        <label for="name">Username</label>
        <input-text v-model="username" placeholder="Telegram username" />
        <small id="username-help">Enter your Telegram username to login.</small>
      </div>
      <Button
          type="submit"
          label="Submit"
          v-model:loading="loading"
          loading-icon="pi pi-spin pi-spinner mr-2"
          class="mt-4"
      />
    </form>

    <div v-if="hasHttpError" class="pt-4 mt-4 border-t border-gray-700">
      <inline-message severity="error">
        Something went wrong. Please try again later.
      </inline-message>
    </div>

    <div v-if="showBotQrCode" class="pt-4 mt-4 border-t border-gray-700">
      <div class="flex justify-between items-start gap-4">
        <vue-qr text="https://t.me/ExtraSpicySpamBot" :size="100" :margin="0" :correct-level="0" color-dark="#AAAAAA" color-light="transparent"/>
        <div class="">
          <div class="text-sm">
            We cant find your username.
            Start a Chat with <telegram-logo /> <a class="text-primary" target="_blank" href="https://t.me/ExtraSpicySpamBot">the bot</a> and send him a message.
          </div>
          <div class="mt-2" v-if="loading">
            <i class="pi pi-spin pi-spinner"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import vueQr from "vue-qr/src/packages/vue-qr.vue";
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import InlineMessage from 'primevue/inlinemessage';
import TelegramLogo from '~/components/TelegramLogo.vue';

const emit = defineEmits(['submit']);

const { httpPost } = useHttp();

const devLink = ref<string|null>(null);
const hasHttpError = ref(false);
const showBotQrCode = ref(false);
const linkSent = ref(false);
const interval = ref<any>(null);
const username = ref<string|null>(null);
const loading = ref(false);

const submit = async () => {
  interval.value = null;
  await trySendLink();
  if (!linkSent.value && !hasHttpError.value) {
    interval.value = setInterval(async () => {
      await trySendLink();
      if (linkSent.value) {
        clearInterval(interval.value);
        linkSent.value = false;
      }
    }, 5_000);
  } else {
    clearInterval(interval.value);
  }
};

const trySendLink = async () => {
  try {
    if (!username.value) {
      return;
    }
    loading.value = true;
    hasHttpError.value = false;
    const response = await httpPost<{ success: boolean; link: string|null }>('/auth/telegram', {
      name: username.value,
    });
    if (response.success) {
      showBotQrCode.value = false;
      linkSent.value = true;
      emit('submit', response.link);
    }
    if (response.success && response?.link) {
      // dev only, because telegram doesn't allow localhost in links
      devLink.value = response.link;
    }
  } catch (error: any) {
    linkSent.value = false;
    if (error?.status === 404) {
      showBotQrCode.value = true;
      hasHttpError.value = false;
    } else {
      showBotQrCode.value = false;
      hasHttpError.value = true;
    }
  } finally {
    loading.value = false;
  }
}

</script>
