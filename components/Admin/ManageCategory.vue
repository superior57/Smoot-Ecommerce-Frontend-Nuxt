<template>
  <b-row>
    <h2 class="text-align-center">Manage Categories</h2>
    <b-col cols="12">
      <div>
        <b-button-group size="sm">
          <!--eslint-disable-->
          <b-button
            :class="
              showAddCategoryTab && !showListCategoryTab && !showBulkInsertTab ? null : `default-btn-outline`"
            @click="(showAddCategoryTab = true), (showListCategoryTab = false), (showBulkInsertTab = false)"
          >
            Add Category
          </b-button>
          <b-button
            :class="!showAddCategoryTab && showListCategoryTab && !showBulkInsertTab ? null : `default-btn-outline`"
            @click="(showAddCategoryTab = false), (showListCategoryTab = true), (showBulkInsertTab = false)"
          >
            View Category List
          </b-button>
          <b-button
            :class="!showAddCategoryTab && !showListCategoryTab && !showBulkInsertTab? null : `default-btn-outline`"
            @click="(showAddCategoryTab = false), (showListCategoryTab = false), (showBulkInsertTab = false)"
          >
            Edit Category
          </b-button>
          <b-button
            :class="!showAddCategoryTab && !showListCategoryTab && showBulkInsertTab ? null : `default-btn-outline`"
            @click="(showAddCategoryTab = false), (showListCategoryTab = false), (showBulkInsertTab = true)"
          >
            Bulk Insert
          </b-button>
          <!--eslint-enable-->
        </b-button-group>
      </div>
    </b-col>
    <b-col v-if="showAddCategoryTab" cols="12">
      <div>
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
        <b-alert variant="warning" show>
          <p>Note</p>
          <ul>
            <li><b>Category</b>: This field is to enter a category</li>
            <li>
              <b>Sub category 1</b>: This field is to enter the sub category of
              <b>Category</b>
            </li>
            <li>
              <b>Sub category 2</b>: This field is to enter the sub category of
              <b>Sub category 1</b>
            </li>
            <li>
              <b>Sub category 3</b>: This field is to enter the sub category of
              <b>Sub category 2</b>
            </li>
          </ul>
        </b-alert>
        <!-- eslint-disable -->
        <validation-observer v-slot="{ handleSubmit }">
          <b-form class="form-add-category" autocomplete="off" @submit.prevent="handleSubmit(submitCategoryData)">
            <div class="form-separator rounded">
              <div class="form-header">
                <h3>
                  Category Type
                </h3>
              </div>
              <b-form-group>
                <validation-provider
                  name="category type"
                  rules="required"
                  v-slot="{ classes, errors }"
                >
                  <b-form-checkbox-group
                    id="checkbox-group-category-type-select"
                    v-model="addCategoryForm.categoryTypes"
                    :options="addCategoryLookupValues.categoryTypes"
                    :class="classes"
                  ></b-form-checkbox-group>
                  <div class="invalid-feedback">{{ errors[0] }}</div>
                </validation-provider>
              </b-form-group>
            </div>
            <div class="form-separator rounded">
              <div class="form-header">
                <h3>
                  Category Details
                </h3>
              </div>
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
            <!-- category fields for sale category type -->
            <div class="form-separator rounded" v-if="hasToShowCategoryFieldsSectionForSaleType">
              <div class="form-header">
                <h3>
                  Additional Fields for Sale Type
                </h3>
              </div>
              <div class="mt-2">
                <span
                  v-html="labelForAddCategoryFieldQuestion"
                ></span>
                <!-- {{ labelForAddCategoryFieldQuestion }} -->
                <div
                  class="field-make-section rounded"
                  v-for="(fieldSection, fieldSectionIndex) in fieldsSectionForSaleType"
                  :key="fieldSectionIndex"
                >
                  <div class="add-question-or-remove">
                    <b-button
                      size="sm"
                      v-if="fieldSection.add"
                      class="default-btn-outline btn-no-border"
                      @click="createFieldSectionForSaleType(fieldSectionIndex)"  
                    >
                      <i class="fa fa-plus-circle" aria-hidden="true"></i>
                      <span>Add</span>
                    </b-button>
                    <b-button
                      size="sm"
                      variant="none"
                      class="btn-danger-outline btn-no-border"
                      v-else
                      @click="removeFieldSectionForSaleType(fieldSectionIndex)"
                    >
                      <i class="fa fa-minus-circle" aria-hidden="true"></i>
                      <span>Remove</span>
                    </b-button>
                  </div>
                  <div
                    class="field-section mt-2"
                    v-if="fieldSection.remove"
                  >
                    <div
                      v-show="!fieldSection.relatedOptions.inputType.length"
                      class="field-type-select">
                      <b-form-group label="Select Input type">
                        <validation-provider
                          rules="required_for_dynamic_input_type_selection"
                          v-slot="{ classes, errors }"
                        >
                          <b-form-radio-group
                            v-model="fieldSection.relatedOptions.inputType"
                            :options="addCategoryLookupValues.inputTypes"
                            :class="classes"
                          ></b-form-radio-group>
                          <div class="invalid-feedback">{{ errors[0] }}</div>
                        </validation-provider>
                      </b-form-group>
                    </div>
                    <div class="field-description">
                      <div v-if="fieldSection.relatedOptions.inputType === `text`">
                        <b-form-group>
                          <label>
                            Label for the text field
                          </label>
                          <validation-provider
                            :rules="{
                              required_for_dynamic_input_label_for_the_text: true,
                              regex_alpha_numeric_space_for_dynamic_input_label_for_text: /^[/a-zA-Z0-9-'&,+()\s]+$/,
                              max_for_dymanic_input_label_for_text:40
                            }"
                            v-slot="{ classes, errors }"
                          >
                            <b-form-input
                              type="text"
                              v-model="fieldSection.relatedOptions.labelName"
                              :class="classes"
                            ></b-form-input>
                            <div class="invalid-feedback">{{ errors[0] }}</div>
                          </validation-provider>
                        </b-form-group>
                        <b-form-group>
                          <label>
                            Placeholder for the text field
                          </label>
                          <validation-provider
                            :rules="{
                              required: false,
                              regex_alpha_numeric_space_for_dynamic_input_placeholder_for_text: /^[/a-zA-Z0-9-'&,+()\s]+$/,
                              max_for_dymanic_input_placeholder_for_text:40
                            }"
                            v-slot="{ classes, errors }"
                          >
                            <b-form-input
                              type="text"
                              v-model="fieldSection.relatedOptions.placeholderName"
                              placeholder="Optional"
                              :class="classes"
                            ></b-form-input>
                            <div class="invalid-feedback">{{ errors[0] }}</div>
                          </validation-provider>
                        </b-form-group>
                        <b-form-group>
                          <label>
                            Is required?
                          </label>
                          <validation-provider
                            rules="required_with_no_field_label_passed"
                            v-slot="{ classes, errors }"
                          >
                            <b-form-radio-group
                              v-model="fieldSection.relatedOptions.isRequired"
                              :options="addCategoryLookupValues.isRequired"
                              :class="classes"
                            ></b-form-radio-group>
                            <div class="invalid-feedback">{{ errors[0] }}</div>
                          </validation-provider>
                        </b-form-group>
                      </div>
                      <div v-if="fieldSection.relatedOptions.inputType === `ddl`">
                        <b-form-group>
                          <label>
                            Label for the drop-down list field
                          </label>
                          <validation-provider
                            :rules="{
                              required_for_dynamic_input_label_for_the_drop_down_list: true,
                              regex_alpha_numeric_space_for_dynamic_input_label_for_the_drop_down_list: /^[/a-zA-Z0-9-'&,+()\s]+$/,
                              max_for_dymanic_input_label_for_the_drop_down_list:40
                            }"
                            v-slot="{ classes, errors }"
                          >
                            <b-form-input
                              type="text"
                              v-model="fieldSection.relatedOptions.labelName"
                              :class="classes"
                            ></b-form-input>
                            <div class="invalid-feedback">{{ errors[0] }}</div>
                          </validation-provider>
                        </b-form-group>
                        <b-form-group>
                          <label>
                            Type a new value for drop-down list and press enter or click enter button
                          </label>
                          <validation-provider
                            :rules="{
                              required_for_tags_for_dynamic_input_tags_for_drop_down_list: true,
                              regex_alpha_numeric_space_for_dynamic_input_tags_for_the_drop_down_list: regexForDynamicFields,
                              max_for_tags_dynamic_input_tags_for_the_drop_down_list:40
                            }"
                            v-slot="{ classes, errors }"
                          >
                            <b-form-tags
                              v-model="fieldSection.relatedOptions.texts"
                              tag-variant="tag-theme-blue"
                              no-outer-focus
                              :class="classes"
                            >
                              <template  v-slot="{ tags, inputAttrs, inputHandlers, tagVariant, addTag, removeTag }">
                                <b-input-group class="mt-2 mb-2">
                                  <b-form-input
                                    v-bind="inputAttrs"
                                    v-on="inputHandlers"
                                    placeholder="Add value..."
                                    class="form-control"
                                    size="md"
                                  ></b-form-input>
                                  <b-input-group-append>
                                    <b-button
                                      class="default-btn-outline btn-add-tag text-align-center"
                                      size="sm"
                                      @click="addTag()" 
                                    >
                                      Enter
                                    </b-button>
                                  </b-input-group-append>
                                </b-input-group>
                                <div class="d-inline-block">
                                  <b-form-tag
                                    v-for="tag in tags"
                                    @remove="removeTag(tag)"
                                    :key="tag"
                                    :title="tag"
                                    :variant="tagVariant"
                                    class="mr-1 mt-1 mb-1 tag"
                                  >
                                    {{ tag }}
                                  </b-form-tag>
                                </div>
                              </template>
                            </b-form-tags>
                            <div class="invalid-feedback">{{ errors[0] }}</div>
                          </validation-provider>
                        </b-form-group>
                        <b-form-group>
                          <label>
                            Is required?
                          </label>
                          <validation-provider
                            rules="required_with_no_field_label_passed"
                            v-slot="{ classes, errors }"
                          >
                            <b-form-radio-group
                              v-model="fieldSection.relatedOptions.isRequired"
                              :options="addCategoryLookupValues.isRequired"
                              :class="classes"
                            ></b-form-radio-group>
                            <div class="invalid-feedback">{{ errors[0] }}</div>
                          </validation-provider>
                        </b-form-group>
                      </div>
                      <div v-if="fieldSection.relatedOptions.inputType === `radio`">
                        <b-form-group>
                          <label>
                            Label for the radio button list field
                          </label>
                          <validation-provider
                            :rules="{
                              required_for_dynamic_input_label_for_the_radio_button_list: true,
                              regex_alpha_numeric_space_for_dynamic_input_label_for_the_radio_button_list: /^[/a-zA-Z0-9-'&,+()\s]+$/,
                              max_for_dymanic_input_label_for_the_radio_button_list:40
                            }"
                            v-slot="{ classes, errors }"
                          >
                            <b-form-input
                              type="text"
                              v-model="fieldSection.relatedOptions.labelName"
                              :class="classes"
                            ></b-form-input>
                            <div class="invalid-feedback">{{ errors[0] }}</div>
                          </validation-provider>
                        </b-form-group>
                        <b-form-group>
                          <label>
                            Type a new value for radio button list and press enter or click enter button
                          </label>
                          <validation-provider
                            :rules="{
                              required_for_tags_for_dynamic_input_tags_for_the_radio_button_list: true,
                              regex_alpha_numeric_space_for_dynamic_input_tags_for_the_radio_button_list: regexForDynamicFields,
                              max_for_tags_dynamic_input_tags_for_the_radio_button_list:40
                            }"
                            v-slot="{ classes, errors }"
                          >
                            <b-form-tags
                              v-model="fieldSection.relatedOptions.texts"
                              tag-variant="tag-theme-blue"
                              no-outer-focus
                              :class="classes"
                            >
                              <template  v-slot="{ tags, inputAttrs, inputHandlers, tagVariant, addTag, removeTag }">
                                <b-input-group class="mt-2 mb-2">
                                  <b-form-input
                                    v-bind="inputAttrs"
                                    v-on="inputHandlers"
                                    placeholder="Add value..."
                                    class="form-control"
                                    size="md"
                                  ></b-form-input>
                                  <b-input-group-append>
                                    <b-button
                                      class="default-btn-outline btn-add-tag text-align-center"
                                      size="sm"
                                      @click="addTag()" 
                                    >
                                      Enter
                                    </b-button>
                                  </b-input-group-append>
                                </b-input-group>
                                <div class="d-inline-block">
                                  <b-form-tag
                                    v-for="tag in tags"
                                    @remove="removeTag(tag)"
                                    :key="tag"
                                    :title="tag"
                                    :variant="tagVariant"
                                    class="mr-1 mt-1 mb-1 tag"
                                  >
                                    {{ tag }}
                                  </b-form-tag>
                                </div>
                              </template>
                            </b-form-tags>
                            <div class="invalid-feedback">{{ errors[0] }}</div>
                          </validation-provider>
                        </b-form-group>
                        <b-form-group>
                          <label>
                            Is required?
                          </label>
                          <validation-provider
                            rules="required_with_no_field_label_passed"
                            v-slot="{ classes, errors }"
                          >
                            <b-form-radio-group
                              v-model="fieldSection.relatedOptions.isRequired"
                              :options="addCategoryLookupValues.isRequired"
                              :class="classes"
                            ></b-form-radio-group>
                            <div class="invalid-feedback">{{ errors[0] }}</div>
                          </validation-provider>
                        </b-form-group>
                      </div>
                      <div v-if="fieldSection.relatedOptions.inputType === `checkbox`">
                        <b-form-group>
                          <label>
                            Label for the checkbox list field
                          </label>
                          <validation-provider
                            :rules="{
                              required_for_dynamic_input_label_for_the_checkbox_list: true,
                              regex_alpha_numeric_space_for_dynamic_input_label_for_the_checkbox_list: /^[/a-zA-Z0-9-'&,+()\s]+$/,
                              max_for_dymanic_input_label_for_the_checkbox_list:40
                            }"
                            v-slot="{ classes, errors }"
                          >
                            <b-form-input
                              type="text"
                              v-model="fieldSection.relatedOptions.labelName"
                              :class="classes"
                            ></b-form-input>
                            <div class="invalid-feedback">{{ errors[0] }}</div>
                          </validation-provider>
                        </b-form-group>
                        <b-form-group>
                          <label>
                            Type a new value for checkbox list and press enter or click enter button
                          </label>
                          <validation-provider
                            :rules="{
                              required_for_tags_for_dynamic_input_tags_for_the_checkbox_list: true,
                              regex_alpha_numeric_space_for_dynamic_input_tags_for_the_checkbox_list: regexForDynamicFields,
                              max_for_tags_dynamic_input_tags_for_the_checkbox_list:40
                            }"
                            v-slot="{ classes, errors }"
                          >
                            <b-form-tags
                              v-model="fieldSection.relatedOptions.texts"
                              tag-variant="tag-theme-blue"
                              no-outer-focus
                              :class="classes"
                            >
                            <template  v-slot="{ tags, inputAttrs, inputHandlers, tagVariant, addTag, removeTag }">
                                <b-input-group class="mt-2 mb-2">
                                  <b-form-input
                                    v-bind="inputAttrs"
                                    v-on="inputHandlers"
                                    placeholder="Add value..."
                                    class="form-control"
                                    size="md"
                                  ></b-form-input>
                                  <b-input-group-append>
                                    <b-button
                                      class="default-btn-outline btn-add-tag text-align-center"
                                      size="sm"
                                      @click="addTag()" 
                                    >
                                      Enter
                                    </b-button>
                                  </b-input-group-append>
                                </b-input-group>
                                <div class="d-inline-block">
                                  <b-form-tag
                                    v-for="tag in tags"
                                    @remove="removeTag(tag)"
                                    :key="tag"
                                    :title="tag"
                                    :variant="tagVariant"
                                    class="mr-1 mt-1 mb-1 tag"
                                  >
                                    {{ tag }}
                                  </b-form-tag>
                                </div>
                              </template>
                            </b-form-tags>
                            <div class="invalid-feedback">{{ errors[0] }}</div>
                          </validation-provider>
                        </b-form-group>
                        <b-form-group>
                          <label>
                            <h3>Is required?</h3>
                          </label>
                          <validation-provider
                            rules="required_with_no_field_label_passed"
                            v-slot="{ classes, errors }"
                          >
                            <b-form-radio-group
                              v-model="fieldSection.relatedOptions.isRequired"
                              :options="addCategoryLookupValues.isRequired"
                              :class="classes"
                            ></b-form-radio-group>
                            <div class="invalid-feedback">{{ errors[0] }}</div>
                          </validation-provider>
                        </b-form-group>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- end category fields for sale category type -->
            <!-- category fields for rent category type -->
            <div class="form-separator rounded" v-if="hasToShowCategoryFieldsSectionForRentType">
              <div class="form-header">
                <h3>
                  Additional Fields for Rent Type
                </h3>
              </div>
              <div class="mt-2">
                <span
                  v-html="labelForAddCategoryFieldQuestion"
                ></span>
                <!-- {{ labelForAddCategoryFieldQuestion }} -->
                <div
                  class="field-make-section rounded section-rent-type"
                  v-for="(fieldSection, fieldSectionIndex) in fieldsSectionForRentType"
                  :key="fieldSectionIndex"
                >
                  <div class="add-question-or-remove">
                    <b-button
                      size="sm"
                      v-if="fieldSection.add"
                      class="default-btn-outline btn-no-border"
                      @click="createFieldSectionForRentType(fieldSectionIndex)"  
                    >
                      <i class="fa fa-plus-circle" aria-hidden="true"></i>
                      <span>Add</span>
                    </b-button>
                    <b-button
                      size="sm"
                      variant="none"
                      class="btn-danger-outline btn-no-border"
                      v-else
                      @click="removeFieldSectionForRentType(fieldSectionIndex)"
                    >
                      <i class="fa fa-minus-circle" aria-hidden="true"></i>
                      <span>Remove</span>
                    </b-button>
                  </div>
                  <div
                    class="field-section mt-2"
                    v-if="fieldSection.remove"
                  >
                    <div
                      v-show="!fieldSection.relatedOptions.inputType.length"
                      class="field-type-select">
                      <b-form-group label="Select Input type">
                        <validation-provider
                          rules="required_for_dynamic_input_type_selection"
                          v-slot="{ classes, errors }"
                        >
                          <b-form-radio-group
                            v-model="fieldSection.relatedOptions.inputType"
                            :options="addCategoryLookupValues.inputTypes"
                            :class="classes"
                          ></b-form-radio-group>
                          <div class="invalid-feedback">{{ errors[0] }}</div>
                        </validation-provider>
                      </b-form-group>
                    </div>
                    <div class="field-description">
                      <div v-if="fieldSection.relatedOptions.inputType === `text`">
                        <b-form-group>
                          <label>
                            Label for the text field
                          </label>
                          <validation-provider
                            :rules="{
                              required_for_dynamic_input_label_for_the_text: true,
                              regex_alpha_numeric_space_for_dynamic_input_label_for_text: /^[/a-zA-Z0-9-'&,+()\s]+$/,
                              max_for_dymanic_input_label_for_text:40
                            }"
                            v-slot="{ classes, errors }"
                          >
                            <b-form-input
                              type="text"
                              v-model="fieldSection.relatedOptions.labelName"
                              :class="classes"
                            ></b-form-input>
                            <div class="invalid-feedback">{{ errors[0] }}</div>
                          </validation-provider>
                        </b-form-group>
                        <b-form-group>
                          <label>
                            Placeholder for the text field
                          </label>
                          <validation-provider
                            :rules="{
                              required: false,
                              regex_alpha_numeric_space_for_dynamic_input_placeholder_for_text: /^[/a-zA-Z0-9-'&,+()\s]+$/,
                              max_for_dymanic_input_placeholder_for_text:40
                            }"
                            v-slot="{ classes, errors }"
                          >
                            <b-form-input
                              type="text"
                              v-model="fieldSection.relatedOptions.placeholderName"
                              placeholder="Optional"
                              :class="classes"
                            ></b-form-input>
                            <div class="invalid-feedback">{{ errors[0] }}</div>
                          </validation-provider>
                        </b-form-group>
                        <b-form-group>
                          <label>
                            Is required?
                          </label>
                          <validation-provider
                            rules="required_with_no_field_label_passed"
                            v-slot="{ classes, errors }"
                          >
                            <b-form-radio-group
                              v-model="fieldSection.relatedOptions.isRequired"
                              :options="addCategoryLookupValues.isRequired"
                              :class="classes"
                            ></b-form-radio-group>
                            <div class="invalid-feedback">{{ errors[0] }}</div>
                          </validation-provider>
                        </b-form-group>
                      </div>
                      <div v-if="fieldSection.relatedOptions.inputType === `ddl`">
                        <b-form-group>
                          <label>
                            Label for the drop-down list field
                          </label>
                          <validation-provider
                            :rules="{
                              required_for_dynamic_input_label_for_the_drop_down_list: true,
                              regex_alpha_numeric_space_for_dynamic_input_label_for_the_drop_down_list: /^[/a-zA-Z0-9-'&,+()\s]+$/,
                              max_for_dymanic_input_label_for_the_drop_down_list:40
                            }"
                            v-slot="{ classes, errors }"
                          >
                            <b-form-input
                              type="text"
                              v-model="fieldSection.relatedOptions.labelName"
                              :class="classes"
                            ></b-form-input>
                            <div class="invalid-feedback">{{ errors[0] }}</div>
                          </validation-provider>
                        </b-form-group>
                        <b-form-group>
                          <label>
                            Type a new value for drop-down list and press enter or click enter button
                          </label>
                          <validation-provider
                            :rules="{
                              required_for_tags_for_dynamic_input_tags_for_drop_down_list: true,
                              regex_alpha_numeric_space_for_dynamic_input_tags_for_the_drop_down_list: regexForDynamicFields,
                              max_for_tags_dynamic_input_tags_for_the_drop_down_list:40
                            }"
                            v-slot="{ classes, errors }"
                          >
                            <b-form-tags
                              v-model="fieldSection.relatedOptions.texts"
                              tag-variant="tag-theme-blue"
                              no-outer-focus
                              :class="classes"
                            >
                              <template  v-slot="{ tags, inputAttrs, inputHandlers, tagVariant, addTag, removeTag }">
                                <b-input-group class="mt-2 mb-2">
                                  <b-form-input
                                    v-bind="inputAttrs"
                                    v-on="inputHandlers"
                                    placeholder="Add value..."
                                    class="form-control"
                                    size="md"
                                  ></b-form-input>
                                  <b-input-group-append>
                                    <b-button
                                      class="default-btn-outline btn-add-tag text-align-center"
                                      size="sm"
                                      @click="addTag()" 
                                    >
                                      Enter
                                    </b-button>
                                  </b-input-group-append>
                                </b-input-group>
                                <div class="d-inline-block">
                                  <b-form-tag
                                    v-for="tag in tags"
                                    @remove="removeTag(tag)"
                                    :key="tag"
                                    :title="tag"
                                    :variant="tagVariant"
                                    class="mr-1 mt-1 mb-1 tag"
                                  >
                                    {{ tag }}
                                  </b-form-tag>
                                </div>
                              </template>
                            </b-form-tags>
                            <div class="invalid-feedback">{{ errors[0] }}</div>
                          </validation-provider>
                        </b-form-group>
                        <b-form-group>
                          <label>
                            Is required?
                          </label>
                          <validation-provider
                            rules="required_with_no_field_label_passed"
                            v-slot="{ classes, errors }"
                          >
                            <b-form-radio-group
                              v-model="fieldSection.relatedOptions.isRequired"
                              :options="addCategoryLookupValues.isRequired"
                              :class="classes"
                            ></b-form-radio-group>
                            <div class="invalid-feedback">{{ errors[0] }}</div>
                          </validation-provider>
                        </b-form-group>
                      </div>
                      <div v-if="fieldSection.relatedOptions.inputType === `radio`">
                        <b-form-group>
                          <label>
                            Label for the radio button list field
                          </label>
                          <validation-provider
                            :rules="{
                              required_for_dynamic_input_label_for_the_radio_button_list: true,
                              regex_alpha_numeric_space_for_dynamic_input_label_for_the_radio_button_list: /^[/a-zA-Z0-9-'&,+()\s]+$/,
                              max_for_dymanic_input_label_for_the_radio_button_list:40
                            }"
                            v-slot="{ classes, errors }"
                          >
                            <b-form-input
                              type="text"
                              v-model="fieldSection.relatedOptions.labelName"
                              :class="classes"
                            ></b-form-input>
                            <div class="invalid-feedback">{{ errors[0] }}</div>
                          </validation-provider>
                        </b-form-group>
                        <b-form-group>
                          <label>
                            Type a new value for radio button list and press enter or click enter button
                          </label>
                          <validation-provider
                            :rules="{
                              required_for_tags_for_dynamic_input_tags_for_the_radio_button_list: true,
                              regex_alpha_numeric_space_for_dynamic_input_tags_for_the_radio_button_list: regexForDynamicFields,
                              max_for_tags_dynamic_input_tags_for_the_radio_button_list:40
                            }"
                            v-slot="{ classes, errors }"
                          >
                            <b-form-tags
                              v-model="fieldSection.relatedOptions.texts"
                              tag-variant="tag-theme-blue"
                              no-outer-focus
                              :class="classes"
                            >
                              <template  v-slot="{ tags, inputAttrs, inputHandlers, tagVariant, addTag, removeTag }">
                                <b-input-group class="mt-2 mb-2">
                                  <b-form-input
                                    v-bind="inputAttrs"
                                    v-on="inputHandlers"
                                    placeholder="Add value..."
                                    class="form-control"
                                    size="md"
                                  ></b-form-input>
                                  <b-input-group-append>
                                    <b-button
                                      class="default-btn-outline btn-add-tag text-align-center"
                                      size="sm"
                                      @click="addTag()" 
                                    >
                                      Enter
                                    </b-button>
                                  </b-input-group-append>
                                </b-input-group>
                                <div class="d-inline-block">
                                  <b-form-tag
                                    v-for="tag in tags"
                                    @remove="removeTag(tag)"
                                    :key="tag"
                                    :title="tag"
                                    :variant="tagVariant"
                                    class="mr-1 mt-1 mb-1 tag"
                                  >
                                    {{ tag }}
                                  </b-form-tag>
                                </div>
                              </template>
                            </b-form-tags>
                            <div class="invalid-feedback">{{ errors[0] }}</div>
                          </validation-provider>
                        </b-form-group>
                        <b-form-group>
                          <label>
                            Is required?
                          </label>
                          <validation-provider
                            rules="required_with_no_field_label_passed"
                            v-slot="{ classes, errors }"
                          >
                            <b-form-radio-group
                              v-model="fieldSection.relatedOptions.isRequired"
                              :options="addCategoryLookupValues.isRequired"
                              :class="classes"
                            ></b-form-radio-group>
                            <div class="invalid-feedback">{{ errors[0] }}</div>
                          </validation-provider>
                        </b-form-group>
                      </div>
                      <div v-if="fieldSection.relatedOptions.inputType === `checkbox`">
                        <b-form-group>
                          <label>
                            Label for the checkbox list field
                          </label>
                          <validation-provider
                            :rules="{
                              required_for_dynamic_input_label_for_the_checkbox_list: true,
                              regex_alpha_numeric_space_for_dynamic_input_label_for_the_checkbox_list: /^[/a-zA-Z0-9-'&,+()\s]+$/,
                              max_for_dymanic_input_label_for_the_checkbox_list:40
                            }"
                            v-slot="{ classes, errors }"
                          >
                            <b-form-input
                              type="text"
                              v-model="fieldSection.relatedOptions.labelName"
                              :class="classes"
                            ></b-form-input>
                            <div class="invalid-feedback">{{ errors[0] }}</div>
                          </validation-provider>
                        </b-form-group>
                        <b-form-group>
                          <label>
                            Type a new value for checkbox list and press enter or click enter button
                          </label>
                          <validation-provider
                            :rules="{
                              required_for_tags_for_dynamic_input_tags_for_the_checkbox_list: true,
                              regex_alpha_numeric_space_for_dynamic_input_tags_for_the_checkbox_list: regexForDynamicFields,
                              max_for_tags_dynamic_input_tags_for_the_checkbox_list:40
                            }"
                            v-slot="{ classes, errors }"
                          >
                            <b-form-tags
                              v-model="fieldSection.relatedOptions.texts"
                              tag-variant="tag-theme-blue"
                              no-outer-focus
                              :class="classes"
                            >
                            <template  v-slot="{ tags, inputAttrs, inputHandlers, tagVariant, addTag, removeTag }">
                                <b-input-group class="mt-2 mb-2">
                                  <b-form-input
                                    v-bind="inputAttrs"
                                    v-on="inputHandlers"
                                    placeholder="Add value..."
                                    class="form-control"
                                    size="md"
                                  ></b-form-input>
                                  <b-input-group-append>
                                    <b-button
                                      class="default-btn-outline btn-add-tag text-align-center"
                                      size="sm"
                                      @click="addTag()" 
                                    >
                                      Enter
                                    </b-button>
                                  </b-input-group-append>
                                </b-input-group>
                                <div class="d-inline-block">
                                  <b-form-tag
                                    v-for="tag in tags"
                                    @remove="removeTag(tag)"
                                    :key="tag"
                                    :title="tag"
                                    :variant="tagVariant"
                                    class="mr-1 mt-1 mb-1 tag"
                                  >
                                    {{ tag }}
                                  </b-form-tag>
                                </div>
                              </template>
                            </b-form-tags>
                            <div class="invalid-feedback">{{ errors[0] }}</div>
                          </validation-provider>
                        </b-form-group>
                        <b-form-group>
                          <label>
                            <h3>Is required?</h3>
                          </label>
                          <validation-provider
                            rules="required_with_no_field_label_passed"
                            v-slot="{ classes, errors }"
                          >
                            <b-form-radio-group
                              v-model="fieldSection.relatedOptions.isRequired"
                              :options="addCategoryLookupValues.isRequired"
                              :class="classes"
                            ></b-form-radio-group>
                            <div class="invalid-feedback">{{ errors[0] }}</div>
                          </validation-provider>
                        </b-form-group>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- end category fields for rent category type -->
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
    </b-col>
    <b-col v-else-if="showListCategoryTab">
      <list-all-categories></list-all-categories>
    </b-col>
    <b-col v-else-if="showBulkInsertTab">
      <bulk-add-category-additional-fields></bulk-add-category-additional-fields>
    </b-col>
    <b-col v-else>
      <edit-category></edit-category>
    </b-col>
  </b-row>
