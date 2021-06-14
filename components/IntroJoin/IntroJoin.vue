<template>
  <b-container class="container-intro-join rounded" fluid="xl">
    <h1>Snap to Sell, Chat to Buy for Free</h1>
    <p class="lead">
      {{ intro }}
    </p>
    <b-button size="sm">Join now</b-button>
  </b-container>
</template>
<script>
export default {
  name: "IntroJoin",
  data() {
    return {
      intro: `Buy and sell with friends, people of similar Interests, and communities that you care about! List something for sale in 30 seconds and buy what you need in a chat.`,
    };
  },
};
</script>
