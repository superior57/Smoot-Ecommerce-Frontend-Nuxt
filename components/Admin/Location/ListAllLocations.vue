<template>
  <!-- eslint-disable-->
  <div class="mt-5">
    <b-alert
      class="mt-3"
      variant="danger"
      dismissible
      fade
      :show="serverAlerts.showErrorDismissibleAlert"
      @dismissed="serverAlerts.showErrorDismissibleAlert = false"
    >
      {{ serverAlerts.error }}
    </b-alert>
    <b-container class="container-list-all-locations">
      <b-row>
        <b-col xl="6" lg="6" md="6" sm="12" cols="12" class="left-col no-left-padding">
          <b-input-group size="sm" class="input-group-category-search">
              <b-input-group-prepend is-text>
                <b-icon icon="search"></b-icon>
              </b-input-group-prepend>
            <b-form-input
              v-model="filter"
              type="search"
              placeholder="Search a location..."
            ></b-form-input>
          </b-input-group>
        </b-col>
        <b-col xl="6" lg="6" md="6" sm="12" cols="12" class="right-col no-right-padding">
          <b-button
            size="sm"
            variant="outline-dark"
            class="btn-table-refresh"
            @click="viewAllLocations()"
          >
            <i class="fa fa-refresh" aria-hidden="true"></i>
            Refresh list
          </b-button>
        </b-col>
      </b-row>
    </b-container>
    <div v-if="isBusy" class="mt-3">
      <b-skeleton-table
        class="mt-3"
        :rows="10"
        :columns="4"
        :table-props="{ bordered: false, striped: true, responsive: true, small: false }"
      ></b-skeleton-table>
    </div>
    <b-table
      v-else
      id="category-table"
      class="mt-3"
      striped
      responsive
      hover
      :fields="fields"
      :items="locations"
      :sort-by.sync="sortBy"
      :sort-desc.sync="sortDesc"
      show-empty
      :per-page="perPage"
      :current-page="currentPage"
      :filter="filter"
    >
      <template #empty>
        <div class="text-align-center">{{ emptyLocationListMessage }}</div>
      </template>
    </b-table>
    <b-pagination
      v-if="locations.length && !isBusy"
      v-model="currentPage"
      :total-rows="rows"
      :per-page="perPage"
      variant="dark"
      aria-controls="category-table"
    ></b-pagination>
    <p
      v-if="locations.length && !isBusy"
      class="mt-3"
    >
      Current Page: {{ currentPage }}
    </p>
  </div>
  <!-- eslint-enable-->
</template>
<script>
import { ENDPOINTS_FOR_ADMIN } from "@/constants/smoot-api";
export default {
  name: "ListAllLocations",
  data() {
    return {
      filter: null,
      isBusy: false,
      emptyLocationListMessage: "",
      sortBy: "district",
      sortDesc: false,
      locations: [],
      fields: [
        { key: "district_id", sortable: false },
        { key: "district", sortable: true },
        { key: "city_id", sortable: false },
        { key: "city", sortable: true },
      ],
      perPage: 10,
      currentPage: 1,
      serverAlerts: {
        error: "",
        showErrorDismissibleAlert: false,
      },
    };
  },
  computed: {
    rows() {
      return this.locations.length;
    },
  },
  watch: {
    "serverAlerts.showErrorDismissibleAlert"() {
      if (!this.serverAlerts.showErrorDismissibleAlert) {
        this.serverAlerts.error = "";
      }
    },
  },
  mounted() {
    this.viewAllLocations();
  },
  methods: {
    viewAllLocations() {
      /* eslint-disable */
      this.serverAlerts.showErrorDismissibleAlert = false;
      this.isBusy = true;
      this.$axios.get(ENDPOINTS_FOR_ADMIN.LOCATION.VIEW_ALL_LOCATIONS, { progress: false })
      .then(function(res) {
        this.locations = res.data.location_list;
      }.bind(this))
      .catch(function(err) {
        if(err.response.data.hasOwnProperty("error")){
          this.serverAlerts.error = err.response.data.error;
          this.serverAlerts.showErrorDismissibleAlert = true;
        }
        if(err.response.data.hasOwnProperty("message")){
          this.emptyLocationListMessage = err.response.data.message;
        } 
        this.locations = [];
      }.bind(this))
      .then(() => {
        this.isBusy = false;
      });
       /* eslint-enable */
    },
  },
};
</script>
