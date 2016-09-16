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
    ready () {
      setInterval(() => {
        this.idx = this.imgs.length - 1 === this.idx ? 0 : this.idx + 1
      }, 5000)
    }
  }
</script>

<style lang="scss" scoped>
  .user-login-5 {
    .login-bg {
      background-position: center;
      background-size: cover;
      background-repeat: no-repeat;
      min-height: 100vh;
      transition: all .5s ease;
    }
    .login-logo {
      position: absolute;
      top: 2.5em;
      left: 2.5em;
      &.login-6 {
        top: 80px;
        left: 80px;
      }
    }
  }

  // END
  // MOBILE
  @media (max-width: 1365px) {
    .user-login-5 {
      .login-logo {
        &.login-6 {
          top: 40px;
          left: 40px;
        }
      }
    }
  }

  @media (max-width: 1023px) {
    .user-login-5 {
      min-height: 50vh;
      .mt-login-5-bsfix {
        width: 100%;
      }
      .login-bg {
        min-height: 50vh;
        transition: all .5s ease;
      }
      .login-logo {
        &.login-6 {
          position: relative;
          margin: 0 0 40px 0;
        }
      }
    }
  }
</style>
