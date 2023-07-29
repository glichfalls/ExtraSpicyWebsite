import { useRuntimeConfig } from '#build/imports';
import { useAuth } from '~/store/auth';

export const useApiFetch = <T>(url: string) => {

  const config = useRuntimeConfig();
  const auth = useAuth();

  const headers = computed(() => {
    const values: any = {
      Accept: 'application/ld+json',
      'Content-Type': 'application/ld+json'
    };
    return values;
  });

  const authGetHeaders: any = headers.value;

  if (auth.token) {
    authGetHeaders.Authorization = `Bearer ${auth.token}`;
  }

  return useFetch<T>(url, {
    baseURL: config.public.apiUrl,
    headers: authGetHeaders,
  });
}
