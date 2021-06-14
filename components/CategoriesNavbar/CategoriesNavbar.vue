<template>
  <b-container class="container-caterogies-navbar rounded">
    <b-row align-h="center">
      <b-col
        v-for="(category, categoryIndex) in categories"
        :key="categoryIndex"
        cols="2"
      >
        <div class="category-section">
          <img
            :src="category.icon"
            :alt="category.label"
            width="40"
            height="40"
          />
          <div class="font-600">{{ category.label }}</div>
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
import { FILE_PATHS } from "@/constants/constants";
export default {
  name: "CategoriesNavbar",
  data() {
    return {
      categories: [
        {
          icon: `${FILE_PATHS.NAVBAR_CATEGORY}/womens-fashion.svg`,
          label: "Women's Fashion",
        },
        {
          icon: `${FILE_PATHS.NAVBAR_CATEGORY}/mens-fashion.svg`,
          label: "Men's Fashion",
        },
        {
          icon: `${FILE_PATHS.NAVBAR_CATEGORY}/electronics.svg`,
          label: "Electronics",
        },
        {
          icon: `${FILE_PATHS.NAVBAR_CATEGORY}/home-and-furniture.svg`,
          label: "Home & Furniture",
        },
      ],
    };
  },
};
</script>
