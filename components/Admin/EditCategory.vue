<template>
  <div class="mt-5 view-edit-category">
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
    <b-modal ref="modal-delete-confirmation" b-modal centered hide-header hide-footer size="sm">
      <div class="text-align-center mb-3">
        <div class="font-bold">
          Please Confirm
        </div>
        <hr />
        <p>
          If you delete this field & click on update, all the associated data with it will be permanently deleted.
        </p>
      </div>
      <div>
        <b-button block pill size="sm" variant="outline-danger" @click="deleteField">
          Yes, delete
        </b-button>
        <b-button block pill size="sm" @click="closeDeleteFieldConfirmation">
          Cancel
        </b-button>
      </div>
    </b-modal>
    <b-modal ref="modal-category-delete-confirmation" b-modal centered hide-header hide-footer size="sm">
      <div class="text-align-center mb-3">
        <div class="font-bold">
          Please Confirm
        </div>
        <hr />
        <p>
          If you delete this category, all the associated data with it will be permanently deleted.
        </p>
      </div>
      <div>
        <b-button block pill size="sm" variant="outline-danger" @click="deleteCategory">
          Yes, delete
        </b-button>
        <b-button block pill size="sm" @click="closeCategoryDeleteFieldConfirmation">
          Cancel
        </b-button>
      </div>
    </b-modal>
    <validation-observer v-slot="{ handleSubmit }">
      <b-form
        inline
        class="form-search-category-by-id"
        autocomplete="off"
        @submit.prevent="handleSubmit(getCategoryDetailsById)"
      >
        <div>
          <b-form-group
            id="input-group-0"
            label-for="category-id"
            class="mt-2"
          >
            <validation-provider
              name="category Id"
              :rules="{required: true, regex: /^[0-9]+$/ }"
              v-slot="{ classes, errors }"
            >
              <b-form-input
                id="category-id"
                v-model="categoryIdForSearch"
                type="text"
                placeholder="Category id to edit"
                :class="classes"
                class="max-width-for-input"
                size="sm"
              ></b-form-input>
              <b-button
                type="submit"
                size="sm"
                :disabled="searchCategoryRequestPending ? true : false"
              >
                Search
              </b-button>
              <div class="invalid-feedback">{{ errors[0] }}</div>
            </validation-provider>
          </b-form-group>
        </div>
      </b-form>
    </validation-observer>
    <hr />
    <div v-if="searchCategoryRequestPending && !hasToShowEmptyState">
      <div class="text-center my-2 default-spinner-container">
        <b-spinner class="default-spinner-border align-middle"></b-spinner>
        <div class="default-spinner-label">Getting category details...</div>
      </div>
    </div>
    <div v-else-if="!searchCategoryRequestPending && !hasToShowEmptyState && hasCategory">
      <h3 class="category-details-header text-align-center">
        Edit category details of
        <span
          class="theme-color-text"
          v-html="seletedCategoryDetailsHeading(this.editCategoryForm.category, this.editCategoryForm.sub1Category, this.editCategoryForm.sub2Category, this.editCategoryForm.sub3Category)"
        ></span>
      </h3>
      <validation-observer v-slot="{ handleSubmit }">
        <b-form
          class="form-modify-category"
          autocomplete="off"
          @submit.prevent="handleSubmit(updateCategoryData)"
        >
          <!-- edit category types -->
          <div class="form-separator form-separator-mini-height rounded">
            <div v-if="fetchCategoryTypesRequestPending" class="text-center my-2 default-spinner-container mini-preloader-based-section">
              <b-spinner class="default-spinner-border align-middle mini-spinner-size"></b-spinner>
              <div class="default-spinner-label">loading category types...</div>
            </div>
            <div v-else>
              <div class="form-header">
              <h3>
                Edit Category Type
              </h3>
              </div>
              <b-form-group description="If you unselect a category type, & click update, then all of its associated additional fields also will be permanently deleted">
                <validation-provider
                  name="category type"
                  rules="required"
                  v-slot="{ classes, errors }"
                >
                  <b-form-checkbox-group
                    id="checkbox-group-category-type-select"
                    v-model="editCategoryForm.categoryTypes"
                    :options="editCategoryLookupValues.categoryTypes"
                    :class="classes"
                  ></b-form-checkbox-group>
                  <div class="invalid-feedback">{{ errors[0] }}</div>
                </validation-provider>
              </b-form-group>
            </div>
          </div>
          <!-- end edit category types -->
          <!-- edit category fields for sale category type -->
          <div class="form-separator rounded">
            <div class="form-header">
              <h3>
                Edit Additional Fields of Sale Type
              </h3>
            </div>
            <div v-if="fetchCategoryAdditionalFieldsForSaleTypeRequestPending">
              <b-card class="mt-3">
                <b-card-title>
                  <div class="font-bold text-align-center skel-loader-head-for-field-add">
                    <b-skeleton class="ml-2 mb-3" animation="wave" width="15%"></b-skeleton>
                  </div>
                </b-card-title>
                <b-card-text>
                  <b-skeleton class="mb-3" animation="wave" width="15%"></b-skeleton>
                  <b-skeleton class="mb-3" type="input" animation="wave" width="100%"></b-skeleton>
                  <b-skeleton class="mb-3" animation="wave" width="15%"></b-skeleton>
                  <b-skeleton class="mb-3" type="input" animation="wave" width="100%"></b-skeleton>
                  <b-skeleton class="mb-3" animation="wave" width="15%"></b-skeleton>
                  <b-skeleton class="mb-3" animation="wave" width="20%"></b-skeleton>
                  <b-skeleton class="mb-3" type="button"></b-skeleton>
                </b-card-text>
              </b-card>
            </div>
            <div v-else-if="!editAdditionalFieldsOfSaleType.length" class="text-muted font-90 text-align-center mt-4 mb-4">
              This category doesn't have any additonal fields for Sale type
            </div>
            <div v-else>
              <b-card
                v-for="(editAdditionalFieldOfSaleType, editAdditionalFieldOfSaleTypeIndex) in editAdditionalFieldsOfSaleType"
                :key="editAdditionalFieldOfSaleTypeIndex"
                class="mt-3"
              >
                <div v-if="!editAdditionalFieldOfSaleType.is_field_deleted">
                  <b-card-title>
                    <div class="font-bold text-align-center">
                      {{ editAdditionalFieldOfSaleType.field_name }}
                    </div>
                  </b-card-title>
                  <b-card-text>
                    <b-form-group
                      :id="`input-group-of-${editAdditionalFieldOfSaleTypeIndex}-field-name-sale-type`"
                      label="Field name:"
                      :label-for="`${editAdditionalFieldOfSaleTypeIndex}-field-name-sale-type`"
                    >
                      <validation-provider
                        :rules="{
                          required_for_dynamic_input_label_for_the_text: true,
                          regex_alpha_numeric_space_for_dynamic_input_label_for_text: /^[/a-zA-Z0-9-'&,+()\s]+$/,
                          max_for_dymanic_input_label_for_text:40
                        }"
                        v-slot="{ classes, errors }"
                      >
                          <b-form-input
                            :id="`${editAdditionalFieldOfSaleTypeIndex}-field-name-sale-type`"
                            v-model="editAdditionalFieldOfSaleType.field_name"
                            type="text"
                            :class="classes"
                          ></b-form-input>
                          <div class="invalid-feedback">{{ errors[0] }}</div>
                      </validation-provider>
                    </b-form-group>
                    <b-form-group
                      :id="`input-group-of-${editAdditionalFieldOfSaleTypeIndex}-field-type-sale-type`"
                      label="Field type:"
                      :label-for="`${editAdditionalFieldOfSaleTypeIndex}-field-type-sale-type`"
                    >
                      <b-form-input
                        :id="`${editAdditionalFieldOfSaleTypeIndex}-field-type-sale-type`"
                        v-model="editAdditionalFieldOfSaleType.input_type"
                        type="text"
                        disabled
                      ></b-form-input>
                    </b-form-group>
                    <div v-if="editAdditionalFieldOfSaleType.input_type === `text`">
                      <b-form-group
                        :id="`input-group-of-${editAdditionalFieldOfSaleTypeIndex}-placeholder-sale-type`"
                        label="Placeholder:"
                        :label-for="`${editAdditionalFieldOfSaleTypeIndex}-placeholder-sale-type`"
                      >
                      <validation-provider
                        :rules="{
                          required: false,
                          regex_alpha_numeric_space_for_dynamic_input_placeholder_for_text: /^[/a-zA-Z0-9-'&,+()\s]+$/,
                          max_for_dymanic_input_placeholder_for_text:40
                        }"
                          v-slot="{ classes, errors }"
                        >
                          <b-form-input
                            :id="`${editAdditionalFieldOfSaleTypeIndex}-placeholder-sale-type`"
                            v-model="editAdditionalFieldOfSaleType.placeholder"
                            type="text"
                            :class="classes"
                          ></b-form-input>
                          <div class="invalid-feedback">{{ errors[0] }}</div>
                      </validation-provider>
                      </b-form-group>
                    </div>
                    <div v-else>
                      <div class="mb-2">
                        Values of this field:
                      </div>
                      <div
                        v-for="(tag, tagIndex) in editAdditionalFieldOfSaleType.tags"
                        :key="tagIndex"
                        :id="`input-group-of-${editAdditionalFieldOfSaleTypeIndex}-tags-sale-type`"
                      >
                        <b-form-group v-if="!tag.is_tag_deleted">
                          <validation-provider
                            :rules="{
                              required_for_tags_for_dynamic_input_tags_for_edit: true,
                              regex_alpha_numeric_space_for_dynamic_input_tags_for_edit: regexForDynamicFields,
                              max_for_tags_dynamic_input_tags_for_edit:40
                            }"
                            v-slot="{ classes, errors }"
                          >
                            <div class="tag-edit-textbox-and-delete">
                              <b-form-input
                                :id="`${editAdditionalFieldOfSaleTypeIndex}-tags-sale-type`"
                                v-model="tag.updated_text"
                                type="text"
                                size="sm"
                                class="mr-3"
                                :placeholder="`Value to update: ${tag.text}`"
                                :class="classes"
                              ></b-form-input>
                              <b-button
                                class="default-btn-outline mr-3"
                                size="sm"
                                v-b-tooltip.hover.right
                                title="Reset to the original value"
                                @click="tag.updated_text = tag.text"
                              >
                                <b-icon icon="arrow-counterclockwise" aria-hidden="true"></b-icon>
                              </b-button>
                              <b-button
                                variant="outline-danger"
                                size="sm"
                                v-b-tooltip.hover.right
                                title="Delete"
                                @click="(deleteTag(editAdditionalFieldsOfSaleType[editAdditionalFieldOfSaleTypeIndex].tags, tagIndex))"
                              >
                                <b-icon icon="trash-fill" aria-hidden="true"></b-icon>
                              </b-button>
                            </div>
                            <div class="invalid-feedback">{{ errors[0] }}</div>
                          </validation-provider>
                        </b-form-group>
                      </div>
                      <b-form-group>
                        <validation-provider
                          :rules="{
                            required_for_tags_for_dynamic_input_tags_for_edit: false,
                            regex_alpha_numeric_space_for_dynamic_input_tags_for_edit: regexForDynamicFields,
                            max_for_tags_dynamic_input_tags_for_edit:40
                          }"
                          v-slot="{ classes, errors }"
                        >
                          <div class="add-new-tags-to-fields tag-edit-textbox-and-delete">
                            <b-form-input
                              type="text"
                              size="sm"
                              placeholder="Add a new value..."
                              v-model="editAdditionalFieldOfSaleType.new_tag_value"
                              :class="classes"
                            ></b-form-input>
                            <b-button
                              v-if="!errors[0] && editAdditionalFieldOfSaleType.new_tag_value"
                              class="default-btn-outline ml-3"
                              size="sm"
                              v-b-tooltip.hover.right
                              title="Add"
                              @click="pushNewTag(editAdditionalFieldsOfSaleType[editAdditionalFieldOfSaleTypeIndex].tags, editAdditionalFieldOfSaleType.new_tag_value, editAdditionalFieldOfSaleTypeIndex, `saleType`)"
                            >
                              <b-icon icon="plus" aria-hidden="true"></b-icon>
                            </b-button>
                          </div>
                          <div class="invalid-feedback">{{ errors[0] }}</div>
                        </validation-provider>
                      </b-form-group>
                    </div>
                    <b-form-group>
                      <label>
                        Is required?
                      </label>
                      <validation-provider
                        rules="required_with_no_field_label_passed"
                        v-slot="{ classes, errors }"
                      >
                        <b-form-radio-group
                          v-model="editAdditionalFieldOfSaleType.is_required"
                          :options="editCategoryLookupValues.isRequired"
                          :class="classes"
                        ></b-form-radio-group>
                        <div class="invalid-feedback">{{ errors[0] }}</div>
                      </validation-provider>
                    </b-form-group>
                    <b-button
                      variant="outline-danger"
                      size="sm"
                      @click="openDeleteFieldConfirmation(`saleTypeField`, editAdditionalFieldOfSaleTypeIndex)"
                    >
                      Delete field
                    </b-button>
                  </b-card-text>
                </div>
                <div v-else>
                  <b-card-title>
                    <div class="font-bold text-align-center">
                      {{ editAdditionalFieldOfSaleType.field_name }}
                    </div>
                  </b-card-title>
                  <b-card-text>
                    <div class="danger-text font-90 mt-2 mb-2 text-align-center">
                      This field has been added to deleting list, once you click update, it will be deleted
                    </div>
                  </b-card-text>
                </div>
              </b-card>
            </div>
          </div>
          <!-- end edit category fields for sale category type -->
          <!-- edit category fields for rent category type -->
          <div class="form-separator rounded">
            <div class="form-header">
              <h3>
                Edit Additional Fields of Rent Type
              </h3>
            </div>
            <div v-if="fetchCategoryAdditionalFieldsForRentTypeRequestPending">
              <b-card class="mt-3 section-rent-type">
                <b-card-title>
                  <div class="font-bold text-align-center skel-loader-head-for-field-add">
                    <b-skeleton class="ml-2 mb-3" animation="wave" width="15%"></b-skeleton>
                  </div>
                </b-card-title>
                <b-card-text>
                  <b-skeleton class="mb-3" animation="wave" width="15%"></b-skeleton>
                  <b-skeleton class="mb-3" type="input" animation="wave" width="100%"></b-skeleton>
                  <b-skeleton class="mb-3" animation="wave" width="15%"></b-skeleton>
                  <b-skeleton class="mb-3" type="input" animation="wave" width="100%"></b-skeleton>
                  <b-skeleton class="mb-3" animation="wave" width="15%"></b-skeleton>
                  <b-skeleton class="mb-3" animation="wave" width="20%"></b-skeleton>
                  <b-skeleton class="mb-3" type="button"></b-skeleton>
                </b-card-text>
              </b-card>
            </div>
            <div v-else-if="!editAdditionalFieldsOfRentType.length" class="text-muted font-90 text-align-center mt-4 mb-4">
              This category doesn't have any additonal fields for Rent type
            </div>
            <div v-else>
              <b-card
                v-for="(editAdditionalFieldOfRentType, editAdditionalFieldOfRentTypeIndex) in editAdditionalFieldsOfRentType"
                :key="editAdditionalFieldOfRentTypeIndex"
                class="mt-3 section-rent-type"
              >
                <div v-if="!editAdditionalFieldOfRentType.is_field_deleted">
                  <b-card-title>
                    <div class="font-bold text-align-center">
                      {{ editAdditionalFieldOfRentType.field_name }}
                    </div>
                  </b-card-title>
                  <b-card-text>
                    <b-form-group
                      :id="`input-group-of-${editAdditionalFieldOfRentTypeIndex}-field-name-rent-type`"
                      label="Field name:"
                      :label-for="`${editAdditionalFieldOfRentTypeIndex}-field-name-rent-type`"
                    >
                      <validation-provider
                        :rules="{
                          required_for_dynamic_input_label_for_the_text: true,
                          regex_alpha_numeric_space_for_dynamic_input_label_for_text: /^[/a-zA-Z0-9-'&,+()\s]+$/,
                          max_for_dymanic_input_label_for_text:40
                        }"
                        v-slot="{ classes, errors }"
                      >
                        <b-form-input
                          :id="`${editAdditionalFieldOfRentTypeIndex}-field-name-rent-type`"
                          v-model="editAdditionalFieldOfRentType.field_name"
                          type="text"
                          :class="classes"
                        ></b-form-input>
                        <div class="invalid-feedback">{{ errors[0] }}</div>
                      </validation-provider>
                    </b-form-group>
                    <b-form-group
                      :id="`input-group-of-${editAdditionalFieldOfRentTypeIndex}-field-type-rent-type`"
                      label="Field type:"
                      :label-for="`${editAdditionalFieldOfRentTypeIndex}-field-type-rent-type`"
                    >
                      <b-form-input
                        :id="`${editAdditionalFieldOfRentTypeIndex}-field-type-rent-type`"
                        v-model="editAdditionalFieldOfRentType.input_type"
                        type="text"
                        disabled
                      ></b-form-input>
                    </b-form-group>
                    <div v-if="editAdditionalFieldOfRentType.input_type === `text`">
                      <b-form-group
                        :id="`input-group-of-${editAdditionalFieldOfRentTypeIndex}-placeholder-rent-type`"
                        label="Placeholder:"
                        :label-for="`${editAdditionalFieldOfRentTypeIndex}-placeholder-rent-type`"
                      >
                        <validation-provider
                          :rules="{
                            required: false,
                            regex_alpha_numeric_space_for_dynamic_input_placeholder_for_text: /^[/a-zA-Z0-9-'&,+()\s]+$/,
                            max_for_dymanic_input_placeholder_for_text:40
                          }"
                          v-slot="{ classes, errors }"
                        >
                          <b-form-input
                            :id="`${editAdditionalFieldOfRentTypeIndex}-placeholder-rent-type`"
                            v-model="editAdditionalFieldOfRentType.placeholder"
                            type="text"
                            :class="classes"
                          ></b-form-input>
                          <div class="invalid-feedback">{{ errors[0] }}</div>
                        </validation-provider>
                      </b-form-group>
                    </div>
                    <div v-else>
                      <div class="mb-2">
                        Values of this field:
                      </div>
                      <div
                        v-for="(tag, tagIndex) in editAdditionalFieldOfRentType.tags"
                        :key="tagIndex"
                        :id="`input-group-of-${editAdditionalFieldOfRentTypeIndex}-tags-rent-type`"
                      >
                        <b-form-group v-if="!tag.is_tag_deleted">
                          <validation-provider
                            :rules="{
                              required_for_tags_for_dynamic_input_tags_for_edit: true,
                              regex_alpha_numeric_space_for_dynamic_input_tags_for_edit: regexForDynamicFields,
                              max_for_tags_dynamic_input_tags_for_edit:40
                            }"
                            v-slot="{ classes, errors }"
                          >  
                            <div class="tag-edit-textbox-and-delete">
                              <b-form-input
                                :id="`${editAdditionalFieldOfRentTypeIndex}-tags-rent-type`"
                                v-model="tag.updated_text"
                                type="text"
                                size="sm"
                                class="mr-3"
                                :placeholder="`Value to update: ${tag.text}`"
                                :class="classes"
                              ></b-form-input>
                              <b-button
                                class="default-btn-outline mr-3"
                                size="sm"
                                v-b-tooltip.hover.right
                                title="Reset to the original value"
                                @click="tag.updated_text = tag.text"
                              >
                                <b-icon icon="arrow-counterclockwise" aria-hidden="true"></b-icon>
                              </b-button>
                              <b-button
                                variant="outline-danger"
                                size="sm"
                                v-b-tooltip.hover.right
                                title="Delete"
                                @click="(deleteTag(editAdditionalFieldsOfRentType[editAdditionalFieldOfRentTypeIndex].tags, tagIndex))"
                              >
                                <b-icon icon="trash-fill" aria-hidden="true"></b-icon>
                              </b-button>
                            </div>
                            <div class="invalid-feedback">{{ errors[0] }}</div>
                          </validation-provider>
                        </b-form-group>
                      </div>
                      <b-form-group>
                        <validation-provider
                          :rules="{
                            required_for_tags_for_dynamic_input_tags_for_edit: false,
                            regex_alpha_numeric_space_for_dynamic_input_tags_for_edit: regexForDynamicFields,
                            max_for_tags_dynamic_input_tags_for_edit:40
                          }"
                          v-slot="{ classes, errors }"
                        >
                          <div class="add-new-tags-to-fields tag-edit-textbox-and-delete">
                            <b-form-input
                              type="text"
                              size="sm"
                              placeholder="Add a new value..."
                              v-model="editAdditionalFieldOfRentType.new_tag_value"
                              :class="classes"
                            ></b-form-input>
                            <b-button
                              v-if="!errors[0]"
                              class="default-btn-outline ml-3"
                              size="sm"
                              v-b-tooltip.hover.right
                              title="Add"
                              @click="pushNewTag(editAdditionalFieldsOfRentType[editAdditionalFieldOfRentTypeIndex].tags, editAdditionalFieldOfRentType.new_tag_value, editAdditionalFieldOfRentTypeIndex, `rentType`)"
                            >
                              <b-icon icon="plus" aria-hidden="true"></b-icon>
                            </b-button>
                          </div>
                          <div class="invalid-feedback">{{ errors[0] }}</div>
                        </validation-provider>
                      </b-form-group>
                    </div>
                    <b-form-group>
                      <label>
                        Is required?
                      </label>
                      <validation-provider
                        rules="required_with_no_field_label_passed"
                        v-slot="{ classes, errors }"
                      >
                        <b-form-radio-group
                          v-model="editAdditionalFieldOfRentType.is_required"
                          :options="editCategoryLookupValues.isRequired"
                          :class="classes"
                        ></b-form-radio-group>
                        <div class="invalid-feedback">{{ errors[0] }}</div>
                      </validation-provider>
                    </b-form-group>
                    <b-button
                      variant="outline-danger"
                      size="sm"
                      @click="openDeleteFieldConfirmation(`rentTypeField`, editAdditionalFieldOfRentTypeIndex)"
                    >
                      Delete field
                    </b-button>
                  </b-card-text>
                </div>
                <div v-else>
                  <b-card-title>
                    <div class="font-bold text-align-center">
                      {{ editAdditionalFieldOfRentType.field_name }}
                    </div>
                  </b-card-title>
                  <b-card-text>
                    <div class="danger-text font-90 mt-2 mb-2 text-align-center">
                      This field has been added to deleting list, once you click update, it will be deleted
                    </div>
                  </b-card-text>
                </div>
              </b-card>
            </div>
          </div>
          <!-- end edit category fields for rent category type -->
          <!-- add category fields for sale category type -->
          <div class="form-separator rounded" v-if="hasToShowCategoryFieldsSectionForSaleType">
            <div class="form-header">
              <h3>
                New Additional Fields for Sale Type
              </h3>
            </div>
            <div class="mt-2">
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
                          :options="editCategoryLookupValues.inputTypes"
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
                            :options="editCategoryLookupValues.isRequired"
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
                            :options="editCategoryLookupValues.isRequired"
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
                            :options="editCategoryLookupValues.isRequired"
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
                            :options="editCategoryLookupValues.isRequired"
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
          <!-- end add category fields for sale category type -->
          <!-- add category fields for rent category type -->
          <div class="form-separator rounded" v-if="hasToShowCategoryFieldsSectionForRentType">
            <div class="form-header">
              <h3>
                New Additional Fields for Rent Type
              </h3>
            </div>
            <div class="mt-2">
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
                          :options="editCategoryLookupValues.inputTypes"
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
                            :options="editCategoryLookupValues.isRequired"
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
                            :options="editCategoryLookupValues.isRequired"
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
                            :options="editCategoryLookupValues.isRequired"
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
                            :options="editCategoryLookupValues.isRequired"
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
          <!-- end add category fields for rent category type -->
          <!-- category section -->
          <div class="form-separator rounded">
            <div class="form-header">
              <h3>
                Edit Category Details
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
                  v-model="editCategoryForm.category"
                  type="text"
                  :class="classes"
                  @click="getCategorySuggestions(editCategoryForm.category)"
                  @keyup="getCategorySuggestions(editCategoryForm.category)"
                  :readonly="hasSub1Category ? true : false"
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
              v-if="hasSub1Category"
              id="input-group-2"
              :label="sub1CategoryLabel"
              label-for="sub-1-category"
            >
              <validation-provider
                name="sub 1 category"
                :rules="{ required:true, regex_alpha_numeric_space: /^[/a-zA-Z0-9-'&,+()\s]+$/, max:40 }"
                v-slot="{ classes, errors }"
              >
                <b-form-input
                  id="sub-1-category"
                  list="list-sub1-category"
                  v-model="editCategoryForm.sub1Category"
                  type="text"
                  :class="classes"
                  @click="getSub1CategorySuggestions(editCategoryForm.sub1Category)"
                  @keyup="getSub1CategorySuggestions(editCategoryForm.sub1Category)"
                  :readonly="hasSub2Category ? true : false"
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
              v-if="hasSub2Category"
              id="input-group-3"
              :label="sub2CategoryLabel"
              label-for="sub-2-category"
            >
              <validation-provider
                name="sub 2 category"
                :rules="{ required:true, regex_alpha_numeric_space: /^[/a-zA-Z0-9-'&,+()\s]+$/, max:40 }"
                v-slot="{ classes, errors }"
              >
                <b-form-input
                  id="sub-2-category"
                  list="list-sub2-category"
                  v-model="editCategoryForm.sub2Category"
                  type="text"
                  :class="classes"
                  @click="getSub2CategorySuggestions(editCategoryForm.sub2Category)"
                  @keyup="getSub2CategorySuggestions(editCategoryForm.sub2Category)"
                  :readonly="hasSub3Category ? true : false"
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
              v-if="hasSub3Category"
              id="input-group-4"
              :label="sub3CategoryLabel"
              label-for="sub-3-category"
            >
              <validation-provider
                name="sub 3 category"
                :rules="{ required:true, regex_alpha_numeric_space: /^[/a-zA-Z0-9-'&,+()\s]+$/, max:40 }"
                v-slot="{ classes, errors }"
              >
                <b-form-input
                  id="sub-3-category"
                  list="list-sub3-category"
                  v-model="editCategoryForm.sub3Category"
                  type="text"
                  placeholder="Optonal"
                  :class="classes"
                  @click="getSub3CategorySuggestions(editCategoryForm.sub3Category)"
                  @keyup="getSub3CategorySuggestions(editCategoryForm.sub3Category)"
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
          <!-- end category section -->
          <!-- action buttons of updating form -->
          <b-form-group class="mt-2">
            <b-button
              v-if="!updateCategoryRequestPending"
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
              v-if="!deleteCategoryRequestPending"
              variant="outline-danger"
              @click="openCategoryDeleteFieldConfirmation()"
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
    <div v-else-if="!searchCategoryRequestPending && !hasToShowEmptyState && !hasCategory">
      <div class="text-error font-90 text-align-center">
        Category not found, try entering a different category Id
      </div>
    </div>
    <div v-else>
      <div class="text-muted font-90 text-align-center">
        Enter a category Id to edit, and update its name, and its associated additional fields
      </div>
    </div>
    <!-- eslint-enable -->
  </div>
