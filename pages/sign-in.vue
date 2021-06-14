<template>
  <div>
    <b-container class="container-sign-in rounded" fluid="sm">
      <b-container class="container-inner">
        <h1 class="text-align-center">Sign In</h1>
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
          <b-form autocomplete="off" @submit.prevent="handleSubmit(signInUser)">
            <!-- eslint-disable -->
            <b-form-group
              id="input-group-1"
              label="Email or username"
              label-for="input-email"
            >
            <validation-provider
              v-slot="{ classes, errors }"
              :name="labelForEmailOrUsername"
              :rules="validateRuleForEmailOrUsername === `email`
                ? `required|email|max:40`
                : { required:true, regex:/^[a-zA-Z0-9-]+$/, max:40 }"
            >
              <b-form-input
                id="input-email"
                v-model="form.emailOrUsername"
                placeholder="Email or username"
                type="text"
                :class="classes"
              ></b-form-input>
              <div class="invalid-feedback">
                {{ errors[0] }}
              </div>
            </validation-provider>
            </b-form-group>
            <b-form-group
              id="input-group-2"
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
                  max:40,
                }"
              >
                <b-form-input
                  id="input-password"
                  v-model="form.password"
                  placeholder="Password"
                  :type="showPassword ? `text` : `password`"
                  :class="classes"
                ></b-form-input>
                <div class="invalid-feedback">
                  {{ errors[0] }}
                </div>
              </validation-provider>
            </b-form-group>
            <b-form-group>
              <validation-provider
                v-slot="{ classes, errors }"
                name="remember me"
                :rules="{
                  required: true,
                }"
              >
                <b-row>
                  <b-col cols="6" class="text-align-left">
                    <b-form-checkbox
                      v-model="form.rememberMe"
                      class="mb-2 mr-sm-2 mb-sm-0"
                      :class="classes"
                    >
                      Remember me
                    </b-form-checkbox>
                    <div class="invalid-feedback">
                      {{ errors[0] }}
                    </div>
                  </b-col>
                  <b-col cols="6" class="text-align-right">
                    <nuxt-link to="/forgot-password">Forgot password?</nuxt-link>
                  </b-col>
                </b-row>
              </validation-provider>
            </b-form-group>
            <b-button
              v-if="!isSignInRequestPending"
              type="submit"
              block
            >
              Sign In
            </b-button>
            <b-button
                v-else
                block
                disabled
              >
                <b-spinner small></b-spinner>
                Signing in...
              </b-button>
            <b-row class="row-login-btn-separate">
              <b-col cols="5" class="col-hr">
                <hr />
              </b-col>
              <b-col cols="2" class="col-label text-align-center">OR</b-col>
              <b-col cols="5" class="col-hr">
                <hr />
              </b-col>
            </b-row>
            <b-button class="btn-facebook" block :disabled="isSignInRequestPending ? true : false">
              <b-img src="/fb.png"></b-img>
              <span class="label">Sign In with Facebook</span>
            </b-button>
            <!-- eslint-enable -->
          </b-form>
        </validation-observer>
      </b-container>
    </b-container>
    <sign-in-nav nav="sign-in"></sign-in-nav>
  </div>
</template>
<script>
import { ValidationObserver, ValidationProvider } from "vee-validate";
export default {
  auth: "guest",
  name: "SignIn",
  components: {
    ValidationObserver,
    ValidationProvider,
  },
  data() {
    return {
      title: "Smoot.lk | Sign In",
      form: {
        emailOrUsername: "",
        password: "",
        rememberMe: true,
      },
      showPassword: false,
      isSignInRequestPending: false,
      serverAlerts: {
        error: "",
        showErrorDismissibleAlert: false,
      },
      validateRuleForEmailOrUsername: "email",
      labelForEmailOrUsername: "email or username",
    };
  },
  watch: {
    "serverAlerts.showErrorDismissibleAlert"() {
      if (!this.serverAlerts.showErrorDismissibleAlert) {
        this.serverAlerts.error = "";
      }
    },
    "form.emailOrUsername"() {
      this.serverAlerts.showErrorDismissibleAlert = false;
      this.labelForEmailOrUsernameCheck();
      this.validateRuleForEmailOrUsernameCheck();
    },
    "form.password"() {
      this.serverAlerts.showErrorDismissibleAlert = false;
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
    async signInUser() {
      /* eslint-disable */
      this.serverAlerts.showErrorDismissibleAlert = false;
      this.isSignInRequestPending = true;
      const formData = this.$toFormData(this.form);
      try {
        await this.$auth.loginWith('local', { data: formData });
        // this.$appRouteNavigation(PROFILE);
        // this.$auth.$storage.setCookie("auth._token.local", "foo");
        // context.$auth.$storage.setUniversal("auth._token.local", "foo");
      } catch (err) {
        if(err.response.data.hasOwnProperty("error")){
          this.serverAlerts.error = err.response.data.error; 
        }
      } finally {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setTimeout(() => {
          this.isSignInRequestPending = false;
          if(this.serverAlerts.error) {
            this.serverAlerts.showErrorDismissibleAlert = true;
          }
        }, 500);
      }
        /* eslint-enable */
    },
    clearSignInForm() {
      this.form.emailOrUsername = "";
      this.form.password = "";
      this.form.rememberMe = true;
    },
    labelForEmailOrUsernameCheck() {
      if (!this.form.emailOrUsername) {
        this.labelForEmailOrUsername = "email or username";
      } else if (this.form.emailOrUsername.includes("@")) {
        this.labelForEmailOrUsername = "email";
      } else {
        this.labelForEmailOrUsername = "username";
      }
    },
    validateRuleForEmailOrUsernameCheck() {
      if (!this.form.emailOrUsername.includes("@")) {
        this.validateRuleForEmailOrUsername = "username";
      } else {
        this.validateRuleForEmailOrUsername = "email";
      }
    },
  },
  head() {
    return {
      title: this.title,
      meta: [
        {
          hid: `description`,
          name: `description`,
          content: `Sign In`,
        },
      ],
    };
  },
};
</script>
