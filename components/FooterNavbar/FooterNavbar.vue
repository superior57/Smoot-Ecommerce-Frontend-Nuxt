<template>
  <b-container
    id="container-footer-parent"
    class="container-footer-parent"
    :class="isProductView ? `footer-max-width-for-full-product-view` : null"
    :fluid="isProductView ? `lg` : `xl`"
  >
    <footer>
      <!-- <div class="text-align-center">
        <img class="footer-logo" :src="logo" :alt="logoImgAlt" />
      </div>
      <b-row>
        <b-col cols="12" sm="4" md="3" lg="2">
          <h4>Service</h4>
          <div class="text cursor-pointer">Contact Us</div>
        </b-col>
        <b-col cols="12" sm="4" md="3" lg="2">
          <h4>Policies</h4>
          <div class="text cursor-pointer">Terms of use</div>
          <div class="text cursor-pointer">Privacy policy</div>
        </b-col>
        <b-col cols="12" sm="4" md="3" lg="2">
          <h4>About your shop</h4>
          <div class="text cursor-pointer">FAQ</div>
        </b-col>
      </b-row>
      <div class="text footer-copy">Copyright &copy; 2020.</div> -->
      <div class="text footer-copy text-align-center mt-2 mb-2">
        &copy; 2020 Smoot Technologies
      </div>
      <div class="mt-3 mb-1">
        <div class="text cursor-pointer">About</div>
        <div class="text cursor-pointer">Terms</div>
        <div class="text cursor-pointer">Privacy</div>
        <div class="text cursor-pointer">FAQ</div>
      </div>
    </footer>
  </b-container>
</template>
<script>
import { BRAND } from "@/constants/constants";
export default {
  name: "FooterNavbar",
  data() {
    return {
      logo: BRAND.LOGO.default,
      logoImgAlt: BRAND.LOGO.IMG_ALT,
      isProductView: false,
    };
  },
  // computed: {
  //   isProductView() {
  //     return this.$store.getters[`footer-navbar/IS_PRODUCT_VIEW`];
  //   },
  // },
  watch: {
    "$nuxt.$route.path"() {
      this.changeFooterView(this.$nuxt.$route.path);
    },
  },
  created() {
    this.changeFooterView(this.$nuxt.$route.path);
  },
  methods: {
    changeFooterView(route) {
      if (route === "/product") {
        this.isProductView = true;
      } else {
        this.isProductView = false;
      }
    },
  },
};
</script>
