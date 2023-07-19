import { defineStore } from 'pinia';

export type User = {
  id: string;
  name: string;
  roles: string[];
};

export type AuthState = {
  token: string|null;
  user: User|null;
};

export const useAuth = defineStore('auth', {
  state: (): AuthState => ({
    token: null,
    user: null,
  }),
  getters: {
    isLoggedIn: (state) => state.token !== null,
    isAdmin(): boolean {
      return !!Object.values(this.user?.roles ?? [])?.includes('ROLE_ADMIN');
    },
  },
});
