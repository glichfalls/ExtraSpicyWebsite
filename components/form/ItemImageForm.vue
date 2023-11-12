<template>
  <div class="flex flex-col items-start gap-2 w-full">
    <h3 class="text-lg font-bold">NFT Image</h3>
    <img v-if="imageUrl" :src="imageUrl" class="h-80 my-3" @error="imageSrcError = true;" />
    <prime-file-upload
        v-else
        :multiple="false"
        :customUpload="true"
        name="image"
        accept="image/*"
        @uploader="uploader"
    >
      <template #empty>
        <p>Drag and drop the image here to upload.</p>
      </template>
    </prime-file-upload>
  </div>
</template>

<script setup lang="ts">
import PrimeFileUpload, { FileUploadUploaderEvent } from 'primevue/fileupload';

const { httpPost } = useHttp();
const config = useRuntimeConfig();

const emit = defineEmits(['upload:success']);

const props = defineProps({
  input: {
    type: Object,
    default: null,
  },
});

const imageSrcError = ref(false);
const imageUrl = computed(() => {
  if (props.input?.imagePublicPath && !imageSrcError.value) {
    return `${config.public.apiUrl}/${props.input.imagePublicPath}`;
  }
  return null;
});

const uploader = async (event: FileUploadUploaderEvent) => {
  try {
    console.log(event);
    const data = new FormData();
    data.append('image', event.files[0]);
    const response = await httpPost<string>(`/nft/${props.input.id}/upload`, data);
    emit('upload:success', response);
    if (imageSrcError.value) {
      imageSrcError.value = false;
    }
  } catch (err) {
    console.log(err);
  }
};

</script>
