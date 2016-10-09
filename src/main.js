import Vue from 'vue'

// vue validator
import VueValidator from 'vue-validator'
Vue.use(VueValidator)

// vue router
import App from './components/app'
import {NewRouter} from './router'
var router = NewRouter(App.routes)
router.beforeEach(App.RouterMiddlewares.Auth)
router.redirect({
  '*': '/'
})

// vue resource
import VueResource from 'vue-resource'
Vue.use(VueResource)
Vue.http.options.root = 'http://localhost:8898/api/v1'
Vue.http.interceptors.push(
  App.ResourceInterceptors.SetAuthorizationHeader,
  App.ResourceInterceptors.Handle401(router),
  App.ResourceInterceptors.Handle403,
  App.ResourceInterceptors.Handle500
)

// start app
router.start(App, '#app')
