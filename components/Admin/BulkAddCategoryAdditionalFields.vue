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
    <validation-observer v-slot="{ handleSubmit }">
      <b-form class="form-add-category" autocomplete="off" @submit.prevent="handleSubmit(submitCategoryData)">
        <div class="form-separator rounded">
          <div class="form-header">
            <h3>
              Category Details
            </h3>
          </div>
          <b-form-group
            id="input-group-0"
            label="Existing category Id"
            label-for="category-id"
            description="(*Addtional fields to copy from)"
            class="mt-2"
          >
            <validation-provider
              name="category Id"
              :rules="{required: true, regex: /^[0-9]+$/ }"
              v-slot="{ classes, errors }"
            >
              <b-form-input
                id="category-id"
                v-model="addCategoryForm.categoryId"
                type="text"
                :class="classes"
                class="max-width-for-input"
              ></b-form-input>
              <div class="invalid-feedback">{{ errors[0] }}</div>
            </validation-provider>
          </b-form-group>
          <hr />
          <b-form-group
            id="input-group-1"
            label="Category"
            label-for="category"
            class="mt-2"
          >
            <validation-provider
              name="category"
              :rules="{ required:true, regex_alpha_numeric_space: /^[/a-zA-Z0-9-'&,+()\s]+$/, max:40 }"
              v-slot="{ classes, errors }"
            >
              <b-form-input
                id="category"
                list="list-category"
                v-model="addCategoryForm.category"
                type="text"
                placeholder="Enter a category"
                :class="classes"
                @click="getCategorySuggestions(addCategoryForm.category)"
                @keyup="changeSub1Sub2Sub3CategoryLabels(), getCategorySuggestions(addCategoryForm.category)"
              ></b-form-input>
              <datalist id="list-category">
                <option
                  v-for="(categorySuggestion, categorySuggestionIndex) in categorySuggestions"
                  :key="categorySuggestionIndex"
                >
                  {{ categorySuggestion.text }}
                </option>
              </datalist>
              <div class="invalid-feedback">{{ errors[0] }}</div>
            </validation-provider>
          </b-form-group>
          <b-form-group
            id="input-group-2"
            :label="sub1CategoryLabel"
            label-for="sub-1-category"
          >
            <validation-provider
              name="sub 1 category"
              :rules="{ regex_alpha_numeric_space: /^[/a-zA-Z0-9-'&,+()\s]+$/, max:40 }"
              v-slot="{ classes, errors }"
            >
              <b-form-input
                id="sub-1-category"
                list="list-sub1-category"
                v-model="addCategoryForm.sub1Category"
                type="text"
                placeholder="Optonal"
                :class="classes"
                @click="getSub1CategorySuggestions(addCategoryForm.sub1Category)"
                @keyup="changeSub2Sub3CategoryLabel(), getSub1CategorySuggestions(addCategoryForm.sub1Category)"
                :disabled="isDisabledSub1CategoryField"
              ></b-form-input>
              <datalist id="list-sub1-category">
                <option
                  v-for="(sub1CategorySuggestion, sub1CategorySuggestionIndex) in sub1CategorySuggestions"
                  :key="sub1CategorySuggestionIndex"
                >
                  {{ sub1CategorySuggestion.text }}
                </option>
              </datalist>
              <div class="invalid-feedback">{{ errors[0] }}</div>
            </validation-provider>
          </b-form-group>
          <b-form-group
            id="input-group-3"
            :label="sub2CategoryLabel"
            label-for="sub-2-category"
          >
            <validation-provider
              name="sub 2 category"
              :rules="{ regex_alpha_numeric_space: /^[/a-zA-Z0-9-'&,+()\s]+$/, max:40 }"
              v-slot="{ classes, errors }"
            >
              <b-form-input
                id="sub-2-category"
                list="list-sub2-category"
                v-model="addCategoryForm.sub2Category"
                type="text"
                placeholder="Optonal"
                :class="classes"
                @click="getSub2CategorySuggestions(addCategoryForm.sub2Category)"
                @keyup="changeSub3CategoryLabel(), getSub2CategorySuggestions(addCategoryForm.sub2Category)"
                :disabled="isDisabledSub2CategoryField"
              ></b-form-input>
              <datalist id="list-sub2-category">
                <option
                  v-for="(sub2CategorySuggestion, sub2CategorySuggestionIndex) in sub2CategorySuggestions"
                  :key="sub2CategorySuggestionIndex"
                >
                  {{ sub2CategorySuggestion.text }}
                </option>
              </datalist>
              <div class="invalid-feedback">{{ errors[0] }}</div>
            </validation-provider>
          </b-form-group>
          <b-form-group
            id="input-group-4"
            :label="sub3CategoryLabel"
            label-for="sub-3-category"
          >
            <validation-provider
              name="sub 3 category"
              :rules="{ regex_alpha_numeric_space: /^[/a-zA-Z0-9-'&,+()\s]+$/, max:40 }"
              v-slot="{ classes, errors }"
            >
              <b-form-input
                id="sub-3-category"
                list="list-sub3-category"
                v-model="addCategoryForm.sub3Category"
                type="text"
                placeholder="Optonal"
                :class="classes"
                @click="getSub3CategorySuggestions(addCategoryForm.sub3Category)"
                @keyup="getSub3CategorySuggestions(addCategoryForm.sub3Category)"
                :disabled="isDisabledSub3CategoryField"
              ></b-form-input>
              <datalist id="list-sub3-category">
                <option
                  v-for="(sub3CategorySuggestion, sub3CategorySuggestionIndex) in sub3CategorySuggestions"
                  :key="sub3CategorySuggestionIndex"
                >
                  {{ sub3CategorySuggestion.text }}
                </option>
              </datalist>
              <div class="invalid-feedback">{{ errors[0] }}</div>
            </validation-provider>
          </b-form-group>
        </div>
        <b-form-group class="mt-2">
          <b-button v-if="!saveCategoryRequestPending" type="submit">Save</b-button>
            <b-button v-else disabled>
              <b-spinner small></b-spinner>
              Loading...
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
  name: "BulkAddCategoryAdditionalFields",
  components: {
    ValidationObserver,
    ValidationProvider,
  },
  data() {
    return {
      addCategoryForm: {
        categoryId: "",
        category: "",
        sub1Category: "",
        sub2Category: "",
        sub3Category: "",
      },
      sub1CategoryLabel: "Sub category 1",
      sub2CategoryLabel: "Sub category 2",
      sub3CategoryLabel: "Sub category 3",
      isDisabledSub1CategoryField: true,
      isDisabledSub2CategoryField: true,
      isDisabledSub3CategoryField: true,
      categorySuggestions: [],
      sub1CategorySuggestions: [],
      sub2CategorySuggestions: [],
      sub3CategorySuggestions: [],
      saveCategoryRequestPending: false,
      serverAlerts: {
        success: "",
        error: "",
        showErrorDismissibleAlert: false,
        showSuccessDismissibleAlert: false,
      },
    };
  },
  watch: {
    "addCategoryForm.sub3Category"() {
      this.generateTheLabelForAddCategoryFieldQuestion();
    },
    "addCategoryForm.sub2Category"() {
      this.generateTheLabelForAddCategoryFieldQuestion();
    },
    "addCategoryForm.sub1Category"() {
      this.generateTheLabelForAddCategoryFieldQuestion();
    },
    "addCategoryForm.category"() {
      this.generateTheLabelForAddCategoryFieldQuestion();
      this.changeSub1Sub2Sub3CategoryLabels();
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
  },
  methods: {
    generateTheLabelForAddCategoryFieldQuestion() {
      if (this.addCategoryForm.sub3Category) {
        this.labelForAddCategoryFieldQuestion = `Add an Input field for the catogory of ${this.addCategoryForm.sub3Category} in ${this.addCategoryForm.category} > ${this.addCategoryForm.sub1Category} > ${this.addCategoryForm.sub2Category}?`;
      } else if (this.addCategoryForm.sub2Category) {
        this.labelForAddCategoryFieldQuestion = `Add an Input field for the catogory of ${this.addCategoryForm.sub2Category} in ${this.addCategoryForm.category} > ${this.addCategoryForm.sub1Category}?`;
      } else if (this.addCategoryForm.sub1Category) {
        this.labelForAddCategoryFieldQuestion = `Add an Input field for the catogory of ${this.addCategoryForm.sub1Category} in ${this.addCategoryForm.category}?`;
      } else {
        this.labelForAddCategoryFieldQuestion = `Add an Input field for the catogory of ${this.addCategoryForm.category}?`;
      }
    },
    changeSub1Sub2Sub3CategoryLabels() {
      /* eslint-disable */
      const element = document.getElementById("category");
      if (this.$hasClassInDOM(element, "is-invalid") || this.addCategoryForm.category === "") {
        this.sub1CategoryLabel = "Sub category 1";
        this.sub2CategoryLabel = "Sub category 2";
        this.sub3CategoryLabel = "Sub category 3";
        this.disableAndClearSub1Sub2Sub3CategoryFields();
      } else {
        this.sub1CategoryLabel = `Sub category of ${this.addCategoryForm.category}`;
        this.isDisabledSub1CategoryField = false;
      }
      /* eslint-enable */
    },
    changeSub2Sub3CategoryLabel() {
      /* eslint-disable */
      const element = document.getElementById("sub-1-category");
      if (this.$hasClassInDOM(element, "is-invalid") || this.addCategoryForm.sub1Category === "") {
        this.sub2CategoryLabel = "Sub category 2";
        this.sub3CategoryLabel = "Sub category 3"
        this.disableAndClearSub2Sub3CategoryFields();
      } else {
        this.sub2CategoryLabel = `Sub category of ${this.addCategoryForm.sub1Category} in ${this.addCategoryForm.category}`;
        this.isDisabledSub2CategoryField = false;
      }
      /* eslint-enable */
    },
    changeSub3CategoryLabel() {
      /* eslint-disable */
      const element = document.getElementById("sub-2-category");
      if(this.$hasClassInDOM(element, "is-invalid") || this.addCategoryForm.sub2Category === "") {
        this.sub3CategoryLabel = "Sub category 3"
        this.disableAndClearSub3CategoryFields();
      } else {
        this.sub3CategoryLabel = `Sub category of ${this.addCategoryForm.sub2Category} in ${this.addCategoryForm.category} > ${this.addCategoryForm.sub1Category}`;
        this.isDisabledSub3CategoryField = false;
      }
      /* eslint-enable */
    },
    disableAndClearSub1Sub2Sub3CategoryFields() {
      this.isDisabledSub1CategoryField = true;
      this.isDisabledSub2CategoryField = true;
      this.isDisabledSub3CategoryField = true;
      this.addCategoryForm.sub1Category = "";
      this.addCategoryForm.sub2Category = "";
      this.addCategoryForm.sub3Category = "";
    },
    disableAndClearSub2Sub3CategoryFields() {
      this.isDisabledSub2CategoryField = true;
      this.isDisabledSub3CategoryField = true;
      this.addCategoryForm.sub2Category = "";
      this.addCategoryForm.sub3Category = "";
    },
    disableAndClearSub3CategoryFields() {
      this.isDisabledSub3CategoryField = true;
      this.addCategoryForm.sub3Category = "";
    },
    getCategorySuggestions(word) {
      /* eslint-disable */
      this.$axios.get(`${ENDPOINTS_FOR_ADMIN.CATEGORY.GET_SUGGESTIONS}?word=${encodeURIComponent(word)}`, { progress: false })
      .then(function(res) {
        this.categorySuggestions = res.data.suggestions;
      }.bind(this))
      .catch(function (err) {
        this.categorySuggestions = [];
      }.bind(this));
      /* eslint-enable */
    },
    getSub1CategorySuggestions(word) {
      /* eslint-disable */
      this.$axios.get(
        `${ENDPOINTS_FOR_ADMIN.CATEGORY.GET_SUGGESTIONS_FOR_SUB_1_CATEGORY}?word=${encodeURIComponent(word)}&category=${encodeURIComponent(this.addCategoryForm.category)}`,
        { progress: false }
      )
      .then(function(res) {
        this.sub1CategorySuggestions = res.data.sub_1_category_suggestions;
      }.bind(this))
      .catch(function (err) {
        this.sub1CategorySuggestions = [];
      }.bind(this));
      /* eslint-enable */
    },
    getSub2CategorySuggestions(word) {
      /* eslint-disable */
      this.$axios.get(
        `${ENDPOINTS_FOR_ADMIN.CATEGORY.GET_SUGGESTIONS_FOR_SUB_2_CATEGORY}?word=${encodeURIComponent(word)}&category=${encodeURIComponent(this.addCategoryForm.category)}&sub1Category=${encodeURIComponent(this.addCategoryForm.sub1Category)}`,
        { progress: false }
      )
      .then(function(res) {
        this.sub2CategorySuggestions = res.data.sub_2_category_suggestions;
      }.bind(this))
      .catch(function (err) {
        this.sub2CategorySuggestions = [];
      }.bind(this));
      /* eslint-enable */
    },
    getSub3CategorySuggestions(word) {
      /* eslint-disable */
      this.$axios.get(
        `${ENDPOINTS_FOR_ADMIN.CATEGORY.GET_SUGGESTIONS_FOR_SUB_3_CATEGORY}?word=${encodeURIComponent(word)}&category=${encodeURIComponent(this.addCategoryForm.category)}&sub1Category=${encodeURIComponent(this.addCategoryForm.sub1Category)}&sub2Category=${encodeURIComponent(this.addCategoryForm.sub2Category)}`,
        { progress: false }
      )
      .then(function(res) {
        this.sub3CategorySuggestions = res.data.sub_3_category_suggestions;
      }.bind(this))
      .catch(function (err) {
        this.sub3CategorySuggestions = [];
      }.bind(this));
      /* eslint-enable */
    },
    submitCategoryData() {
      /* eslint-disable */
      this.serverAlerts.showErrorDismissibleAlert = false;
      this.serverAlerts.showSuccessDismissibleAlert = false;
      this.saveCategoryRequestPending = true;
      const formData = this.$toFormData(this.addCategoryForm);
      this.$axios.post(ENDPOINTS_FOR_ADMIN.CATEGORY.ADD_AND_CODY, formData).then(function(res) {
        this.serverAlerts.success = res.data.message;
        this.serverAlerts.showSuccessDismissibleAlert = true;
        this.clearAddCategoryForm();
      }.bind(this)).catch(function (err) {
        if(err.response.data.hasOwnProperty("message")){
          this.serverAlerts.error = err.response.data.message;
        } else {
          const errors = err.response.data;
          for (const key in errors) {
            this.serverAlerts.error += `${errors[key][0]}. `;
          }
        }
        this.serverAlerts.showErrorDismissibleAlert = true;
      }.bind(this)).then(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        this.saveCategoryRequestPending = false;
      });
      /* eslint-enable */
    },
    clearAddCategoryForm() {
      this.addCategoryForm.category = "";
      this.disableAndClearSub1Sub2Sub3CategoryFields();
    },
  },
};
</script>
