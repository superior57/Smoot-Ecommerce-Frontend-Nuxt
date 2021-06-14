<template>
  <b-container
    class="public-navbar-parent grey-outline-bottom"
    :class="hidePublicHeader ? `hide-public-header` : null"
    fluid
  >
    <b-navbar
      toggleable="lg"
      type="light"
      variant="light"
      class="public-navbar"
    >
      <b-navbar-brand class="cursor-pointer" @click="$nuxt.$router.push(`/`)">
        <img class="navbar-logo" :src="logo" :alt="logoImgAlt" />
      </b-navbar-brand>
      <b-nav-form class="frm-main-search-general">
        <b-form-input
          id="main-search-bar"
          size="sm"
          class="main-search-bar"
          :placeholder="searchbarPlaceholder"
        ></b-form-input>
        <b-button
          size="sm"
          class="my-2 my-sm-0 btn-search-main-search-bar"
          type="submit"
        >
          <span>
            <i class="fa fa-search" aria-hidden="true"></i>
          </span>
        </b-button>
      </b-nav-form>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <!-- Right aligned nav items -->
        <!-- eslint-disable -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item
            v-if="!isLoggedIn"
            to="/sign-up"
            class="text-align-center"
          >
            Join free
          </b-nav-item>
          <b-nav-item
            v-if="!isLoggedIn"
            to="/sign-in"
            class="text-align-center"
          >
            Sign In
          </b-nav-item>
          <b-nav-item
            v-if="isLoggedIn"
            to="/profile"
            class="text-align-center"
          >
            <b-img
              rounded="circle"
              class="profile-avatar-in-top-nav"
              :src="`${$auth.$state.user.avatar}?${fileProperties.user.profileAvatarForNavbarTop}`"
              width="25px"
            ></b-img>
            <div class="label">
              Profile
            </div>
          </b-nav-item>
          <!-- <b-nav-item
            v-if="isLoggedIn"
            to="/profile"
          >
            Profile
          </b-nav-item> -->
          <b-nav-item
            v-if="isLoggedIn"
            to="/messages/inbox"
            class="text-align-center"
          >
            <i
              class="fa fa-inbox top-navbar-icon"
              aria-hidden="true"
            ></i>
            <div class="label text-align-center">
              Inbox
            </div>
          </b-nav-item>
          <b-nav-item
            v-if="isLoggedIn"
            @click="$auth.logout()"
            class="text-align-center"
          >
            <i
              class="fa fa-sign-out top-navbar-icon"
              aria-hidden="true"
            ></i>
            <div class="label text-align-center">
              Sign out
            </div>
          </b-nav-item>
          <b-nav-item
            v-if="!showSellOption"
            class="sell-option sell-highlight-option"
            to="/sell"
          >
            Sell
          </b-nav-item>
        </b-navbar-nav>
        <!-- eslint-enable -->
      </b-collapse>
    </b-navbar>
    <b-navbar class="public-navbar nav-for-shrink-device">
      <b-nav-form>
        <b-form-input
          id="shrink-device-main-search-bar"
          size="sm"
          class="main-search-bar"
          :placeholder="searchbarPlaceholder"
        ></b-form-input>
        <b-button
          size="sm"
          class="my-2 my-sm-0 btn-navbar-for-search"
          type="submit"
        >
          Search
        </b-button>
      </b-nav-form>
    </b-navbar>
  </b-container>
</template>
<script>
import { BRAND, FILE_QUERY_PARAMETERS } from "@/constants/constants";
export default {
  name: "PublicNavbar",
  props: {
    hidePublicHeader: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      fileProperties: {
        user: {
          profileAvatarForNavbarTop:
            FILE_QUERY_PARAMETERS.USER.AVATAR_FOR_NAVBAR_TOP,
        },
      },
      logo: BRAND.LOGO.default,
      logoImgAlt: BRAND.LOGO.IMG_ALT,
      searchbarPlaceholder: BRAND.MAIN_SEARCH_BAR_PLACEHOLDER,
      showSellOption: false,
      isLoggedIn: false,
    };
  },
  watch: {
    "$auth.loggedIn"() {
      this.isLoggedIn = this.$auth.loggedIn;
    },
  },
  beforeMount() {
    this.$nextTick(function () {
      this.isLoggedIn = this.$auth.loggedIn;
    });
  },
};
</script>
