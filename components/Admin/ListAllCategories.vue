<template>
  <!-- eslint-disable-->
  <div class="mt-5">
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
    <b-container class="container-list-all-categories">
      <b-row>
        <b-col xl="6" lg="6" md="6" sm="12" cols="12" class="left-col no-left-padding">
          <b-input-group size="sm" class="input-group-category-search">
              <b-input-group-prepend is-text>
                <b-icon icon="search"></b-icon>
              </b-input-group-prepend>
            <b-form-input
              v-model="filter"
              type="search"
              placeholder="Search a category..."
            ></b-form-input>
          </b-input-group>
        </b-col>
        <b-col xl="6" lg="6" md="6" sm="12" cols="12" class="right-col no-right-padding">
          <b-button
            size="sm"
            variant="outline-dark"
            class="btn-table-refresh"
            @click="viewAllCategories()"
          >
            <i class="fa fa-refresh" aria-hidden="true"></i>
            Refresh list
          </b-button>
        </b-col>
      </b-row>
    </b-container>
    <div v-if="isBusy" class="mt-3">
      <b-skeleton-table
      class="mt-3"
      :rows="10"
      :columns="6"
      :table-props="{ bordered: false, striped: true, responsive: true, small: false }"
    ></b-skeleton-table>
    </div>
    <b-table
      v-else
      id="category-table"
      class="mt-3"
      striped
      responsive
      hover
      :fields="fields"
      :items="items"
      :sort-by.sync="sortBy"
      :sort-desc.sync="sortDesc"
      show-empty
      :per-page="perPage"
      :current-page="currentPage"
      :filter="filter"
    >
      <template #table-busy>
        <div class="text-center text-danger my-2 default-spinner-container">
          <b-spinner class="default-spinner-border align-middle"></b-spinner>
          <strong class="default-spinner-label">Loading...</strong>
        </div>
      </template>
      <template #empty>
        <div class="text-align-center">{{ emptyCategoryListMessage }}</div>
      </template>
      <template #cell(actions)="row">
        <b-button
          class="btn-no-border-default"
          size="sm"
          variant="outline-dark"
          @click="row.toggleDetails();getSelectedCategoryDetails(row.detailsShowing, row.item.id)"
        >
          <b-icon
            v-if="row.detailsShowing"
            icon="chevron-up"
            aria-label="Help"
          ></b-icon>
          <b-icon
            v-else
            icon="chevron-down"
            aria-label="Help"
          ></b-icon>
        </b-button>
      </template>
      <template #row-details="row">
        <b-card>
          <h4 class="category-details-header text-align-center">
            Category details of
            <span
              class="theme-color-text font-bold"
              v-html="seletedCategoryDetailsHeading(row.item.category, row.item.sub_1_category, row.item.sub_2_category, row.item.sub_3_category)"
            ></span>
          </h4>
          <b-list-group
            v-if="!row.item.category_types.length"
            class="mt-5 text-align-center"
          >
            Loading category details...
          </b-list-group>
          <b-list-group v-else>
            <b-list-group-item>
              This category is available in:
              <ul>
                <li v-for="(value, key) in row.item.category_types" :key="key">
                  {{ row.item.category_types[key] }}
                </li>
              </ul>
            </b-list-group-item>
            <b-list-group-item v-if="row.item.category_details.sale_type_fields.length">
                Additonal fields of this category for Sale type:
                <div class="text-muted font-80 mt-1 mb-3">This category has a total of {{ row.item.category_details.sale_type_fields.length }} addtional field(s) in Sale type.</div>
                <b-card-group columns>
                  <b-card
                    v-for="(saleTypefField, saleTypefFieldIndex) in row.item.category_details.sale_type_fields"
                    :key="saleTypefFieldIndex"
                    border-variant="dark"
                  >
                    <b-card-title>
                      <span v-if="saleTypefField.input_type === `text`">
                        Field type: Textbox
                      </span>
                      <span v-else-if="saleTypefField.input_type === `ddl`">
                        Field type: Dropdown List
                      </span>
                      <span v-else-if="saleTypefField.input_type === `radio`">
                        Field type: Radio Options
                      </span>
                      <span v-else>
                        Field type: Checkbox List
                      </span>
                    </b-card-title>
                    <hr />
                    <b-card-text>
                      <div>
                        Field name: {{ saleTypefField.field_name }}
                      </div>
                      <hr />
                      <div v-if="saleTypefField.input_type === `text`">
                        <span v-if="saleTypefField.placeholder">
                          Placeholder: {{ saleTypefField.placeholder }}
                        </span>
                        <span v-else>
                          Placeholder:
                          <span class="text-muted font-80">
                            This field doesn't have a placehoder value
                          </span>
                        </span>
                      </div>
                      <div v-else>
                        <span>
                          Values of this field:
                        </span>
                        <span
                          v-for="(tag, tagIndex) in saleTypefField.tags"
                          :key="tagIndex"
                          class="badge-tag-theme-blue tag-listing"
                        >
                          {{ tag.text }}
                        </span>
                      </div>
                      <hr />
                      <div>
                        Is this field required: {{ saleTypefField.is_required ? `Yes` : `No` }}
                      </div>
                    </b-card-text>
                  </b-card>
                </b-card-group>
            </b-list-group-item>
            <b-list-group-item v-else>
              <div class="text-muted font-90">
                This category isn't available in Sale type or doesn't have any additonal fields for Sale type
              </div>
            </b-list-group-item>
            <b-list-group-item v-if="row.item.category_details.rent_type_fields.length">
              Additonal fields of this category for Rent type:
                <div class="text-muted font-80 mt-1 mb-3">This category has a total of {{ row.item.category_details.rent_type_fields.length }} addtional field(s) in Rent type.</div>
                <b-card-group columns>
                  <b-card
                    v-for="(rentTypefField, rentTypefFieldIndex) in row.item.category_details.rent_type_fields"
                    :key="rentTypefFieldIndex"
                    border-variant="dark"
                  >
                    <b-card-title>
                      <span v-if="rentTypefField.input_type === `text`">
                        Field type: Textbox
                      </span>
                      <span v-else-if="rentTypefField.input_type === `ddl`">
                        Field type: Dropdown List
                      </span>
                      <span v-else-if="rentTypefField.input_type === `radio`">
                        Field type: Radio Options
                      </span>
                      <span v-else>
                        Field type: Checkbox List
                      </span>
                    </b-card-title>
                    <hr />
                    <b-card-text>
                      <div>
                        Field name: {{ rentTypefField.field_name }}
                      </div>
                      <hr />
                      <div v-if="rentTypefField.input_type === `text`">
                        <span v-if="rentTypefField.placeholder">
                          Placeholder: {{ rentTypefField.placeholder }}
                        </span>
                        <span v-else>
                          Placeholder:
                          <span class="text-muted font-80">
                            This field doesn't have a placehoder value
                          </span>
                        </span>
                      </div>
                      <div v-else>
                        <span>
                          Values of this field:
                        </span>
                        <span
                          v-for="(tag, tagIndex) in rentTypefField.tags"
                          :key="tagIndex"
                          class="badge-tag-theme-blue tag-listing"
                        >
                          {{ tag.text }}
                        </span>
                      </div>
                      <hr />
                      <div>
                        Is this field required: {{ rentTypefField.is_required ? `Yes` : `No` }}
                      </div>
                    </b-card-text>
                  </b-card>
                </b-card-group>
            </b-list-group-item>
            <b-list-group-item v-else>
              <div class="text-muted font-90">
                This category isn't available in Rent type or doesn't have any additonal fields for Rent type
              </div>
            </b-list-group-item>
          </b-list-group>
        </b-card>
      </template>
    </b-table>
    <b-pagination
      v-if="items.length && !isBusy"
      v-model="currentPage"
      :total-rows="rows"
      :per-page="perPage"
      variant="dark"
      aria-controls="category-table"
    ></b-pagination>
      <p
        v-if="items.length && !isBusy"
        class="mt-3"
      >
        Current Page: {{ currentPage }}
      </p>
  </div>
  <!-- eslint-enable-->
