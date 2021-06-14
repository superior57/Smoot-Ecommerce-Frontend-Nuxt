<template>
  <div>
    <b-container
      v-for="(post, postIndex) in posts"
      :key="postIndex"
      class="container-latest-posts rounded"
      fluid="xl"
    >
      <b-row class="row-post">
        <h2 class="post-head font-600">{{ post.category }}</h2>
        <b-col
          v-if="post.items.length === maxItemsPerCategory"
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
            v-for="(item, itemIndex) in post.items"
            :key="itemIndex"
            class="col-post col-5-post-grid"
          >
            <!-- eslint-disable -->
            <div
              v-if="(post.items.length === maxItemsPerCategory && itemIndex + 1 === post.items.length)"
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
            <div class="container-post">
              <div class="post-top">
                <b-row>
                  <b-col cols="3" align-self="center">
                    <b-img
                      :src="`${item.user_avatar}?${fileProperties.user.avatar}`"
                      rounded="circle"
                      align-self="center"
                    ></b-img>
                  </b-col>
                  <b-col cols="9">
                    <div>
                      {{ item.user }}
                    </div>
                    <div class="post-stars">
                      <!-- eslint-disable -->
                      <span v-for="(starCheck, starCheckIndex) in item.stars_check"
                        :key="starCheckIndex"
                        :class="starCheck === `full` ? `fa fa-star feedback-star-checked` :
                        (starCheck === `half` ? `fa fa-star-half feedback-star-checked star-half` : `fa fa-star-o`)"
                      ></span>
                      <!-- eslint-enable -->
                      <span>{{ `(${item.feedback_count})` }}</span>
                    </div>
                    <div class="post-time">
                      {{ item.created_at }}
                    </div>
                  </b-col>
                </b-row>
              </div>
              <div class="post-image-container">
                <img
                  :src="`${item.image}?${fileProperties.product.categorytItem}`"
                  class="post-image"
                />
              </div>
              <h4 class="post-title">{{ item.title }}</h4>
              <div class="post-price">
                {{ item.price }}
                <div class="post-like">
                  <i
                    v-b-tooltip.hover.right
                    title="Like product"
                    class="fa fa-heart-o"
                    aria-hidden="true"
                  ></i>
                  <span>{{ item.likes }}</span>
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
  name: "FromAllCategories",
  data() {
    return {
      posts: [
        {
          category: `Electronics`,
          items: [
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
        },
        {
          category: `Women's Fashion`,
          items: [
            {
              image: `${FILE_PATHS.PRODUCT}/202001195840157942892448418749_2202237016487470_4182635789332512768_o.png`,
              title: `Top20181203`,
              price: `Rs. 1350.00`,
              likes: 2,
              user_avatar: `${FILE_PATHS.USER_PROFILE_PHOTO}/p6.webp`,
              created_at: `2 minutes ago`,
              user: `John`,
              feedback_count: 10,
              stars_check: [`full`, `full`, `half`, `empty`, `empty`],
            },
            {
              image: `${FILE_PATHS.PRODUCT}/202001193095157942903348357694_2202236996487472_1387581956266393600_o.png`,
              title: `Top 20181202`,
              price: `Rs. 1350.00`,
              likes: 1,
              user_avatar: `${FILE_PATHS.USER_PROFILE_PHOTO}/p6.webp`,
              created_at: `4 minutes ago`,
              user: `Simith`,
              feedback_count: 4,
              stars_check: [`full`, `full`, `full`, `empty`, `empty`],
            },
            {
              image: `${FILE_PATHS.PRODUCT}/202001198730157942914548356281_2202237039820801_3708301860315070464_o.png`,
              title: `Top 20181204`,
              price: `Rs. 1350.00`,
              likes: 10,
              user_avatar: `${FILE_PATHS.USER_PROFILE_PHOTO}/p6.webp`,
              created_at: `10 minutes ago`,
              user: `Jessica`,
              feedback_count: 10,
              stars_check: [`full`, `full`, `full`, `half`, `empty`],
            },
            {
              image: `${FILE_PATHS.PRODUCT}/202001199676157942920548275801_2202237296487442_3111641206803660800_o.png`,
              title: `Top 20181205`,
              price: `Rs. 53500.00`,
              likes: 12,
              user_avatar: `${FILE_PATHS.USER_PROFILE_PHOTO}/p6.webp`,
              created_at: `20 minutes ago`,
              user: `Faaruk`,
              feedback_count: 10,
              stars_check: [`full`, `full`, `full`, `full`, `full`],
            },
            {
              image: `${FILE_PATHS.PRODUCT}/202001195840157942892448418749_2202237016487470_4182635789332512768_o.png`,
              title: `Top20181203`,
              price: `Rs. 1350.00`,
              likes: 16,
              user_avatar: `${FILE_PATHS.USER_PROFILE_PHOTO}/p6.webp`,
              created_at: `22 minutes ago`,
              user: `John`,
              feedback_count: 10,
              stars_check: [`full`, `empty`, `empty`, `empty`, `empty`],
            },
            {
              image: `${FILE_PATHS.PRODUCT}/202001193095157942903348357694_2202236996487472_1387581956266393600_o.png`,
              title: `Top20181203`,
              price: `Rs. 1350.00`,
              likes: 18,
              user_avatar: `${FILE_PATHS.USER_PROFILE_PHOTO}/p6.webp`,
              created_at: `30 minutes ago`,
              user: `Kiyaas`,
              feedback_count: 1,
              stars_check: [`full`, `half`, `empty`, `empty`, `empty`],
            },
          ],
        },
      ],
      maxItemsPerCategory: 10,
      fileProperties: {
        product: {
          categorytItem: FILE_QUERY_PARAMETERS.PRODUCT.CATEGORY_ITEM,
        },
        user: {
          avatar: FILE_QUERY_PARAMETERS.USER.AVATAR,
        },
      },
    };
  },
};
</script>
