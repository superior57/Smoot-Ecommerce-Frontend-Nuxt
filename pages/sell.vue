<template>
  <b-container class="container-sell" rounded fluid="xl">
    <loading
      :active.sync="isLoading" 
      :can-cancel="false"
      :is-full-page="fullPage"
    ></loading>
    <b-modal id="success-modal" centered hide-footer hide-header>
      <b-img
        src="https://media.giphy.com/media/aQYR1p8saOQla/giphy.gif"
        rounded="circle"
        center
        v-bind="modalGifProps"
        alt="Responsive image"
      ></b-img>
      <p class="my-2 mx-auto text-center">Registered Successfully</p>
      <b-button
        class="mt-3 col-3 mx-auto"
        block
        @click="closeModal"
      >CLOSE</b-button>
    </b-modal>
    <div class="sell-header">
      <i class="fa fa-times cursor-pointer" aria-hidden="true"></i>
      <h1>What are you listing today?</h1>
    </div>
    <b-row>
      <!-- eslint-disable -->
      <b-col
        :lg="previewOfImages.length ? `5` : `12`"
        :md="previewOfImages.length ? `5` : `12`"
        sm="12"
        cols="12"
        class="col-left"
      >
      <!-- eslint-enable -->
        <b-row>
          <b-col cols="12">
            <div
              v-if="previewOfImages.length < 10"
              class="photos-upload-area cursor-pointer rounded"
            >
              <i class="fa fa-file-image-o fa-3x" aria-hidden="true"></i>
              <b-button size="sm">
                <i class="fa fa-plus" aria-hidden="true"></i>
                Add photos
              </b-button>
              <input
                type="file"
                class="cursor-pointer default-file-upload-field"
                accept="image/jpeg, image/png"
                @change="onProductImageSelected"
              />
              <div class="add-photo-text text-align-center">
                <div>or drag & drop photos here</div>
                <div>(Up to 10 photos)</div>
              </div>
            </div>
          </b-col>
          <b-col cols="12">
            <div class="list-uploaded-images">
              <div
                v-for="(previewOfImage, indexPreviewOfImage) in previewOfImages"
                :key="indexPreviewOfImage"
                class="image-block rounded"
              >
                <!-- eslint-disable -->
                <img
                  :src="previewOfImage.blob"
                  draggable
                  @dragstart="onDragStart($event, indexPreviewOfImage, previewOfImage.blob)"
                  @drop="onDrop($event, indexPreviewOfImage, previewOfImage.blob)"
                  @dragover.prevent
                  @dragenter.prevent
                />
                <!-- eslint-enable -->
                <i
                  class="fa fa-times-circle-o remove-image cursor-pointer"
                  aria-hidden="true"
                  @click="removeImage(indexPreviewOfImage)"
                ></i>
                <span
                  v-if="indexPreviewOfImage === 0"
                  class="product-cover text-align-center text-uppercase"
                >
                  Cover
                </span>
              </div>
            </div>
          </b-col>
          <b-col
            v-if="previewOfImages.length >= 1"
            cols="12"
            class="col-image-arrange-tip"
          >
            <div class="tip-container text-align-center">
              <i class="fa fa-lightbulb-o" aria-hidden="true"></i>
              <span>Tip: Re-arrange photos to change cover</span>
            </div>
          </b-col>
        </b-row>
      </b-col>
      <b-col
        v-if="previewOfImages.length"
        lg="7"
        md="7"
        sm="12"
        cols="12"
        class="col-right"
      >
        <b-row>
          <b-col>
            <validation-observer v-slot="{ handleSubmit }">
              <b-form
                class="form-product-listing"
                @submit.prevent="handleSubmit(registerProduct)"
              >
                <b-form-group>
                  <label for="price">
                    <h2>Price</h2>
                  </label>
                  <b-form-radio-group
                    v-model="productListingsForm.priceOption"
                    :options="productListingsFormLookUpValues.priceTypes"
                    @input="getCategoryIdByType"
                  ></b-form-radio-group>
                  <div v-if="productListingsForm.priceOption === `for-sale`">
                    <validation-provider
                      name="category Id"
                      :rules="{required: true, regex: /^[0-9]+$/ }"
                      v-slot="{ classes, errors }"
                    >
                      <b-input-group
                        class="input-group-for-price"
                        prepend="Rs."
                        append=".00"
                      >
                        <b-form-input
                          id="price"
                          class="text-align-right"
                          :class="classes"
                          v-model="productListingsForm.price"
                        ></b-form-input>
                      </b-input-group>
                      <div class="invalid-feedback">{{ errors[0] }}</div>
                    </validation-provider>
                  </div>
                </b-form-group>
                <b-form-group>
                  <label for="category">
                    <h3>Category</h3>
                  </label>
                  <!-- eslint-disable -->
                  <div
                    id="category"
                    class="fake-input-category-dd-field cursor-pointer"
                    style="z-index:10"
                    @click="openOrCloseFakeCategoryDataList('toggle-data-list')"
                  >
                    <div class="default-inline-label">
                      <span v-if="!mainCategoryToSubCategryLables.length">
                        Select a category
                      </span>
                      <span class="selected-category-label" v-else>
                        <div class="category" v-if="mainCategoryToSubCategryLables.length === 1">
                          {{ mainCategoryToSubCategryLables[0] }}
                        </div>
                        <div class="category-with-sub" v-else-if="mainCategoryToSubCategryLables.length === 2">
                          <div>
                            {{ mainCategoryToSubCategryLables[1] }}
                          </div>
                          <div>
                            {{ `in ${mainCategoryToSubCategryLables[0]}` }}
                          </div>
                        </div>
                        <div
                          class="category-with-sub"
                          v-else-if="mainCategoryToSubCategryLables.length === 3"
                        >
                          <div>
                            {{ mainCategoryToSubCategryLables[2] }}
                          </div>
                          <div>
                            {{ `in ${mainCategoryToSubCategryLables[0]} > ${mainCategoryToSubCategryLables[1]}` }}
                          </div>
                        </div>
                        <div class="category-with-sub" v-else>
                          <div>
                            {{ mainCategoryToSubCategryLables[3] }}
                          </div>
                          <div>
                            {{ `in ${mainCategoryToSubCategryLables[0]} > ${mainCategoryToSubCategryLables[1]} > ${mainCategoryToSubCategryLables[2]}` }}
                          </div>
                        </div>
                      </span>
                      <span>
                        <i
                          class="fa fa-angle-down fa-lg"
                          :class="showCategoryDatalist ? `fa-flip-vertical` : null"
                          aria-hidden="true"
                        ></i>
                      </span>
                    </div>
                    <div
                      v-if="categoryIdByType.length && (showCategoryDatalist || showCategoryListForDataList)" 
                      class="data-list"
                      @click="openOrCloseFakeCategoryDataList('select-from-data-list'); closeCategoryDataList()"
                    >
                      <div class="search-bar">
                        <b-form-input
                          placeholder="Search for a category..."
                          v-model.trim="searchVal"
                          @change="searchDatalist"
                          @click="keepDataListOpenForSearch()"
                        ></b-form-input>
                      </div>
                      <div
                        :id="`categories-parent-${mainCategoryIndex}`"
                        v-for="(mainCategory, mainCategoryIndex) in productListingsFormLookUpValues.categories"
                        v-b-toggle="`collapse-${mainCategoryIndex}`"
                        class="categories-list"
                        :key="mainCategoryIndex"
                      >
                        <div
                          @click="checkIfMainCategoryHasCollapsed(mainCategoryIndex)"
                          v-show="mainCategory.sub_categories.length || (categoryIdByType.includes(mainCategory.id) && mainCategory.text.trim().toLowerCase().includes(searchVal.toLowerCase()))"
                        >
                          <div
                            class="main-category"
                            @click="pushToSelectedCategoriesArray(mainCategory, `main-category`, mainCategory.sub_categories.length)"
                          >
                            <span :id="`main-category-${mainCategoryIndex}`">
                              {{ mainCategory.text }}
                            </span>
                            <span
                              v-if="mainCategory.sub_categories.length"
                            >
                              <i
                              :id="`icon-${mainCategoryIndex}`"
                              class="fa fa-angle-right fa-lg"
                              aria-hidden="true"
                            ></i>
                            </span>
                          </div>
                          <!-- collapse for sub category 1 list -->
                          <b-collapse
                            :id="`collapse-${mainCategoryIndex}`"
                            v-if="mainCategory.sub_categories.length"
                          >
                            <div
                              :id="`categories-sub1-${mainCategoryIndex}${subCategory1Index}`"
                              v-for="(subCategory1, subCategory1Index) in mainCategory.sub_categories"
                              :key="subCategory1Index"
                              v-b-toggle="`collapse-${mainCategoryIndex} collapse-${mainCategoryIndex}${subCategory1Index}`"
                            >
                              <div
                                @click="checkIfSubCategory1HasCollapsed(`${mainCategoryIndex}${subCategory1Index}`)"
                                v-show="subCategory1.sub_categories.length || (categoryIdByType.includes(subCategory1.id) && subCategory1.text.trim().toLowerCase().includes(searchVal.toLowerCase()))"
                              >
                                <div class="sub-category" @click="pushToSelectedCategoriesArray(subCategory1, `sub-category-1`, subCategory1.sub_categories.length)">
                                  <span :id="`sub-1-category-${mainCategoryIndex}${subCategory1Index}`">
                                    {{ subCategory1.text }}
                                  </span>
                                  <span v-if="subCategory1.sub_categories.length">
                                    <i
                                      :id="`icon-${mainCategoryIndex}${subCategory1Index}`"
                                      class="fa fa-angle-right fa-lg"
                                      aria-hidden="true"
                                    ></i>
                                  </span>
                                </div>
                                <!-- collapse for sub category 2 list -->
                                <b-collapse
                                  :id="`collapse-${mainCategoryIndex}${subCategory1Index}`"
                                  v-if="subCategory1.sub_categories.length"
                                >
                                  <div
                                    :id="`categories-sub2-${mainCategoryIndex}${subCategory1Index}${subCategory2Index}`"
                                    v-for="(subCategory2, subCategory2Index) in subCategory1.sub_categories"
                                    :key="subCategory2Index"
                                    v-b-toggle="`collapse-${mainCategoryIndex}${subCategory1Index} collapse-2-${mainCategoryIndex}${subCategory1Index}${subCategory2Index}`"
                                  >
                                    <div
                                      @click="checkIfSubCategory2HasCollapsed(`${mainCategoryIndex}${subCategory1Index}${subCategory2Index}`)"
                                      v-show="subCategory2.sub_categories.length || (categoryIdByType.includes(subCategory2.id) && subCategory2.text.trim().toLowerCase().includes(searchVal.toLowerCase()))"
                                    >
                                      <div
                                        class="sub-category padding-for-sub-cat-2" 
                                        @click="pushToSelectedCategoriesArray(subCategory2, `sub-category-2`, subCategory2.sub_categories.length)"
                                      >
                                        <span
                                          :id="`sub-2-category-${mainCategoryIndex}${subCategory1Index}${subCategory2Index}`"
                                        >
                                          {{ subCategory2.text }}
                                        </span>
                                        <span v-if="subCategory2.sub_categories.length">
                                          <i
                                            :id="`icon-2-${mainCategoryIndex}${subCategory1Index}${subCategory2Index}`"
                                            class="fa fa-angle-right fa-lg"
                                            aria-hidden="true"
                                          ></i>
                                        </span>
                                      </div>
                                      <b-collapse
                                        :id="`collapse-2-${mainCategoryIndex}${subCategory1Index}${subCategory2Index}`"
                                        v-if="subCategory2.sub_categories.length"
                                      >
                                        <div
                                          v-for="(subCategory3, subCategory3Index) in subCategory2.sub_categories"
                                          :key="subCategory3Index"
                                        >
                                          <div
                                            class="sub-category padding-for-sub-cat-3" 
                                            @click="pushToSelectedCategoriesArray(subCategory3, `sub-category-3`, subCategory3.sub_categories.length)"
                                            v-show="subCategory3.sub_categories.length || (categoryIdByType.includes(subCategory3.id) && subCategory3.text.trim().toLowerCase().includes(searchVal.toLowerCase()))"
                                          >
                                            <span
                                              :id="`sub-3-category-${mainCategoryIndex}${subCategory1Index}${subCategory2Index}${subCategory3Index}`"
                                            >
                                              {{ subCategory3.text }}
                                            </span>
                                            <span v-if="subCategory3.sub_categories.length">
                                              <i
                                                class="fa fa-angle-right fa-lg"
                                                aria-hidden="true"
                                              ></i>
                                            </span>
                                          </div>
                                        </div>
                                      </b-collapse>
                                    </div>
                                  </div>
                                </b-collapse>
                                <!-- end collapse for sub category 2 list -->
                              </div>
                            </div>
                          </b-collapse>
                          <!-- end collapse for sub category 1 list -->
                        </div>
                      </div>
                    </div>
                  </div>
                  <!-- eslint-enable -->
                </b-form-group>
                <div v-if="productListingsForm.mainCategoryToSubCategry.length">
                  <b-form-group>
                    <label for="title">
                      <h2>Listing Title</h2>
                    </label>
                    <validation-provider
                      name="Listing Title"
                      :rules="{ required:true, regex_alpha_numeric_space: /^[/a-zA-Z0-9-'&,+()\s]+$/, max:40 }"
                      v-slot="{ classes, errors }"
                    >
                      <b-form-input
                        id="title"
                        type="text"
                        :class="classes"
                        v-model="productListingsForm.listingTitle"
                      ></b-form-input>
                      <div class="invalid-feedback">{{ errors[0] }}</div>
                    </validation-provider>
                  </b-form-group>
                  <!-- dynamic fields based on the selected category -->
                  <!-- eslint-disable -->
                  <div v-if="productRelatedFields.length">
                    <h2>Product Detail</h2>
                    <b-form-group
                      v-for="(productRelatedField, productRelatedFieldIndex) in productRelatedFields"
                      :key="productRelatedFieldIndex"
                    >
                      <!-- text field -->
                      <div v-if="productRelatedField.input_type === `text`">
                        <label :for="productRelatedField.field_name">
                          <h3>{{ productRelatedField.field_name }}</h3>
                        </label>
                        <validation-provider
                          :name="productRelatedField.field_name"
                          rules="required"
                          v-slot="{ classes, errors }"
                        >
                          <b-form-input
                            :id="productRelatedField.field_name"
                            type="text"
                            :class="classes"
                            :placeholder="productRelatedField.placeholder"
                            v-model="productListingsForm.detail[productRelatedField.id]"
                          ></b-form-input>
                          <div class="invalid-feedback">{{ errors[0] }}</div>
                        </validation-provider>
                      </div>
                      <!-- end text field -->
                      <!-- drop down field -->
                      <div v-if="productRelatedField.input_type === `ddl`">
                        <label :for="productRelatedField.field_name">
                          <h3>{{ productRelatedField.field_name }}</h3>
                        </label>
                        <validation-provider
                          :name="productRelatedField.field_name"
                          rules="required"
                          v-slot="{ classes, errors }"
                        >
                          <b-form-select
                            :id="productRelatedField.field_name"
                            :options="productRelatedField.tags"
                            :class="classes"
                            v-model="productListingsForm.detail[productRelatedField.id]"
                          ></b-form-select>
                          <div class="invalid-feedback">{{ errors[0] }}</div>
                        </validation-provider>
                      </div>
                      <!-- end drop down field -->
                      <!-- checkbox field -->
                      <div v-if="productRelatedField.input_type === `checkbox`">
                        <label :for="productRelatedField.field_name">
                          <h3>{{ productRelatedField.field_name }}</h3>
                        </label>
                        <validation-provider
                          :name="productRelatedField.field_name"
                          rules="required"
                          v-slot="{ classes, errors }"
                        >
                          <b-form-checkbox-group
                            :id="productRelatedField.field_name"
                            :options="productRelatedField.tags"
                            :class="classes"
                            v-model="productListingsForm.detail[productRelatedField.id]"
                          ></b-form-checkbox-group>
                          <div class="invalid-feedback">{{ errors[0] }}</div>
                        </validation-provider>
                      </div>
                      <!-- end checkbox field -->
                      <!-- radiobox field -->
                      <div v-if="productRelatedField.input_type === `radio`">
                        <label :for="productRelatedField.field_name">
                          <h3>{{ productRelatedField.field_name }}</h3>
                        </label>
                        <validation-provider
                          :name="productRelatedField.field_name"
                          rules="required"
                          v-slot="{ classes, errors }"
                        >
                          <b-form-radio-group
                            :id="productRelatedField.field_name"
                            :options="productRelatedField.tags"
                            :class="classes"
                            v-model="productListingsForm.detail[productRelatedField.id]"
                          ></b-form-radio-group>
                          <div class="invalid-feedback">{{ errors[0] }}</div>
                        </validation-provider>
                      </div>
                      <!-- end radiobox field -->
                    </b-form-group>
                  </div>
                  <!-- eslint-enable -->
                  <!-- end dynamic fields based on the selected category -->
                  <b-form-group>
                    <label for="condition">
                      <h2>Item Condition</h2>
                    </label>
                    <validation-provider
                      name="Item Condition"
                      rules="required"
                      v-slot="{ classes, errors }"
                    >
                      <b-form-radio-group
                        id="condition"
                        v-model="productListingsForm.condition"
                        :class="classes"
                        :options="productListingsFormLookUpValues.itemConditions"
                      ></b-form-radio-group>
                      <div class="invalid-feedback">{{ errors[0] }}</div>
                    </validation-provider>
                  </b-form-group>
                  <b-form-group>
                    <label for="description">
                      <h2>Description</h2>
                    </label>
                    <b-form-textarea
                      id="description"
                      class="description"
                      placeholder="Describe what you are selling and include any details a buyer might be interested in. People love items with stories!"
                      rows="6"
                      v-model="productListingsForm.description"
                    ></b-form-textarea>
                  </b-form-group>
                  <b-form-group>
                    <label>
                      <h2>Deal Method</h2>
                    </label>
                    <b-form-checkbox-group
                      id="deal-method-for-meetup"
                      v-model="productListingsForm.dealMethodForMeetup"
                      :options="
                        productListingsFormLookUpValues.dealMethodsForMeetup
                      "
                      stacked
                    ></b-form-checkbox-group>
                    <b-form-input
                      v-if="productListingsForm.dealMethodForMeetup.length"
                      id="meetup-location"
                      v-model="productListingsForm.meetupLocation"
                      class="meetup-location"
                      type="text"
                      placeholder="Type a location you want to have the meet-up"
                    ></b-form-input>
                    <b-form-checkbox-group
                      id="deal-method-for-delivery"
                      v-model="productListingsForm.dealMethodForDelivery"
                      :options="
                        productListingsFormLookUpValues.dealMethodsForDelivery
                      "
                      stacked
                    ></b-form-checkbox-group>
                  </b-form-group>
                  <b-form-group class="mb-0">
                    <b-button type="submit" block>List now</b-button>
                  </b-form-group>
                </div>
              </b-form>
            </validation-observer>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
