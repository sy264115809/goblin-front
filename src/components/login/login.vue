<template>
<div class="login user-login-5">
  <div class="row bs-reset">
    <div class="col-md-6 bs-reset mt-login-5-bsfix">
      <login-bg :imgs="imgs"></login-bg>
    </div>
    <div class="col-md-6 login-container bs-reset mt-login-5-bsfix">
      <div class="login-content">
        <h1>Metronic Admin Login</h1>
        <p> Lorem ipsum dolor sit amet, coectetuer adipiscing elit sed diam nonummy et nibh euismod aliquam erat volutpat. Lorem
          ipsum dolor sit amet, coectetuer adipiscing. </p>
        <validator name="loginValidator">
          <form class="login-form" method="post" @submit.prevent="onSubmit" v-show="displayLoginForm" novalidate>
            <div class="alert alert-danger" v-show="displayLoginAlert">
              <a class="close" @click="hideLoginAlert"></a>
              <span>Enter any username and password. </span>
            </div>
            <div class="row">
              <div class="col-xs-6">
                <input class="form-control form-control-solid placeholder-no-fix form-group" type="text" placeholder="Username"
                  name="username" v-validate:username="['required']" required/> </div>
              <div class="col-xs-6">
                <input class="form-control form-control-solid placeholder-no-fix form-group" type="password" placeholder="Password"
                  name="password" v-validate:password="['required']" required/> </div>
            </div>
            <div class="row">
              <div class="col-sm-4">
                <div class="rem-password">
                  <label class="rememberme mt-checkbox mt-checkbox-outline">
                  <input type="checkbox" name="remember" value="1" /> Remember me<span></span>
                  </label>
                </div>
              </div>
              <div class="col-sm-8 text-right">
                <div class="forgot-password">
                  <a id="forget-password" class="forget-password" @click="hideLoginForm">Forgot Password?</a>
                </div>
                <button class="btn green" type="submit">Sign In</button>
              </div>
            </div>
          </form>
        </validator>
        <!-- BEGIN FORGOT PASSWORD FORM -->
        <validator name="forgetValidator">
        <form class="forget-form" method="post" v-show="!displayLoginForm">
          <h3 class="font-green">Forgot Password ?</h3>
          <p> Enter your e-mail address below to reset your password. </p>
          <div class="form-group">
            <input class="form-control placeholder-no-fix form-group" type="text" autocomplete="off" placeholder="Email" name="email"
            /> </div>
          <div class="form-actions">
            <button type="button" id="back-btn" class="btn green btn-outline" @click="showLoginForm">Back</button>
            <button type="submit" class="btn btn-success uppercase pull-right">Submit</button>
          </div>
        </form>
        </validator>
        <!-- END FORGOT PASSWORD FORM -->
      </div>
      <div class="login-footer">
        <div class="row bs-reset">
          <div class="col-xs-12 bs-reset">
            <div class="login-copyright text-right">
              <p>Copyright &copy; Co.Ltd 2015</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
  // import '../../assets/pages/scripts/login-5.js'
  // import '../../assets/global/plugins/jquery-validation/js/jquery.validate.js'
  // import '../../assets/global/plugins/jquery-validation/js/additional-methods.js'

  import bg1 from './assets/img/bg1.jpg'
  import bg2 from './assets/img/bg2.jpg'
  import bg3 from './assets/img/bg3.jpg'
  import bg4 from './assets/img/bg4.jpg'

  import store from 'store'

  import loginBg from './login-bg'

  export default {
    name: 'login',
    components: {
      'login-bg': loginBg
    },
    data () {
      return {
        displayLoginForm: true,
        displayLoginAlert: false,
        imgs: [bg1, bg2, bg3, bg4]
      }
    },
    methods: {
      login () {
        store.set('username', 'xxxxx')
        this.$route.router.go({
          name: 'index'
        })
      },
      showLoginForm () {
        this.displayLoginForm = true
      },
      hideLoginForm () {
        this.displayLoginForm = false
      },
      hideLoginAlert () {
        this.displayLoginAlert = false
      },
      onSubmit () {
        this.displayLoginAlert = this.$loginValidator.invalid
      }
    },
    ready () {

    }
  }