</template>
<script>
import { ValidationObserver, ValidationProvider } from "vee-validate";
import { ENDPOINTS_FOR_ADMIN } from "@/constants/smoot-api";
import { REGEX } from "@/constants/constants";
export default {
  name: "EditCategory",
  components: {
    ValidationObserver,
    ValidationProvider,
  },
  data() {
    return {
      categoryIdForSearch: "",
      hasToShowEmptyState: false,
      editCategoryForm: {
        categoryTypes: [],
        originalCategoryTypes: [],
        categoryId: "",
        category: "",
        sub1Category: "",
        sub2Category: "",
        sub3Category: "",
      },
      // editAdditionalFieldsOfSaleType: [
      //   {
      //     id: "787",
      //     input_type: "text",
      //     field_name: "Engine Capacity",
      //     placeholder: "",
      //     is_required: "yes",
      //   },
      //   {
      //     id: "786",
      //     input_type: "ddl",
      //     field_name: "Color",
      //     is_required: "no",
      //     tags: [
      //       {
      //         id: "565",
      //         text: "White",
      //       },
      //       {
      //         id: "569",
      //         text: "Pink",
      //       },
      //       {
      //         id: "575",
      //         text: "Blue",
      //       },
      //     ],
      //   },
      // ],
      // editAdditionalFieldsOfRentType: [
      //   {
      //     id: "746",
      //     input_type: "ddl",
      //     field_name: "Color",
      //     is_required: "no",
      //     tags: [
      //       {
      //         id: "562",
      //         text: "White",
      //       },
      //       {
      //         id: "559",
      //         text: "Pink",
      //       },
      //       {
      //         id: "595",
      //         text: "Blue",
      //       },
      //     ],
      //   },
      // ],
      editAdditionalFieldsOfRentType: [],
      editAdditionalFieldsOfSaleType: [],
      editCategoryLookupValues: {
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
      categorySuggestions: [],
      sub1CategorySuggestions: [],
      sub2CategorySuggestions: [],
      sub3CategorySuggestions: [],
      sub1CategoryLabel: "Sub category 1",
      sub2CategoryLabel: "Sub category 2",
      sub3CategoryLabel: "Sub category 3",
      updateCategoryRequestPending: false,
      deleteCategoryRequestPending: false,
      searchCategoryRequestPending: false,
      fetchCategoryTypesRequestPending: false,
      fetchCategoryAdditionalFieldsForSaleTypeRequestPending: false,
      fetchCategoryAdditionalFieldsForRentTypeRequestPending: false,
      hasCategory: false,
      hasSub1Category: false,
      hasSub2Category: false,
      hasSub3Category: false,
      indexToBeDeleted: 0,
      arrayToBeDeleted: "",
      regexForDynamicFields: REGEX.DYNAMIC_FIELDS,
      serverAlerts: {
        success: "",
        error: "",
        showErrorDismissibleAlert: false,
        showSuccessDismissibleAlert: false,
      },
      // add new additional fields data
      hasToShowCategoryFieldsSectionForSaleType: false,
      hasToShowCategoryFieldsSectionForRentType: false,
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
    };
  },
  watch: {
    categoryIdForSearch() {
      this.editCategoryForm.categoryId = this.categoryIdForSearch;
    },
    "editCategoryForm.category"() {
      if (this.editCategoryForm.category) {
        this.hasCategory = true;
      }
      this.showCategoryFieldSections();
    },
    "editCategoryForm.sub1Category"() {
      if (this.editCategoryForm.sub1Category) {
        this.hasSub1Category = true;
      }
    },
    "editCategoryForm.sub2Category"() {
      if (this.editCategoryForm.sub2Category) {
        this.hasSub2Category = true;
      }
    },
    "editCategoryForm.sub3Category"() {
      if (this.editCategoryForm.sub3Category) {
        this.hasSub3Category = true;
      }
    },
    "editCategoryForm.categoryTypes.length"() {
      /* eslint-disable */
      const diff = this.getDiffBetweenCategoryTypes();
      if (this.editCategoryForm.category && diff.length) {
        diff.filter(function(v) {
          if (v === "for-sale") {
            this.editAdditionalFieldsOfSaleType.filter(function(additionalField) {
              additionalField.is_field_deleted = true;
            }.bind(this));
          }
          if (v === "for-rent") {
            this.editAdditionalFieldsOfRentType.filter(function(additionalField) {
              additionalField.is_field_deleted = true;
            }.bind(this));
          }
        }.bind(this));
      }
      if(this.editCategoryForm.category && this.editCategoryForm.originalCategoryTypes.includes("for-rent")){
        if(this.editCategoryForm.categoryTypes.includes("for-rent")) {
          this.editAdditionalFieldsOfRentType.filter(function(additionalField) {
            additionalField.is_field_deleted = false;
          }.bind(this));
        }
      }
      if(this.editCategoryForm.category && this.editCategoryForm.originalCategoryTypes.includes("for-sale")){
        if(this.editCategoryForm.categoryTypes.includes("for-sale")) {
          this.editAdditionalFieldsOfSaleType.filter(function(additionalField) {
            additionalField.is_field_deleted = false;
          }.bind(this));
        }
      }
      /* eslint-disable */
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
    "editCategoryForm.categoryTypes"() {
      this.showCategoryFieldSections();
    },
    hasToShowCategoryFieldsSectionForSaleType() {
      /* eslint-disable */
      if (!this.hasToShowCategoryFieldsSectionForSaleType && this.fieldsSectionForSaleType.length > 1) {
        this.fieldsSectionForSaleType = [];
        this.newSaleTypeFieldObject();
      }
      /* eslint-enable */
    },
    hasToShowCategoryFieldsSectionForRentType() {
      /* eslint-disable */
      if (!this.hasToShowCategoryFieldsSectionForRentType && this.fieldsSectionForRentType.length > 1) {
        this.fieldsSectionForRentType = [];
        this.newRentTypeFieldObject();
      }
      /* eslint-enable */
    },
  },
  mounted() {
    // this.getCategoryDetailsById();
    this.hasToShowEmptyState = true;
  },
  methods: {
    seletedCategoryDetailsHeading(
      category,
      sub1Category,
      sub2Category,
      sub3Category
    ) {
      /* eslint-disable */
      if (category && sub1Category && sub2Category && sub3Category) {
        return `${sub3Category} in ${category} <i class="fa fa-caret-right" aria-hidden="true"></i> ${sub1Category} <i class="fa fa-caret-right" aria-hidden="true"></i> ${sub2Category}`;
      } else if (category && sub1Category && sub2Category && !sub3Category) {
        return `${sub2Category} in ${category} <i class="fa fa-caret-right" aria-hidden="true"></i> ${sub1Category}`;
      } else if(category && sub1Category && !sub2Category && !sub3Category) {
        return `${sub1Category} in ${category}`;
      } else {
        return `${category}`;
      }
      /* eslint-enable */
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
        `${ENDPOINTS_FOR_ADMIN.CATEGORY.GET_SUGGESTIONS_FOR_SUB_1_CATEGORY}?word=${encodeURIComponent(word)}&category=${encodeURIComponent(this.editCategoryForm.category)}`,
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
        `${ENDPOINTS_FOR_ADMIN.CATEGORY.GET_SUGGESTIONS_FOR_SUB_2_CATEGORY}?word=${encodeURIComponent(word)}&category=${encodeURIComponent(this.editCategoryForm.category)}&sub1Category=${encodeURIComponent(this.editCategoryForm.sub1Category)}`,
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
        `${ENDPOINTS_FOR_ADMIN.CATEGORY.GET_SUGGESTIONS_FOR_SUB_3_CATEGORY}?word=${encodeURIComponent(word)}&category=${encodeURIComponent(this.editCategoryForm.category)}&sub1Category=${encodeURIComponent(this.editCategoryForm.sub1Category)}&sub2Category=${encodeURIComponent(this.editCategoryForm.sub2Category)}`,
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
    getCategoryDetailsById() {
      /* eslint-disable */
      this.serverAlerts.showSuccessDismissibleAlert = false;
      this.clearCategoryTreeAndRelatedData();
      this.toggleSearchCategoryBusy();
      this.hasToShowEmptyState = false;
      this.$axios.get(`${ENDPOINTS_FOR_ADMIN.CATEGORY.GET_CATEGORY_TREE_DETAILS}?categoryId=${this.categoryIdForSearch}`, { progress: false })
      .then(function(res) {
        this.editCategoryForm.category = res.data.category_tree.category;
        this.editCategoryForm.sub1Category = res.data.category_tree.sub_1_category;
        this.editCategoryForm.sub2Category = res.data.category_tree.sub_2_category;
        this.editCategoryForm.sub3Category = res.data.category_tree.sub_3_category;
        this.getSelectedCategotyTypesAndAdditionalFields();
      }.bind(this))
      .catch(function (err) {
      }.bind(this)).then(() => {
        setTimeout(() => {
          this.toggleSearchCategoryBusy();
        }, 500);
      });
      /* eslint-enable */
    },
    toggleSearchCategoryBusy() {
      /* eslint-disable */
      this.searchCategoryRequestPending = !this.searchCategoryRequestPending;
      /* eslint-enable */
    },
    toggleFetchCategoryTypesBusy() {
      /* eslint-disable */
      this.fetchCategoryTypesRequestPending = !this.fetchCategoryTypesRequestPending;
      /* eslint-enable */
    },
    toggleFetchCategoryAdditionalFieldsForSaleTypesBusy() {
      /* eslint-disable */
      this.fetchCategoryAdditionalFieldsForSaleTypeRequestPending = !this.fetchCategoryAdditionalFieldsForSaleTypeRequestPending;
      /* eslint-enable */
    },
    toggleFetchCategoryAdditionalFieldsForRentTypesBusy() {
      /* eslint-disable */
      this.fetchCategoryAdditionalFieldsForRentTypeRequestPending = !this.fetchCategoryAdditionalFieldsForRentTypeRequestPending;
      /* eslint-enable */
    },
    getSelectedCategotyTypesAndAdditionalFields() {
      /* eslint-disable */
      this.fetchCategoryTypesRequestPending = true;
      this.fetchCategoryAdditionalFieldsForSaleTypeRequestPending = true;
      this.fetchCategoryAdditionalFieldsForRentTypeRequestPending = true;
      this.$axios.get(`${ENDPOINTS_FOR_ADMIN.CATEGORY.GET_SELECTED_CATEGORY_DETAILS}?id=${this.categoryIdForSearch}`, { progress: false })
      .then(function(res) {
        this.editCategoryForm.categoryTypes = res.data.category_types;
        this.editCategoryForm.originalCategoryTypes = res.data.category_types;
        if(res.data.category_details.sale_type_fields.length){
          this.editAdditionalFieldsOfSaleType = res.data.category_details.sale_type_fields;
          this.editAdditionalFieldsOfSaleType.filter(function(additionalField) {
            this.$set(additionalField, "is_field_deleted", false);
              if(additionalField.hasOwnProperty("tags")){
                this.$set(additionalField, "new_tag_value", "");
                additionalField.tags.filter(function(tag) {
                  this.$set(tag, "updated_text", tag.text);
                  this.$set(tag, "is_tag_deleted", false);
              }.bind(this));
            }
          }.bind(this));
        }
        if(res.data.category_details.rent_type_fields.length) {
          this.editAdditionalFieldsOfRentType = res.data.category_details.rent_type_fields;
          this.editAdditionalFieldsOfRentType.filter(function(additionalField) {
            this.$set(additionalField, "is_field_deleted", false);
              if(additionalField.hasOwnProperty("tags")){
                this.$set(additionalField, "new_tag_value", "");
                additionalField.tags.filter(function(tag) {
                  this.$set(tag, "updated_text", tag.text);
                  this.$set(tag, "is_tag_deleted", false);
                }.bind(this));
              }
            }.bind(this));
          }
      }.bind(this))
      .catch(function (err) {
      }.bind(this)).then(() => {
        setTimeout(() => {
          this.fetchCategoryTypesRequestPending = false;
          this.fetchCategoryAdditionalFieldsForSaleTypeRequestPending = false;
          this.fetchCategoryAdditionalFieldsForRentTypeRequestPending = false;
        }, 500);
      });
      /* eslint-enable */
    },
    checkTagsHaveMinimumOneValue(tagsTocheck) {
      let tagsCount = 0;
      for (const tagKey in tagsTocheck) {
        if (!tagsTocheck[tagKey].is_tag_deleted) {
          tagsCount = ++tagsCount;
          if (tagsCount === 2) {
            break;
          }
        }
      }
      return tagsCount;
    },
    deleteTag(tagsTocheck, tagIndex) {
      if (this.checkTagsHaveMinimumOneValue(tagsTocheck) === 2) {
        tagsTocheck[tagIndex].is_tag_deleted = true;
      } else {
        alert("This field must have at least 1 value");
      }
    },
    pushNewTag(tagsObjToPush, tagValue, indexOfTheObj, type) {
      /* eslint-disable */
      let valueExists = false;
      for (const tagKey in tagsObjToPush) {
        if (tagsObjToPush[tagKey].text.toLowerCase() === tagValue.toLowerCase()) {
          valueExists = true;
          break;
        }
      }
      if (!valueExists) {
        if (tagValue) {
          tagsObjToPush.push({
            id: "",
            text: tagValue,
            updated_text: tagValue,
            is_tag_deleted: false,
          });
          if (type === "saleType") {
            this.editAdditionalFieldsOfSaleType[indexOfTheObj].new_tag_value = "";
          } else {
            this.editAdditionalFieldsOfRentType[indexOfTheObj].new_tag_value = "";
          }
        }
      } else {
        alert("This value already exists");
      }
      /* eslint-enable */
    },
    openDeleteFieldConfirmation(
      passArrayToDeleteTheFieldFrom,
      passFiledIndexToDelete
    ) {
      this.arrayToBeDeleted = passArrayToDeleteTheFieldFrom;
      this.indexToBeDeleted = passFiledIndexToDelete;
      this.$refs["modal-delete-confirmation"].show();
    },
    deleteField() {
      /* eslint-disable */
      if(this.arrayToBeDeleted === "saleTypeField") {
        this.editAdditionalFieldsOfSaleType[this.indexToBeDeleted].is_field_deleted = true;
      } else {
        this.editAdditionalFieldsOfRentType[this.indexToBeDeleted].is_field_deleted = true;
      }
      this.arrayToBeDeleted = "";
      this.indexToBeDeleted = 0;
      this.$refs["modal-delete-confirmation"].hide();
      /* eslint-enable */
    },
    closeDeleteFieldConfirmation() {
      this.arrayToBeDeleted = "";
      this.indexToBeDeleted = 0;
      this.$refs["modal-delete-confirmation"].hide();
    },
    clearCategoryTreeAndRelatedData() {
      this.hasCategory = false;
      this.hasSub1Category = false;
      this.hasSub2Category = false;
      this.hasSub3Category = false;
      this.editCategoryForm.category = "";
      this.editCategoryForm.sub1Category = "";
      this.editCategoryForm.sub2Category = "";
      this.editCategoryForm.sub3Category = "";
      this.editCategoryForm.categoryTypes = [];
      this.editAdditionalFieldsOfSaleType = [];
      this.editAdditionalFieldsOfRentType = [];
    },
    getDiffBetweenCategoryTypes() {
      /* eslint-disable */
      const originalCategoryTypes = this.editCategoryForm.originalCategoryTypes;
      const updatedCategoryTypes = this.editCategoryForm.categoryTypes;
      return originalCategoryTypes.filter(function(oroginalCategoryType) {
        return updatedCategoryTypes.indexOf(oroginalCategoryType) === -1; 
      });
      /* eslint-enable */
    },
    updateCategoryData() {
      /* eslint-disable */
      this.serverAlerts.showErrorDismissibleAlert = false;
      this.serverAlerts.showSuccessDismissibleAlert = false;
      this.updateCategoryRequestPending = true;
      let editCategoryForm = this.extractEditCategoryForm(this.editCategoryForm);
      if (this.editAdditionalFieldsOfSaleType.length) {
        editCategoryForm.editSaleTypeFieldSections = this.extractEditSaleTypeFieldSections();
      }
      if (this.editAdditionalFieldsOfRentType.length) {
        editCategoryForm.editRentTypeFieldSections = this.extractEditRentTypeFieldSections();
      }
      if(this.fieldsSectionForSaleType.length > 1 || this.fieldsSectionForRentType.length > 1) {
        editCategoryForm.fieldSections = this.extractFieldSections();
      }
      const formData = this.$toFormData(editCategoryForm);
      this.$axios.post(`${ENDPOINTS_FOR_ADMIN.CATEGORY.UPDATE}?_method=put`, formData).then(function(res) {
        this.serverAlerts.success = res.data.message;
        this.serverAlerts.showSuccessDismissibleAlert = true;
        this.clearCategoryTreeAndRelatedData();
        editCategoryForm = [];
        this.hasToShowEmptyState = true;
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
        this.updateCategoryRequestPending = false;
      });
      /* eslint-enable */
    },
    extractEditSaleTypeFieldSections() {
      /* eslint-disable */
      const editSaleTypeFields = [];
      this.editAdditionalFieldsOfSaleType.filter(function(additionalField) {
        if (additionalField.input_type === "text"){
          editSaleTypeFields.push({
            field_name: additionalField.field_name,
            id: additionalField.id,
            input_type: additionalField.input_type,
            is_field_deleted: additionalField.is_field_deleted,
            is_required: additionalField.is_required,
            placeholder: additionalField.placeholder,
          });
        } else {
          editSaleTypeFields.push({
            field_name: additionalField.field_name,
            id: additionalField.id,
            input_type: additionalField.input_type,
            is_field_deleted: additionalField.is_field_deleted,
            is_required: additionalField.is_required,
            tags: this.extractEditTags(additionalField.tags),
          });
        }
      }.bind(this));
      return editSaleTypeFields;
      /* eslint-enable */
    },
    extractEditRentTypeFieldSections() {
      /* eslint-disable */
      const editRentTypeFields = [];
      this.editAdditionalFieldsOfRentType.filter(function(additionalField) {
        if (additionalField.input_type === "text"){
          editRentTypeFields.push({
            field_name: additionalField.field_name,
            id: additionalField.id,
            input_type: additionalField.input_type,
            is_field_deleted: additionalField.is_field_deleted,
            is_required: additionalField.is_required,
            placeholder: additionalField.placeholder,
          });
        } else {
          editRentTypeFields.push({
            field_name: additionalField.field_name,
            id: additionalField.id,
            input_type: additionalField.input_type,
            is_field_deleted: additionalField.is_field_deleted,
            is_required: additionalField.is_required,
            tags: this.extractEditTags(additionalField.tags),
          });
        }
      }.bind(this));
      return editRentTypeFields;
      /* eslint-enable */
    },
    extractEditCategoryForm(categoryData) {
      /* eslint-disable */
      const tempCategoryData = {};
      tempCategoryData.categoryId = categoryData.categoryId;
      tempCategoryData.categoryTypes = categoryData.categoryTypes;
      tempCategoryData.category = categoryData.category;
      tempCategoryData.sub1Category = categoryData.sub1Category;
      tempCategoryData.sub2Category = categoryData.sub2Category;
      tempCategoryData.sub3Category = categoryData.sub3Category;
      return tempCategoryData;
      /* eslint-enable */
    },
    extractEditTags(tags) {
      /* eslint-disable */
      const tempTags = [];
      tags.filter(function(tag) {
        tempTags.push({
          id: tag.id,
          is_tag_deleted: tag.is_tag_deleted,
          text: tag.updated_text,
        });
      }.bind(this));
      return tempTags;
      /* eslint-enable */
    },
    openCategoryDeleteFieldConfirmation() {
      this.$refs["modal-category-delete-confirmation"].show();
    },
    closeCategoryDeleteFieldConfirmation() {
      this.$refs["modal-category-delete-confirmation"].hide();
    },
    deleteCategory() {
      /* eslint-disable */
      this.deleteCategoryRequestPending = true;
      this.$axios.delete(`${ENDPOINTS_FOR_ADMIN.CATEGORY.DELETE}?id=${this.editCategoryForm.categoryId}`, { progress: false }).then(function(res) {
        this.serverAlerts.success = res.data.message;
        this.serverAlerts.showSuccessDismissibleAlert = true;
        this.clearCategoryTreeAndRelatedData();
        this.hasToShowEmptyState = true;
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
        this.closeCategoryDeleteFieldConfirmation();
        this.deleteCategoryRequestPending = false;
      });
      /* eslint-enable */
    },
    // add new additional fields methods
    showCategoryFieldSections() {
      if (this.editCategoryForm.category) {
        if (this.editCategoryForm.categoryTypes.length) {
          if (this.editCategoryForm.categoryTypes.includes("for-sale")) {
            this.hasToShowCategoryFieldsSectionForSaleType = true;
          } else {
            this.hasToShowCategoryFieldsSectionForSaleType = false;
          }
          if (this.editCategoryForm.categoryTypes.includes("for-rent")) {
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
    enableFieldSectionRemoveOptionForSaleType(index) {
      this.fieldsSectionForSaleType[index].remove = true;
    },
    removeFieldSectionAddOptionForSaleType(index) {
      this.fieldsSectionForSaleType[index].add = false;
    },
    removeFieldSectionForSaleType(index) {
      this.$delete(this.fieldsSectionForSaleType, index);
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
    enableFieldSectionRemoveOptionForRentType(index) {
      this.fieldsSectionForRentType[index].remove = true;
    },
    removeFieldSectionAddOptionForRentType(index) {
      this.fieldsSectionForRentType[index].add = false;
    },
    removeFieldSectionForRentType(index) {
      this.$delete(this.fieldsSectionForRentType, index);
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
  },
};
</script>
