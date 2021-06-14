export const FILE_PATHS = {
  PRODUCT: `${process.env.MEDIA_OBJECTS_STORAGE_ENDPOINT}/products/dummy`,
  USER_PROFILE_PHOTO: `${process.env.MEDIA_OBJECTS_STORAGE_ENDPOINT}/users/profile-photo`,
  HOME_SLIDER: `${process.env.MEDIA_OBJECTS_STORAGE_ENDPOINT}/home-slider`,
  NAVBAR_CATEGORY: `${process.env.MEDIA_OBJECTS_STORAGE_ENDPOINT}/navbar-categories`,
  MESSAGE_SENT_FILE: {
    PHOTO: `${process.env.MEDIA_OBJECTS_STORAGE_ENDPOINT}/messages/sent-files`,
  },
};
export const FILE_QUERY_PARAMETERS = {
  PRODUCT: {
    IMAGE: `tr=w-400,h-350,c-force`,
    THUMBNAIL: `tr=w-65,h-65,c-force`,
    SIMILAR: `tr=w-198,h-160,q-95,c-force`,
    LATEST_ITEM: `tr=w-198,h-160,q-95,c-force`,
    CATEGORY_ITEM: `tr=w-198,h-160,q-95,c-force`,
    LISTING: `tr=w-131,h-131,q-95,c-force`,
    INBOX: `tr=w-45,h-45,c-force`,
  },
  USER: {
    AVATAR: `tr=w-45,h-45`,
    AVATAR_FOR_REVIEWER: `tr=w-38,h-38`,
    AVATAR_FOR_PRODUCT_VIEW: `tr=w-48,h-48`,
    PROFILE_AVATAR: `tr=w-150,h-150`,
    AVATAR_FOR_INBOX: `tr=w-45,h-45`,
    AVATAR_FOR_NAVBAR_TOP: `tr=w-25,h-25`,
  },
  SLIDER: {
    HOME: `tr=w-1140,h-464,c-force`,
  },
  MESSAGE_SENT_FILE: {
    PHOTO: `tr=w-200,h-250,c-force`,
  },
};
export const BRAND = {
  LOGO: {
    default: `/icon.png`,
    IMG_ALT: `Smoot logo.`,
  },
  MAIN_SEARCH_BAR_PLACEHOLDER: `Search in Smoot...`,
  LISTINGS_SEARCH_BAR_PLACEHOLDER: `Search listings...`,
  NAME: `Smoot`,
};
export const APP_ENV = process.env.NODE_ENV;
export const ROUTES = {
  FOR_COMPONENT_DISABLE: {
    FIXED_HEADER_AND_FOOTER: [
      `/sign-up`,
      `/sign-in`,
      `/forgot-password`,
      `/profile`,
      `/profile/edit`,
      `/sell`,
      `/admin`,
      `/messages/inbox`,
      `/messages/archived`,
    ],
    FOOTER_NAVBAR: [`/sell`, `/admin`, `/messages/inbox`, `/messages/archived`],
    PUBLIC_HEADER: [`/messages/inbox`, `/messages/archived`],
  },
};
export const INBOX = {
  TYPES: [
    {
      text: `Inbox`,
      value: `inbox`,
    },
    {
      text: `Archived`,
      value: `archived`,
    },
  ],
  CHAT_OPTIONS: [
    {
      text: `Archive chat`,
      value: `archive-chat`,
    },
    {
      text: `Block`,
      value: `block`,
    },
    {
      text: `Delete chat`,
      value: `delete-chat`,
    },
    {
      text: `Report`,
      value: `report`,
    },
  ],
};
export const CURRENCY = `Rs`;
export const DICTIONARY = {
  EXCLUDED_WORDS: {
    FOR_FIRST_LETTER_CAPITALIZE: [`iphone`, `imac`, `ipad`, `ipod`, `iwatch`],
  },
};
export const REGEX = {
  /* eslint-disable */
  DYNAMIC_FIELDS: /^[/'"\.a-zA-Z0-9-&,+()\s]+$/,
  BIO: /^[a-zA-Z0-9()\."\/&,\s'-]+$/,
  /* eslint-enable */
};
export const BLOB_PREVIEW_PARAMS = {
  USER: {
    PROFILE_AVATAR: {
      WIDTH: `150px`,
      HEIGHT: `150px`,
    },
  },
};
export const BASE_URL = process.env.BASE_URL;
