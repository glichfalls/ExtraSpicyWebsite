<template>
  <div>
    Success! {{ auth.token }}
  </div>
</template>

<script setup lang="js">

import { useAuthMethods } from '~/composables/useAuthMethods';
import { useAuth } from '~/store/auth';

const route = useRoute();
const { tokenAuth } = useAuthMethods();
const auth = useAuth();

const { token } = route.query;

tokenAuth(token);

</script>
