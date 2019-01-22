<template>
  <div id="app">
    <Map lat="28.6879500000" lng="115.9613880000"></Map>
  </div>
</template>

<script>
import Map from "./components/Map.vue";
export default {
  name: "app",
  components: {
    Map
  }
};
</script>

<style>
  body {
    margin: 0;
    padding: 0;
  }
</style>
