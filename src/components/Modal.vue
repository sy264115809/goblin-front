<template>
<transition name="modal">
  <div :class="classObject" :style="styleObject" @click.self="clickMask">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" @click="close"></button>
          <div class="modal-title">
            <slot name="title">
              <h4>{{title}}</h4>
            </slot>
          </div>
        </div>
        <div class="modal-body">
          <slot name="body">
            内容
          </slot>
        </div>
        <div class="modal-footer">
          <button type="button" data-dismiss="modal" class="btn dark btn-outline" @click="close">{{cancleText}}</button>
          <slot name="footer-button">
            <button type="button" class="btn green" @click="$emit('ok')">{{okText}}</button>
          </slot>
        </div>
      </div>
    </div>
  </div>
</transition>
</template>

<script>
  export default {
    name: 'Modal',
    props: {
      show: {
        type: Boolean,
        default: false
      },
      large: {
        type: Boolean,
        default: false
      },
      small: {
        type: Boolean,
        default: false
      },
      title: {
        type: String,
        defalut: '标题'
      },
      cancleText: {
        type: String,
        default: '关闭'
      },
      okText: {
        type: String,
        default: '好'
      },
      escClose: {
        type: Boolean,
        default: false
      },
      clickClose: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      classObject () {
        return {
          modal: true,
          fade: true,
          in: this.show,
          'bs-modal-lg': this.large,
          'bs-modal-sm': this.small
        }
      },
      styleObject () {
        return {
          display: this.show ? 'block' : 'none',
          backgroundColor: this.show ? 'rgba(0,0,0,0.5)' : 'transparent'
        }
      }
    },
    methods: {
      close () {
        this.$emit('close')
      },
      clickMask () {
        if (this.clickClose) {
          this.close()
        }
      }
    },
    mounted () {
      document.addEventListener('keyup', (event) => {
        if (this.escClose && this.show && event.keyCode === 27) { // Close the modal when the escape key is pressed.
          this.close()
        }
      })
    }
  }
</script>

<style scoped>
.modal-enter-active, .modal-leave-active{
  transition: opacity .5s
}
.modal-enter, .modal-leave-active {
  opacity: 0
}
</style>
