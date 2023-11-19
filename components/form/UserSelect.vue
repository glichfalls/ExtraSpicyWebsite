<template>
  <div class="w-full pt-4">
    <span class="p-float-label">
      <multi-select
          v-model="value"
          :options="users"
          optionLabel="name"
          placeholder="Select User"
          :loading="loading"
          class="w-full md:w-20rem"
          display="chip"
          :show-toggle-all="false"
      >
        <template #option="{ option }">
          <div class="flex items-center h-full">
            <span>
              {{ option.name || option.firstName }}
            </span>
            <span v-if="option.name" class="ml-1">
              ({{ option.firstName }})
            </span>
          </div>
        </template>
      </multi-select>
      <label id="chat" for="">{{ label }}</label>
    </span>
  </div>
</template>

<script setup lang="ts">
import MultiSelect from 'primevue/multiselect';
import { User } from '~/store/auth';

const emit = defineEmits(['update:modelValue']);

const props = defineProps<{
  modelValue: User[];
  chatId?: string;
  label: string;
}>();

const value = ref(props.modelValue);
const loading = ref(true);

const { getAll } = useEntity<User>('users');

const filters = computed(() => {
  if (!props.chatId) {
    return {};
  }

  return { 'chats': props.chatId };
});

const users = ref<User[]>(await getAll(filters.value));

loading.value = false;

watch(value, (newValue) => {
  emit('update:modelValue', newValue);
});

watch(filters, async (newValue) => {
  users.value = await getAll(newValue);
  value.value = [];
});

</script>
