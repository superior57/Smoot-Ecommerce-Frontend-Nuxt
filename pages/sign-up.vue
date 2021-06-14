<template>
  <div>
    <b-container class="container-sign-up rounded" fluid="sm">
      <b-container class="container-inner">
        <h1 class="text-align-center">Sign Up</h1>
        <p class="text-align-center">
          Create a free account to buy, and sell in our community.
        </p>
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
        <b-alert
          v-model="showformCommonErrorMessage"
          variant="danger"
          dismissible
        >
          {{ formCommonErrorMessage }}
        </b-alert>
        <validation-observer v-slot="{ handleSubmit }">
          <b-form autocomplete="off" @submit.prevent="handleSubmit(signUpUser)">
            <div v-if="!showEmailConfirmation">
              <!-- eslint-disable -->
              <b-form-group
                id="input-group-1"
                label="Username"
                label-for="input-username"
              >
                <validation-provider
                  v-slot="{ errors }"
                  name="username"
                  :rules="{
                    required: true,
                    regex_for_username: /^[a-z0-9-]+$/,
                    min:3,
                    max:40,
                  }"
                >
                  <b-form-input
                    id="input-username"
                    v-model="form.username"
                    type="text"
                    :class="errors[0] || serverErrorMessagesForFields.username
                      ? `touched dirty is-invalid validated required changed failed`
                      : `touched dirty valid validated required changed passed`"
                    @focusout="checkUsernameAvailability"
                  ></b-form-input>
                  <div class="invalid-feedback">
                    {{ errors[0] ? errors[0] : serverErrorMessagesForFields.username }}
                  </div>
                </validation-provider>
              </b-form-group>
              <b-form-group
                id="input-group-2"
                label="Email"
                label-for="input-email"
                description="Make sure you have access to this email, before signing up"
              >
                <validation-provider
                    v-slot="{ errors }"
                    name="email"
                    rules="required|email|max:40"
                >
                  <b-form-input
                    id="input-email"
                    ref="input-email"
                    v-model="form.email"
                    type="text"
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
              <b-form-group
                id="input-group-3"
                class="container-password-input"
                label="Password"
                label-for="input-password"
              >
                <i
                  :class="showPassword ? `fa fa-eye` : `fa fa-eye-slash`"
                  class="password-toggle-icon cursor-pointer"
                  aria-hidden="true"
                  @click="passwordToggle"
                ></i>
                <validation-provider
                  v-slot="{ classes, errors }"
                  name="password"
                  :rules="{
                    required: true,
                    min:5,
                    max:40,
                  }"
                >
                  <b-form-input
                    id="input-password"
                    v-model="form.password"
                    :type="showPassword ? `text` : `password`"
                    :class="classes"
                  ></b-form-input>
                  <div class="invalid-feedback">{{ errors[0] }}</div>
                </validation-provider>
              </b-form-group>
              <b-form-group
                id="input-group-4"
                label="Mobile number"
                label-for="input-mobile"
              >
                <validation-provider
                  v-slot="{ errors }"
                  name="mobile number"
                  :rules="{
                    required: true,
                    regex_for_mobile: /^[0-9]{9,9}$/,
                  }"
                >
                  <b-input-group>
                    <b-input-group-prepend is-text>
                      <span>🇱🇰</span>&nbsp;<span>+94</span>
                    </b-input-group-prepend>
                    <b-form-input
                      id="input-mobile"
                      v-model="form.mobile"
                      type="text"
                      :class="errors[0] || serverErrorMessagesForFields.mobile
                        ? `touched dirty is-invalid validated required changed failed`
                        : `touched dirty valid validated required changed passed`"
                    ></b-form-input>
                    <b-input-group-append
                      v-if="form.mobile && !errors[0] && !alerts.successCodeSent.dismissCountDown"
                      is-text
                      class="input-p-container rounded-right"
                    >
                      <b-button
                        class="default-btn-outline btn-verify"
                        squared
                        @click="getVerificationCode"
                      >
                        {{
                          showEnterMobileVerificationCodeInput ? `Resend` : `Verify`
                        }}
                      </b-button>
                    </b-input-group-append>
                    <div
                      class="invalid-feedback"
                    >
                      {{ errors[0] ? errors[0] : serverErrorMessagesForFields.mobile }}
                    </div>
                  </b-input-group>
                </validation-provider>
              </b-form-group>
              <b-form-group
                v-if="showEnterMobileVerificationCodeInput"
                id="input-group-5"
                label="Verification code"
                label-for="input-verification-code"
              >
                <!-- <b-alert
                  variant="success"
                  :show="alerts.successCodeSent.dismissCountDown"
                  dismissible
                  @dismissed="alerts.successCodeSent.dismissCountDown = 0"
                  @dismiss-count-down="countDownChanged"
                >
                  {{ alerts.successCodeSent.text }}
                  <b-progress
                    variant="success"
                    :max="alerts.successCodeSent.dismissSecs"
                    :value="alerts.successCodeSent.dismissCountDown"
                    height="4px"
                  ></b-progress>
                </b-alert> -->
                <validation-provider
                  v-slot="{ errors }"
                  name="verification code"
                  rules="required|digits_for_varification_code:4"
                >
                  <b-form-input
                    id="input-verification-code"
                    v-model="form.verificationCode"
                    type="text"
                    :class="errors[0] || serverErrorMessagesForFields.verificationCode
                      ? `touched dirty is-invalid validated required changed failed`
                      : `touched dirty valid validated required changed passed`"
                  ></b-form-input>
                  <div class="invalid-feedback">
                    {{ errors[0] ? errors[0] : serverErrorMessagesForFields.verificationCode }}
                  </div>
                </validation-provider>
                <div>
                  <small class="form-text">
                    {{ formAbout.verification }}
                  </small>
                </div>
              </b-form-group>
              <div class="mobile-hint">
                <small class="form-text text-muted">
                  {{ formAbout.mobile }}
                </small>
              </div>
            </div>
            <div v-else>
              <h3>Confirm your email</h3>
              <div>
                {{ `Do you have access to ${emailForConfirmation}?` }}
              </div>
              <p class="sign-up-confirm-email-p mt-2">
                Smoot will use this email for securing your account, and for account recovery process.
              </p>
              <b-button
                size="sm"
                class="mt-2 mb-2 btn-cancel btn-sign-up-step-back"
                @click="editEmail"
                :disabled="isSignUpRequestPending ? true : false"
              >
                No, edit my email
              </b-button>
            </div>
            <b-button
              v-if="!isSignUpRequestPending"
              type="submit"
              block
            >
              {{ signUpBtnLabel }}
            </b-button>
            <b-button
              v-else
              block
              disabled
            >
              <b-spinner small></b-spinner>
              Plaese wait, we are setting up your account...
            </b-button>
            <b-row v-if="!showEmailConfirmation" class="row-login-btn-separate">
              <b-col cols="5" class="col-hr">
                <hr />
              </b-col>
              <b-col cols="2" class="col-label text-align-center">OR</b-col>
              <b-col cols="5" class="col-hr">
                <hr />
              </b-col>
            </b-row>
            <b-button v-if="!showEmailConfirmation" class="btn-facebook" block :disabled="isSignUpRequestPending ? true : false">
              <b-img src="/fb.png"></b-img>
              <span class="label">Sign up with Facebook</span>
            </b-button>
            <div>
              <small
                tabindex="-1"
                class="form-text sign-up-policy-text text-muted"
              >
                {{ formAbout.signUpPolicy }}
              </small>
            </div>
            <!-- eslint-enable -->
          </b-form>
        </validation-observer>
      </b-container>
    </b-container>
    <sign-in-nav></sign-in-nav>
  </div>