</template>
<script>
import { ENDPOINTS_FOR_ADMIN } from "@/constants/smoot-api";
export default {
  name: "ListAllCategories",
  data() {
    return {
      filter: null,
      isBusy: false,
      emptyCategoryListMessage: "",
      sortBy: "category",
      sortDesc: false,
      items: [],
      fields: [
        { key: "id", sortable: false },
        { key: "category", sortable: true },
        { key: "sub_1_category", sortable: true },
        { key: "sub_2_category", sortable: true },
        { key: "sub_3_category", sortable: true },
        { key: "actions", label: "", sortable: false },
      ],
      perPage: 10,
      currentPage: 1,
      viewAllCategoriesForm: {
        keyword: "",
        searchIn: "by-category",
      },
      viewAllCategoriesFormLookupValues: {
        searchIn: [
          {
            text: "Category",
            value: "by-category",
          },
          {
            text: "Sub 1 Category",
            value: "by-sub-1-category",
          },
          {
            text: "Sub 2 Category",
            value: "by-sub-2-category",
          },
          {
            text: "Sub 3 Category",
            value: "by-sub-3-category",
          },
        ],
      },
      serverAlerts: {
        error: "",
        showErrorDismissibleAlert: false,
      },
    };
  },
  computed: {
    rows() {
      return this.items.length;
    },
  },
  watch: {
    "serverAlerts.showErrorDismissibleAlert"() {
      if (!this.serverAlerts.showErrorDismissibleAlert) {
        this.serverAlerts.error = "";
      }
    },
  },
  mounted() {
    this.viewAllCategories();
  },
  methods: {
    viewAllCategories() {
      /* eslint-disable */
      this.isBusy = true;
       this.$axios.get(ENDPOINTS_FOR_ADMIN.CATEGORY.VIEW_ALL_CATEGORIES, { progress: false }).then(function(res) {
         this.items = res.data.category_list;
       }.bind(this)).catch(function(err) {
         this.emptyCategoryListMessage = err.response.data.message;
         this.items = [];
       }.bind(this)).then(() => {
         this.isBusy = false;
       });
       /* eslint-enable */
    },
    getSelectedCategoryDetails(rowOpenOrClosed, categoryId) {
      /* eslint-disable */
      this.serverAlerts.showErrorDismissibleAlert = false;
      const isRawOpen = !rowOpenOrClosed;
      const isAlreadyDetailsLoaded = this.items.find(item => item.id === categoryId).category_types.length;
      if (isRawOpen && !isAlreadyDetailsLoaded) {
        /* eslint-disable */
        this.$axios.get(`${ENDPOINTS_FOR_ADMIN.CATEGORY.GET_SELECTED_CATEGORY_DETAILS_FOR_VIEW}?id=${categoryId}`, { progress: false }).then(function(res) {
          this.items.find(item => item.id === categoryId).category_types = res.data.category_types;
          this.items.find(item => item.id === categoryId).category_details.sale_type_fields = res.data.category_details.sale_type_fields;
          this.items.find(item => item.id === categoryId).category_details.rent_type_fields = res.data.category_details.rent_type_fields;
       }.bind(this)).catch(function(err) {
         if (err.response.data.hasOwnProperty("message")){
          this.serverAlerts.error = err.response.data.message;
          this.serverAlerts.showErrorDismissibleAlert = true;
          window.scrollTo({ top: 0, behavior: 'smooth' });
         }
       }.bind(this));
       /* eslint-enable */
      }
    },
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
  },
};
</script>
