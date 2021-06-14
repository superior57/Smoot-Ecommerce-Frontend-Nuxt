<template>
  <div>
    <b-container class="container-latest-posts rounded" fluid="xl">
      <b-row class="row-post">
        <h2 class="post-head font-600">Check out the latest Items</h2>
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
                      :src="`${post.user_avatar}?${fileProperties.user.avatar}`"
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
                  :src="`${post.image}?${fileProperties.product.latestItem}`"
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
  name: "CategoryWise",
  data() {
    return {
      posts: [
        {
          image: `${FILE_PATHS.PRODUCT}/sdsdsds.jpg`,
          title: `Gaming Headset`,
          price: `Rs. 5696.00`,
          likes: 10,
          user_avatar: `${FILE_PATHS.USER_PROFILE_PHOTO}/no-a.png`,
          created_at: `5 minutes ago`,
          user: `John`,
          feedback_count: 1,
          stars_check: [`full`, `full`, `half`, `empty`, `empty`],
          url: "/product",
        },
        {
          image: `${FILE_PATHS.PRODUCT}/424242.jpg`,
          title: `Xiaomi 8`,
          price: `Rs. 27000.00`,
          likes: 10,
          user_avatar: `${FILE_PATHS.USER_PROFILE_PHOTO}/no-a.png`,
          created_at: `7 minutes ago`,
          user: `Thomas`,
          feedback_count: 10,
          stars_check: [`full`, `full`, `full`, `empty`, `empty`],
        },
        {
          image: `${FILE_PATHS.PRODUCT}/wefsf.jpg`,
          title: `Redmibook 14`,
          price: `Rs. 161000.00`,
          likes: 10,
          user_avatar: `${FILE_PATHS.USER_PROFILE_PHOTO}/p2.webp`,
          created_at: `11 minutes ago`,
          user: `Samuel`,
          feedback_count: 5,
          stars_check: [`full`, `full`, `full`, `full`, `full`],
        },
        {
          image: `${FILE_PATHS.PRODUCT}/aaaas.jpg`,
          title: `W6 Watch`,
          price: `Rs. 56000.00`,
          likes: 10,
          user_avatar: `${FILE_PATHS.USER_PROFILE_PHOTO}/p6.webp`,
          created_at: `25 minutes ago`,
          user: `Ureeka`,
          feedback_count: 1,
          stars_check: [`full`, `half`, `empty`, `empty`, `empty`],
        },
        {
          image: `${FILE_PATHS.PRODUCT}/dede.jpg`,
          title: `Electric Scooter`,
          price: `Rs. 71000.00`,
          likes: 10,
          user_avatar: `${FILE_PATHS.USER_PROFILE_PHOTO}/p6.webp`,
          created_at: `30 minutes ago`,
          user: `Ureeka`,
          feedback_count: 5,
          stars_check: [`full`, `empty`, `empty`, `empty`, `empty`],
        },
        {
          image: `${FILE_PATHS.PRODUCT}/hysshh.jpg`,
          title: `Mijia Sneakers`,
          price: `Rs. 8000.00`,
          likes: 10,
          user_avatar: `${FILE_PATHS.USER_PROFILE_PHOTO}/p4.webp`,
          created_at: `40 minutes ago`,
          user: `Samith`,
          feedback_count: 4,
          stars_check: [`full`, `full`, `full`, `empty`, `empty`],
        },
        {
          image: `${FILE_PATHS.PRODUCT}/gbgbg.jpg`,
          title: `Hair Clip`,
          price: `Rs. 6900.00`,
          likes: 10,
          user_avatar: `${FILE_PATHS.USER_PROFILE_PHOTO}/no-a.png`,
          created_at: `45 minutes ago`,
          user: `John`,
          feedback_count: 3,
          stars_check: [`full`, `full`, `full`, `empty`, `empty`],
        },
        {
          image: `${FILE_PATHS.PRODUCT}/gagagag.jpg`,
          title: `Portable Fan`,
          price: `Rs. 2000.00`,
          likes: 10,
          user_avatar: `${FILE_PATHS.USER_PROFILE_PHOTO}/p3.webp`,
          created_at: `46 minutes ago`,
          user: `John`,
          feedback_count: 5,
          stars_check: [`full`, `full`, `full`, `full`, `empty`],
        },
        {
          image: `${FILE_PATHS.PRODUCT}/gggsggggggg.jpg`,
          title: `Logitech G304`,
          price: `Rs. 4000.00`,
          likes: 10,
          user_avatar: `${FILE_PATHS.USER_PROFILE_PHOTO}/no-a.png`,
          created_at: `50 minutes ago`,
          user: `Peeter`,
          feedback_count: 6,
          stars_check: [`full`, `full`, `full`, `half`, `empty`],
        },
        {
          image: `${FILE_PATHS.PRODUCT}/ffffff.jpg`,
          title: `Redmi AirDots`,
          price: `Rs. 36000.00`,
          likes: 10,
          user_avatar: `${FILE_PATHS.USER_PROFILE_PHOTO}/p4.webp`,
          created_at: `55 minutes ago`,
          user: `Ifam`,
          feedback_count: 7,
          stars_check: [`full`, `full`, `full`, `full`, `full`],
        },
      ],
      maxItemsPerCategory: 10,
      fileProperties: {
        product: {
          latestItem: FILE_QUERY_PARAMETERS.PRODUCT.LATEST_ITEM,
        },
        user: {
          avatar: FILE_QUERY_PARAMETERS.USER.AVATAR,
        },
      },
    };
  },
  mounted() {},
};
</script>
