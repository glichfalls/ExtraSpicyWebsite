<template>
  <div>
    <Button type="button"  icon="pi pi-ellipsis-v" size="small" @click="toggle" plain rounded text />
    <Menu ref="menu" :model="items" :popup="true" />
  </div>
</template>

<script setup lang="ts">
import Menu from 'primevue/menu';
import Button from 'primevue/button';
import { MenuItem } from 'primevue/menuitem';

const props = defineProps<{
  data: any;
  items: MenuItem[];
}>();

const menu = ref();

const toggle = (event: any) => {
  menu.value.toggle(event, props.data);
};

</script>
