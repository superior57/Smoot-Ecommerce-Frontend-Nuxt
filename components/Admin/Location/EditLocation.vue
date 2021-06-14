<template>
  <div class="mt-5 view-edit-location">
    <b-alert
      class="mt-3"
      variant="success"
      dismissible
      fade
      :show="serverAlerts.showSuccessDismissibleAlert"
      @dismissed="serverAlerts.showSuccessDismissibleAlert = false"
    >
      {{ serverAlerts.success }}
    </b-alert>
    <b-alert
      class="mt-3"
      variant="danger"
      dismissible
      fade
      :show="serverAlerts.showErrorDismissibleAlert"
      @dismissed="serverAlerts.showErrorDismissibleAlert = false"
    >
      <!-- eslint-disable -->
      <div v-if="!serverAlerts.error.hasOwnProperty(`error`)">
        <div
          v-for="(error, errorIndex ) in serverAlerts.error"
          :key="errorIndex"
        >
          {{ error[0] }}
        </div>
      </div>
      <div v-else>
        {{ serverAlerts.error.error }}
      </div>
      <!-- eslint-enable -->
    </b-alert>
    <!-- eslint-disable -->
    <validation-observer v-slot="{ handleSubmit }">
      <b-form
        class="form-search-location-by-id"
        autocomplete="off"
        @submit.prevent="handleSubmit(getLocationDetailsById)"
      >
          <b-form-group
            id="input-group-0"
            label-for="location-id"
            label="Location Id"
          >
            <validation-provider
              name="location Id"
              :rules="{required: true, regex: /^[0-9]+$/ }"
              v-slot="{ classes, errors }"
            >
              <b-form-input
                id="location-id"
                v-model="locationIdForSearch"
                type="text"
                placeholder="Location id to edit"
                :class="classes"
                class="max-width-for-input"
                size="sm"
              ></b-form-input>
              <div class="invalid-feedback">{{ errors[0] }}</div>
            </validation-provider>
          </b-form-group>
          <b-form-group
            id="input-group-1"
            label-for="search-filter"
            label="Search filter"
          >
          <validation-provider
            v-slot="{ classes, errors }"
            name="search in"
            :rules="{
              required: false,
            }"
          >
          <b-form-select
            id="search-filter"
            v-model="searchIn"
            :options="editLocationLookupValues.searchInTypes"
            :class="classes"
            class="max-width-for-input"
            size="sm"
          ></b-form-select>
          <div class="invalid-feedback">{{ errors[0] }}</div>
          </validation-provider>
        </b-form-group>
        <b-button
          type="submit"
          size="sm"
          :disabled="searchLocationRequestPending ? true : false"
        >
          Search
        </b-button>
      </b-form>
    </validation-observer>
    <hr />
    <div v-if="searchLocationRequestPending && !hasToShowEmptyState">
      <div class="text-center my-2 default-spinner-container">
        <b-spinner class="default-spinner-border align-middle"></b-spinner>
        <div class="default-spinner-label">Getting location details...</div>
      </div>
    </div>
    <div v-else-if="!searchLocationRequestPending && !hasToShowEmptyState && hasLocation">
      <validation-observer ref="formAddLocation" v-slot="{ handleSubmit }">
        <b-form class="form-add-location" autocomplete="off" spellcheck="false" @submit.prevent="handleSubmit(updateLocation)">
          <div class="form-separator rounded">
            <div class="form-header">
              <h3>
                Edit Location Details
              </h3>
            </div>
            <b-form-group
              id="input-group-2"
              label="District"
              label-for="district"
              class="mt-2"
            >
            <validation-provider
              name="district"
              :rules="{required: true, regex: /^[a-zA-Z0-9-,\s]+$/, max:50 }"
              v-slot="{ classes, errors }"
            >
              <b-form-input
                id="district"
                ref="district"
                v-model="editLocationForm.district"
                type="text"
                placeholder="Edit district"
                :class="classes"
                :disabled="editLocationFormTemp.city ? true : false"
              ></b-form-input>
              <div class="invalid-feedback">{{ errors[0] }}</div>
            </validation-provider>
            </b-form-group>
            <b-form-group
              v-if="editLocationFormTemp.city"
              id="input-group-3"
              :label="editLocationForm.district ? `City of ${editLocationForm.district}` : `City`"
              label-for="city"
              class="mt-2"
            >
            <validation-provider
              name="city"
              :rules="{required: true, regex: /^[a-zA-Z0-9-,\s]+$/, max:50 }"
              v-slot="{ classes, errors }"
            >
              <b-form-input
                id="city"
                ref="city"
                v-model="editLocationForm.city"
                type="text"
                placeholder="Edit city"
                :class="classes"
                :disabled="editLocationFormTemp.city ? false : true"
              ></b-form-input>
              <div class="invalid-feedback">{{ errors[0] }}</div>
            </validation-provider>
            </b-form-group>
          </div>
          <!-- action buttons of updating form -->
          <b-form-group class="mt-2">
                <b-button
                  v-if="!updateLocationRequestPending"
                  class="ml-1"
                  type="submit"
                  >
                    Update
                  </b-button>
                  <b-button
                    v-else
                    disabled
                  >
                    <b-spinner small></b-spinner>
                    Updating...
                  </b-button>
                <b-button
                  v-if="!deleteLocationRequestPending"
                  variant="outline-danger"
                  @click="deleteLocation()"
                >
                  Delete
                </b-button>
                <b-button
                  v-else
                  disabled
                >
                  <b-spinner small></b-spinner>
                  Deleting...
                </b-button>
          </b-form-group>
          <!-- action buttons of updating form -->
        </b-form>
      </validation-observer>
    </div>
    <div v-else-if="!searchLocationRequestPending && !hasToShowEmptyState && !hasLocation">
      <div class="text-error font-90 text-align-center">
        Location not found, make sure you have selected the correct Search filter along with the Location Id
      </div>
    </div>
    <div v-else>
      <div class="text-muted font-90 text-align-center">
        Enter a location Id to edit, and update
      </div>
    </div>
    <!-- eslint-enable -->
  </div>
