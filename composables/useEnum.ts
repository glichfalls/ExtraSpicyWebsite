import { ItemRarity } from '~/contract/enum';

export const useEnum = () => {
  const { httpAuthGet } = useHttp();

  const rarities = reactive<{
    items: Array<ItemRarity>;
    loading: boolean
  }>({
    loading: false,
    items: [],
  });

  onMounted(async () => {
    console.log('useEnum onMounted');
    if (rarities.items.length === 0) {
      console.log('useEnum onMounted loading');
      rarities.loading = true;
      rarities.items = await httpAuthGet<Array<ItemRarity>>('/enum/rarity');
      rarities.loading = false;
    }
  });

  return {
    rarities,
  };
}
