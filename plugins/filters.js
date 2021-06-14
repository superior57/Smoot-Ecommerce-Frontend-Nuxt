import Vue from "vue";

Vue.filter("truncate", function (text, length, suffix) {
  if (text.length > length) {
    return text.substring(0, length) + suffix;
  }
  return text;
});
