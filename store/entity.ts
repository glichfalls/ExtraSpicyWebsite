import { HydraEntity } from '~/contract/entity';
import { defineStore } from 'pinia';

export const useEntity = defineStore('entity',  () =>{

  const { httpAuthGet } = useHttp();

  const cache = ref<HydraEntity[]>([]);

  const getById = async (id: string): Promise<HydraEntity|null> => {
    try {
      const entity = cache.value.find((item: HydraEntity) => item.id === id);
      if (entity) {
        return entity;
      }
      const data = await httpAuthGet<HydraEntity>(`/${name}/${id}`);
      cache.value.push(data);
      return data;
    } catch (error) {
      return null;
    }
  }

  return {
    getById,
  }
});
