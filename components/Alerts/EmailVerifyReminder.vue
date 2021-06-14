<template>
  <b-alert
    class="alert-email-verify-reminder"
    variant="danger"
    fade
    :show="isLoggedIn && !isEmailVerified ? true : false"
  >
    Please verify your account email.
    <span @click="navigateToEmailHash">Click here to verify it</span>.
  </b-alert>
</template>
<script>
export default {
  name: "EmailVerifyReminder",
  data() {
    return {
      isLoggedIn: false,
      isEmailVerified: false,
    };
  },
  watch: {
    "$auth.loggedIn"() {
      this.isLoggedIn = this.$auth.loggedIn;
      if (this.$auth.loggedIn) {
        // this.isEmailVerified = this.$auth.$state.user.is_email_verified;
        this.isEmailVerified = true;
      } else {
        this.isEmailVerified = false;
      }
    },
  },
  beforeMount() {
    this.$nextTick(function () {
      this.isLoggedIn = this.$auth.loggedIn;
      if (this.$auth.loggedIn) {
        // this.isEmailVerified = this.$auth.$state.user.is_email_verified;
        this.isEmailVerified = true;
      } else {
        this.isEmailVerified = false;
      }
    });
  },
  methods: {
    /*  eslint-disable */
    navigateToEmailHash() {
      if (this.$nuxt.$route.path === "/profile/edit") {
        history.pushState(
          "",
          document.title,
          `${this.$nuxt.$route.path}#email`
        );
        document.getElementById("email").scrollIntoView();
        this.$highlightHash();
      } else {
        this.$nuxt.$router.push({
          path: "/profile/edit",
          hash: "#email",
        });
      }
    },
    /* eslint-enable */
  },
};
</script>