</script>

<style lang="scss" scoped>
  @import '~assets/global/scss/_variables'; // global metronic framework variables
  @import '~assets/global/scss/components/_mixins'; // global metronic framework mixings
  .user-login-5 {
    min-height: 100vh;
    .bs-reset {
      margin: 0;
      padding: 0;
    }
    .text-right {
      text-align: right;
    }
    .login-container {
      position: relative;
      min-height: 100vh;
      >.login-content,
      .login-social,
      .login-copyright {
        padding: 0 80px;
      }
      >.login-content {
        margin-top: 35%;
        >h1 {
          font-size: 30px;
          font-weight: 300;
          color: #4e5a64;
        }
        p {
          color: #a0a9b4;
          font-size: 15px;
          line-height: 22px;
        }
        >.login-form {
          margin-top: 80px;
          color: #a4aab2;
          font-size: 13px;
          .form-control {
            width: 100%;
            padding: 10px 0;
            border: none;
            border-bottom: 1px solid;
            border-color: #a0a9b4;
            color: #868e97;
            font-size: 14px;
            margin-bottom: 30px;
            &:focus {
              outline: 0;
            }
          }
          .forgot-password,
          .login-button {
            display: inline-block;
          }
          .rem-password {
            margin-top: 10px;
            >p {
              margin: 0;
            }
            >.rem-checkbox {
              border-color: #a4aab2;
            }
          }
          .forgot-password {
            margin-right: 1em;
            >a {
              color: #a4aab2;
              &:hover {
                color: #337ab7;
                text-decoration: none;
              }
              &:focus {
                color: #a4aab2;
                text-decoration: none;
              }
            }
          }
        }
      }
      >.login-footer {
        position: absolute;
        bottom: 0;
        width: 100%;
        padding-bottom: 10px;
        .login-social {
          padding-right: 0;
          li {
            display: inline-block;
            list-style: none;
            margin-right: 1em;
          }
          a {
            color: #a9b5be;
            font-size: 18px;
            &:hover {
              color: #337ab7;
              text-decoration: none;
            }
            &:focus {
              color: #a9b5be;
            }
          }
        }
        .login-copyright {
          padding-left: 0;
          margin-top: 6px;
          >p {
            margin: 0;
            font-size: 13px;
            color: #a9b5be;
          }
        }
      }
    }
    // ERROR HANDLER
    .alert {
      margin-top: -60px;
    }
    .form-group {
      &.has-error {
        border-bottom: 2px solid $brand-danger !important;
      }
      &.valid {
        border-bottom: 1px solid #a0a9b4 !important;
      }
    }
  }

  // END
  // MOBILE
  @media (max-width: 1365px) {
    .user-login-5 {
      .login-container {
        >.login-content,
        .login-social,
        .login-copyright {
          padding: 0 40px;
        }
        .login-social {
          padding-right: 0;
        }
        .login-copyright {
          padding-left: 0;
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
      .login-container {
        min-height: 50vh;
        >.login-content {
          margin-top: 60px;
          .login-form {
            margin-top: 40px;
          }
        }
        .rem-password {
          margin-bottom: 1em;
        }
        >.login-footer {
          position: relative;
          margin-top: 40px;
          padding-bottom: 0;
          .login-social {
            li {
              margin-right: 0.5em;
            }
          }
        }
      }
      .alert {
        margin-top: -20px;
      }
    }
  }

  @media (max-width: 640px) {
    .user-login-5 {
      .login-container {
        >.login-content {
          .text-right {
            text-align: left;
          }
        }
      }
    }
  }
</style>
