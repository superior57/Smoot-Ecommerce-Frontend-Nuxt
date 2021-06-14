<template>
  <div>
    <email-verify-reminder></email-verify-reminder>
    <public-navbar :hide-public-header="hidePublicHeader"></public-navbar>
    <fixed-header
      v-if="!hideFixedHeaderAndFooterForRoute && showFixedHeader"
    ></fixed-header>
    <client-only v-if="appEnv === `development`">
      <div v-if="$nuxt.isOffline">
        <b-alert
          variant="warning"
          class="text-align-center alert-no-internet"
          show
        >
          <p>No Internet connection, you are offline.</p>
        </b-alert>
      </div>
    </client-only>
    <nuxt></nuxt>
    <fixed-footer
      v-if="!hideFixedHeaderAndFooterForRoute && showFixedFooter"
      :is-fixed-header-visible="showFixedHeader"
    ></fixed-footer>
    <footer-navbar v-if="!hideFooterNavbar"></footer-navbar>
  </div>
</template>
<script>
import { APP_ENV, ROUTES } from "@/constants/constants";
export default {
  name: "Default",
  data() {
    return {
      showFixedHeader: false,
      showFixedFooter: false,
      hideFixedHeaderAndFooterForRoute: false,
      appEnv: APP_ENV,
      hideFooterNavbar: false,
      hidePublicHeader: false,
    };
  },
  watch: {
    "$nuxt.$route.path"() {
      this.hideFixedHeaderAndFooterOnSpecRoutes(this.$nuxt.$route.path);
      this.hideFooterNavbarOnSpecRoutes(this.$nuxt.$route.path);
      this.hidePublicHeaderOnSpecRoutes(this.$nuxt.$route.path);
    },
  },
  created() {
    this.hideFixedHeaderAndFooterOnSpecRoutes(this.$nuxt.$route.path);
    this.hideFooterNavbarOnSpecRoutes(this.$nuxt.$route.path);
    this.hidePublicHeaderOnSpecRoutes(this.$nuxt.$route.path);
  },
  mounted() {
    const vm = this;
    vm.detectWindowWidthForFixedHeader();
    vm.detectWindowWidthForFixedFooter();
    window.addEventListener("resize", vm.detectWindowWidthForFixedHeader);
    window.addEventListener("resize", vm.detectWindowWidthForFixedFooter);
    window.addEventListener("scroll", vm.detectWindowWidthForFixedHeader);
    window.addEventListener("scroll", vm.detectWindowWidthForFixedFooter);
  },
  methods: {
    detectWindowWidthForFixedHeader() {
      const vm = this;
      if (!vm.hideFooterNavbar) {
        if (window.innerWidth <= 768 && window.scrollY >= 63) {
          vm.showFixedHeader = true;
        } else {
          vm.showFixedHeader = false;
        }
      }
    },
    detectWindowWidthForFixedFooter() {
      const vm = this;
      if (!vm.hideFooterNavbar) {
        const footerStartPosition = document.getElementById(
          "container-footer-parent"
        ).offsetTop;
        const toHidePosition = footerStartPosition - window.innerHeight;
        if (window.innerWidth <= 768 && window.scrollY <= toHidePosition) {
          vm.showFixedFooter = true;
        } else {
          vm.showFixedFooter = false;
        }
      }
    },
    hideFixedHeaderAndFooterOnSpecRoutes(route) {
      /* eslint-disable */
      if (ROUTES.FOR_COMPONENT_DISABLE.FIXED_HEADER_AND_FOOTER.some(function (ins) {return ins === route;})) {
        this.hideFixedHeaderAndFooterForRoute = true;
      } else {
        this.hideFixedHeaderAndFooterForRoute = false;
      }
      /* eslint-enable */
    },
    hideFooterNavbarOnSpecRoutes(route) {
      /* eslint-disable */
      if (ROUTES.FOR_COMPONENT_DISABLE.FOOTER_NAVBAR.some(function (ins) {return ins === route;})) {
        this.hideFooterNavbar = true;
      } else {
        this.hideFooterNavbar = false;
      }
      /* eslint-enable */
    },
    hidePublicHeaderOnSpecRoutes(route) {
      /* eslint-disable */
      if (ROUTES.FOR_COMPONENT_DISABLE.PUBLIC_HEADER.some(function (ins) {return ins === route;})) {
        this.hidePublicHeader = true;
      } else {
        this.hidePublicHeader = false;
      }
      /* eslint-enable */
    },
  },
};
</script>
