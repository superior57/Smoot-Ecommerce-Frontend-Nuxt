export default {
  /*
   ** Nuxt rendering mode
   ** See https://nuxtjs.org/api/configuration-mode
   */
  ssr: true,
  /*
   ** Nuxt target
   ** See https://nuxtjs.org/api/configuration-target
   */
  target: 'server',
  /*
   ** Headers of the page
   ** See https://nuxtjs.org/api/configuration-head
   */
  head: {
    title: process.env.BASE_TITLE || 'Snap to Sell, Chat to Buy for Free',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || '',
      },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },
  /*
   ** Global CSS
   */
  css: [
    '@/assets/css/styles.css',
    '@/assets/css/breakpoints.css',
    '@/assets/css/keyframes.css',
    '@/assets/css/post-grid.css',
    '@/assets/css/font-awesome-base.css',
    '@/assets/css/vue-transitions.css',
  ],
  /*
   ** Plugins to load before mounting the App
   ** https://nuxtjs.org/guide/plugins
   */
  plugins: [
    '@/plugins/helpers.js',
    '@/plugins/filters.js',
    '@/plugins/validation.js',
  ],
  /*
   ** Auto import components
   ** See https://nuxtjs.org/api/configuration-components
   */
  components: true,
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    // '@nuxtjs/eslint-module',
    // Doc: https://github.com/nuxt-community/stylelint-module
    '@nuxtjs/stylelint-module',
    '@nuxtjs/dotenv',
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    'bootstrap-vue/nuxt',
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    '@nuxtjs/auth',
  ],
  /* 
   ** Install the IconsPlugin of Bootstrap Vue
   */
  bootstrapVue: {
    icons: true
  },
  /*
   ** publicRuntimeConfig
   ** See https://nuxtjs.org/guide/runtime-config
   */
  publicRuntimeConfig: {
    /*
      ** Axios module configuration
      ** add axios config in publicRuntimeConfig
      ** See https://axios.nuxtjs.org/options
    */
    axios: {
      // baseURL gets overridden dirctly by env 
      baseURL: process.env.BASE_API_URL,
    }
  },
  /*
   ** Build configuration
   ** See https://nuxtjs.org/api/configuration-build/
   */
  build: {
    transpile: [
      "vee-validate/dist/rules"
    ],
  },
  /*
  ** env variables
  */
  env: {
    NODE_ENV: process.env.NODE_ENV,
    MEDIA_OBJECTS_STORAGE_ENDPOINT: process.env.MEDIA_OBJECTS_STORAGE_ENDPOINT,
    BASE_URL: process.env.BASE_URL,
  },
  /*
  ** auth configurations
  */
  auth: {
    strategies: {
      local: {
        endpoints: {
          login: { url: '/auth/login', method: 'post', propertyName: 'access_token' },
          logout: { url: '/sign-out-user', method: 'post' },
          user: { url: '/auth-user', method: 'post', propertyName: 'user' }
        },
        // tokenRequired: true,
        tokenType: 'bearer',
        // globalToken: true,
        // autoFetchUser: true
      }
    },
    redirect: {
      login: '/sign-in',
      logout: '/sign-in',
      home: '/',
      callback: '/sign-in',
    },
    rewriteRedirects: true,
    fullPathRedirect: true,
  },
  /*
  ** set auth middleware globally
  */
  router : {
    middleware: ['auth'],
  },
}
