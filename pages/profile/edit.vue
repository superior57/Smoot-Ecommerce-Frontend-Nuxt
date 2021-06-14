<template>
  <b-container class="container-profile-edit" rounded fluid="sm">
    <b-row>
      <b-col lg="4" md="4" sm="12" cols="12" class="col-left">
        <b-row>
          <b-col
            lg="12"
            md="12"
            sm="4"
            cols="4"
            class="cursor-pointer"
            :class="tab.isEditProfile ? `edit-profile-active-tab` : null"
            @click="switchTabs(`edit-profile`)"
          >
            Edit profile
          </b-col>
          <b-col
            lg="12"
            md="12"
            sm="4"
            cols="4"
            class="cursor-pointer"
            :class="tab.isChangePassword ? `edit-profile-active-tab` : null"
            @click="switchTabs(`change-password`)"
          >
            Change password
          </b-col>
          <b-col
            lg="12"
            md="12"
            sm="4"
            cols="4"
            class="cursor-pointer"
            :class="tab.isDataAndPrivacy ? `edit-profile-active-tab` : null"
            @click="switchTabs(`data-and-privacy`)"
          >
            Data & privacy
          </b-col>
        </b-row>
      </b-col>
      <b-col lg="8" md="8" sm="12" cols="12" class="col-right">
        <edit-profile v-if="tab.isEditProfile"></edit-profile>
        <change-password v-if="tab.isChangePassword"></change-password>
        <data-and-privacy v-if="tab.isDataAndPrivacy"></data-and-privacy>
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
// import { FILE_PATHS, FILE_QUERY_PARAMETERS } from "@/constants/constants";
export default {
  name: "Edit",
  data() {
    return {
      tab: {
        isEditProfile: true,
        isChangePassword: false,
        isDataAndPrivacy: false,
      },
    };
  },
  methods: {
    switchTabs(tab) {
      if (tab === "change-password") {
        this.tab.isEditProfile = false;
        this.tab.isChangePassword = true;
        this.tab.isDataAndPrivacy = false;
      } else if (tab === "data-and-privacy") {
        this.tab.isEditProfile = false;
        this.tab.isChangePassword = false;
        this.tab.isDataAndPrivacy = true;
      } else {
        this.tab.isEditProfile = true;
        this.tab.isChangePassword = false;
        this.tab.isDataAndPrivacy = false;
      }
    },
  },
};
</script>
