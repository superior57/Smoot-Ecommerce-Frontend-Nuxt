<template>
  <div class="mt-5">
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
      {{ serverAlerts.error }}
    </b-alert>
    <!-- eslint-disable -->
    <validation-observer ref="formAddLocation" v-slot="{ handleSubmit }">
    <b-form class="form-add-location" autocomplete="off" spellcheck="false" @submit.prevent="handleSubmit(submitLocationData)">
      <div class="form-separator rounded">
        <div class="form-header">
          <h3>
            Add Location
          </h3>
        </div>
        <b-form-group
          id="input-group-1"
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
            v-model="addLocationForm.district"
            type="text"
            placeholder="Enter district"
            :class="classes"
          ></b-form-input>
          <div class="invalid-feedback">{{ errors[0] }}</div>
        </validation-provider>
        </b-form-group>
        <b-form-group
          id="input-group-2"
          :label="addLocationForm.district ? `City of ${addLocationForm.district}` : `City`"
          label-for="city"
          class="mt-2"
        >
        <validation-provider
          name="city"
          :rules="{required: false, regex: /^[a-zA-Z0-9-,\s]+$/, max:50 }"
          v-slot="{ classes, errors }"
        >
          <b-form-input
            id="city"
            ref="city"
            v-model="addLocationForm.city"
            type="text"
            placeholder="Enter city"
            :class="classes"
          ></b-form-input>
          <div class="invalid-feedback">{{ errors[0] }}</div>
        </validation-provider>
        </b-form-group>
      </div>
      <b-form-group class="mt-2">
        <b-button v-if="!saveLocationRequestPending" type="submit">Save</b-button>
        <b-button v-else disabled>
          <b-spinner small></b-spinner>
          Saving location...
        </b-button>
      </b-form-group>
    </b-form>
    </validation-observer>
    <!-- eslint-enable -->
  </div>
</template>
<script>
import { ValidationObserver, ValidationProvider } from "vee-validate";
import { ENDPOINTS_FOR_ADMIN } from "@/constants/smoot-api";
export default {
  name: "AddLocation",
  components: {
    ValidationObserver,
    ValidationProvider,
  },
  data() {
    return {
      addLocationForm: {
        district: "",
        city: "",
      },
      saveLocationRequestPending: false,
      serverAlerts: {
        success: "",
        error: "",
        showErrorDismissibleAlert: false,
        showSuccessDismissibleAlert: false,
      },
    };
  },
  watch: {
    "serverAlerts.showSuccessDismissibleAlert"() {
      if (!this.serverAlerts.showSuccessDismissibleAlert) {
        this.serverAlerts.success = "";
      } else {
        this.serverAlerts.showErrorDismissibleAlert = false;
      }
    },
    "serverAlerts.showErrorDismissibleAlert"() {
      if (!this.serverAlerts.showErrorDismissibleAlert) {
        this.serverAlerts.error = "";
      } else {
        this.serverAlerts.showSuccessDismissibleAlert = false;
      }
    },
  },
  methods: {
    submitLocationData() {
      /* eslint-disable */
      this.serverAlerts.showErrorDismissibleAlert = false;
      this.serverAlerts.showSuccessDismissibleAlert = false;
      this.saveLocationRequestPending = true;
      const formData = this.$toFormData(this.addLocationForm);
      this.$axios.post(ENDPOINTS_FOR_ADMIN.LOCATION.ADD, formData)
      .then(function(res) {
        this.serverAlerts.success = res.data.message;
        this.serverAlerts.showSuccessDismissibleAlert = true;
        this.clearAddLocationForm();
        this.$refs.formAddLocation.reset();
        this.removeFocusOfAddLocationForm();
      }.bind(this))
      .catch(function(err) {
        if(err.response.data.hasOwnProperty("error")){
          this.serverAlerts.error = err.response.data.error;
        } else {
          const errors = err.response.data;
          for (const key in errors) {
            this.serverAlerts.error += `${errors[key][0]} `;
          }
        }
        this.serverAlerts.showErrorDismissibleAlert = true;
      }.bind(this))
      .then(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        this.saveLocationRequestPending = false;
      });
      /* eslint-enable */
    },
    clearAddLocationForm() {
      this.addLocationForm.district = "";
      this.addLocationForm.city = "";
    },
    removeFocusOfAddLocationForm() {
      this.$refs.district.blur();
      this.$refs.city.blur();
    },
  },
};
</script>
