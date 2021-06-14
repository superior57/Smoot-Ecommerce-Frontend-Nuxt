<template>
  <b-container class="container-sign-in-nav rounded" fluid="sm">
    <b-container class="container-inner">
      <b-row v-if="nav === `forgot-password`" class="row-nav text-align-center">
        <b-col
          lg="5"
          md="5"
          sm="5"
          cols="12"
          class="cursor-pointer"
          @click="$appRouteNavigation(`/sign-up`)"
        >
          Create new account
        </b-col>
        <b-col lg="2" md="2" sm="2" cols="12" class="sign-in-nav-separate">
          OR
        </b-col>
        <b-col
          lg="5"
          md="5"
          sm="5"
          cols="12"
          class="cursor-pointer"
          @click="$appRouteNavigation(`/sign-in`)"
        >
          Back to Sign In
        </b-col>
      </b-row>
      <b-row v-else-if="nav === `sign-in`" class="row-nav text-align-center">
        <b-col class="cursor-pointer" @click="$appRouteNavigation(`/sign-up`)">
          Don't have an account? Sign up
        </b-col>
      </b-row>
      <b-row v-else class="row-nav text-align-center">
        <b-col class="cursor-pointer" @click="$appRouteNavigation(`/sign-in`)">
          Already have an account? Sign In
        </b-col>
      </b-row>
    </b-container>
  </b-container>
</template>
<script>
export default {
  name: "SignInNav",
  props: {
    nav: {
      type: String,
      default: "sign-up",
    },
  },
};
</script>
