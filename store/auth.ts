import { defineStore } from 'pinia';
import { HydraEntity } from '~/contract/entity';

export interface User extends HydraEntity {
  id: string;
  name: string;
  firstName: string|null;
  lastName: string|null;
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
