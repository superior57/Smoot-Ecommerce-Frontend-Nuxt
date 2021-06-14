<template>
  <div>
    <b-container class="container-forgot-password rounded" fluid="sm">
      <b-container class="container-inner">
        <h1 class="text-align-center">Recover your account</h1>
        <div v-if="formsVisibility.email.isVisible">
          <div class="text-align-center">
            {{
              `Step: ${formsVisibility.email.step} of ${
                Object.keys(formsVisibility).length
              }`
            }}
          </div>
          <div class="hint">
            {{ formsVisibility.email.title }}
          </div>
          <hr class="separater" />
          <b-form class="form-forgot-password">
            <b-form-group
              id="input-group-1"
              label="Email"
              label-for="input-email"
            >
              <b-form-input
                id="input-email"
                v-model="emailForm.email"
                type="text"
                required
              ></b-form-input>
            </b-form-group>
            <b-button block @click="makeFormVisible(`recovery-code`)">
              {{ formsVisibility.email.buttonText }}
            </b-button>
          </b-form>
        </div>
        <div v-if="formsVisibility.recoveryCode.isVisible">
          <div class="text-align-center">
            {{
              `Step: ${formsVisibility.recoveryCode.step} of ${
                Object.keys(formsVisibility).length
              }`
            }}
          </div>
          <div class="hint">
            <b-alert variant="success" :show="showVerificationCodeAlert">
              {{ formsVisibility.recoveryCode.title }}
            </b-alert>
          </div>
          <hr class="separater" />
          <b-form class="form-forgot-password">
            <b-form-group
              id="input-group-1"
              label="Recovery code"
              label-for="input-recovery-code"
            >
              <b-form-input
                id="input-recovery-code"
                v-model="recoveryCodeForm.code"
                type="text"
                required
              ></b-form-input>
            </b-form-group>
            <b-button block @click="makeFormVisible(`new-password`)">
              {{ formsVisibility.recoveryCode.buttonText }}
            </b-button>
          </b-form>
        </div>
        <div v-if="formsVisibility.newPassword.isVisible">
          <div class="text-align-center">
            {{
              `Step: ${formsVisibility.newPassword.step} of ${
                Object.keys(formsVisibility).length
              }`
            }}
          </div>
          <div class="hint">
            {{ formsVisibility.newPassword.title }}
          </div>
          <hr class="separater" />
          <b-form class="form-forgot-password">
            <b-form-group
              id="input-group-1"
              label="New password"
              label-for="input-new-password"
            >
              <b-form-input
                id="input-new-password"
                v-model="newPasswordForm.password"
                type="password"
                required
              ></b-form-input>
            </b-form-group>
            <b-form-group
              id="input-group-2"
              label="Retype new password"
              label-for="input-re-new-password"
            >
              <b-form-input
                id="input-re-new-password"
                v-model="newPasswordForm.repassword"
                type="password"
                required
              ></b-form-input>
            </b-form-group>
            <b-button block @click="makeFormVisible(`email`)">
              {{ formsVisibility.newPassword.buttonText }}
            </b-button>
          </b-form>
        </div>
        <b-overlay :show="show" no-wrap></b-overlay>
      </b-container>
    </b-container>
    <sign-in-nav nav="forgot-password"></sign-in-nav>
  </div>
</template>
<script>
export default {
  auth: false,
  name: "ForgotPassword",
  data() {
    return {
      title: "Smoot.lk | Account Recovery",
      formsVisibility: {
        email: {
          isVisible: true,
          title:
            "To reset your account password, enter the email which has associated with your account.",
          buttonText: "Send recovery code",
          step: "1",
        },
        recoveryCode: {
          isVisible: false,
          title:
            "Enter the recovery code which has sent to your entered email to reset your password.",
          buttonText: "Verify code",
          step: "2",
        },
        newPassword: {
          isVisible: false,
          title:
            "Enter a new password which is easy for you to remember, but hard for others to guess.",
          buttonText: "Update password",
          step: "3",
        },
      },
      emailForm: {
        email: "",
      },
      recoveryCodeForm: {
        code: "",
      },
      newPasswordForm: {
        password: "",
        repassword: "",
      },
      show: false,
      showVerificationCodeAlert: false,
    };
  },
  methods: {
    makeFormVisible(formToMakeVisible) {
      if (formToMakeVisible === "recovery-code") {
        this.showOverlay();
        this.formsVisibility.email.isVisible = false;
        this.formsVisibility.recoveryCode.isVisible = true;
        this.formsVisibility.newPassword.isVisible = false;
        this.hideOverlay();
      } else if (formToMakeVisible === "new-password") {
        this.showOverlay();
        this.showVerificationCodeAlert = false;
        this.formsVisibility.email.isVisible = false;
        this.formsVisibility.recoveryCode.isVisible = false;
        this.formsVisibility.newPassword.isVisible = true;
        this.hideOverlay();
      } else {
        this.showOverlay();
        this.showVerificationCodeAlert = false;
        this.formsVisibility.email.isVisible = true;
        this.formsVisibility.recoveryCode.isVisible = false;
        this.formsVisibility.newPassword.isVisible = false;
        this.hideOverlay();
      }
    },
    showOverlay() {
      this.show = true;
      this.showVerificationCodeAlert = false;
    },
    hideOverlay() {
      setTimeout(() => {
        this.show = false;
        this.showVerificationCodeAlert = true;
      }, 3000);
    },
  },
  head() {
    return {
      title: this.title,
      meta: [
        {
          hid: `description`,
          name: `description`,
          content: `Account recovery`,
        },
      ],
    };
  },
};
</script>
