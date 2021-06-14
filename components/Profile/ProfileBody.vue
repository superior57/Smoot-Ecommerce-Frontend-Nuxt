<template>
  <b-container class="container-profile-body">
    <b-row>
      <b-col class="col-profile-left" xl="3" lg="3" md="12" cols="12">
        <b-row>
          <b-col cols="12">
            <h1 class="username">
              {{ `@${username}` }}
            </h1>
          </b-col>
          <b-col cols="12">
            <h2 class="feedback">
              <div class="feedback-stars">
                <span> {{ `${countForStarsCheck}` }} </span>
                <!-- eslint-disable -->
                <span v-for="(starCheck, starCheckIndex) in starsCheck"
                  :key="starCheckIndex"
                  :class="starCheck === `full` ? `fa fa-star feedback-star-checked` :
                  (starCheck === `half` ? `fa fa-star-half feedback-star-checked star-half` : `fa fa-star-o`)"
                ></span>
                <!-- eslint-enable -->
                <span>{{ `(${feedbackCount})` }}</span>
              </div>
            </h2>
          </b-col>
          <b-col cols="12" class="col-location-and-joined-date">
            <span>{{ location }}</span>
            <span>&bull;</span>
            <span>{{ `Joined ${joinedDate}` }}</span>
          </b-col>
          <b-col
            v-if="isEmailVerified && isPhoneVerified"
            cols="12"
            class="col-verified"
          >
            <span>Verified</span>
            <span class="verified-icon">
              <i class="fa fa-phone" aria-hidden="true"></i>
            </span>
            <span class="verified-icon">
              <i class="fa fa-envelope" aria-hidden="true"></i>
            </span>
          </b-col>
          <b-col v-else-if="isEmailVerified" cols="12" class="col-verified">
            <span class="verified-icon">Verified</span>
            <span><i class="fa fa-envelope" aria-hidden="true"></i></span>
          </b-col>
          <b-col v-else-if="isPhoneVerified" cols="12" class="col-verified">
            <span>Verified</span>
            <span class="verified-icon">
              <i class="fa fa-phone" aria-hidden="true"></i>
            </span>
          </b-col>
          <b-col cols="12" class="col-followers-and-following">
            <span>{{ `${followers} Followers` }}</span>
            <span>{{ `${following} Following` }}</span>
          </b-col>
        </b-row>
      </b-col>
      <b-col class="col-profile-right" xl="9" lg="9" md="12" cols="12">
        <b-container class="container-products-listing-tab rounded">
          <b-row class="row-post">
            <b-col xl="4" lg="4" md="4" sm="12" cols="12" class="header">
              <h2 class="post-head">Listings</h2>
            </b-col>
            <b-col xl="8" lg="8" md="8" sm="12" cols="12" class="search-bar">
              <b-input-group size="sm" class="mb-2">
                <b-input-group-prepend is-text>
                  <b-icon icon="search"></b-icon>
                </b-input-group-prepend>
                <b-form-input
                  type="search"
                  :placeholder="searchbarPlaceholder"
                ></b-form-input>
              </b-input-group>
            </b-col>
            <div class="container-col-5-post-grid">
              <div
                v-for="(listing, listingIndex) in listings"
                :key="listingIndex"
                class="col-post col-5-post-grid"
              >
                <div
                  class="container-post cursor-pointer"
                  @click="$appRouteNavigation(listing.url)"
                >
                  <div class="post-image-container">
                    <img
                      :src="`${listing.image}?${productImageParams}`"
                      class="post-image"
                    />
                    <span
                      v-if="listing.isSold"
                      class="listing-sold text-align-center text-uppercase"
                    >
                      Sold
                    </span>
                  </div>
                  <h4 class="post-title text-truncate">
                    {{ listing.title }}
                  </h4>
                  <div class="post-price text-truncate">
                    {{ listing.price }}
                  </div>
                  <div class="post-short-discription text-truncate">
                    {{ listing.short_description | truncate("12", "...") }}
                  </div>
                  <div class="post-used-or-brand-new">
                    {{ listing.used_or_brand_new }}
                  </div>
                  <div class="post-likes-and-url">
                    <div class="post-like">
                      <i
                        v-b-tooltip.hover.right
                        title="Like product"
                        class="fa fa-heart-o"
                        aria-hidden="true"
                      ></i>
                      <span>{{ listing.likes }}</span>
                    </div>
                    <div class="post-link">
                      <i class="fa fa-external-link" aria-hidden="true"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </b-row>
        </b-container>
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
import { BRAND } from "@/constants/constants";
export default {
  name: "ProfileBody",
  props: {
    username: {
      type: String,
      required: true,
    },
    countForStarsCheck: {
      type: Number,
      required: true,
    },
    starsCheck: {
      type: Array,
      required: true,
    },
    feedbackCount: {
      type: Number,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    joinedDate: {
      type: String,
      required: true,
    },
    isPhoneVerified: {
      type: Boolean,
      required: true,
    },
    isEmailVerified: {
      type: Boolean,
      required: true,
    },
    followers: {
      type: Number,
      required: true,
    },
    following: {
      type: Number,
      required: true,
    },
    listings: {
      type: Array,
      required: true,
    },
    productImageParams: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      activeListingsTab: true,
      activeCoinsTab: false,
      activeReviewTab: false,
      searchbarPlaceholder: BRAND.LISTINGS_SEARCH_BAR_PLACEHOLDER,
    };
  },
};
</script>