</template>
<script>
import { ValidationObserver, ValidationProvider } from "vee-validate";
import { SIGNUP_ENDPOINTS } from "@/constants/smoot-api";
export default {
  auth: "guest",
  name: "SignUp",
  components: {
    ValidationObserver,
    ValidationProvider,
  },
  data() {
    return {
      title: "Smoot.lk | Sign Up for Free",
      form: {
        username: "",
        email: "",
        password: "",
        mobile: "",
        verificationCode: "",
      },
      lastErrorValues: {
        username: "",
        email: "",
        mobile: "",
        verificationCode: "",
      },
      showPassword: false,
      formAbout: {
        mobile:
          "We verify identities using mobile numbers to ensure a safe shopping experience for our users. Please take note that your mobile number or any personal data will not be shared with anyone.",
        signUpPolicy:
          "By Signing up with Email or Facebook, you agree to Smoot's Terms of Service and Privacy Policy.",
        verification: "Didn't receive a code yet? Click on Resend",
      },
      showEnterMobileVerificationCodeInput: false,
      formCommonErrorMessage: "",
      showformCommonErrorMessage: false,
      alerts: {
        successCodeSent: {
          dismissSecs: 10,
          dismissCountDown: 0,
          text:
            "A verification code has been sent to your mobile. Enter it to continue.",
        },
      },
      serverErrorMessagesForFields: {
        mobile: "",
        username: "",
        email: "",
        verificationCode: "",
      },
      isSignUpRequestPending: false,
      serverAlerts: {
        error: "",
        showErrorDismissibleAlert: false,
      },
      showEmailConfirmation: false,
      signUpBtnLabel: "Sign up",
      emailForConfirmation: "",
    };
  },
  watch: {
    "form.mobile"() {
      this.serverErrorMessagesForFields.mobile = "";
    },
    "form.username"() {
      this.serverErrorMessagesForFields.username = "";
    },
    "form.email"() {
      this.serverErrorMessagesForFields.email = "";
    },
    "form.verificationCode"() {
      this.serverErrorMessagesForFields.verificationCode = "";
    },
    "serverAlerts.showErrorDismissibleAlert"() {
      if (!this.serverAlerts.showErrorDismissibleAlert) {
        this.serverAlerts.error = "";
      }
    },
    showEmailConfirmation() {
      if (!this.showEmailConfirmation) {
        window.scrollTo({ top: 0, behavior: "smooth" });
        this.signUpBtnLabel = "Sign up";
        this.emailForConfirmation = "";
      } else {
        this.emailForConfirmation = this.form.email;
      }
    },
  },
  beforeCreate() {
    if (this.$auth.loggedIn) {
      this.$router.go();
    }
  },
  methods: {
    passwordToggle() {
      this.showPassword = !this.showPassword;
    },
    veryMobileNumber() {
      if (this.showformCommonErrorMessage) {
        this.showformCommonErrorMessage = false;
      }
      if (this.form.mobile) {
        this.showAlert();
        this.showEnterMobileVerificationCodeInput = true;
        this.formCommonErrorMessage = "";
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
        this.showformCommonErrorMessage = true;
        this.formCommonErrorMessage =
          "Your mobile number is required to sign up.";
        this.showEnterMobileVerificationCodeInput = false;
      }
    },
    countDownChanged(dismissCountDown) {
      this.alerts.successCodeSent.dismissCountDown = dismissCountDown;
    },
    showAlert() {
      this.alerts.successCodeSent.dismissCountDown = this.alerts.successCodeSent.dismissSecs;
    },
    async signUpUser() {
      /* eslint-disable */
      console.log("sign up submit");
      this.serverAlerts.showErrorDismissibleAlert = false;
      if (this.form.verificationCode) {
        if ((!this.showEmailConfirmation)
          && (this.lastErrorValues.username !== this.form.username)
          && (this.lastErrorValues.email !== this.form.email)
          && (this.lastErrorValues.mobile !== this.form.mobile)
          && (this.lastErrorValues.verificationCode !== this.form.verificationCode)
        ) {
          this.showEmailConfirmation = true;
          this.signUpBtnLabel = "Yes, continue sign up";
          return;
        }
        let onlyUsernameAndPasswordToFormData = {};
        this.serverErrorMessagesForFields.username = "";
        this.serverErrorMessagesForFields.email = "";
        this.serverErrorMessagesForFields.mobile = "";
        this.serverErrorMessagesForFields.verificationCode = "";
        this.isSignUpRequestPending = true;
        const formData = this.$toFormData(this.form);
        try {
          await this.$axios.post(SIGNUP_ENDPOINTS.SIGNUP_USER, formData);
          onlyUsernameAndPasswordToFormData.emailOrUsername = this.form.username;
          onlyUsernameAndPasswordToFormData.password = this.form.password;
          onlyUsernameAndPasswordToFormData.rememberMe = false;
          const formDataForSignIn = this.$toFormData(onlyUsernameAndPasswordToFormData);
          try {
            await this.$auth.loginWith('local', { data: formDataForSignIn });
          } catch {
            this.showEmailConfirmation = false;
            this.serverAlerts.error = "Your Smoot account has successfully created, but something went wrong when we try to Sign you In, please go to Sign In page, and enter your email/username, and password (which you have already provided to create your account) to sign In"; 
          } finally {
            this.clearSignUpForm();
            this.clearLastErrorValues();
          }
        } catch(err) {
          this.showEmailConfirmation = false;
          if (err.response.data.hasOwnProperty("username")) {
            this.lastErrorValues.username = this.form.username;
            this.serverErrorMessagesForFields.username = err.response.data.username[0];
          }
          if (err.response.data.hasOwnProperty("username_error")) {
            this.lastErrorValues.username = this.form.username;
            this.serverErrorMessagesForFields.username = err.response.data.username_error;
          }
          if (err.response.data.hasOwnProperty("email")) {
            this.lastErrorValues.email = this.form.email;
            this.serverErrorMessagesForFields.email = err.response.data.email[0];
          }
          if (err.response.data.hasOwnProperty("email_error")) {
            this.lastErrorValues.email = this.form.email;
            this.serverErrorMessagesForFields.email = err.response.data.email_error;
          }
          if (err.response.data.hasOwnProperty("mobile")) {
            this.lastErrorValues.mobile = this.form.mobile;
            this.serverErrorMessagesForFields.mobile = err.response.data.mobile[0];
          }
          if (err.response.data.hasOwnProperty("verification_error")) {
            this.lastErrorValues.verificationCode = this.form.verificationCode;
            this.serverErrorMessagesForFields.verificationCode = err.response.data.verification_error;
          }
        } finally {
          window.scrollTo({ top: 0, behavior: 'smooth' });
          setTimeout(() => {
            this.isSignUpRequestPending = false;
            if(this.serverAlerts.error) {
            this.serverAlerts.showErrorDismissibleAlert = true;
          }
          }, 500);
        }
      } else {
        this.serverErrorMessagesForFields.mobile = "To sign up, you must verify your phone number";
      }
      /* eslint-enable */
    },
    getVerificationCode() {
      /* eslint-disable */
      this.showEmailConfirmation = false;
      this.showEnterMobileVerificationCodeInput = false;
      this.form.verificationCode = "";
      this.serverErrorMessagesForFields.mobile = "";
      const formData = this.$toFormDataSingle(this.form.mobile, "mobile");
      this.$axios.post(SIGNUP_ENDPOINTS.GET_VERIFICATION_CODE, formData).then(function(res) {
        this.lastErrorValues.mobile = "";
        this.lastErrorValues.verificationCode = "";
        this.showEnterMobileVerificationCodeInput = true;
      }.bind(this)).catch(function (err) {
        this.lastErrorValues.mobile = this.form.mobile;
        if (err.response.data.hasOwnProperty("error")) {
          this.serverErrorMessagesForFields.mobile = err.response.data.error;
        }
      }.bind(this)).then(() => {
        // window.scrollTo({ top: 0, behavior: 'smooth' });
        // this.updateCategoryRequestPending = false;
      });
      /* eslint-enable */
    },
    checkUsernameAvailability() {
      /* eslint-disable */
      console.log("username check");
      if(this.form.username.length >= 3 && this.form.username.length <= 40) {
        // this.isUsernameCheckingPending = true;
          this.$axios.get(`${SIGNUP_ENDPOINTS.CHECK_USERNAME_AVAILABILITY}?username=${this.form.username}`, { progress: false }).then(function(res) {
            this.serverErrorMessagesForFields.username = "";
          }.bind(this)).catch(function (err) {
            this.showEmailConfirmation = false;
            this.lastErrorValues.username = this.form.username;
            if (err.response.data.hasOwnProperty("is_username_exists")) {
              this.serverErrorMessagesForFields.username = err.response.data.message;
            }
          }.bind(this));
      }
      /* eslint-disable */
    },
    checkEmailAvailability() {
      /* eslint-disable */
      console.log("email check");
      if(this.form.email && this.form.email.length <= 40) {
        // this.isUsernameCheckingPending = true;
          this.$axios.get(`${SIGNUP_ENDPOINTS.CHECK_EMAIL_AVAILABILITY}?email=${encodeURIComponent(this.form.email)}`, { progress: false }).then(function(res) {
            this.serverErrorMessagesForFields.email = "";
          }.bind(this)).catch(function (err) {
            this.showEmailConfirmation = false;
            this.lastErrorValues.email = this.form.email;
            if (err.response.data.hasOwnProperty("is_email_exists")) {
              this.serverErrorMessagesForFields.email = err.response.data.message;
            }
          }.bind(this));
      }
      /* eslint-disable */
    },
    clearSignUpForm() {
      this.form.username = "";
      this.form.email = "";
      this.form.password = "";
      this.form.mobile = "";
      this.form.verificationCode = "";
    },
    clearLastErrorValues() {
      this.lastErrorValues.username = "";
      this.lastErrorValues.email = "";
      this.lastErrorValues.mobile = "";
      this.lastErrorValues.verificationCode = "";
    },
    editEmail() {
      this.showEmailConfirmation = false;
      this.$nextTick(function () {
        this.$refs["input-email"].focus();
      });
    },
  },
  head() {
    return {
      title: this.title,
      meta: [
        {
          hid: `description`,
          name: `description`,
          content: `Create a free account to buy, and sell in our community.`,
        },
      ],
    };
  },
};
</script>