import {
  ENDPOINTS_FOR_SELL,
  ENDPOINTS_FOR_ADMIN,
} from "@/constants/smoot-api";

import { ValidationObserver, ValidationProvider } from "vee-validate";

// Import component
import Loading from 'vue-loading-overlay';
// Import stylesheet
import 'vue-loading-overlay/dist/vue-loading.css';

export default {
  name: "Sell",
  data() {
    return {
      modalGifProps : {
        width: 200,
        height: 200,
      },
      isLoading: false,
      fullPage: true,

      previewOfImages: [],
      mainCategoryToSubCategryLables: [],
      mainCategoryToSubCategryID: [],
      categoryIdByType: [],
      
      productListingsForm: {
        mainCategoryToSubCategry: [],
        priceOption: "for-sale",
        price: "",
        listingTitle: '',
        detail: {},
        condition: "",
        description: "",
        dealMethodForMeetup: [],
        meetupLocation: "",
        dealMethodForDelivery: [],
      },
      productListingsFormLookUpValues: {
        priceTypes: [
          {
            text: `For Sale`,
            value: `for-sale`,
          },
          {
            text: `For Rent`,
            value: `for-rent`,
          },
          {
            text: `For Free`,
            value: `for-free`,
          },
        ],
        categories: [],
        itemConditions: [
          {
            text: `New`,
            value: `new`,
          },
          {
            text: `Used`,
            value: `used`,
          },
        ],
        dealMethodsForMeetup: [
          {
            text: `Meet-up`,
            value: `meet-up`,
          },
        ],
        dealMethodsForDelivery: [
          {
            text: `Mailing & Delivery`,
            value: `mailing-and-delivery`,
          },
        ],
      },
      productRelatedFields: [],
      showCategoryDatalist: false,
      showCategoryListForDataList: false,
      imagesData: [],

      loadingIndicator: {
        name: 'circle',
        color: '#3B8070',
        background: 'white'
      },

      searchVal: '',
    };
  },
  components: {
    Loading,
    ValidationObserver,
    ValidationProvider,
  },
  watch: {},
  mounted()
  {
    this.getLookupCategory();
    this.getCategoryIdByType();
  },
  computed: {
    priceState() {
      return (this.productListingsForm.price.match(/^[0-9]+$/) != null);
    },
    titleState() {
      return (this.productListingsForm.price.length > 0);
    },
  },
  methods: {
    async registerProduct() {
      this.isLoading = true;
      const savedFolderName = Date.now().toString();
      const imageArray = [];
      for(var id=0; id<this.imagesData.length; id++) {
        const savedFileName = Date.now().toString() + id.toString() + '.' + this.imagesData[id].name.split('.')[1];
        const token = await this.$axios.get(
          `${process.env.BASE_API_URL}/get-imagekit-token`
        );
        const params = {
          'publicKey': 'public_6Jss6gi3EBaSinA4iov5IJtXa6g=',
          'signature': token.data.signature,
          'expire': token.data.expire,
          'token': token.data.token,
          'folder': `/prod/products/${this.$auth.$state.user.username}/${savedFolderName}/`,
          'fileName': savedFileName,
          'useUniqueFileName': false,
        };
        const formData = new FormData()
        formData.append('file', this.imagesData[id], this.imagesData[id].name);
        for(var x in params) {
          formData.append(x, params[x]);
        }
        const res = await this.$axios.post(
          'https://upload.imagekit.io/api/v1/files/upload',
          formData
        );
        imageArray.push(`${savedFolderName}/${savedFileName}`);
      }
      const data = {
        'user_id' : this.$auth.$state.user.username,
        'price' : this.productListingsForm.price,
        'last_category_id' : this.mainCategoryToSubCategryID[this.mainCategoryToSubCategryID.length-1],
        'category_type' : this.productListingsForm.priceOption,
        'title' : this.productListingsForm.listingTitle,
        'details' : this.productListingsForm.detail,//
        'condition' : this.productListingsForm.condition,
        'description' : this.productListingsForm.description,
        'dealMethodForMeetup' : this.productListingsForm.dealMethodForMeetup,//
        'meetupLocation' : this.productListingsForm.meetupLocation, //
        'dealMethodForDelivery' : this.productListingsForm.dealMethodForDelivery,
        'image' : imageArray,
        'status' : 'selling',
      }
      await this.$axios.post(
        ENDPOINTS_FOR_SELL.SELL.ADD,
        data
      );
      this.isLoading = false;
      this.$bvModal.show('success-modal');
    },

    closeModal() {
      this.$bvModal.hide('success-modal');
      this.$router.push('/');
    },
    getCategoryIdByType() {
      this.mainCategoryToSubCategryLables=[];
      this.productListingsForm.mainCategoryToSubCategry=[];
      this.categoryIdByType = [];
      this.mainCategoryToSubCategryID = [];

      this.$axios.get(
        `${ENDPOINTS_FOR_SELL.SELL.GET_CATEGORY_ID_BY_TYPE}?value=${this.productListingsForm.priceOption}`,
        { progress: false })
      .then(function(res) {
        this.categoryIdByType = res.data;
      }.bind(this)).catch(function(err) {
        this.emptyCategoryListMessage = err.response.data.message;
        this.items = [];
      }.bind(this)).then(() => {
      });
    },
    getLookupCategory() {
      this.$axios.get(ENDPOINTS_FOR_SELL.SELL.GET_LOOKUP_CATEGORIES, { progress: false }).then(function(res) {
        this.productListingsFormLookUpValues.categories = res.data.data;
      }.bind(this)).catch(function(err) {
        this.emptyCategoryListMessage = err.response.data.message;
        this.items = [];
      }.bind(this)).then(() => {});
    },
    getProductRelatedFields() {
      this.$axios.get(
        `${ENDPOINTS_FOR_ADMIN.CATEGORY.GET_SELECTED_CATEGORY_DETAILS_FOR_VIEW}?id=${this.mainCategoryToSubCategryID[this.mainCategoryToSubCategryID.length-1]}`,
        { progress: false })
      .then(function(res) {
        this.productRelatedFields = res.data.category_details.sale_type_fields;
      }.bind(this)).catch(function(err) {
        this.emptyCategoryListMessage = err.response.data.message;
        this.items = [];
      }.bind(this)).then(() => {});
    },
    onProductImageSelected(event) {
      if (typeof event.target.files[0] !== "undefined") {
        this.imagesData.push(event.target.files[0]);
        this.previewOfImages.push({
          blob: window.URL.createObjectURL(event.target.files[0]),
        });
      }
    },
    removeImage(removeIndex) {
      const vm = this;
      this.$delete(vm.previewOfImages, removeIndex);
      this.$delete(vm.imagesData, removeIndex);
    },
    onDragStart(event, dragdingImageIndex, dragdingImage) {
      event.dataTransfer.dropEffect = "move";
      event.dataTransfer.effectAllowed = "move";
      event.dataTransfer.setData("imageIndex", dragdingImageIndex);
      event.dataTransfer.setData("image", dragdingImage);
    },
    onDrop(event, indexToPlaceTheDraggingItem, existngImageInTheDroppingIndex) {
      const vm = this;
      const imageIndex = event.dataTransfer.getData("imageIndex");
      const image = event.dataTransfer.getData("image");
      vm.previewOfImages[indexToPlaceTheDraggingItem].blob = image;
      vm.previewOfImages[imageIndex].blob = existngImageInTheDroppingIndex;
      const temp = vm.imagesData[imageIndex];
      vm.imagesData[imageIndex] = vm.imagesData[indexToPlaceTheDraggingItem];
      vm.imagesData[indexToPlaceTheDraggingItem] = temp;
    },
    checkIfMainCategoryHasCollapsed(categoryListElement) {
      const elementParent = document.getElementById(
        `categories-parent-${categoryListElement}`
      );
      const elementForIcon = document.getElementById(
        `icon-${categoryListElement}`
      );
      if (elementForIcon !== null) {
        if (elementParent.classList.contains("not-collapsed")) {
          elementForIcon.classList.remove("fa-rotate-90");
        } else {
          elementForIcon.classList.add("fa-rotate-90");
        }
      }
    },
    checkIfSubCategory1HasCollapsed(categoryListElement) {
      const elementSub = document.getElementById(
        `collapse-${categoryListElement}`
      );
      const elementForIcon = document.getElementById(
        `icon-${categoryListElement}`
      );
      if (elementForIcon !== null) {
        if (elementSub.classList.contains("show")) {
          elementForIcon.classList.remove("fa-rotate-90");
        } else {
          elementForIcon.classList.add("fa-rotate-90");
        }
      }
    },
    checkIfSubCategory2HasCollapsed(categoryListElement) {
      const elementSub = document.getElementById(
        `collapse-2-${categoryListElement}`
      );
      const elementForIcon = document.getElementById(
        `icon-2-${categoryListElement}`
      );
      if (elementForIcon !== null) {
        if (elementSub.classList.contains("show")) {
          elementForIcon.classList.remove("fa-rotate-90");
        } else {
          elementForIcon.classList.add("fa-rotate-90");
        }
      }
    },
    openOrCloseFakeCategoryDataList(actionType) {
      if (actionType === "toggle-data-list") {
        this.showCategoryDatalist = !this.showCategoryDatalist;
        this.showCategoryListForDataList = false;
      } else if (actionType === "select-from-data-list") {
        // make showCategoryDatalist = false as default
        this.showCategoryDatalist = true;
        this.showCategoryListForDataList = true;
      }
    },
    closeCategoryDataList() {
      if (this.mainCategoryToSubCategryID.length) {
        this.showCategoryDatalist = false;
        this.showCategoryListForDataList = false;
        this.getProductRelatedFields();
      }
      event.stopPropagation();
    },
    keepDataListOpenForSearch() {
      this.showCategoryDatalist = true;
      event.stopPropagation();
    },
    searchDatalist() {
      console.log(this.searchVal);
      this.searchVal.toLowerCase().trim()
    },
    /* eslint-disable */
    pushToSelectedCategoriesArray(category, categoryType, hasSubCategory){
      const vm = this;
      if(vm.productListingsForm.mainCategoryToSubCategry.length){
        vm.productListingsForm.mainCategoryToSubCategry = [];
      }
      if(vm.mainCategoryToSubCategryLables.length){
        vm.mainCategoryToSubCategryLables = [];
      }
      if(vm.mainCategoryToSubCategryID.length){
        vm.mainCategoryToSubCategryID = [];
      }
      if(categoryType === "main-category") {
        if(!hasSubCategory) {
          vm.productListingsForm.mainCategoryToSubCategry.push(
            category.value
          );
          vm.mainCategoryToSubCategryLables.push(
            category.text
          );
          vm.mainCategoryToSubCategryID.push(
            category.id
          );
        }
      } else if(categoryType === "sub-category-1") {
        if(!hasSubCategory) {
            /* get the main category */
            vm.productListingsFormLookUpValues.categories.filter(function(mainCategory) {
              if(mainCategory.sub_categories.length){
                mainCategory.sub_categories.filter(function(sub1Category) {
                  if(sub1Category.value === category.value) {
                    vm.productListingsForm.mainCategoryToSubCategry.push(
                      mainCategory.value,
                      category.value,
                    );
                    vm.mainCategoryToSubCategryLables.push(
                      mainCategory.text,
                      category.text
                    );
                    vm.mainCategoryToSubCategryID.push(
                      mainCategory.id,
                      category.id
                    );
                  }
                });
              }
            });
          /* end get the main category */
        }
      }
      else if(categoryType === "sub-category-2") {
        if(!hasSubCategory) {
        /* get the main category, sub 2 category */
          vm.productListingsFormLookUpValues.categories.filter(function(mainCategory) {
            if(mainCategory.sub_categories.length){
              mainCategory.sub_categories.filter(function(sub1Category) {
                if(sub1Category.sub_categories.length) {
                  sub1Category.sub_categories.filter(function (sub2Category) {
                    if(sub2Category.value === category.value) {
                      vm.productListingsForm.mainCategoryToSubCategry.push(
                        mainCategory.value,
                        sub1Category.value,
                        category.value,
                      );
                      vm.mainCategoryToSubCategryLables.push(
                        mainCategory.text,
                        sub1Category.text,
                        category.text
                      );
                      vm.mainCategoryToSubCategryID.push(
                        mainCategory.id,
                        sub1Category.id,
                        category.id
                      );
                    }
                  });
                }
              });
            }
          });
        /* get the main category, sub 2 category */
        }
      } else {
        /* get the main category, sub 2 category */
          vm.productListingsFormLookUpValues.categories.filter(function(mainCategory) {
            if(mainCategory.sub_categories.length){
              mainCategory.sub_categories.filter(function(sub1Category) {
                if(sub1Category.sub_categories.length) {
                  sub1Category.sub_categories.filter(function (sub2Category) {
                    if(sub2Category.sub_categories.length) {
                      sub2Category.sub_categories.filter(function (sub3Category) {
                        if(sub3Category.value === category.value) {
                          vm.productListingsForm.mainCategoryToSubCategry.push(
                            mainCategory.value,
                            sub1Category.value,
                            sub2Category.value,
                            category.value,
                          );
                          vm.mainCategoryToSubCategryLables.push(
                            mainCategory.text,
                            sub1Category.text,
                            sub2Category.text,
                            category.text
                          );
                          vm.mainCategoryToSubCategryID.push(
                            mainCategory.id,
                            sub1Category.id,
                            sub2Category.id,
                            category.id
                          );
                        }
                      });
                    }
                  });
                }
              });
            }
          });
        /* get the main category, sub 2 category */
      }
    },
    /* eslint-enable */
  },
};
</script>
