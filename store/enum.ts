import { ItemRarity } from '~/contract/enum';
import { defineStore } from 'pinia';

export const useEnum = defineStore('enum', () => {
  const { httpAuthGet } = useHttp();

  const rarities = reactive<{
    items: Array<ItemRarity>;
    loading: boolean
  }>({
    loading: false,
    items: [],
  });

  onMounted(async () => {
    if (rarities.items.length === 0) {
      rarities.loading = true;
      rarities.items = await httpAuthGet<Array<ItemRarity>>('/enum/rarity');
      rarities.loading = false;
    }
  });

  return {
    rarities,
  };
});
