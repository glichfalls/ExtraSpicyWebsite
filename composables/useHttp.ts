import { showError } from '#app';
import { useRuntimeConfig } from '#imports';
import { computed } from 'vue';
import { useAuth } from '~/store/auth';

interface HttpFetchOptions {
    locale?: string | null;
    token?: string;
    normalizer?: (entity: any) => any;
    contentType?: string;
    accept?: string;
}

export const useHttp = () => {
  const config = useRuntimeConfig();
  const auth = useAuth();

  const handle401 = () => {
    throw showError({
      statusCode: 401,
      statusMessage: 'auth token invalid',
    });
  };

  const headers = computed(() => {
    const values: any = {
      Accept: 'application/ld+json',
      'Content-Type': 'application/ld+json',
    };
    return values;
  });

  const get = <T>(endpoint: string, data: any = undefined): Promise<T> =>
    // eslint-disable-next-line no-undef,implicit-arrow-linebreak
    $fetch<any>(endpoint, {
      baseURL: config.public.apiUrl,
      params: data,
      method: 'GET',
      headers: headers.value,
    })
      .catch(async (error) => {
        throw error;
      });

  const httpAuthGet = <T>(endpoint: string, data: any = undefined, options: HttpFetchOptions = {}): Promise<T> => {
    const authGetHeaders: any = headers.value;

    if (auth.token) {
      authGetHeaders.Authorization = `Bearer ${auth.token}`;
    }
    if (options.token !== undefined) {
      authGetHeaders.Authorization = `Bearer ${options.token}`;
    }
    // eslint-disable-next-line no-undef
    return $fetch<T>(endpoint, {
      baseURL: config.public.apiUrl,
      params: data,
      method: 'GET',
      headers: authGetHeaders,
    })
      .catch(async (error) => {
        if (error?.response?.status === 401) {
          handle401();
        }
        throw error;
      });
  };

  const httpPost = <T>(url: string, data: any = undefined): Promise<T> => {
    const postHeaders: any = headers.value;

    // If FormData: Do *not* set a header at all, otherwise $fetch does not handle the boundary properly.
    if (data instanceof FormData) {
      delete postHeaders['Content-Type'];
    }

    if (auth.token) {
      postHeaders.Authorization = `Bearer ${auth.token}`;
    }

    // eslint-disable-next-line no-undef
    return $fetch<T>(url, {
      baseURL: config.public.apiUrl,
      method: 'POST',
      body: data,
      headers: postHeaders,
    })
      .catch(async (error) => {
        if (error?.response?.status === 401) {
          handle401();
        }
        throw error;
      });
  };

  const httpPut = <T>(url: string, data: any): Promise<T> => {
    const putHeaders: any = headers.value;
    if (auth.token) {
      putHeaders.Authorization = `Bearer ${auth.token}`;
    }
    // eslint-disable-next-line no-undef
    return $fetch(url, {
      baseURL: config.public.apiUrl,
      method: 'PUT',
      body: data,
      headers: putHeaders,
    });
  };

  const httpDelete = (url: string) => {
    const deleteHeaders: any = headers.value;
    if (auth.token) {
      deleteHeaders.Authorization = `Bearer ${auth.token}`;
    }

    // eslint-disable-next-line no-undef
    return $fetch(url, {
      baseURL: config.public.apiUrl,
      method: 'DELETE',
      headers: deleteHeaders,
    });
  };
  return {
    get,
    httpAuthGet,
    httpPost,
    httpPut,
    httpDelete,
  };
};
