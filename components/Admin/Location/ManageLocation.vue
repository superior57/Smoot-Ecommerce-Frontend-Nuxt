<template>
  <b-row>
    <h2 class="text-align-center">Manage Locations</h2>
    <b-col cols="12">
      <div>
        <b-button-group size="sm">
          <!--eslint-disable-->
          <b-button
            :class="showAddLocationTab && !showListLocationTab && !showEditLocationTab ? null : `default-btn-outline`"
            @click="(showAddLocationTab = true), (showListLocationTab = false), (showEditLocationTab = false)"
          >
            Add Location
          </b-button>
          <b-button
            :class="!showAddLocationTab && showListLocationTab && !showEditLocationTab ? null : `default-btn-outline`"
            @click="(showAddLocationTab = false), (showListLocationTab = true), (showEditLocationTab = false)"
          >
            View Location List
          </b-button>
          <b-button
            :class="!showAddLocationTab && !showListLocationTab && showEditLocationTab ? null : `default-btn-outline`"
            @click="(showAddLocationTab = false), (showListLocationTab = false), (showEditLocationTab = true)"
          >
            Edit Location
          </b-button>
          <!--eslint-enable-->
        </b-button-group>
      </div>
    </b-col>
    <b-col v-if="showAddLocationTab">
      <add-location></add-location>
    </b-col>
    <b-col v-if="showListLocationTab">
      <list-all-locations></list-all-locations>
    </b-col>
    <b-col v-if="showEditLocationTab">
      <edit-location></edit-location>
    </b-col>
  </b-row>
</template>
<script>
export default {
  name: "ManageLocation",
  data() {
    return {
      showAddLocationTab: false,
      showEditLocationTab: true,
      showListLocationTab: false,
    };
  },
};
</script>
