<template>
  <div class="flex flex-col items-start gap-2 w-full">
    <h3 class="text-lg font-bold">Edit details</h3>
    <span class="p-float-label mt-6 w-full">
      <prime-input v-model="formData.name" id="name" class="w-full" />
      <label for="name">Name</label>
    </span>
    <span class="p-float-label mt-6 w-full">
      <prime-textarea v-model="formData.description" id="description" class="w-full" />
      <label for="description">Effect Description</label>
    </span>
    <div class="w-full grid grid-cols-4 gap-6">
      <effect-type-select v-model="formData.type" label="Type" />
      <span class="p-float-label mt-6 w-full">
        <prime-number v-model="formData.priority" :max-fraction-digits="0" inputId="priority" class="w-full" />
        <label for="priority">Priority</label>
        <span class="text-sm text-gray-500">Higher priority effects are applied first</span>
      </span>
      <operator-select v-model="formData.operator" label="Operator" />
      <span class="p-float-label mt-6 w-full">
        <prime-number v-model="formData.magnitude" :min-fraction-digits="2" :max-fraction-digits="3" inputId="magnitude" class="w-full" />
        <label for="magnitude">Magnitude</label>
      </span>
    </div>
    <prime-button type="submit" label="Save" class="mt-4" :loading="loading" @click.prevent="submit" />
  </div>
</template>
<script setup lang="ts">
import PrimeButton from 'primevue/button';
import PrimeNumber from 'primevue/inputnumber';
import PrimeTextarea from 'primevue/textarea';
import PrimeInput from 'primevue/inputtext';
import EffectTypeSelect from '~/components/form/EffectTypeSelect.vue';
import OperatorSelect from '~/components/form/OperatorSelect.vue';
import PrioritySelect from '~/components/form/PrioritySelect.vue';

const props = defineProps({
  input: {
    type: Object,
    default: null,
  },
});

const { httpPost, httpPut } = useHttp();
const router = useRouter();

const loading = ref(false);

const formData: {
  name: string;
  description: string;
  priority: number;
  magnitude: number;
  operator: string;
  type: string;
} = reactive({
  name: '',
  description: '',
  priority: 100,
  magnitude: 1,
  operator: '*',
  type: '',
});

if (props.input) {
  formData.name = props.input.name;
  formData.description = props.input.description;
  formData.priority = props.input.priority;
  formData.magnitude = props.input.magnitude;
  formData.operator = props.input.operator;
  formData.type = props.input.type;
}

const update = async (id: string) => {
  try {
    loading.value = true;
    await httpPut(`/nft/effects/${id}`, formData);
  } catch (err) {
    console.log(err);
  } finally {
    loading.value = false;
  }
}

const create = async () => {
  try {
    loading.value = true;
    const id = await httpPost(`/nft/effects`, formData);
    await router.push(`/collectable/effects/${id}`);
  } catch (err) {
    console.log(err);
  } finally {
    loading.value = false;
  }
}

const submit = async () => {
  if (props.input) {
    await update(props.input.id);
  } else {
    await create();
  }
};

</script>
