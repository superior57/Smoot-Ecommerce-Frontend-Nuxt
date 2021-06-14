<template>
  <div class="inline-navigater cursor-pointer" @click="goBack(navigateFrom)">
    <i class="fa fa fa-angle-left" aria-hidden="true"></i>
    <span class="label">
      {{ navigationLabel }}
    </span>
  </div>
</template>
<script>
export default {
  name: "InlineNavigation",
  props: {
    navigateFrom: {
      type: String,
      required: false,
      default: "",
    },
    navigationLabel: {
      type: String,
      required: false,
      default: "Back",
    },
  },
  data() {
    return {};
  },
  methods: {
    goBack(from) {
      if (from) {
        if (from === "chat") {
          this.$emit("state", false);
        }
      } else {
        this.$nuxt.$router.go(-1);
      }
    },
  },
};
</script>