</template>
<script>
import { ValidationObserver, ValidationProvider } from "vee-validate";
import { ENDPOINTS_FOR_ADMIN } from "@/constants/smoot-api";
import { REGEX } from "@/constants/constants";
export default {
  name: "ManageCategory",
  components: {
    ValidationObserver,
    ValidationProvider,
  },
  data() {
    return {
      showAddCategoryTab: true,
      showEditCategoryTab: false,
      showListCategoryTab: false,
      showBulkInsertTab: false,
      addCategoryForm: {
        categoryTypes: ["for-sale"],
        category: "",
        sub1Category: "",
        sub2Category: "",
        sub3Category: "",
      },
      addCategoryLookupValues: {
        categoryTypes: [
          {
            text: `For sale`,
            value: `for-sale`,
          },
          {
            text: `For rent`,
            value: `for-rent`,
          },
          {
            text: `For free`,
            value: `for-free`,
          },
        ],
        inputTypes: [
          {
            text: `Text`,
            value: `text`,
          },
          {
            text: `DDL`,
            value: `ddl`,
          },
          {
            text: `Radio`,
            value: `radio`,
          },
          {
            text: `Checkbox`,
            value: `checkbox`,
          },
        ],
        isRequired: [
          {
            text: `Yes`,
            value: `yes`,
          },
          {
            text: `No`,
            value: `no`,
          },
        ],
      },
      labelForAddCategoryFieldQuestion: "",
      fieldsSectionForSaleType: [
        {
          add: true,
          remove: false,
          relatedOptions: {
            inputType: "",
            isRequired: "no",
          },
        },
      ],
      fieldsSectionForRentType: [
        {
          add: true,
          remove: false,
          relatedOptions: {
            inputType: "",
            isRequired: "no",
          },
        },
      ],
      hasToShowCategoryFieldsSectionForSaleType: false,
      hasToShowCategoryFieldsSectionForRentType: false,
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
      serverAlerts: {
        success: "",
        error: "",
        showErrorDismissibleAlert: false,
        showSuccessDismissibleAlert: false,
      },
      saveCategoryRequestPending: false,
      regexForDynamicFields: REGEX.DYNAMIC_FIELDS,
    };
  },
  watch: {
    showAddCategoryTab() {
      this.clearAddCategoryForm();
    },
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
      this.showCategoryFieldSections();
      this.changeSub1Sub2Sub3CategoryLabels();
    },
    "addCategoryForm.categoryTypes"() {
      this.showCategoryFieldSections();
    },
    hasToShowCategoryFieldsSectionForRentType() {
      /* eslint-disable */
      if (!this.hasToShowCategoryFieldsSectionForRentType && this.fieldsSectionForRentType.length > 1) {
        this.fieldsSectionForRentType = [];
        this.newRentTypeFieldObject();
      }
      /* eslint-enable */
    },
    hasToShowCategoryFieldsSectionForSaleType() {
      /* eslint-disable */
      if (!this.hasToShowCategoryFieldsSectionForSaleType && this.fieldsSectionForSaleType.length > 1) {
        this.fieldsSectionForSaleType = [];
        this.newSaleTypeFieldObject();
      }
      /* eslint-enable */
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
  mounted() {},
  methods: {
    clearAddCategoryForm() {
      this.addCategoryForm.category = "";
      this.clearAddCategoryFormArrays();
      this.disableAndClearSub1Sub2Sub3CategoryFields();
    },
    generateTheLabelForAddCategoryFieldQuestion() {
      if (this.addCategoryForm.sub3Category) {
        this.labelForAddCategoryFieldQuestion = `Add an Input field for the catogory of ${this.addCategoryForm.sub3Category} in ${this.addCategoryForm.category} <i class="fa fa-caret-right" aria-hidden="true"></i> ${this.addCategoryForm.sub1Category} <i class="fa fa-caret-right" aria-hidden="true"></i> ${this.addCategoryForm.sub2Category}?`;
      } else if (this.addCategoryForm.sub2Category) {
        this.labelForAddCategoryFieldQuestion = `Add an Input field for the catogory of ${this.addCategoryForm.sub2Category} in ${this.addCategoryForm.category} <i class="fa fa-caret-right" aria-hidden="true"></i> ${this.addCategoryForm.sub1Category}?`;
      } else if (this.addCategoryForm.sub1Category) {
        this.labelForAddCategoryFieldQuestion = `Add an Input field for the catogory of ${this.addCategoryForm.sub1Category} in ${this.addCategoryForm.category}?`;
      } else {
        this.labelForAddCategoryFieldQuestion = `Add an Input field for the catogory of ${this.addCategoryForm.category}?`;
      }
    },
    createFieldSectionForSaleType(index) {
      this.newSaleTypeFieldObject();
      this.enableFieldSectionRemoveOptionForSaleType(index);
      this.removeFieldSectionAddOptionForSaleType(index);
    },
    newSaleTypeFieldObject() {
      this.fieldsSectionForSaleType.push({
        add: true,
        remove: false,
        relatedOptions: {
          inputType: "",
          isRequired: "no",
        },
      });
    },
    removeFieldSectionForSaleType(index) {
      this.$delete(this.fieldsSectionForSaleType, index);
    },
    enableFieldSectionRemoveOptionForSaleType(index) {
      this.fieldsSectionForSaleType[index].remove = true;
    },
    removeFieldSectionAddOptionForSaleType(index) {
      this.fieldsSectionForSaleType[index].add = false;
    },
    clearSelectedInputFieldOfSaleTypeWhenMoveToAnotherInputType(index, value) {
      this.fieldsSectionForSaleType[index].relatedOptions = {
        inputType: value,
        isRequired: "no",
      };
    },
    createFieldSectionForRentType(index) {
      this.newRentTypeFieldObject();
      this.enableFieldSectionRemoveOptionForRentType(index);
      this.removeFieldSectionAddOptionForRentType(index);
    },
    newRentTypeFieldObject() {
      this.fieldsSectionForRentType.push({
        add: true,
        remove: false,
        relatedOptions: {
          inputType: "",
          isRequired: "no",
        },
      });
    },
    removeFieldSectionForRentType(index) {
      this.$delete(this.fieldsSectionForRentType, index);
    },
    enableFieldSectionRemoveOptionForRentType(index) {
      this.fieldsSectionForRentType[index].remove = true;
    },
    removeFieldSectionAddOptionForRentType(index) {
      this.fieldsSectionForRentType[index].add = false;
    },
    clearSelectedInputFieldOfRentTypeWhenMoveToAnotherInputType(index, value) {
      this.fieldsSectionForRentType[index].relatedOptions = {
        inputType: value,
        isRequired: "no",
      };
    },
    showCategoryFieldSections() {
      if (this.addCategoryForm.category) {
        if (this.addCategoryForm.categoryTypes.length) {
          if (this.addCategoryForm.categoryTypes.includes("for-sale")) {
            this.hasToShowCategoryFieldsSectionForSaleType = true;
          } else {
            this.hasToShowCategoryFieldsSectionForSaleType = false;
          }
          if (this.addCategoryForm.categoryTypes.includes("for-rent")) {
            this.hasToShowCategoryFieldsSectionForRentType = true;
          } else {
            this.hasToShowCategoryFieldsSectionForRentType = false;
          }
        } else {
          this.hasToShowCategoryFieldsSectionForSaleType = false;
          this.hasToShowCategoryFieldsSectionForRentType = false;
        }
      } else {
        this.hasToShowCategoryFieldsSectionForSaleType = false;
        this.hasToShowCategoryFieldsSectionForRentType = false;
      }
    },
    extractFieldSections() {
      /* eslint-disable */
      let categoryFieldsSections = {};
      let tempSaleTypeFields = [];
      let tempRentTypeFields = [];
      let extractedSaleTypeFields = [];
      let extractedRentTypeFields = [];
      if (this.fieldsSectionForSaleType.length > 1) {
        tempSaleTypeFields = JSON.parse(JSON.stringify(this.fieldsSectionForSaleType));
        tempSaleTypeFields.splice(tempSaleTypeFields.length - 1);
        tempSaleTypeFields.filter(function(tempSaleTypeField) {
          if(tempSaleTypeField.relatedOptions.inputType === "text") {
            extractedSaleTypeFields.push({
              inputType: tempSaleTypeField.relatedOptions.inputType,
              isRequired: tempSaleTypeField.relatedOptions.isRequired,
              labelName: tempSaleTypeField.relatedOptions.labelName,
              placeholderName: typeof tempSaleTypeField.relatedOptions.placeholderName === "undefined" ? null : tempSaleTypeField.relatedOptions.placeholderName,
            });
          } else {
            extractedSaleTypeFields.push({
              inputType: tempSaleTypeField.relatedOptions.inputType,
              isRequired: tempSaleTypeField.relatedOptions.isRequired,
              labelName: tempSaleTypeField.relatedOptions.labelName,
              texts: tempSaleTypeField.relatedOptions.texts,
            });
          }
        });
        categoryFieldsSections.saleTypeFields = extractedSaleTypeFields;
      }
      if (this.fieldsSectionForRentType.length > 1) {
        tempRentTypeFields = JSON.parse(JSON.stringify(this.fieldsSectionForRentType));
        tempRentTypeFields.splice(tempRentTypeFields.length - 1);
        tempRentTypeFields.filter(function(tempRentTypeField) {
          if(tempRentTypeField.relatedOptions.inputType === "text") {
            extractedRentTypeFields.push({
              inputType: tempRentTypeField.relatedOptions.inputType,
              isRequired: tempRentTypeField.relatedOptions.isRequired,
              labelName: tempRentTypeField.relatedOptions.labelName,
              placeholderName: typeof tempRentTypeField.relatedOptions.placeholderName === "undefined" ? null : tempRentTypeField.relatedOptions.placeholderName,
            });
          } else {
            extractedRentTypeFields.push({
              inputType: tempRentTypeField.relatedOptions.inputType,
              isRequired: tempRentTypeField.relatedOptions.isRequired,
              labelName: tempRentTypeField.relatedOptions.labelName,
              texts: tempRentTypeField.relatedOptions.texts,
            });
          }
        });
        categoryFieldsSections.rentTypeFields = extractedRentTypeFields;
      }
      return categoryFieldsSections;
      /* eslint-enable */
    },
    submitCategoryData() {
      /* eslint-disable */
      this.serverAlerts.showErrorDismissibleAlert = false;
      this.serverAlerts.showSuccessDismissibleAlert = false;
      this.saveCategoryRequestPending = true;
      if(this.fieldsSectionForSaleType.length > 1 || this.fieldsSectionForRentType.length > 1) {
        this.addCategoryForm.fieldSections = this.extractFieldSections();
      }
      const formData = this.$toFormData(this.addCategoryForm);
      this.$axios.post(ENDPOINTS_FOR_ADMIN.CATEGORY.ADD, formData).then(function(res) {
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
    clearAddCategoryFormArrays() {
      this.addCategoryForm.categoryTypes = ["for-sale"];
      this.$delete(this.addCategoryForm, "fieldSections");
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
  },
};
</script>
