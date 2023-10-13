import { HydraResponse, HydraResponseSingle } from '~/contract/api';

export const useEntity = <T>(name: string) => {

  const { httpAuthGet } = useHttp();

  const getById = async (id: string): Promise<T> => httpAuthGet<HydraResponseSingle<T>>(`/api/${name}/${id}`);

  const getAll: (filter?: {[key: string]: any}) => Promise<T[]> = async (filter) => {
    console.log('filter', filter);
    const response = await httpAuthGet<HydraResponse<T>>(`/api/${name}`, filter);
    return response['hydra:member'];
  }

  return {
    getById,
    getAll,
  };
}
