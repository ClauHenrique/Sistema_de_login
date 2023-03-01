<template>
  <div class="container form">
    <Form />
  </div>
</template>

<style scoped>
.form {
  margin-top: 2rem;
}
</style>

<script>
  import Form from "../components/Form.vue";

  export default {
    name: "login",
    components: {
      Form,
    }
  }
</script>