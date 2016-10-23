import Vue from 'vue'

// vee validator
import VeeValidate from 'vee-validate'
Vue.use(VeeValidate)

// global components
import ladda from './components/Ladda.vue'
Vue.component('ladda', ladda)

// vue router
import App from './app/App.vue'
import {NewRouter} from './router'
const router = NewRouter(App.routes)
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.breadcrumb)) {
    let breadcrumbs = []
    for (let route of to.matched) {
      if (route.meta.breadcrumb) {
        breadcrumbs.push({
          path: route.path === '' ? '/' : route.path,
          name: route.meta.breadcrumb
        })
      }
    }
    to.meta.breadcrumbs = breadcrumbs
  }
  next()
})
export {router}

// vue resource
import VueResource from 'vue-resource'
Vue.use(VueResource)
var http = Vue.http
http.options.root = '/api'
http.interceptors.push(
  App.ResourceInterceptors.SetAuthorizationHeader,
  App.ResourceInterceptors.Handle401,
  App.ResourceInterceptors.Handle403,
  App.ResourceInterceptors.Handle500
)
export {http}

// start app
new Vue({
  template: '<router-view></router-view>',
  router
}).$mount('#app')
