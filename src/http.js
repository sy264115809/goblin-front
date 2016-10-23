import Vue from 'vue'
import VueResource from 'vue-resource'
Vue.use(VueResource)

export function NewHttp (intercaptors = [], root = '') {
  var http = Vue.http
  http.options.root = root
  intercaptors.forEach((fn) => http.interceptors.push(fn))
  return http
}
