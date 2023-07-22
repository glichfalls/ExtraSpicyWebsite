<template>
  <div>
    <div class="w-full h-full flex justify-center items-center">
      Success!
    </div>
  </div>
</template>

<script setup lang="js">

import { useAuthMethods } from '~/composables/useAuthMethods';
import { useAuth } from '~/store/auth';

const route = useRoute();
const router = useRouter();
const { tokenAuth } = useAuthMethods();

const { token } = route.query;

await tokenAuth(token);
await router.push('/');

</script>
