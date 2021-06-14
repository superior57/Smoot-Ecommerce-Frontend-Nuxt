<template>
  <b-container class="container-fixed-header" fluid>
    <b-row>
      <b-col cols="6">
        <b-form>
          <b-input-group size="sm">
            <b-input-group-prepend is-text>
              <b-icon icon="search" scale="1"></b-icon>
            </b-input-group-prepend>
            <b-form-input
              id="fixed-header-main-search-bar"
              type="text"
              placeholder="Search in Smoot..."
            ></b-form-input>
          </b-input-group>
        </b-form>
      </b-col>
      <b-col cols="2">
        <i class="fa fa-heart-o zoom-icon" aria-hidden="true"></i>
      </b-col>
      <b-col cols="2" @click="$nuxt.$router.push(`/messages/inbox`)">
        <i class="fa fa-inbox zoom-icon" aria-hidden="true">
          <span class="notify-count">{{ notifications.inbox }}</span>
        </i>
      </b-col>
      <b-col cols="2">
        <i class="fa fa-bell-o zoom-icon" aria-hidden="true">
          <span class="notify-count">{{ notifications.notify }}</span>
        </i>
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
export default {
  name: "FixedHeader",
  data() {
    return {
      notifications: {
        inbox: 10,
        notify: 19,
      },
    };
  },
};
</script>
