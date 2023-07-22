import { useAuth } from '~/store/auth';

export default defineNuxtRouteMiddleware(async (to) => {
  const auth = useAuth();
  console.log('test');
  const { fetchUser } = useAuthMethods();

  if (auth.isLoggedIn) {
    console.log('ok');
    return;
  }

  await fetchUser();

  if (auth.isLoggedIn) {
    console.log('ok 2');
    return;
  }

  if (to.path !== '/' && to.path !== '/auth') {
    return navigateTo('/');
  }
});
