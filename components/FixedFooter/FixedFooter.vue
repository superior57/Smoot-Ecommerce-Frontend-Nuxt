<template>
  <b-container class="container-fixed-footer" fluid>
    <b-row v-if="showDefaultMenu" class="text-align-center">
      <b-col>
        <div @click="search">
          <span>
            <i class="fa fa-search" aria-hidden="true"></i>
          </span>
          <span>Search</span>
        </div>
      </b-col>
      <b-col>
        <div>
          <span>
            <i class="fa fa-square" aria-hidden="true">
              <i class="fa fa-plus" aria-hidden="true"></i>
            </i>
          </span>
          <span>List</span>
        </div>
      </b-col>
      <b-col>
        <div>
          <span v-if="!isLoggedIn">
            <i class="fa fa-user" aria-hidden="true"></i>
          </span>
          <b-img
            v-else
            rounded="circle"
            class="profile-avatar"
            :src="`${$auth.$state.user.avatar}?${fileProperties.user.profileAvatarForNavbarTop}`"
            width="25px"
          ></b-img>
          <span>Profile</span>
        </div>
      </b-col>
    </b-row>
    <b-row v-else class="text-align-center">
      <b-col>
        <div @click="$appRouteNavigation(`/`)">
          <span>
            <i class="fa fa-home" aria-hidden="true"></i>
          </span>
          <span>Home</span>
        </div>
      </b-col>
      <b-col>
        <div>
          <span>
            <i class="fa fa-phone-square" aria-hidden="true"></i>
          </span>
          <span>Call</span>
        </div>
      </b-col>
      <b-col>
        <div>
          <span>
            <i class="fa fa-comment" aria-hidden="true"></i>
          </span>
          <span>Chat</span>
        </div>
      </b-col>
      <b-col>
        <div>
          <span>
            <i class="fa fa-heart-o" aria-hidden="true"></i>
          </span>
          <span>Like</span>
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
import { FILE_QUERY_PARAMETERS } from "@/constants/constants";
export default {
  name: "FixedFooter",
  props: {
    isFixedHeaderVisible: {
      type: Boolean,
      default: false,
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
      showDefaultMenu: true,
      isLoggedIn: false,
    };
  },
  watch: {
    "$nuxt.$route.path"() {
      this.changeFooterMenuItemsBasedOnRoute(this.$nuxt.$route.path);
    },
    "$auth.loggedIn"() {
      this.isLoggedIn = this.$auth.loggedIn;
    },
  },
  beforeMount() {
    this.$nextTick(function () {
      this.isLoggedIn = this.$auth.loggedIn;
    });
  },
  created() {
    this.changeFooterMenuItemsBasedOnRoute(this.$nuxt.$route.path);
  },
  methods: {
    search() {
      if (this.isFixedHeaderVisible) {
        document.getElementById("fixed-header-main-search-bar").focus();
      } else if (window.innerWidth <= 362) {
        document.getElementById("shrink-device-main-search-bar").focus();
      } else {
        document.getElementById("main-search-bar").focus();
      }
    },
    changeFooterMenuItemsBasedOnRoute(route) {
      if (route === "/product") {
        this.showDefaultMenu = false;
      } else {
        this.showDefaultMenu = true;
      }
    },
  },
};
</script>
