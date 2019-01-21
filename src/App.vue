<template>
  <div id="app">
    <input type="text" name="" v-model="name">
    <div v-if="validation.$started && validation.$dirty">
      <h5 v-for="{message} in validation.$getErrors()">{{message}}</h5>
    </div>
  </div>
</template>

<script>

export default {
  name: 'app',
  components: {},
  data() {
    return {
      name: null,
      password: null,
      validation: {
        name: {required: true, email: true},
        password: {required: true},
      },
      // validation: this.$validate({
      //   name: {required: true},
      //   password: {required: true},
      // }),
    }
  },
  mounted() {
    // console.log(this.$validate({
    //   name: {required: true},
    //   password: {required: true},
    // }));
    this.validation = this.$validate(this.validation)
  },
}
</script>

<style>
#app {
}
</style>
