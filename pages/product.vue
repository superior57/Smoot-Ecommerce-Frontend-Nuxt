<template>
  <div>
    <b-container class="container-full-product-view" fluid="lg">
      <b-breadcrumb class="breadcrumb-on-top-full-product" fluid>
        <b-breadcrumb-item @click="$appRouteNavigation(`/`)">
          Home
        </b-breadcrumb-item>
        <b-breadcrumb-item @click="$appRouteNavigation(`/`)">
          {{ product.main_category }}
        </b-breadcrumb-item>
        <b-breadcrumb-item active>
          {{ product.sub_category_1 }}
        </b-breadcrumb-item>
      </b-breadcrumb>
      <b-container
        v-if="Object.keys(product).length"
        class="container-full-product-view-child"
        fluid
        style="border: 0 solid"
      >
        <b-row class="row-product-view" style="border: 0 solid yellow">
          <b-col
            lg="5"
            md="4"
            sm="12"
            cols="12"
            :class="productImageOverlay ? `overflow-hidden` : null"
            style="border: 0 solid green"
          >
            <div
              class="full-product-view-image-slide"
              :class="productImageOverlay ? `height-100` : null"
            >
              <b-carousel
                v-if="!productImageOverlay"
                id="carousel-fade"
                controls
                img-width="400"
                img-height="350"
              >
                <b-carousel-slide
                  v-for="(image, imageIndex) in product.images"
                  :key="imageIndex"
                  :img-src="`${image}?${fileProperties.product.image}`"
                  :class="ac === imageIndex ? `active` : null"
                  background="#d6d6d6"
                ></b-carousel-slide>
              </b-carousel>
              <b-overlay :show="productImageOverlay" no-wrap></b-overlay>
            </div>
            <div class="product-thumbnails-parent">
              <b-img
                v-for="(imageThumbnail, imageThumbnailIndex) in product.images"
                :key="imageThumbnailIndex"
                :src="`${imageThumbnail}?${fileProperties.product.thumbnail}`"
                class="cursor-pointer product-thumbnails"
                rounded
                @click="ac = imageThumbnailIndex"
              ></b-img>
            </div>
          </b-col>
          <b-col lg="7" md="8" sm="12" cols="12" style="border: 0 solid green">
            <div class="product-header" style="border: 0 solid">
              <b-row>
                <b-col lg="5" md="5" sm="5" cols="12" style="border: 0 solid">
                  <div class="seller-avatar-parent">
                    <b-img
                      :src="`${product.seller.avatar}?${fileProperties.user.avatarForFullProductView}`"
                      rounded="circle"
                    ></b-img>
                  </div>
                  <div class="seller-details-parent">
                    <div>
                      {{ product.seller.name }}
                    </div>
                    <div class="feedback-stars">
                      <!-- eslint-disable -->
                      <span v-for="(starCheck, starCheckIndex) in product.seller.stars_check"
                        :key="starCheckIndex"
                        :class="starCheck === `full` ? `fa fa-star feedback-star-checked` :
                        (starCheck === `half` ? `fa fa-star-half feedback-star-checked star-half` : `fa fa-star-o`)"
                      ></span>
                      <!-- eslint-enable -->
                      <span>{{ `(${product.seller.feedback_count})` }}</span>
                    </div>
                    <div class="joined-time">
                      {{ product.seller.created_at }}
                    </div>
                  </div>
                </b-col>
                <b-col lg="7" md="7" sm="7" cols="12" style="border: 0 solid">
                  <b-row class="row-chat-call-sms">
                    <b-col cols="6">
                      <b-button class="btn-chat" block rounded>Chat</b-button>
                    </b-col>
                    <b-col cols="3">
                      <b-button class="btn-call" block rounded>Call</b-button>
                    </b-col>
                    <b-col cols="3">
                      <b-button class="btn-sms" block rounded>SMS</b-button>
                    </b-col>
                  </b-row>
                </b-col>
              </b-row>
            </div>
            <div class="product-and-share">
              <b-row>
                <b-col cols="6">
                  {{ product.price }}
                </b-col>
                <b-col cols="6" class="text-align-right">
                  <span class="cursor-pointer">
                    <i class="fa fa-share" aria-hidden="true"></i>
                    Share
                  </span>
                  <span class="cursor-pointer">
                    <i class="fa fa-heart-o" aria-hidden="true"></i>
                    Like
                  </span>
                </b-col>
              </b-row>
            </div>
            <div class="product-title">
              <h1>
                {{ product.title }}
              </h1>
            </div>
            <div class="product-property">
              <b-row>
                <b-col cols="12">
                  <div>
                    <span class="icon">
                      <i class="fa fa-map-marker" aria-hidden="true"></i>
                    </span>
                    <span class="property">
                      {{ product.location }}
                    </span>
                  </div>
                </b-col>
                <b-col cols="12">
                  <div>
                    <span class="icon">
                      <i class="fa fa-shield" aria-hidden="true"></i>
                    </span>
                    <span class="property">
                      {{ product.meetup_or_courier }}
                    </span>
                  </div>
                </b-col>
                <b-col cols="12">
                  <div>
                    <span class="icon">
                      <i class="fa fa-ticket" aria-hidden="true"></i>
                    </span>
                    <span class="property">
                      {{ product.used_or_brand_new }}
                    </span>
                  </div>
                </b-col>
              </b-row>
            </div>
            <div class="product-description font-weight-normal">
              <h2 class="label">Description</h2>
              <p class="text-align-justify">
                {{ product.description }}
              </p>
            </div>
            <div class="product-dealing-option font-weight-normal">
              <h2 class="label">
                {{
                  product.meetup_or_courier === `Meet up`
                    ? `Meet-up`
                    : `Dealing Option`
                }}
              </h2>
              <p>
                {{ product.meetup_or_courier_option }}
              </p>
            </div>
            <div class="product-listed-time text-muted font-weight-normal">
              <span>
                {{ `${product.created_at} in` }}
              </span>
              <span class="cursor-pointer">
                {{ product.main_category }}
              </span>
            </div>
            <div class="product-review">
              <div v-if="!checkifProductHasReview" class="text-muted">
                This user has no reviews yet.
              </div>
              <div v-else>
                <h3>Reviews for {{ product.seller.name }}</h3>
                <b-row>
                  <b-col cols="12" class="review-header">
                    <div class="reviewer-avatar-parent">
                      <b-img
                        :src="`${product.review.latest_review.reviewer_avatar}?${fileProperties.user.avatarForReviewer}`"
                        rounded="circle"
                      ></b-img>
                    </div>
                    <div class="reviewer-details-parent">
                      <div>
                        {{ product.review.latest_review.review_by }}
                      </div>
                      <div class="reviewed-time">
                        {{ product.review.latest_review.created_at }}
                      </div>
                    </div>
                  </b-col>
                  <b-col cols="12" class="col-review-parent">
                    <div class="review-parent">
                      {{ product.review.latest_review.review }}
                    </div>
                  </b-col>
                  <b-col cols="12" class="col-total-reviews-parent">
                    <div
                      v-if="product.review.total_reviews > 1"
                      class="total-reviews cursor-pointer"
                    >
                      Read all {{ product.review.total_reviews }} reviews
                    </div>
                    <div class="feedback-stars">
                      <!-- eslint-disable -->
                      <span v-for="(starCheck, starCheckIndex) in product.seller.stars_check"
                        :key="starCheckIndex"
                        :class="starCheck === `full` ? `fa fa-star feedback-star-checked` :
                        (starCheck === `half` ? `fa fa-star-half feedback-star-checked star-half` : `fa fa-star-o`)"
                      ></span>
                      <!-- eslint-enable -->
                      <span>{{ `(${product.seller.feedback_count})` }}</span>
                    </div>
                  </b-col>
                </b-row>
              </div>
            </div>
          </b-col>
        </b-row>
      </b-container>
    </b-container>
    <similar-products></similar-products>
  </div>
