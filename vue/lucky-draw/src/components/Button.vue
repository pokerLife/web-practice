<template>
  <button :class="'button button_' + size" :disabled="disabled">
    我是按鈕
  </button>
</template>

<script>
function has(value, defaultList) {
  var hasVal = defaultList.find(item => value === value);
  if (!hasVal) return false;
  return true;
}
import Vue from "vue";
export default {
  props: {
    size: {
      validator(value) {
        var valList = ["sm", "lg"];
        var hasVal = valList.some(item => value === item);
        if (hasVal) return true;
        return false;
      },
      default: "default"
    },
    disabled: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style scoped>
.button_sm {
  height: 20px;
  width: 50px;
}
.button_lg {
  height: 40px;
  width: 80px;
}
.button_defalut {
  height: 35px;
  width: 75px;
}
</style>
