import { useCookie } from '#app';
import { useHttp } from '~/composables/useHttp';
import { useAuth, User } from '~/store/auth';

export const useAuthMethods = () => {
  const auth = useAuth();
  const http = useHttp();

  const login = async (email: string, password: string): Promise<void> => {
    const response: any = await http.httpPost('/login', {
      username: email,
      password,
    });

    if (response.token) {
      const cookie = useCookie<{ user: User; token: string }>('auth', {
        sameSite: 'lax',
      });
      const user = await http.httpAuthGet<User>('/users/current', undefined, { token: response.token });
      cookie.value = response;
      auth.token = response.token;
      auth.user = user;
    }
  };

  const logout = (): void => {
    const cookie = useCookie<{ user: User; token: string }|null>('auth', {
      sameSite: 'lax',
    });
    cookie.value = null;
    auth.token = null;
    auth.user = null;
  };

  const fetchUser = async (): Promise<void> => {
    const cookie = useCookie<{ user: User; token: string }>('auth', {
      sameSite: 'lax',
    });
    if (cookie.value) {
      try {
        auth.user = await http.httpAuthGet('/users/current', undefined, {
          token: cookie.value?.token,
        });
        auth.token = cookie.value.token;
      } catch (e) {
        logout();
        throw e;
      }
    }
  };

  return {
    fetchUser,
    login,
    logout,
  };
};
