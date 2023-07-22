import { useAuth } from '~/store/auth';

export default defineNuxtRouteMiddleware(async (to) => {
  const auth = useAuth();
  const { fetchUser } = useAuthMethods();

  if (auth.isLoggedIn) {
    return;
  }

  await fetchUser();

  if (auth.isLoggedIn) {
    return;
  }

  if (to.path !== '/' && to.path !== '/auth') {
    return navigateTo('/');
  }
});
