import store from 'store'

import Vue from 'vue'
import Router from 'vue-router'
import VueBreadcrumbs from 'vue-breadcrumbs'
import VueValidator from 'vue-validator'

Vue.use(Router)
Vue.use(VueBreadcrumbs)
Vue.use(VueValidator)

// routing
let router = new Router()

// 登录验证中间件，页面需要登录而没有登录的情况直接跳转登录
router.beforeEach((transition) => {
  if (transition.to.auth) {
    if (store.get('username')) {
      transition.next()
    } else {
      var redirect = encodeURIComponent(transition.to.path)
      transition.redirect('/login?redirect=' + redirect)
    }
  } else {
    transition.next()
  }
})

router.map({
  '/login': {
    name: 'login',
    breadcrumb: 'login',
    component: function (resolve) {
      require(['./components/login/login.vue'], resolve)
    }
  },
  '/': {
    name: 'index',
    component: function (resolve) {
      require(['./components/container.vue'], resolve)
    },
    auth: true,
    subRoutes: {
      '/blank': {
        name: 'blank',
        breadcrumb: 'blank',
        component: function (resolve) {
          require(['./components/pages/blank.vue'], resolve)
        }
      }
    }
  }
})

router.redirect({
  '*': '/',
  '/': '/blank'
})

import App from './components/app'
// var App = Vue.extend({})
router.start(App, '#app')