</template>
<script>
import { ValidationObserver, ValidationProvider } from "vee-validate";
import { ENDPOINTS_FOR_ADMIN } from "@/constants/smoot-api";
export default {
  name: "EditLocation",
  components: {
    ValidationObserver,
    ValidationProvider,
  },
  data() {
    return {
      locationIdForSearch: "",
      hasToShowEmptyState: false,
      hasLocation: false,
      searchIn: "district",
      searchLocationRequestPending: false,
      updateLocationRequestPending: false,
      deleteLocationRequestPending: false,
      editLocationLookupValues: {
        searchInTypes: [
          {
            text: "Search in District",
            value: "district",
          },
          {
            text: "Search in City",
            value: "city",
          },
        ],
      },
      serverAlerts: {
        success: "",
        error: {},
        showErrorDismissibleAlert: false,
        showSuccessDismissibleAlert: false,
      },
      editLocationForm: {
        district: "",
        city: "",
      },
      editLocationFormTemp: {
        district: "",
        city: "",
      },
    };
  },
  watch: {
    "serverAlerts.showErrorDismissibleAlert"() {
      if (!this.serverAlerts.showErrorDismissibleAlert) {
        this.serverAlerts.error = {};
      }
    },
    "serverAlerts.showSuccessDismissibleAlert"() {
      if (!this.serverAlerts.showSuccessDismissibleAlert) {
        this.serverAlerts.success = "";
      }
    },
    "editLocationForm.district"() {
      if (this.editLocationForm.district) {
        this.hasLocation = true;
      }
    },
  },
  mounted() {
    this.hasToShowEmptyState = true;
  },
  methods: {
    getLocationDetailsById() {
      /* eslint-disable */
      this.serverAlerts.showSuccessDismissibleAlert = false;
      this.serverAlerts.showErrorDismissibleAlert = false;
      this.searchLocationRequestPending = true;
      this.hasToShowEmptyState = false;
      this.clearEditLocationform();
      this.$axios.get(`${ENDPOINTS_FOR_ADMIN.LOCATION.GET_LOCATION_TREE_DETAILS}?locationId=${this.locationIdForSearch}&searchIn=${this.searchIn}`, { progress: false })
      .then(function(res) {
        this.editLocationForm.district = res.data.district;
        this.editLocationForm.city = res.data.city;
        this.editLocationFormTemp.district = res.data.district;
        this.editLocationFormTemp.city = res.data.city;
      }.bind(this))
      .catch(function (err) {
        if(err.response.data.hasOwnProperty("error")){
          this.serverAlerts.error.error = err.response.data.error;
          this.serverAlerts.showErrorDismissibleAlert = true;
        }
        this.hasLocation = false;
      }.bind(this)).then(() => {
        this.searchLocationRequestPending = false;
      });
      /* eslint-enable */
    },
    clearEditLocationform() {
      this.editLocationForm.district = "";
      this.editLocationForm.city = "";
      this.editLocationFormTemp.district = "";
      this.editLocationFormTemp.city = "";
    },
    updateLocation() {
      /* eslint-disable */
      const updateLocationData = {};
      this.serverAlerts.showSuccessDismissibleAlert = false;
      this.serverAlerts.showErrorDismissibleAlert = false;
      this.updateLocationRequestPending = true;
      updateLocationData.updateModel = this.searchIn;
      updateLocationData.value = this.editLocationForm.city ? this.editLocationForm.city : this.editLocationForm.district;
      updateLocationData.locationId = this.locationIdForSearch;
      const formData = this.$toFormData(updateLocationData);
      this.$axios.post(`${ENDPOINTS_FOR_ADMIN.LOCATION.UPDATE}?_method=put`, formData)
      .then(function(res) {
        this.serverAlerts.success = res.data.message;
        this.serverAlerts.showSuccessDismissibleAlert = true;
        this.clearEditLocationform();
        this.hasToShowEmptyState = true;

      }.bind(this))
      .catch(function(err){
        if(err.response.data.hasOwnProperty("error")) {
          this.serverAlerts.error.error = err.response.data.error;
        } else {
          this.serverAlerts.error = err.response.data;
        }
        this.serverAlerts.showErrorDismissibleAlert = true;
      }.bind(this))
      .then(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        this.updateLocationRequestPending = false;
      });
      /* eslint-enable */
    },
    deleteLocation() {
      /* eslint-disable */
      this.deleteLocationRequestPending = true;
      this.$axios.delete(`${ENDPOINTS_FOR_ADMIN.LOCATION.DELETE}?locationId=${this.locationIdForSearch}&deleteModel=${this.searchIn}`, { progress: false })
      .then(function(res) {
        this.serverAlerts.success = res.data.message;
        this.serverAlerts.showSuccessDismissibleAlert = true;
        this.clearEditLocationform();
        this.hasToShowEmptyState = true;
      }.bind(this))
      .catch(function(err) {
        if(err.response.data.hasOwnProperty("error")) {
          this.serverAlerts.error.error = err.response.data.error;
        } else {
          this.serverAlerts.error = err.response.data;
        }
        this.serverAlerts.showErrorDismissibleAlert = true;
      }.bind(this))
      .then(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        this.deleteLocationRequestPending = false;
      });
      /* eslint-enable */
    },
  },
};
</script>
