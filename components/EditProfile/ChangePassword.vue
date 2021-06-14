<template>
  <b-container class="container-change-password-form" fluid="sm">
    <h1 class="container-header">Change password</h1>
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
    <validation-observer ref="form" v-slot="{ handleSubmit }">
      <b-form
        class="form-forgot-password"
        @submit.prevent="handleSubmit(changePassword)"
      >
        <b-form-group
          id="input-group-1"
          label="Current password"
          label-for="input-current-password"
        >
          <validation-provider
            v-slot="{ classes, errors }"
            name="current password"
            :rules="{
              required: true,
              min: 5,
              max: 40,
            }"
          >
            <b-form-input
              id="input-current-password"
              v-model="passwordChangeForm.currentPassword"
              type="password"
              :class="classes"
            ></b-form-input>
            <div class="invalid-feedback">{{ errors[0] }}</div>
          </validation-provider>
        </b-form-group>
        <b-form-group
          id="input-group-2"
          label="New password"
          label-for="input-new-password"
        >
          <validation-provider
            v-slot="{ classes, errors }"
            name="new password"
            :rules="{
              required: true,
              min: 5,
              max: 40,
            }"
            vid="confirmation"
          >
            <b-form-input
              id="input-new-password"
              v-model="passwordChangeForm.newPassword"
              type="password"
              :class="classes"
            ></b-form-input>
            <div class="invalid-feedback">{{ errors[0] }}</div>
          </validation-provider>
        </b-form-group>
        <b-form-group
          id="input-group-3"
          label="Confirm new password"
          label-for="input-confirm-new-password"
        >
          <validation-provider
            v-slot="{ classes, errors }"
            name="confirm new password"
            rules="required|confirmed:confirmation"
          >
            <b-form-input
              id="input-confirm-new-password"
              v-model="passwordChangeForm.confirmNewPassword"
              type="password"
              :class="classes"
            ></b-form-input>
            <div class="invalid-feedback">{{ errors[0] }}</div>
          </validation-provider>
        </b-form-group>
        <b-button v-if="!changePasswordRequestPending" type="submit" size="sm">
          Save changes
        </b-button>
        <b-button v-else disabled>
          <b-spinner small></b-spinner>
          Changing password...
        </b-button>
      </b-form>
    </validation-observer>
  </b-container>
</template>
<script>
import { ValidationObserver, ValidationProvider } from "vee-validate";
import { USER_PROFILE_ENDPOINTS } from "@/constants/smoot-api";
export default {
  name: "ChangePassword",
  components: {
    ValidationObserver,
    ValidationProvider,
  },
  data() {
    return {
      passwordChangeForm: {
        currentPassword: "",
        newPassword: "",
        confirmNewPassword: "",
      },
      serverAlerts: {
        success: "",
        error: "",
        showErrorDismissibleAlert: false,
        showSuccessDismissibleAlert: false,
      },
      changePasswordRequestPending: false,
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
    changePassword() {
      /* eslint-disable */
      this.serverAlerts.showErrorDismissibleAlert = false;
      this.serverAlerts.showSuccessDismissibleAlert = false;
      this.changePasswordRequestPending = true;
      const formData = this.$toFormData(this.passwordChangeForm);
      this.$axios.post(`${USER_PROFILE_ENDPOINTS.CHANGE_PASSWORD}?_method=put`, formData)
        .then(function(res) {
          this.serverAlerts.success = res.data.message;
          this.serverAlerts.showSuccessDismissibleAlert = true;
          this.clearPasswordChangeForm();
          this.$refs.form.reset();
        }.bind(this))
        .catch(function (err) {
          if(err.response.data.hasOwnProperty("message")){
          this.serverAlerts.error = err.response.data.message;
        } else {
          const errors = err.response.data;
          for (const key in errors) {
            this.serverAlerts.error += `${errors[key][0]} `;
          }
        }
        this.serverAlerts.showErrorDismissibleAlert = true;
        }.bind(this)).then(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        this.changePasswordRequestPending = false;
      });
      /* eslint-enable */
    },
    clearPasswordChangeForm() {
      this.passwordChangeForm.currentPassword = "";
      this.passwordChangeForm.newPassword = "";
      this.passwordChangeForm.confirmNewPassword = "";
    },
  },
};
</script>
