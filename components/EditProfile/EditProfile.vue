<template>
  <b-container class="container-edit-profile-form" fluid="sm">
    <!-- eslint-disable -->
    <b-modal
      ref="modal-change-mobile-number"
      b-modal
      centered
      hide-header
      hide-footer
      no-close-on-backdrop
      no-close-on-esc
      content-class="shadow"
      size="sm"
    >
      <div class="text-align-center mb-1">
        <div class="font-bold">Update Mobile Number</div>
        <hr />
        <b-alert
          class="mt-3 text-align-left modal-alert-success"
          variant="success"
          dismissible
          fade
          :show="serverAlertsForUpdateMobileNumberModal.showSuccessDismissibleAlert"
          @dismissed="serverAlertsForUpdateMobileNumberModal.showSuccessDismissibleAlert = false"
        >
          {{ serverAlertsForUpdateMobileNumberModal.success }}
        </b-alert>
        <b-alert
          class="mt-3 text-align-left modal-alert-error"
          variant="danger"
          dismissible
          fade
          :show="serverAlertsForUpdateMobileNumberModal.showErrorDismissibleAlert"
          @dismissed="serverAlertsForUpdateMobileNumberModal.showErrorDismissibleAlert = false"
          >
            {{ serverAlertsForUpdateMobileNumberModal.error }}
          </b-alert>
        <div v-if="!hasToShowNewMobileVerificationForm" class="text-align-left">
          <validation-observer
            ref="formUpdateMobileNumber"
            v-slot="{ handleSubmit }"
          >
            <b-form @submit.prevent="handleSubmit(updateMobileNumber)" autocomplete="off">
              <b-form-group
                id="input-group-10"
                description="Make sure it's correct, before updating"
              >
                <validation-provider
                  v-slot="{ classes, errors }"
                  name="mobile number"
                  :rules="{
                    required: true,
                    regex_for_mobile: /^[0-9]{9,9}$/,
                  }"
                >
                  <b-input-group size="sm">
                    <b-input-group-prepend is-text>
                      <span>🇱🇰</span>&nbsp;<span>+94</span>
                    </b-input-group-prepend>
                    <b-form-input
                      id="input-mobile"
                      v-model="newMobileNumber"
                      type="text"
                      placeholder="Mobile number"
                      :class="classes"
                    ></b-form-input>
                    <div class="invalid-feedback">
                      {{ errors[0] }}
                    </div>
                  </b-input-group>
                </validation-provider>
              </b-form-group>
              <div>
                <b-button
                  v-if="!updateMobileNumberRequestPending"
                  block
                  pill
                  size="sm"
                  type="submit"
                  :disabled="isDisabledMobileNumberUpdate ? true : false"
                >
                  Update
                </b-button>
                <b-button
                  v-else
                  block
                  pill
                  size="sm"
                  disabled
                >
                  <b-spinner small></b-spinner>
                  Updating...
                </b-button>
                <hr />
                <b-button
                  block
                  pill
                  size="sm"
                  class="btn-smoot-primary-outline"
                  @click="closeModalChangeMobileNumber"
                >
                  {{ closeLabelForModalChangeMobileNumber }}
                </b-button>
              </div>
            </b-form>
          </validation-observer>
        </div>
        <div v-else class="text-align-left">
          <validation-observer
            ref="formEnterVerificationCode"
            v-slot="{ handleSubmit }"
          >
            <b-form @submit.prevent="handleSubmit(sendVerificationCode)" autocomplete="off">
              <b-form-group
                id="input-group-11"
                :description="formAbout.verification"
              >
                <validation-provider
                  v-slot="{ classes, errors }"
                  name="verification code"
                  :rules="{ required: true, digits_for_varification_code:4 }"
                >
                  <b-form-input
                    id="input-verification-code"
                    v-model="verificationCode"
                    type="text"
                    :class="classes"
                    size="sm"
                    placeholder="Enter the verification code"
                  ></b-form-input>
                  <div class="invalid-feedback">
                    {{ errors[0] }}
                  </div>
                </validation-provider>
              </b-form-group>
              <div>
                <b-button
                  v-if="!enterVerificationCodeRequestPending"
                  block
                  pill
                  size="sm"
                  type="submit"
                >
                  Verify code
                </b-button>
                <b-button
                  v-else
                  block
                  pill
                  size="sm"
                  disabled
                >
                  <b-spinner small></b-spinner>
                  Verifying...
                </b-button>
                <b-button
                  v-if="!resendVerificationCodeRequestPending"
                  block
                  pill
                  size="sm"
                  class="mt-2 btn-smoot-secondary"
                  @click="updateMobileNumber(true)"
                >
                  Resend code 
                </b-button>
                <b-button
                  v-else
                  block
                  pill
                  size="sm"
                  class="mt-2 btn-smoot-secondary-active"
                  disabled
                >
                  <b-spinner small></b-spinner>
                  Resending...
                </b-button>
                <hr />
                <b-button
                  block
                  pill
                  size="sm"
                  class="btn-smoot-primary-outline"
                  @click="closeModalChangeMobileNumber"
                >
                  {{ closeLabelForModalChangeMobileNumber }}
                </b-button>
              </div>
            </b-form>
          </validation-observer>
        </div>
      </div>
    </b-modal>
    <b-modal
      ref="modal-change-email"
      b-modal
      centered
      hide-header
      hide-footer
      no-close-on-backdrop
      no-close-on-esc
      content-class="shadow"
      size="sm"
    >
      <div class="text-align-center mb-1">
        <div class="font-bold">{{ emailModal.title }}</div>
        <hr />
        <b-alert
          class="mt-3 text-align-left modal-alert-success"
          variant="success"
          dismissible
          fade
          :show="serverAlertsForUpdateEmailModal.showSuccessDismissibleAlert"
          @dismissed="serverAlertsForUpdateEmailModal.showSuccessDismissibleAlert = false"
        >
          {{ serverAlertsForUpdateEmailModal.success }}
        </b-alert>
        <b-alert
          class="mt-3 text-align-left modal-alert-error"
          variant="danger"
          dismissible
          fade
          :show="serverAlertsForUpdateEmailModal.showErrorDismissibleAlert"
          @dismissed="serverAlertsForUpdateEmailModal.showErrorDismissibleAlert = false"
        >
          {{ serverAlertsForUpdateEmailModal.error }}
        </b-alert>
        <div v-if="!hasToShowEmailVerificationForm" class="text-align-left">
          <validation-observer
            ref="formUpdateEmail"
            v-slot="{ handleSubmit }"
          >
            <b-form @submit.prevent="handleSubmit(updateEmail)" autocomplete="off">
              <b-form-group
                id="input-group-11"
                description="Make sure you have access to this email before updating"
              >
                <validation-provider
                  v-slot="{ classes, errors }"
                  name="email"
                  rules="required|email|max:40"
                >
                  <b-form-input
                    id="input-7"
                    v-model="newEmail"
                    :class="errors[0] || serverErrorMessagesForFields.email
                    ? `touched dirty is-invalid validated required changed failed`
                    : `touched dirty valid validated required changed passed`"
                    @focusout="checkEmailAvailability"
                  ></b-form-input>
                  <div class="invalid-feedback">
                    {{ errors[0] ? errors[0] : serverErrorMessagesForFields.email }}
                  </div>
                </validation-provider>
              </b-form-group>
              <div>
                <b-button
                  v-if="!updateEmailRequestPending"
                  block
                  pill
                  size="sm"
                  type="submit"
                >
                  Update
                </b-button>
                <b-button
                  v-else
                  block
                  pill
                  size="sm"
                  disabled
                >
                  <b-spinner small></b-spinner>
                  Updating...
                </b-button>
                <hr />
                <b-button
                  block
                  pill
                  size="sm"
                  class="btn-smoot-primary-outline"
                  @click="closeModalEmail"
                >
                  Close
                </b-button>
              </div>
            </b-form>
          </validation-observer>
        </div>
        <div v-else class="text-align-left">
          <validation-observer
            ref="formEnterVerificationCode"
            v-slot="{ handleSubmit }"
          >
            <b-form @submit.prevent="handleSubmit(sendVerificationCode)" autocomplete="off">
              <b-form-group
                id="input-group-11"
                :description="formAbout.verification"
              >
                <validation-provider
                  v-slot="{ classes, errors }"
                  name="verification code"
                  :rules="{ required: true, digits_for_varification_code:4 }"
                >
                  <b-form-input
                    id="input-verification-code"
                    v-model="verificationCode"
                    type="text"
                    :class="classes"
                    size="sm"
                    placeholder="Enter the verification code"
                  ></b-form-input>
                  <div class="invalid-feedback">
                    {{ errors[0] }}
                  </div>
                </validation-provider>
              </b-form-group>
              <div>
                <b-button
                  v-if="!enterEmailVerificationCodeRequestPending"
                  block
                  pill
                  size="sm"
                  type="submit"
                >
                  Verify code
                </b-button>
                <b-button
                  v-else
                  block
                  pill
                  size="sm"
                  disabled
                >
                  <b-spinner small></b-spinner>
                  Verifying...
                </b-button>
                <b-button
                  v-if="!resendEmailVerificationCodeRequestPending"
                  block
                  pill
                  size="sm"
                  class="mt-2 btn-smoot-secondary"
                  @click="updateMobileNumber(true)"
                >
                  Resend code 
                </b-button>
                <b-button
                  v-else
                  block
                  pill
                  size="sm"
                  class="mt-2 btn-smoot-secondary-active"
                  disabled
                >
                  <b-spinner small></b-spinner>
                  Resending...
                </b-button>
                <b-button
                  block
                  pill
                  size="sm"
                  class="mt-2 btn-smoot-primary-outline-no-border font-80"
                  @click="hasToShowEmailVerificationForm = false"
                >
                  Update email Instead
                </b-button>
                <hr />
                <b-button
                  block
                  pill
                  size="sm"
                  class="btn-smoot-primary-outline"
                  @click="closeModalEmail"
                >
                  Close
                </b-button>
              </div>
            </b-form>
          </validation-observer>
        </div>
      </div>
    </b-modal>
    <!-- eslint-enable -->
    <h1 class="container-header">Edit profile</h1>
    <h2 class="section-header">Profile avatar</h2>
    <b-row>
      <b-col lg="4" md="4" sm="4" cols="12">
        <b-img
          rounded="circle"
          class="profile-avatar"
          :src="`${editProfile.avatar}?${fileProperties.user.profileAvatar}`"
        ></b-img>
      </b-col>
      <b-col lg="8" md="8" sm="8" cols="12">
        <b-alert show variant="light" class="alert-profile-avatar-hint">
          Clear frontal face photos are an Important way for buyers, and sellers
          to learn about each other.
        </b-alert>
        <b-form-file
          v-if="!isProfileAvatarRequestPending"
          :state="avatarUploadErrorMessage ? false : null"
          accept=".jpg, .png, .jpeg"
          class="input-profile-avatar-upload"
          browse-text="Upload avatar"
          size="sm"
          @change="onAvatarSelected"
        ></b-form-file>
        <div v-else>
          <b-spinner small></b-spinner>
          Uploading avatar...
        </div>
        <div class="invalid-feedback">
          {{ avatarUploadErrorMessage }}
        </div>
      </b-col>
    </b-row>
    <h2 class="section-header">Public profile</h2>
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
    <validation-observer v-slot="{ handleSubmit }">
      <!-- eslint-disable -->
      <b-form autocomplete="off" @submit.prevent="handleSubmit(updateProfile)">
        <b-form-group id="input-group-1"
          label="Username:"
          label-for="input-1"
          :description="`Your Smoot profile link: ${baseURL}/${formEditProfile.username}`"
        >
            <b-form-input
              id="input-1"
              v-model="formEditProfile.username"
              disabled="disabled"
            ></b-form-input>
        </b-form-group>
        <b-form-group id="input-group-2" label="Name:" label-for="input-2">
          <validation-provider
            v-slot="{ errors }"
            name="name"
            :rules="{
              required: false,
              regex_for_name: /^[a-zA-Z0-9\s]+$/,
              min: 3,
              max: 40,
            }"
          >
            <b-form-input
              id="input-2"
              v-model="formEditProfile.name"
              :class="errors[0] || serverErrorMessagesForFields.name
                ? `touched dirty is-invalid validated required changed failed`
                : `touched dirty valid validated required changed passed`"
            ></b-form-input>
            <div class="invalid-feedback">
              {{ errors[0] ? errors[0] : serverErrorMessagesForFields.name }}
            </div>
          </validation-provider>
        </b-form-group>
        <b-form-group
          id="input-group-3"
          label="Bio:"
          label-for="input-3"
          :description="`${formEditProfile.bio.length}/${editProfile.bioMaxLength}`"
        >
          <validation-provider
            v-slot="{ errors }"
            name="bio"
            :rules="{
              required: false,
              regex_for_bio: regexForBIO,
              max: 200,
            }"
          >
            <b-form-textarea
              id="input-3"
              v-model="formEditProfile.bio"
              :maxlength="editProfile.bioMaxLength"
              :class="errors[0] || serverErrorMessagesForFields.bio
                ? `touched dirty is-invalid validated required changed failed`
                : `touched dirty valid validated required changed passed`"
              no-resize
              rows="3"
            ></b-form-textarea>
            <div class="invalid-feedback">
              {{ errors[0] ? errors[0] : serverErrorMessagesForFields.bio }}
            </div>
          </validation-provider>
        </b-form-group>
        <h2 class="section-header">Location</h2>
        <b-form-group id="input-group-4" label="Country:" label-for="input-4">
          <b-form-input
            id="input-4"
            v-model="formEditProfile.country"
            readonly="readonly"
            disabled="disabled"
          ></b-form-input>
        </b-form-group>
        <b-form-group id="input-group-5" label="District:" label-for="input-5">
          <validation-provider
            v-slot="{ errors }"
            name="district"
            :rules="{
              required: false,
            }"
          >
            <b-form-select
              id="input-5"
              v-model="formEditProfile.district"
              :options="districts"
               :class="errors[0] || serverErrorMessagesForFields.district
                ? `touched dirty is-invalid validated required changed failed`
                : `touched dirty valid validated required changed passed`"
            ></b-form-select>
            <div class="invalid-feedback">
              {{ errors[0] ? errors[0] : serverErrorMessagesForFields.district }}
            </div>
          </validation-provider>
        </b-form-group>
        <b-form-group id="input-group-6" label="City:" label-for="input-6">
          <validation-provider
            v-slot="{ errors }"
            name="city"
            :rules="{
              required: false,
            }"
          >
            <b-form-select
              id="input-6"
              v-model="formEditProfile.city"
              :options="cities"
              :class="errors[0] || serverErrorMessagesForFields.city
                ? `touched dirty is-invalid validated required changed failed`
                : `touched dirty valid validated required changed passed`"
              :disabled="cities.length > 1 ? false : true"
            ></b-form-select>
            <div class="invalid-feedback">
              {{ errors[0] ? errors[0] : serverErrorMessagesForFields.city }}
            </div>
          </validation-provider>
        </b-form-group>
        <h2 class="section-header">Private Information</h2>
        <div>
          <small tabindex="-1" class="form-text pri-info-text text-muted">
            <i class="fa fa-lock" aria-hidden="true"></i>&nbsp;We do not share
            your Information with other users unless explicit permission is given
            by you.
          </small>
        </div>
        <b-form-group id="email" label="Email:" label-for="input-7">
          <b-form-input
            id="input-7"
            v-model="formEditProfile.email"
            disabled
          ></b-form-input>
          <div class="cursor-pointer" @click="openModalChangeEmail">
            <small tabindex="-1" class="form-text update-email-muted">
              Update or verify email
            </small>
          </div>
          </validation-provider>
        </b-form-group>
        <b-form-group
          id="input-group-8"
          label="Mobile number"
          label-for="input-8"
        >
          <b-input-group>
            <b-input-group-prepend is-text>
              <span>🇱🇰</span>&nbsp;<span>+94</span>
            </b-input-group-prepend>
            <b-form-input
              id="input-mobile"
              v-model="formEditProfile.mobile_number"
              type="text"
              disabled
            ></b-form-input>
          </b-input-group>
          <div class="cursor-pointer" @click="openModalChangeMobileNumber">
            <small tabindex="-1" class="form-text update-mobile-number-muted">
              Update
            </small>
          </div>
        </b-form-group>
        <b-form-group id="input-group-9" label="Gender:" label-for="input-9">
          <validation-provider
            v-slot="{ errors }"
            name="gender"
            :rules="{
              required: false,
            }"
          >
          <b-form-select
            id="input-9"
            v-model="formEditProfile.gender"
            :options="genders"
            :class="errors[0] || serverErrorMessagesForFields.gender
                ? `touched dirty is-invalid validated required changed failed`
                : `touched dirty valid validated required changed passed`"
          ></b-form-select>
          <div class="invalid-feedback">
              {{ errors[0] ? errors[0] : serverErrorMessagesForFields.gender }}
            </div>
          </validation-provider>
        </b-form-group>
        <b-button
          v-if="!isProfileUpdateRequestPending"
          type="submit"
          size="sm"
        >
          Save changes
        </b-button>
        <b-button
          v-else
          size="sm"
          disabled
        >
          <b-spinner small></b-spinner>
          Updating profile...
        </b-button>
      </b-form>
      <!-- eslint-enable -->
    </validation-observer>
  </b-container>
