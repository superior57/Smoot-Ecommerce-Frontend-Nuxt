<!-- eslint-disable -->
<template>
  <b-container class="container-profile-header">
    <b-row>
      <b-col class="col-profile-cover" cols="12"></b-col>
      <b-col class="col-profile-cover-bottom" cols="12">
        <b-img
          rounded="circle"
          class="profile-avatar"
          :src="profileAvatar"
        ></b-img>
        <b-row class="row-profile-cover-bottom">
          <b-col lg="6" md="6" sm="12" class="col-options">
            <div
              class="cursor-pointer col-options-active col-options-active-text"
            >
              Listings
            </div>
            <div class="cursor-pointer">
              Coins
            </div>
            <div class="cursor-pointer">
              Reviews
            </div>
          </b-col>
          <b-col lg="6" md="6" sm="12" class="col-button">
            <b-button size="sm" @click="$nuxt.$router.push(`/profile/edit`)">
              Edit profile
            </b-button>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
export default {
  name: "ProfileHeader",
  props: {
    profileAvatar: {
      type: String,
      required: true,
    },
  },
  data() {
    return {};
  },
};
</script>
