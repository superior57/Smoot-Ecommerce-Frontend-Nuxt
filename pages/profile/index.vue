<template>
  <b-container class="container-profile" rounded fluid="xl">
    <profile-header
      :profile-avatar="`${profile.avatar}?${fileProperties.user.profileAvatar}`"
    ></profile-header>
    <profile-body
      :username="profile.username"
      :count-for-stars-check="profile.count_for_stars_check"
      :stars-check="profile.stars_check"
      :feedback-count="profile.feedback_count"
      :location="profile.location"
      :joined-date="profile.created_at"
      :is-phone-verified="profile.is_phone_verified"
      :is-email-verified="profile.is_email_verified"
      :followers="profile.followers"
      :following="profile.following"
      :listings="listings"
      :product-image-params="fileProperties.product.listing"
    ></profile-body>
  </b-container>
</template>
<script>
import { FILE_PATHS, FILE_QUERY_PARAMETERS } from "@/constants/constants";
export default {
  auth: true,
  name: "Profile",
  data() {
    return {
      fileProperties: {
        user: {
          profileAvatar: FILE_QUERY_PARAMETERS.USER.PROFILE_AVATAR,
        },
        product: {
          listing: FILE_QUERY_PARAMETERS.PRODUCT.LISTING,
        },
      },
      profile: {
        avatar: `${FILE_PATHS.USER_PROFILE_PHOTO}/default-avatar.png`,
        username: `hudhahtc`,
        feedback_count: 10,
        count_for_stars_check: 2.5,
        stars_check: [`full`, `full`, `half`, `empty`, `empty`],
        created_at: `4y 9m`,
        location: `Kandy`,
        is_phone_verified: true,
        is_email_verified: true,
        followers: 3,
        following: 8,
      },
      listings: [
        {
          image: `${FILE_PATHS.PRODUCT}/sdsdsds.jpg`,
          title: `Gaming Headset`,
          price: `Rs. 5696.00`,
          short_description: `Branded headset for a cool`,
          used_or_brand_new: `New`,
          likes: 10,
          url: `/product`,
          isSold: false,
        },
        {
          image: `${FILE_PATHS.PRODUCT}/424242.jpg`,
          title: `Xiaomi 8`,
          price: `Rs. 27000.00`,
          short_description: `Selling this because this is terrible.`,
          used_or_brand_new: `Used`,
          likes: 5,
          url: `/product`,
          isSold: true,
        },
        {
          image: `${FILE_PATHS.PRODUCT}/wefsf.jpg`,
          title: `Redmibook 14`,
          price: `Rs. 161000.00`,
          short_description: `Ultra speed`,
          used_or_brand_new: `New`,
          likes: 9,
          url: `/product`,
          isSold: true,
        },
        {
          image: `${FILE_PATHS.PRODUCT}/aaaas.jpg`,
          title: `W6 Watch`,
          price: `Rs. 56000.00`,
          short_description: `Hala bothiqu...`,
          used_or_brand_new: `Used`,
          likes: 8,
          url: `/product`,
          isSold: false,
        },
        {
          image: `${FILE_PATHS.PRODUCT}/dede.jpg`,
          title: `Electric Scooter`,
          price: `Rs. 71000.00`,
          short_description: `Samnung bothiqu...`,
          used_or_brand_new: `Used`,
          likes: 10,
          url: `/product`,
          isSold: false,
        },
        {
          image: `${FILE_PATHS.PRODUCT}/hysshh.jpg`,
          title: `Mijia Sneakers`,
          price: `Rs. 8000.00`,
          short_description: `Samnung bothiqu...`,
          used_or_brand_new: `New`,
          likes: 6,
          url: `/product`,
          isSold: false,
        },
        {
          image: `${FILE_PATHS.PRODUCT}/gbgbg.jpg`,
          title: `Hair Clip`,
          price: `Rs. 6900.00`,
          short_description: `Samnung bothiqu...`,
          used_or_brand_new: `Used`,
          likes: 1,
          url: `/product`,
          isSold: false,
        },
        {
          image: `${FILE_PATHS.PRODUCT}/gagagag.jpg`,
          title: `Portable Fan`,
          price: `Rs. 2000.00`,
          short_description: `Samnung bothiqu...`,
          used_or_brand_new: `Used`,
          likes: 1,
          url: `/product`,
          isSold: true,
        },
        {
          image: `${FILE_PATHS.PRODUCT}/gggsggggggg.jpg`,
          title: `Logitech G304`,
          price: `Rs. 4000.00`,
          short_description: `Samnung bothiqu...`,
          used_or_brand_new: `Used`,
          likes: 10,
          url: `/product`,
          isSold: false,
        },
        {
          image: `${FILE_PATHS.PRODUCT}/ffffff.jpg`,
          title: `Redmi AirDots`,
          price: `Rs. 36000.00`,
          short_description: `Samnung bothiqu...`,
          used_or_brand_new: `Used`,
          likes: 15,
          url: `/product`,
          isSold: false,
        },
      ],
    };
  },
};
</script>
