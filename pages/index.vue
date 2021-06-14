<template>
  <div>
    <categories-navbar></categories-navbar>
    <slider></slider>
    <intro-join></intro-join>
    <latest-posts></latest-posts>
    <shop-by-category></shop-by-category>
    <join-invite></join-invite>
  </div>
</template>
<script>
export default {
  auth: false,
  name: "Index",
  beforeDestroy() {
    // const vm = this;
    // window.removeEventListener("resize", vm.detectWindowWidthForFixedHeader);
    // window.removeEventListener("resize", vm.detectWindowWidthForFixedFooter);
    // window.removeEventListener("scroll", vm.detectWindowWidthForFixedHeader);
    // window.removeEventListener("scroll", vm.detectWindowWidthForFixedFooter);
  },
};
</script>
