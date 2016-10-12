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
export {router}

// vue resource
import auth from './services/auth'
import VueResource from 'vue-resource'
Vue.use(VueResource)
var http = Vue.http
http.options.root = 'http://localhost:8898/api/v1'
http.headers.common['Authorization'] = auth.getAuthHeader()
http.interceptors.push(
  App.ResourceInterceptors.SetAuthorizationHeader,
  App.ResourceInterceptors.Handle401,
  App.ResourceInterceptors.Handle403,
  App.ResourceInterceptors.Handle500
)
export {http}

// start app
router.start(App, '#app')
