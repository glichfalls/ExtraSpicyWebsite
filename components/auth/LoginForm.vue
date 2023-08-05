<template>
  <div class="mt-4">
    <form-kit v-if="!linkSent" type="form" @submit="submit" submit-label="Request Link">
      <form-kit type="text" name="name" label="Telegram Username" validation="required" class="mb-4" />
    </form-kit>

    <div v-if="hasHttpError" class="pt-4 mt-4 border-t border-gray-700">
      <div class="text-sm text-red">
        Something went wrong. Please try again later.
      </div>
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
            <icon name="svg-spinners:270-ring-with-bg" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import vueQr from "vue-qr/src/packages/vue-qr.vue";
import TelegramLogo from '~/components/TelegramLogo.vue';

const emit = defineEmits(['submit']);

const { httpPost } = useHttp();

const devLink = ref<string|null>(null);
const hasHttpError = ref(false);
const showBotQrCode = ref(false);
const linkSent = ref(false);
const interval = ref<any>(null);
const loading = ref(false);

const submit = async (form: { name: string }) => {
  interval.value = null;
  await trySendLink(form.name);
  if (!linkSent.value && !hasHttpError.value) {
    interval.value = setInterval(async () => {
      await trySendLink(form.name);
      if (linkSent.value) {
        clearInterval(interval.value);
        linkSent.value = false;
      }
    }, 5_000);
  } else {
    clearInterval(interval.value);
  }
};

const trySendLink = async (name: string) => {
  try {
    loading.value = true;
    hasHttpError.value = false;
    const response = await httpPost<{ success: boolean; link: string|null }>('/auth/telegram', {
      name,
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
  }
}

</script>
