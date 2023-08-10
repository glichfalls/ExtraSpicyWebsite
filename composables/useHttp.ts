import { showError } from '#app';
import { computed } from 'vue';
import { useRuntimeConfig } from '#imports';
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

  const getCache = (endpoint: string) => {
    if (window.sessionStorage.getItem(endpoint)) {
        return JSON.parse(window.sessionStorage.getItem(endpoint) as string);
    }
    return null;
  }

  const hasCache = (endpoint: string) => {
    return window.sessionStorage.getItem(endpoint) !== null;
  }

  const setCache = (endpoint: string, data: any) => {
    window.sessionStorage.setItem(endpoint, JSON.stringify(data));
  }

  const handle401 = () => {
    throw showError({
      statusCode: 401,
      statusMessage: 'auth token invalid'
    });
  };

  const headers = computed(() => {
    const values: any = {
      Accept: 'application/ld+json',
      'Content-Type': 'application/ld+json'
    };
    return values;
  });

  const get = async <T>(endpoint: string, data: any = undefined): Promise<T> => {
    const response = await $fetch<any>(endpoint, {
      baseURL: config.public.apiUrl,
      params: data,
      method: 'GET',
      headers: headers.value
    })
      .catch((error) => {
        throw error;
      });

    return response;
  }

  const httpAuthGet = async <T>(endpoint: string, data: any = undefined, options: HttpFetchOptions = {}): Promise<T> => {
    const authGetHeaders: any = headers.value;
    if (hasCache(endpoint)) {
      return getCache(endpoint);
    }
    if (auth.token) {
      authGetHeaders.Authorization = `Bearer ${auth.token}`;
    }
    if (options.token !== undefined) {
      authGetHeaders.Authorization = `Bearer ${options.token}`;
    }

    const response = await $fetch<T>(endpoint, {
      baseURL: config.public.apiUrl,
      params: data,
      method: 'GET',
      headers: authGetHeaders
    })
      .catch((error) => {
        if (error?.response?.status === 401) {
          handle401();
        }
        throw error;
      });

    setCache(endpoint, response);

    return response;
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

    return $fetch<T>(url, {
      baseURL: config.public.apiUrl,
      method: 'POST',
      body: data,
      headers: postHeaders
    })
      .catch((error) => {
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

    return $fetch(url, {
      baseURL: config.public.apiUrl,
      method: 'PUT',
      body: data,
      headers: putHeaders
    });
  };

  const httpDelete = (url: string) => {
    const deleteHeaders: any = headers.value;
    if (auth.token) {
      deleteHeaders.Authorization = `Bearer ${auth.token}`;
    }

    return $fetch(url, {
      baseURL: config.public.apiUrl,
      method: 'DELETE',
      headers: deleteHeaders
    });
  };
  return {
    get,
    httpAuthGet,
    httpPost,
    httpPut,
    httpDelete
  };
};
