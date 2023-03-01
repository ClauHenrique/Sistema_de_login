<template>
  <div :class="{'alert alert-danger': isActive}" role="alert">{{msg}}</div>
</template>

<script>
    export default {
    name: "Message",
    props: {
        msg: String,
        isActive : Boolean
    },
    };
</script>
