<template>
  <div class="w-full pt-6">
    <span class="p-float-label">
      <multi-select
          v-model="value"
          :options="chats"
          id="chat"
          optionLabel="name"
          placeholder="Select Chat"
          :loading="loading"
          :selection-limit="limit"
          :show-toggle-all="false"
          filter
          class="w-full md:w-20rem"
      />
      <label id="chat" for="">{{ label }}</label>
    </span>
  </div>
</template>

<script setup lang="ts">
import MultiSelect from 'primevue/multiselect';
import { Chat } from '~/contract/entity';

const emit = defineEmits(['update:modelValue']);

const props = defineProps<{
  modelValue: Chat[];
  label: string;
  limit: number;
}>();

const value = ref(props.modelValue);
const loading = ref(true);

const { getAll } = useEntity<Chat>('chats');

const chats = ref<Chat[]>(await getAll());

loading.value = false;

watch(value, (newValue) => {
  emit('update:modelValue', newValue);
});

</script>