</template>
<script>
import { FILE_PATHS, FILE_QUERY_PARAMETERS } from "@/constants/constants";
export default {
  auth: false,
  name: "Product",
  data() {
    return {
      ac: 0,
      productImageOverlay: true,
      fileProperties: {
        product: {
          image: FILE_QUERY_PARAMETERS.PRODUCT.IMAGE,
          thumbnail: FILE_QUERY_PARAMETERS.PRODUCT.THUMBNAIL,
        },
        user: {
          avatarForReviewer: FILE_QUERY_PARAMETERS.USER.AVATAR_FOR_REVIEWER,
          avatarForFullProductView:
            FILE_QUERY_PARAMETERS.USER.AVATAR_FOR_PRODUCT_VIEW,
        },
      },
      product: {
        images: [
          `${FILE_PATHS.PRODUCT}/20200119765115794258341-1.jpg`,
          `${FILE_PATHS.PRODUCT}/20200119365115794259882-1.jpg`,
        ],
        title: `iPhone XR`,
        price: `Rs. 27000.00`,
        likes: 10,
        seller: {
          name: `Thomas`,
          feedback_count: 10,
          created_at: `Joined 1 month ago`,
          avatar: `${FILE_PATHS.USER_PROFILE_PHOTO}/p2.webp`,
          stars_check: [`full`, `full`, `half`, `empty`, `empty`],
        },
        main_category: `Electronics`,
        sub_category_1: `Mobile`,
        location: `Wattegama`,
        meetup_or_courier: `Meet up`,
        used_or_brand_new: `Used`,
        description: `All original iPhones. Imported from Singapore Aveilable colors: Red, Space grey, and Jet black. Pellentesque blandit dapibus gravida. Proin eget ornare felis, ac tempus elit. Quisque tempor a magna eget vestibulum. Donec libero metus, commodo vel lobortis ut, ultricies quis libero. Morbi aliquam massa lacus, eget imperdiet ligula gravida et. Vivamus non purus in erat gravida iaculis et at sapien. Donec finibus nunc sit amet nunc dignissim, nec aliquam nisi interdum. Sed volutpat elit lacus, ac porttitor erat vulputate ut.`,
        meetup_or_courier_option: `In front of Kandy railway station`,
        created_at: `3 minuts ago`,
        review: {
          latest_review: {
            review_by: `Elizabth`,
            reviewer_avatar: `${FILE_PATHS.USER_PROFILE_PHOTO}/p6.webp`,
            review: `Seller was fast in response, and easy to deal with. One of the best sellers in the market!`,
            created_at: `2020 Jul`,
          },
          total_reviews: 21,
        },
      },
    };
  },
  mounted() {
    const vm = this;
    setTimeout(function () {
      vm.productImageOverlay = false;
    }, 550);
    // if(process.client) {
    //       setTimeout(function(){
    //       const vm = this;
    //       const listItems = document.querySelectorAll(' _ li');
    //           for (let i = 0; i < listItems.length; i++) {
    //             let img = document.createElement("img");
    //             img.setAttribute("src",`https://ik.imagekit.io/smoot/dev/products/dummy/tr:w-65,h-65,c-force/20200119365115794259882-1.jpg`);
    //             document.getElementById(`#carousel-fade___BV_indicator_2_`).appendChild(img);
    //           }
    //         }, 3000);
    // }
    // vm.$store.commit(`footer-navbar/SET_IS_PRODUCT_VIEW`, true);
  },
  methods: {
    checkifProductHasReview() {
      if (Object.getOwnPropertyDescriptor(this.product, `review`)) {
        return true;
      } else {
        return false;
      }
    },
  },
};
</script>
