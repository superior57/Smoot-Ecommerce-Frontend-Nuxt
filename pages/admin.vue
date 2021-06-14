<template>
  <b-container
    class="container-admin no-padding-left-and-right-for-container-768"
    rounded
    fluid="xl"
  >
    <client-only placeholder="Loading...">
      <b-container
        fluid="xl"
        class="no-padding-left-and-right-for-container-768"
      >
        <div>
          <b-card no-body>
            <b-tabs card>
              <b-tab title="Category" active>
                <b-card-text>
                  <manage-category></manage-category>
                </b-card-text>
              </b-tab>
              <b-tab title="Location" lazy>
                <b-card-text>
                  <manage-location></manage-location>
                </b-card-text>
              </b-tab>
            </b-tabs>
          </b-card>
        </div>
      </b-container>
    </client-only>
  </b-container>
</template>
<script>
export default {
  auth: false,
  name: "Admin",
};
</script>
