<template>
  <b-container class="container-slider" fluid="xl">
    <div>
      <b-carousel id="carousel-fade" fade indicators :interval="1700" controls>
        <b-carousel-slide
          v-for="(slider, sliderIndex) in sliderSet"
          :key="sliderIndex"
          :img-src="`${slider.image}?${fileProperties.slider.home}`"
        ></b-carousel-slide>
      </b-carousel>
    </div>
  </b-container>
</template>
<script>
import { FILE_PATHS, FILE_QUERY_PARAMETERS } from "@/constants/constants";
export default {
  name: "Slider",
  data() {
    return {
      sliderSet: [
        {
          image: `${FILE_PATHS.HOME_SLIDER}/slider1.jpg`,
        },
        {
          image: `${FILE_PATHS.HOME_SLIDER}/slider2.jpg`,
        },
      ],
      fileProperties: {
        slider: {
          home: FILE_QUERY_PARAMETERS.SLIDER.HOME,
        },
      },
    };
  },
};
</script>
