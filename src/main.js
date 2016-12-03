import Vue from 'vue'
import InputMaskDirective from './directives/inputmask'

InputMaskDirective(Vue)

// vee validator
import VeeValidate from 'vee-validate'
Vue.use(VeeValidate)

// global components
import ladda from './components/Ladda.vue'
Vue.component('ladda', ladda)

// vue router
import App from './app/App.vue'
import {NewRouter} from './router'
export const router = NewRouter(App.RouterSettings.routes, App.RouterSettings.BeforeEachCallbacks)

// vue resource
import {NewHttp} from './http'
export const http = NewHttp(App.ResourceInterceptors, '/api')

// start app
new Vue({
  template: '<router-view></router-view>',
  router
}).$mount('#app')
