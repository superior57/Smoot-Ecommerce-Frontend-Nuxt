<template>
  <div>
    <b-container class="container-similar-products" fluid="lg">
      <b-row class="row-post">
        <h2 class="post-head font-600">Similar products</h2>
        <b-col
          v-if="posts.length === maxItemsPerCategory"
          class="col-show-more-main"
        >
          <b-button
            size="sm"
            href=""
            class="btn-show-more-main"
            variant="outline-dark"
          >
            Show more
          </b-button>
        </b-col>
        <div class="container-col-5-post-grid">
          <div
            v-for="(post, postIndex) in posts"
            :key="postIndex"
            class="col-post col-5-post-grid"
          >
            <!-- eslint-disable -->
            <div
              v-if="(posts.length === maxItemsPerCategory && postIndex + 1 === posts.length)"
              class="blur-post"
            >
            <!-- eslint-enable -->
              <b-row>
                <b-col>
                  <b-button
                    size="sm"
                    href=""
                    class="btn-show-more-main"
                    variant="dark"
                  >
                    Show more
                  </b-button>
                </b-col>
              </b-row>
            </div>
            <div
              class="container-post cursor-pointer"
              @click="$appRouteNavigation(post.url)"
            >
              <div class="post-top">
                <b-row>
                  <b-col cols="3" align-self="center">
                    <b-img
                      :src="post.user_avatar"
                      rounded="circle"
                      align-self="center"
                    ></b-img>
                  </b-col>
                  <b-col cols="9">
                    <div>
                      {{ post.user }}
                    </div>
                    <div class="post-stars">
                      <!-- eslint-disable -->
                      <span v-for="(starCheck, starCheckIndex) in post.stars_check"
                        :key="starCheckIndex"
                        :class="starCheck === `full` ? `fa fa-star feedback-star-checked` :
                        (starCheck === `half` ? `fa fa-star-half feedback-star-checked star-half` : `fa fa-star-o`)"
                      ></span>
                      <!-- eslint-enable -->
                      <span>{{ `(${post.feedback_count})` }}</span>
                    </div>
                    <div class="post-time">
                      {{ post.created_at }}
                    </div>
                  </b-col>
                </b-row>
              </div>
              <div class="post-image-container">
                <img
                  :src="`${post.image}?${fileProperties.product.similar}`"
                  class="post-image"
                />
              </div>
              <h4 class="post-title">{{ post.title }}</h4>
              <div class="post-price">
                {{ post.price }}
                <div class="post-like">
                  <i
                    v-b-tooltip.hover.right
                    title="Like product"
                    class="fa fa-heart-o"
                    aria-hidden="true"
                  ></i>
                  <span>{{ post.likes }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </b-row>
    </b-container>
  </div>
</template>
<script>
import { FILE_PATHS, FILE_QUERY_PARAMETERS } from "@/constants/constants";
export default {
  name: "SimilarProducts",
  data() {
    return {
      fileProperties: {
        product: {
          similar: FILE_QUERY_PARAMETERS.PRODUCT.SIMILAR,
        },
      },
      posts: [
        {
          image: `${FILE_PATHS.PRODUCT}/20200119765115794258341-1.jpg`,
          title: `iPhone XS Max`,
          price: `Rs. 161000.00`,
          likes: 10,
          user_avatar: `${FILE_PATHS.USER_PROFILE_PHOTO}/no-a.png`,
          created_at: `5 minutes ago`,
          user: `John`,
          feedback_count: 1,
          stars_check: [`full`, `full`, `half`, `empty`, `empty`],
          url: `/`,
        },
        {
          image: `${FILE_PATHS.PRODUCT}/20200119365115794259882-1.jpg`,
          title: `iPhone 256GB`,
          price: `Rs. 120000.00`,
          likes: 15,
          user_avatar: `${FILE_PATHS.USER_PROFILE_PHOTO}/48x48.webp`,
          created_at: `7 minutes ago`,
          user: `Thomas`,
          feedback_count: 5,
          stars_check: [`full`, `full`, `empty`, `empty`, `empty`],
        },
        {
          image: `${FILE_PATHS.PRODUCT}/20200119179815794274933-1.jpg`,
          title: `iPhone 6S 64GB`,
          price: `Rs. 31000.00`,
          likes: 1,
          user_avatar: `${FILE_PATHS.USER_PROFILE_PHOTO}/no-a.png`,
          created_at: `8 minutes ago`,
          user: `John`,
          feedback_count: 12,
          stars_check: [`full`, `full`, `full`, `full`, `empty`],
        },
        {
          image: `${FILE_PATHS.PRODUCT}/20200119238815794276795-1.jpg`,
          title: `iPhone 7 128GB red`,
          price: `Rs. 53500.00`,
          likes: 0,
          user_avatar: `${FILE_PATHS.USER_PROFILE_PHOTO}/p6.webp`,
          created_at: `9 minutes ago`,
          user: `Jessica`,
          feedback_count: 10,
          stars_check: [`full`, `full`, `half`, `empty`, `empty`],
        },
        {
          image: `${FILE_PATHS.PRODUCT}/20200119879915794277936-1.jpg`,
          title: `Samsung S10 Plus`,
          price: `Rs. 105000.00`,
          likes: 17,
          user_avatar: `${FILE_PATHS.USER_PROFILE_PHOTO}/p6.webp`,
          created_at: `10 minutes ago`,
          user: `Jessica`,
          feedback_count: 20,
          stars_check: [`full`, `full`, `full`, `full`, `full`],
        },
        {
          image: `${FILE_PATHS.PRODUCT}/20200119238815794276795-1.jpg`,
          title: `iPhone 7 128GB red`,
          price: `Rs. 53500.00`,
          likes: 12,
          user_avatar: `${FILE_PATHS.USER_PROFILE_PHOTO}/p5.webp`,
          created_at: `15 minutes ago`,
          user: `Jalaal`,
          feedback_count: 13,
          stars_check: [`full`, `full`, `full`, `full`, `full`],
        },
        {
          image: `${FILE_PATHS.PRODUCT}/20200119238815794276795-1.jpg`,
          title: `iPhone 7 128GB red`,
          price: `Rs. 53500.00`,
          likes: 23,
          user_avatar: `${FILE_PATHS.USER_PROFILE_PHOTO}/p7.webp`,
          created_at: `18 minutes ago`,
          user: `Kairaa`,
          feedback_count: 0,
          stars_check: [`empty`, `empty`, `empty`, `empty`, `empty`],
        },
        {
          image: `${FILE_PATHS.PRODUCT}/20200119238815794276795-1.jpg`,
          title: `iPhone 7 128GB red`,
          price: `Rs. 53500.00`,
          likes: 13,
          user_avatar: `${FILE_PATHS.USER_PROFILE_PHOTO}/p2.webp`,
          created_at: `19 minutes ago`,
          user: `Sam`,
          feedback_count: 10,
          stars_check: [`full`, `full`, `full`, `empty`, `empty`],
        },
        {
          image: `${FILE_PATHS.PRODUCT}/20200119238815794276795-1.jpg`,
          title: `iPhone 7 128GB red`,
          price: `Rs. 53500.00`,
          likes: 0,
          user_avatar: `${FILE_PATHS.USER_PROFILE_PHOTO}/p4.webp`,
          created_at: `23 minutes ago`,
          user: `Thomas`,
          feedback_count: 12,
          stars_check: [`full`, `full`, `full`, `full`, `empty`],
        },
        {
          image: `${FILE_PATHS.PRODUCT}/20200119365115794259882-1.jpg`,
          title: `iPhone 7 128GB red`,
          price: `Rs. 53500.00`,
          likes: 0,
          user_avatar: `${FILE_PATHS.USER_PROFILE_PHOTO}/p7.webp`,
          created_at: `24 minutes ago`,
          user: `Clark`,
          feedback_count: 10,
          stars_check: [`full`, `full`, `half`, `empty`, `empty`],
        },
      ],
      maxItemsPerCategory: 10,
    };
  },
  mounted() {},
};
</script>
