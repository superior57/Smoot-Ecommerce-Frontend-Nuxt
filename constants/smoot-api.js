const ENDPOINT_PREFIX = {
  SELL: `sell`,
  CATEGORY: `category`,
  CATEGORY_EDIT: `edit`,
  PROFILE: `profile`,
  LOCATION: `location`,
  LOCATION_EDIT: `edit`,
  PRODUCT: `product`
};
export const ENDPOINTS_FOR_ADMIN = {
  CATEGORY: {
    ADD: `/${ENDPOINT_PREFIX.CATEGORY}/add`,
    GET_SUGGESTIONS: `/${ENDPOINT_PREFIX.CATEGORY}/suggestions`,
    GET_SUGGESTIONS_FOR_SUB_1_CATEGORY: `/${ENDPOINT_PREFIX.CATEGORY}/suggestions-of-sub-1-category`,
    GET_SUGGESTIONS_FOR_SUB_2_CATEGORY: `/${ENDPOINT_PREFIX.CATEGORY}/suggestions-of-sub-2-category`,
    GET_SUGGESTIONS_FOR_SUB_3_CATEGORY: `/${ENDPOINT_PREFIX.CATEGORY}/suggestions-of-sub-3-category`,
    VIEW_ALL_CATEGORIES: `/${ENDPOINT_PREFIX.CATEGORY}/view-all-categories`,
    GET_SELECTED_CATEGORY_DETAILS: `/${ENDPOINT_PREFIX.CATEGORY}/${ENDPOINT_PREFIX.CATEGORY_EDIT}/get-selected-category-details`,
    ADD_AND_CODY: `/${ENDPOINT_PREFIX.CATEGORY}/add-and-copy`,
    GET_CATEGORY_TREE_DETAILS: `/${ENDPOINT_PREFIX.CATEGORY}/${ENDPOINT_PREFIX.CATEGORY_EDIT}/get-category-tree-details-by-id`,
    UPDATE: `/${ENDPOINT_PREFIX.CATEGORY}/update`,
    DELETE: `/${ENDPOINT_PREFIX.CATEGORY}/delete`,
    GET_SELECTED_CATEGORY_DETAILS_FOR_VIEW: `/${ENDPOINT_PREFIX.CATEGORY}/get-selected-category-details-for-view`,
  },
  LOCATION: {
    ADD: `/${ENDPOINT_PREFIX.LOCATION}/add`,
    VIEW_ALL_LOCATIONS: `/${ENDPOINT_PREFIX.LOCATION}/view-all-locations`,
    GET_LOCATION_TREE_DETAILS: `/${ENDPOINT_PREFIX.LOCATION}/${ENDPOINT_PREFIX.LOCATION_EDIT}/get-location-tree-by-id`,
    UPDATE: `/${ENDPOINT_PREFIX.LOCATION}/update`,
    DELETE: `/${ENDPOINT_PREFIX.LOCATION}/delete`,
  },
};
export const SIGNUP_ENDPOINTS = {
  GET_VERIFICATION_CODE: `/save-phone-for-sign-up`,
  SIGNUP_USER: `/sign-up-user`,
  CHECK_USERNAME_AVAILABILITY: `/check-username-availability`,
  CHECK_EMAIL_AVAILABILITY: `/check-email-availability`,
};
export const SIGNIN_ENDPOINTS = {
  SIGNIN_USER: `/auth/login`,
};
export const USER_PROFILE_ENDPOINTS = {
  CHANGE_PASSWORD: `/${ENDPOINT_PREFIX.PROFILE}/change-password`,
  CHECK_USERNAME_AVAILABILITY: `/${ENDPOINT_PREFIX.PROFILE}/check-username-availability`,
  CHECK_EMAIL_AVAILABILITY: `/${ENDPOINT_PREFIX.PROFILE}/check-email-availability`,
  PROFILE_UPDATE: `/${ENDPOINT_PREFIX.PROFILE}/update`,
  UPDATE_AVATAR: `/${ENDPOINT_PREFIX.PROFILE}/update-avatar`,
  UPDATE_MOBILE_NUMBER: `/${ENDPOINT_PREFIX.PROFILE}/update-mobile-number`,
  VERIFY_MOBILE_NUMBER: `/${ENDPOINT_PREFIX.PROFILE}/mobile-number-code-verification`,
};
export const LOOK_UP_ENDPONTS = {
  GET_ALL_COUNTRIES: `/get-all-countries`,
  GET_ALL_DISTRICTS: `/get-all-districts`,
  GET_CITIES: `/get-cities`,
  GET_GENDERS: `/get-genders`,
};
export const ENDPOINTS_FOR_SELL = {
  SELL: {
    GET_LOOKUP_CATEGORIES: `/${ENDPOINT_PREFIX.SELL}/get-lookup-categories`,
    GET_CATEGORY_ID_BY_TYPE: `/${ENDPOINT_PREFIX.SELL}/get-category-id-by-type`,
    ADD: `/${ENDPOINT_PREFIX.SELL}/add-product`,
  }
};