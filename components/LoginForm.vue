<template>
  <div class="">
    <form-kit type="form" submit-label="Login" @submit="submit">
      <form-kit type="text" name="username" label="username" />
      <form-kit type="password" name="password" label="password" />
    </form-kit>
  </div>
</template>

<script setup lang="js">

const { login } = useAuthMethods();

const submit = (form) => {
  login(form.username, form.password);
};
</script>
