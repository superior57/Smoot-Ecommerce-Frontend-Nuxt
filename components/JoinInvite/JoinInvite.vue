<template>
  <b-container class="container-join-invite text-align-center" fluid="xl">
    <p class="lead">
      {{ intro }}
    </p>
    <b-button size="sm">Join now</b-button>
  </b-container>
</template>
<script>
export default {
  name: "JoinInvite",
  data() {
    return {
      intro: `Sell your pre-loved Items in 30 seconds, and enjoy shopping in our unique community now!`,
    };
  },
};
</script>
