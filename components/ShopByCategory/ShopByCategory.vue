<template>
  <b-container class="container-shop-by-category" fluid="xl">
    <h3 class="text-align-center">Shop by category</h3>
    <b-row class="row-shop-categories">
      <b-col
        v-for="(category, categoryIndex) in categories"
        :key="categoryIndex"
        lg="3"
        md="4"
        sm="6"
        cols="6"
      >
        <h4 class="head-category-sub font-600 cursor-pointer">
          {{ category.main }}
        </h4>
        <div
          v-for="(sub1, sub1Index) in category.sub1"
          :key="sub1Index"
          class="sub-category cursor-pointer"
        >
          {{ sub1 }}
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
// eslint-ignore
export default {
  name: "ShopByCategory",
  data() {
    return {
      categories: [
        {
          main: `Cars`,
          sub1: [`Vehicle Rentals`, `Other Vehicles`, `Busses`],
        },
        {
          main: `Women's Fashion`,
          sub1: [
            `Women's Clothes`,
            `Women's Bags and Wallets`,
            `Women's Shoes`,
            `Women's Accessories`,
            `Women's Watches`,
            `Muslimah Fashion`,
          ],
        },
        {
          main: `Electronics`,
          sub1: [
            `Mobile`,
            `Computers`,
            `TVs, and Entertainment`,
            `Systems`,
            `Audio`,
            `Computer Parts, and Accessories`,
            `Electronics and Gadgets - Others`,
          ],
        },
        {
          main: `Health, and Beauty`,
          sub1: [
            `Hair Care`,
            `Skin, Bath, and Body`,
            `Makeup`,
            `Men's Grooming`,
            `Perfumes, Nail Care`,
            `Perfumes, Nail Care And Others`,
          ],
        },
        {
          main: `Tickets, and Vouchers`,
          sub1: [`Event Tickets`, `Gift Cards And Vouchers`],
        },
      ],
    };
  },
};
</script>
