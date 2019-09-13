import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'

const _7aa787c8 = () => interopDefault(import('../pages/wpusers.vue' /* webpackChunkName: "pages/wpusers" */))
const _b3e76eae = () => interopDefault(import('../pages/wpusers copy.vue' /* webpackChunkName: "pages/wpusers copy" */))
const _f59b484e = () => interopDefault(import('../pages/auth/callback.vue' /* webpackChunkName: "pages/auth/callback" */))
const _2b1ea385 = () => interopDefault(import('../pages/auth/login.vue' /* webpackChunkName: "pages/auth/login" */))
const _be6fe992 = () => interopDefault(import('../pages/auth/register.vue' /* webpackChunkName: "pages/auth/register" */))
const _20f0d5df = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

Vue.use(Router)

if (process.client) {
  if ('scrollRestoration' in window.history) {
    window.history.scrollRestoration = 'manual'

    // reset scrollRestoration to auto when leaving page, allowing page reload
    // and back-navigation from other pages to use the browser to restore the
    // scrolling position.
    window.addEventListener('beforeunload', () => {
      window.history.scrollRestoration = 'auto'
    })

    // Setting scrollRestoration to manual again when returning to this page.
    window.addEventListener('load', () => {
      window.history.scrollRestoration = 'manual'
    })
  }
}
const scrollBehavior = function (to, from, savedPosition) {
  // if the returned position is falsy or an empty object,
  // will retain current scroll position.
  let position = false

  // if no children detected and scrollToTop is not explicitly disabled
  if (
    to.matched.length < 2 &&
    to.matched.every(r => r.components.default.options.scrollToTop !== false)
  ) {
    // scroll to the top of the page
    position = { x: 0, y: 0 }
  } else if (to.matched.some(r => r.components.default.options.scrollToTop)) {
    // if one of the children has scrollToTop option set to true
    position = { x: 0, y: 0 }
  }

  // savedPosition is only available for popstate navigations (back button)
  if (savedPosition) {
    position = savedPosition
  }

  return new Promise((resolve) => {
    // wait for the out transition to complete (if necessary)
    window.$nuxt.$once('triggerScroll', () => {
      // coords will be used if no selector is provided,
      // or if the selector didn't match any element.
      if (to.hash) {
        let hash = to.hash
        // CSS.escape() is not supported with IE and Edge.
        if (typeof window.CSS !== 'undefined' && typeof window.CSS.escape !== 'undefined') {
          hash = '#' + window.CSS.escape(hash.substr(1))
        }
        try {
          if (document.querySelector(hash)) {
            // scroll to anchor by returning the selector
            position = { selector: hash }
          }
        } catch (e) {
          console.warn('Failed to save scroll position. Please add CSS.escape() polyfill (https://github.com/mathiasbynens/CSS.escape).')
        }
      }
      resolve(position)
    })
  })
}

export function createRouter() {
  return new Router({
    mode: 'history',
    base: decodeURI('/'),
    linkActiveClass: 'nuxt-link-active',
    linkExactActiveClass: 'nuxt-link-exact-active',
    scrollBehavior,

    routes: [{
      path: "/wpusers",
      component: _7aa787c8,
      name: "wpusers"
    }, {
      path: "/wpusers copy",
      component: _b3e76eae,
      name: "wpusers copy"
    }, {
      path: "/auth/callback",
      component: _f59b484e,
      name: "auth-callback"
    }, {
      path: "/auth/login",
      component: _2b1ea385,
      name: "auth-login"
    }, {
      path: "/auth/register",
      component: _be6fe992,
      name: "auth-register"
    }, {
      path: "/",
      component: _20f0d5df,
      name: "index"
    }, {
      path: "/login",
      component: _2b1ea385,
      name: "login"
    }, {
      path: "/register",
      component: _be6fe992,
      name: "register"
    }],

    fallback: false
  })
}