</template>
<script>
import { FILE_QUERY_PARAMETERS, REGEX, BASE_URL } from "@/constants/constants";
import {
  LOOK_UP_ENDPONTS,
  USER_PROFILE_ENDPOINTS,
} from "@/constants/smoot-api";
import { ValidationObserver, ValidationProvider } from "vee-validate";
export default {
  name: "EditProfile",
  components: {
    ValidationObserver,
    ValidationProvider,
  },
  data() {
    return {
      districts: [],
      cities: [],
      genders: [],
      // districts: [
      //   { text: "Select", value: null },
      //   { text: "Ampara", value: "ampara" },
      //   { text: "Colombo", value: "colombo" },
      //   { text: "Galle", value: "galle" },
      //   { text: "Hambantota", value: "hambantota" },
      //   { text: "Kandy", value: "kandy" },
      // ],
      // cities: [
      //   { text: "Select", value: null },
      //   { text: "Colombo", value: "colombo" },
      //   { text: "Mount Lavinia", value: "mount-lavinia" },
      //   { text: "Moratuwa", value: "moratuwa" },
      //   { text: "Trincomalee", value: "trincomalee" },
      // ],
      // gender: [
      //   { text: "Select", value: "" },
      //   { text: "Male", value: "male" },
      //   { text: "Female", value: "female" },
      // ],
      /* eslint-disable */
      fileProperties: {
        user: {
          profileAvatar: FILE_QUERY_PARAMETERS.USER.PROFILE_AVATAR,
        },
      },
      /* eslint-enable */
      editProfile: {
        avatar: this.$auth.$state.user.avatar,
        newAvatarFile: "",
        bioMaxLength: 200,
      },
      avatarUploadErrorMessage: "",
      formEditProfile: {
        /* eslint-disable */
        username: this.$auth.$state.user.username ? this.$auth.$state.user.username : "",
        name: this.$auth.$state.user.name ? this.$auth.$state.user.name : "",
        email: this.$auth.$state.user.email ? this.$auth.$state.user.email : "",
        bio: this.$auth.$state.user.bio ? this.$auth.$state.user.bio : "",
        country: this.$auth.$state.user.country ? this.$auth.$state.user.country : "",
        district: this.$auth.$state.user.district ? this.$auth.$state.user.district : "",
        city: this.$auth.$state.user.city ? this.$auth.$state.user.city : "",
        mobile_number: this.$auth.$state.user.mobile ? this.$auth.$state.user.mobile: "",
        gender: this.$auth.$state.user.gender ? this.$auth.$state.user.gender : "",
        /* eslint-enable */
      },
      serverErrorMessagesForFields: {
        username: "",
        email: "",
        name: "",
        gender: "",
        district: "",
        city: "",
        bio: "",
      },
      regexForBIO: REGEX.BIO,
      isProfileUpdateRequestPending: false,
      isProfileAvatarRequestPending: false,
      serverAlerts: {
        success: "",
        error: "",
        showErrorDismissibleAlert: false,
        showSuccessDismissibleAlert: false,
      },
      serverAlertsForUpdateMobileNumberModal: {
        success: "",
        error: "",
        showErrorDismissibleAlert: false,
        showSuccessDismissibleAlert: false,
      },
      serverAlertsForUpdateEmailModal: {
        success: "",
        error: "",
        showErrorDismissibleAlert: false,
        showSuccessDismissibleAlert: false,
      },
      baseURL: BASE_URL,
      newMobileNumber: this.$auth.$state.user.mobile,
      newEmail: this.$auth.$state.user.email,
      verificationCode: "",
      hasToShowNewMobileVerificationForm: false,
      formAbout: {
        verification: "Didn't receive a code yet? Click on Resend",
      },
      updateMobileNumberRequestPending: false,
      updateEmailRequestPending: false,
      enterEmailVerificationCodeRequestPending: false,
      enterVerificationCodeRequestPending: false,
      resendVerificationCodeRequestPending: false,
      resendEmailVerificationCodeRequestPending: false,
      isDisabledMobileNumberUpdate: false,
      closeLabelForModalChangeMobileNumber: "Cancel",
      hasToShowEmailVerificationForm: false,
      emailModal: {
        title: "Update Email",
      },
    };
  },
  watch: {
    "formEditProfile.district"() {
      this.formEditProfile.city = "";
      if (this.formEditProfile.district) {
        this.getCities();
      } else {
        this.cities = [];
        this.cities.push({
          text: "Select",
          value: "",
        });
      }
    },
    "formEditProfile.username"() {
      this.serverErrorMessagesForFields.username = "";
    },
    "formEditProfile.email"() {
      this.serverErrorMessagesForFields.email = "";
    },
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
    "$auth.$state.user.avatar"() {
      this.editProfile.avatar = this.$auth.$state.user.avatar;
    },
    "serverAlertsForUpdateMobileNumberModal.showSuccessDismissibleAlert"() {
      /* eslint-disable */
      if (!this.serverAlertsForUpdateMobileNumberModal.showSuccessDismissibleAlert) {
        this.serverAlertsForUpdateMobileNumberModal.success = "";
      } else {
        this.serverAlertsForUpdateMobileNumberModal.showErrorDismissibleAlert = false;
      }
      /* eslint-enable */
    },
    "serverAlertsForUpdateMobileNumberModal.showErrorDismissibleAlert"() {
      /* eslint-disable */
      if (!this.serverAlertsForUpdateMobileNumberModal.showErrorDismissibleAlert) {
        this.serverAlertsForUpdateMobileNumberModal.error = "";
      } else {
        this.serverAlertsForUpdateMobileNumberModal.showSuccessDismissibleAlert = false;
      }
      /* eslint-enable */
    },
    newMobileNumber() {
      this.serverAlertsForUpdateMobileNumberModal.showSuccessDismissibleAlert = false;
      this.serverAlertsForUpdateMobileNumberModal.showErrorDismissibleAlert = false;
    },
    newEmail() {
      this.serverErrorMessagesForFields.email = "";
      this.serverAlertsForUpdateEmailModal.showSuccessDismissibleAlert = false;
      this.serverAlertsForUpdateEmailModal.showErrorDismissibleAlert = false;
    },
    verificationCode() {
      if (this.closeLabelForModalChangeMobileNumber === "Cancel") {
        this.serverAlertsForUpdateMobileNumberModal.showSuccessDismissibleAlert = false;
      }
      this.serverAlertsForUpdateMobileNumberModal.showErrorDismissibleAlert = false;
    },
    hasToShowEmailVerificationForm() {
      if(this.hasToShowEmailVerificationForm) {
        this.serverAlertsForUpdateEmailModal.success = `Enter the verification code which has sent to ${this.formEditProfile.email}`;
        this.serverAlertsForUpdateEmailModal.showSuccessDismissibleAlert = true;
        this.emailModal.title = "Verify Account Email";
      } else {
        this.serverAlertsForUpdateEmailModal.showSuccessDismissibleAlert = false;
        this.emailModal.title = "Update Email"
      }
    }
  },
  mounted() {
    this.getDistricts();
    if (this.formEditProfile.district) {
      this.getCities();
    } else {
      this.cities = [];
      this.cities.push({
        text: "Select",
        value: "",
      });
    }
    this.getGenders();
    this.$highlightHash();
  },
  methods: {
    getDistricts() {
      /* eslint-disable */
      this.$axios.get(LOOK_UP_ENDPONTS.GET_ALL_DISTRICTS, { progress: false })
      .then(function(res) {
        this.districts = res.data.districts;
        this.districts.push({
          text: "Select",
          value: "",
        });
      }.bind(this))
      .catch(function(err) {
        this.districts = [];
      }.bind(this));
      /* eslint-enable */
    },
    getCities() {
      /* eslint-disable */
      this.$axios.get(`${LOOK_UP_ENDPONTS.GET_CITIES}?filter_value=${this.formEditProfile.district}`, { progress: false })
      .then(function(res) {
        this.cities = res.data.cities;
        this.cities.push({
          text: "Select",
          value: "",
        });
      }.bind(this))
      .catch(function(err) {
        this.cities = [];
      }.bind(this));
      /* eslint-enable */
    },
    getGenders() {
      /* eslint-disable */
      this.$axios.get(LOOK_UP_ENDPONTS.GET_GENDERS, { progress: false })
      .then(function(res) {
        this.genders = res.data.genders;
        this.genders.push({
          text: "Select",
          value: "",
        });
      }.bind(this))
      .catch(function(err) {
        this.genders = [];
      }.bind(this));
      /* eslint-enable */
    },
    updateProfile() {
      /* eslint-disable */
      this.serverErrorMessagesForFields.username = "";
      this.serverErrorMessagesForFields.email = "";
      this.serverErrorMessagesForFields.name = "";
      this.serverErrorMessagesForFields.gender = "";
      this.serverErrorMessagesForFields.district = "";
      this.serverErrorMessagesForFields.city = "";
      this.serverErrorMessagesForFields.bio = "";
      this.serverAlerts.showErrorDismissibleAlert = false;
      this.serverAlerts.showSuccessDismissibleAlert = false;
      this.isProfileUpdateRequestPending = true;
      const formData = this.$toFormData(this.formEditProfile);
      this.$axios.post(`${USER_PROFILE_ENDPOINTS.PROFILE_UPDATE}?_method=put`, formData)
      .then(function(res) {
        this.serverAlerts.success = res.data.message;
        this.serverAlerts.showSuccessDismissibleAlert = true;
        this.$auth.fetchUser();
      }.bind(this))
      .catch(function(err) {
        this.serverAlerts.error = "There are some errors below, please check them and try again";
        this.serverAlerts.showErrorDismissibleAlert = true;
        if (err.response.data.hasOwnProperty("username_error")) {
            this.serverErrorMessagesForFields.username = err.response.data.username_error;
        }
        if (err.response.data.hasOwnProperty("username")) {
            this.serverErrorMessagesForFields.username = err.response.data.username[0];
        }
        if (err.response.data.hasOwnProperty("email_error")) {
          this.serverErrorMessagesForFields.email = err.response.data.email_error;
        }
        if (err.response.data.hasOwnProperty("email")) {
          this.serverErrorMessagesForFields.email = err.response.data.email[0];
        }
        if (err.response.data.hasOwnProperty("city")) {
          this.serverErrorMessagesForFields.city = err.response.data.city[0];
        }
        if (err.response.data.hasOwnProperty("district")) {
          this.serverErrorMessagesForFields.district = err.response.data.district[0];
        }
        if (err.response.data.hasOwnProperty("gender")) {
          this.serverErrorMessagesForFields.gender = err.response.data.gender[0];
        }
        if (err.response.data.hasOwnProperty("name")) {
          this.serverErrorMessagesForFields.name = err.response.data.name[0];
        }
        if (err.response.data.hasOwnProperty("bio")) {
          this.serverErrorMessagesForFields.bio = err.response.data.bio[0];
        }
      }.bind(this)).then(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        this.isProfileUpdateRequestPending = false;
      });
      /* eslint-enable */
    },
    checkUsernameAvailability() {
      /* eslint-disable */
      if(this.formEditProfile.username.length >= 3 && this.formEditProfile.username.length <= 40) {
        // this.isUsernameCheckingPending = true;
          this.$axios.get(`${USER_PROFILE_ENDPOINTS.CHECK_USERNAME_AVAILABILITY}?username=${this.formEditProfile.username}`, { progress: false })
          .then(function(res) {
            this.serverErrorMessagesForFields.username = "";
          }.bind(this)).catch(function (err) {
            if (err.response.data.hasOwnProperty("is_username_exists")) {
              this.serverErrorMessagesForFields.username = err.response.data.message;
            }
          }.bind(this));
      }
      /* eslint-enable */
    },
    checkEmailAvailability() {
      /* eslint-disable */
      if(this.formEditProfile.email && this.formEditProfile.email.length <= 40) {
        // this.isUsernameCheckingPending = true;
          this.$axios.get(`${USER_PROFILE_ENDPOINTS.CHECK_EMAIL_AVAILABILITY}?email=${encodeURIComponent(this.newEmail)}`, { progress: false })
          .then(function(res) {
            this.serverErrorMessagesForFields.email = "";
          }.bind(this)).catch(function (err) {
            if (err.response.data.hasOwnProperty("is_email_exists")) {
              this.serverErrorMessagesForFields.email = err.response.data.message;
            }
          }.bind(this));
      }
      /* eslint-enable */
    },
    onAvatarSelected(event) {
      /* eslint-disable */
      this.avatarUploadErrorMessage = "";
      if (typeof event.target.files[0] !== "undefined") {
        // file size in bits = 2MB
        if (event.target.files[0].size > 2097152) {
          this.avatarUploadErrorMessage = "Avatar size is too big (max upload size: 2MB)";
        } else {
          this.editProfile.newAvatarFile = event.target.files[0];
          this.uploadAvatar();
        }
      }
      /* eslint-enable */
    },
    uploadAvatar() {
      /* eslint-disable */
      this.serverAlerts.showErrorDismissibleAlert = false;
      this.serverAlerts.showSuccessDismissibleAlert = false;
      this.isProfileAvatarRequestPending = true;
      const formData = this.$toFormDataSingleNoStringify(this.editProfile.newAvatarFile, "avatar");
      // console.log(formData.toFormData);
      this.$axios.post(`${USER_PROFILE_ENDPOINTS.UPDATE_AVATAR}`, formData)
      .then(function(res) {
        this.serverAlerts.success = res.data.message;
        this.serverAlerts.showSuccessDismissibleAlert = true;
        this.$auth.fetchUser();
      }.bind(this)).catch(function(err) {
        this.serverAlerts.error = "Something went wrong while uploading the avatar, try again";
        this.serverAlerts.showErrorDismissibleAlert = true;
      }.bind(this)).then(() => {
        this.isProfileAvatarRequestPending = false;
        this.editProfile.newAvatarFile = "";
      });
      /* eslint-disable */
    },
    closeModalChangeMobileNumber() {
      this.$refs["modal-change-mobile-number"].hide();
      this.newMobileNumber = this.formEditProfile.mobile_number;
      this.verificationCode = "";
      this.hasToShowNewMobileVerificationForm = false;
      this.serverAlertsForUpdateMobileNumberModal.showErrorDismissibleAlert = false;
      this.serverAlertsForUpdateMobileNumberModal.showSuccessDismissibleAlert = false;
    },
    closeModalEmail() {
      this.$refs["modal-change-email"].hide();
      this.newEmail = this.formEditProfile.email;
      this.serverErrorMessagesForFields.email = "";
      // this.newMobileNumber = this.formEditProfile.mobile_number;
      // this.verificationCode = "";
      // this.hasToShowNewMobileVerificationForm = false;
      this.serverAlertsForUpdateEmailModal.showErrorDismissibleAlert = false;
      this.serverAlertsForUpdateEmailModal.showSuccessDismissibleAlert = false;
    },
    openModalChangeMobileNumber() {
      this.closeLabelForModalChangeMobileNumber = "Cancel";
      this.$refs["modal-change-mobile-number"].show();
    },
    openModalChangeEmail() {
      this.$refs["modal-change-email"].show();
      this.hasToShowEmailVerificationForm = true;
    },
    updateMobileNumber(isResending = false) {
      /* eslint-disable */
      if (isResending) {
        this.resendVerificationCodeRequestPending = true;
        this.verificationCode = "";
        this.$refs.formEnterVerificationCode.reset();
      } else {
        this.updateMobileNumberRequestPending = true;
      }
      this.serverAlertsForUpdateMobileNumberModal.showErrorDismissibleAlert = false;
      this.serverAlertsForUpdateMobileNumberModal.showSuccessDismissibleAlert = false;
      const formData = this.$toFormDataSingle(this.newMobileNumber, "mobile");
      this.$axios.post(`${USER_PROFILE_ENDPOINTS.UPDATE_MOBILE_NUMBER}?_method=put`, formData, { progress: false })
      .then(function(res) {
          this.serverAlertsForUpdateMobileNumberModal.success = res.data.message;
          this.serverAlertsForUpdateMobileNumberModal.showSuccessDismissibleAlert = true;
          this.hasToShowNewMobileVerificationForm = true;
          if (typeof this.$refs.formUpdateMobileNumber !== "undefined") {
            this.$refs.formUpdateMobileNumber.reset();
          }
        }.bind(this))
        .catch(function (err) {
          if(err.response.status == "401") {
            return this.$router.go();
          }
          if (err.response.data.hasOwnProperty("message")){
            this.serverAlertsForUpdateMobileNumberModal.error = err.response.data.message;
          } else if (err.response.data.hasOwnProperty("mobile")){
            this.serverAlertsForUpdateMobileNumberModal.error = err.response.data.mobile[0];
          }
          else {
            this.serverAlertsForUpdateMobileNumberModal.error = err.response.data.error;
          }
          this.serverAlertsForUpdateMobileNumberModal.showErrorDismissibleAlert = true;
          }.bind(this)).then(() => {
            if (isResending) {
              this.resendVerificationCodeRequestPending = false;
            } else {
              this.updateMobileNumberRequestPending = false;
            }
          });
      /* eslint-enable */
    },
    sendVerificationCode() {
      /* eslint-disable */
      const formToFormData = {};
      this.enterVerificationCodeRequestPending = true;
      this.serverAlertsForUpdateMobileNumberModal.showErrorDismissibleAlert = false;
      this.serverAlertsForUpdateMobileNumberModal.showSuccessDismissibleAlert = false;
      formToFormData.mobile = this.newMobileNumber;
      formToFormData.verificationCode = this.verificationCode;
      const formData = this.$toFormData(formToFormData);
      this.$axios.post(USER_PROFILE_ENDPOINTS.VERIFY_MOBILE_NUMBER, formData, { progress: false })
      .then(function(res) {
          this.serverAlertsForUpdateMobileNumberModal.success = res.data.message;
          this.serverAlertsForUpdateMobileNumberModal.showSuccessDismissibleAlert = true;
          this.verificationCode = "";
          this.$refs.formEnterVerificationCode.reset();
          this.hasToShowNewMobileVerificationForm = false;
          this.formEditProfile.mobile_number = this.newMobileNumber;
          this.closeLabelForModalChangeMobileNumber = "Close";
        }.bind(this))
        .catch(function (err) {
          if (err.response.data.hasOwnProperty("message")){
            this.serverAlertsForUpdateMobileNumberModal.error = err.response.data.message;
          } else if (err.response.data.hasOwnProperty("verificationCode")){
            this.serverAlertsForUpdateMobileNumberModal.error = err.response.data.verificationCode[0];
          }
          else {
            this.serverAlertsForUpdateMobileNumberModal.error = err.response.data.error;
          }
          this.serverAlertsForUpdateMobileNumberModal.showErrorDismissibleAlert = true;
          }.bind(this)).then(() => {
            this.enterVerificationCodeRequestPending = false;
          });
      /* eslint-enable */
    },
    updateEmail() {
      /* eslint-disable */
      console.log("foo");
      /* eslint-disable */
    }
  },
};
</script>
