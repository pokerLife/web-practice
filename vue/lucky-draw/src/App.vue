<template>
  <div id="app">
    <my-button size="lg"></my-button>
  </div>
</template>

<script>
import { Component, Vue } from "vue-property-decorator";
import Button from "@/components/Button.vue";

export default {
  components: {
    "my-button": Button
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
