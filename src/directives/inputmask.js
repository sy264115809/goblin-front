import $ from 'jquery'
import 'jquery.inputmask/dist/jquery.inputmask.bundle.js'

export default (Vue) => {
  Vue.directive('inputmask', {
    bind (el, binding, vnode) {
      let options = binding.value
      let fn = options.onKeyValidation
      console.log(options)
      options.onKeyValidation = function (key, result) {
        el.value = this.inputmask.unmaskedvalue()
        if (fn) {
          fn(key, result)
        }
      }
      $(el).inputmask(options)
    }
  })
}
