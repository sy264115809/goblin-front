<template>
  <button type="button" @click.stop="onClick" :id="id" class="btn ladda-button" :class="buttonClass" :data-style="style">
    <span class="ladda-label"><slot></slot></span>
    <span class="ladda-spinner"></span>
  </button>
</template>

<script>
  import 'ladda/dist/ladda-themeless.min.css'
  import 'spin.js'
  import Ladda from 'ladda'

  export default {
    props: {
      id: {
        default: 'lbtn' + Math.random().toString(36).substring(16)
      },
      autostart: {
        default: false
      },
      style: {
        default: 'expand-right'
      },
      buttonClass: {
        default: 'btn-success '
      }
    },
    mounted () {
      this.$nextTick(() => {
        this.ladda = Ladda.create(document.getElementById(this.id))
      })
    },
    methods: {
      onClick () {
        if (this.autostart) {
          this.ladda.start()
        }
        this.$emit('click', this.ladda)
      }
    }
  }
</script>
