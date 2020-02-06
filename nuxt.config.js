// only add `router.base = '/<repository-name>/'` if `DEPLOY_ENV` is `GH_PAGES`
const routerBase = process.env.DEPLOY_ENV === 'GH_PAGES' ? {
  router: {
    base: 'cana-prep-client'
  }
} : {}

export default {
  mode: 'spa',
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#007bff' },
  /*
  ** Global CSS
  */
  css: [
    'bootstrap/dist/css/bootstrap.css',
    'bootstrap-vue/dist/bootstrap-vue.css',
    '~/assets/bootstrap-social.css',
    '~/assets/styles.css',
  ],
  extractCSS: true,
  /*
  ** Plugins to load before mounting the App
  */

env: {
  baseUrl: process.env.HOST || 'http://localhost:3000',
  apiBaseUrl: process.env.API_BASE_URL || 'http://127.0.0.1:3333/api/v1'
},

  plugins: [
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://bootstrap-vue.js.org/docs/
    'bootstrap-vue/nuxt',
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/auth', 
    'nuxt-fontawesome',
  ],

  bootstrapVue: {
    bootstrapCSS: false, // here you can disable automatic bootstrapCSS in case you are loading it yourself using sass
    bootstrapVueCSS: false, // CSS that is specific to bootstrapVue components can also be disabled. That way you won't load css for modules that you don't use
    // componentPlugins: ['Button', 'Alert'], // Here you can specify which components you want to load and use
    // directivePlugins: [] // Here you can specify which directives you want to load and use. Look into official docs to get a list of what's available
  },

  fontawesome: {
    imports: [{
      set: '@fortawesome/free-solid-svg-icons',
      icons: ['fas']
    },
    {
      set: '@fortawesome/free-brands-svg-icons',
      icons: ['fab']
    }]
  },
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
    baseURL: process.env.API_BASE_URL || 'http://localhost:3333/api/v1'
  },
  router: {
    base: '/cana-prep-client/',
    middleware: ['auth'],
    extendRoutes(routes, resolve) {
      routes.push({
        name: 'login',
        path: '/login',
        component: resolve(__dirname, 'pages/auth/login.vue')
      },
      {
        name: 'register',
        path: '/register',
        component: resolve(__dirname, 'pages/auth/register.vue')
      })
    }
    
  },
  auth: {
    // plugins: ['~/plugins/auth.js'],
    cookie: false,
    scopeKey: 'role',
    strategies: {
      local: {
        endpoints: {
          login: { url: 'login', method: 'post', propertyName: 'data.token'},
          user: { url: 'user', method: 'get', propertyName: 'data' },
          logout: false
        }
      },
      facebook: {
        client_id: '',
        userinfo_endpoint: false,
        scope: ['public_profile', 'email'],
        redirect_uri: 'http://localhost:3000/callback'
      },
      google: {
        // client_id: process.env.GOOGLE_APP_ID,
        client_id: process.env.GOOGLE_APP_ID || '<GOOGLE_APP_ID>',
      },
    },
    redirect: {
      "logout": "/cana-prep-client/login", 
      "callback": "/cana-prep-client/auth/callback",
      home: '/login'
      
    },
    maxAge: 86400,
    // watchLoggedIn: true,
    // rewriteRedirects: true
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
    }
  }
}
