<template>
  <card>
    <template #title>
      Edit {{ item?.name }}
    </template>
    <template #content>
      <effect-form v-if="item" :input="item" />
    </template>
  </card>
</template>

<script setup lang="ts">
import Card from 'primevue/card';
import EffectForm from '~/components/form/EffectForm.vue';
import { Effect } from '~/contract/entity';

const { getById } = useEntity('effects');
const route = useRoute();

const item = ref<Effect|null>(null);

const load = async () => {
  item.value = await getById(route.params.id);
};

await load();

</script>
