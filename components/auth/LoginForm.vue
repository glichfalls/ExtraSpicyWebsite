<template>
  <div class="mt-4">
    <form-kit type="form" @submit="submit">
      <form-kit type="text" name="name" label="Telegram Username" required />
      <div class="flex justify-start items-center gap-8">
        <form-kit type="submit" label="Request Link" class="mb-0" />
        <div class="" v-if="loading">
          <icon name="svg-spinners:270-ring" />
        </div>
      </div>
    </form-kit>

    <div v-if="devLink">
      <a class="bg-tertiary py-1 px-2 rounded text-gray-900 text-xs" :href="devLink" target="_blank">Open Link</a>
    </div>

    <div v-if="showBotQrCode" class="flex justify-between items-start gap-4 pt-4 border-t border-gray-700">
      <vue-qr text="https://t.me/ExtraSpicySpamBot" :size="100" :margin="0" :correct-level="0" color-dark="#AAAAAA" color-light="transparent"/>
      <div class="text-sm">
        We cant find your username.
        Start a Chat with <a target="_blank" href="https://t.me/ExtraSpicySpamBot">the bot</a> and send him a message
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import vueQr from "vue-qr/src/packages/vue-qr.vue";

const emit = defineEmits(['submit']);

const { httpPost } = useHttp();

const devLink = ref<string|null>(null);
const showBotQrCode = ref(false);
const linkSent = ref(false);
const interval = ref<any>(null);
const loading = ref(false);

const submit = async (form: { name: string }) => {
  await trySendLink(form.name);
  if (!linkSent.value) {
    interval.value = setInterval(async () => {
      loading.value = true;
      await trySendLink(form.name);
      loading.value = false;
      if (linkSent.value) {
        clearInterval(interval.value);
      }
    }, 5000);
  }
};

const trySendLink = async (name: string) => {
  try {
    const response = await httpPost<{ success: boolean; link: string|null }>('/auth/telegram', {
      name,
    });
    console.log(response, response.success);
    if (response.success) {
      showBotQrCode.value = false;
      linkSent.value = true;
    }
    if (response.success && response?.link) {
      // dev only, because telegram doesn't allow localhost in links
      devLink.value = response.link;
    }
  } catch (error) {
    console.error(error);
    linkSent.value = false;
    showBotQrCode.value = true;
  }
}

</script>
