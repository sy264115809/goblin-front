<template>
  <div class="login-bg" :style="loginBgImg">
    <img class="login-logo" src="./assets/img/logo.png"/>
  </div>
</template>

<script>
  export default {
    props: {
      imgs: Array,
      required: true
    },
    data () {
      return {
        idx: 0
      }
    },
    computed: {
      loginBgImg () {
        return this.imgs.length ? {'background-image': `url(${this.imgs[this.idx]})`} : {}
      }
    },
    mounted () {
      setInterval(() => {
        this.idx = this.imgs.length - 1 === this.idx ? 0 : this.idx + 1
      }, 5000)
    }
  }
</script>
