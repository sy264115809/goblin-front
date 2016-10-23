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
        <form class="login-form" method="post" @submit.prevent="onLoginSubmit" v-show="showLoginForm">
          <div class="alert alert-danger" v-show="showLoginAlert">
            <a class="close" @click="showLoginAlert=false"></a>
            <span>Enter any username and password. </span>
          </div>
          <div class="row">
            <div class="col-xs-6">
              <input v-validate  v-model="login.email" data-rules="required|email" data-scope="login-form"
                class="form-control form-control-solid placeholder-no-fix form-group" type="text" placeholder="Username" name="username" required/> </div>
            <div class="col-xs-6">
              <input v-validate v-model="login.password" data-rules="required|min:6" data-scope="login-form"
                class="form-control form-control-solid placeholder-no-fix form-group" type="password" placeholder="Password" name="password" required/> </div>
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
                <a id="forget-password" class="forget-password" @click="showLoginForm=false">Forgot Password?</a>
              </div>
              <button class="btn green" type="submit">Sign In</button>
            </div>
          </div>
        </form>
        <!-- BEGIN FORGOT PASSWORD FORM -->
        <form class="forget-form" method="post" @submit.prevent="onResetSubmit" v-show="!showLoginForm">
          <h3 class="font-green">Forgot Password ?</h3>
          <p> Enter your e-mail address below to reset your password. </p>
          <div class="form-group">
            <input v-validate v-model="forgetPassword.email" data-rules="required|email" data-scope="forget-form"
              class="form-control placeholder-no-fix form-group" type="text" placeholder="Email" name="email" required/> </div>
          <div class="form-actions">
            <button type="button" id="back-btn" class="btn green btn-outline" @click="showLoginForm=true">Back</button>
            <button type="submit" class="btn btn-success uppercase pull-right">Submit</button>
          </div>
        </form>
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
  import './assets/css/login-5.css'

  import bg1 from './assets/img/bg1.jpg'
  import bg2 from './assets/img/bg2.jpg'
  import bg3 from './assets/img/bg3.jpg'
  import bg4 from './assets/img/bg4.jpg'

  import auth from '../auth'
  import {Toastr} from '../../utils'

  import LoginBg from './login-bg'

  export default {
    name: 'Login',
    components: {
      LoginBg
    },
    data () {
      return {
        login: {
          email: '',
          password: ''
        },
        forgetPassword: {
          email: ''
        },
        showLoginForm: true,
        showLoginAlert: false,
        redirectTo: '',
        imgs: [bg1, bg2, bg3, bg4]
      }
    },
    methods: {
      onLoginSubmit () {
        this.$validator.validateAll('login-form')
        if (this.errors.any('login-form')) {
          this.showLoginAlert = true
        } else {
          this.showLoginAlert = false

          auth.login(this.login).then((success) => {
            if (success) {
              Toastr.success('登录成功')
              this.$router.push(this.redirectTo ? this.redirectTo : '/')
            } else {
              Toastr.warning('用户名或密码不正确！')
            }
          })
        }
      },
      onResetSubmit () {
        this.$validator.validateAll('forget-form')
        if (!this.errors.any('forget-form')) {
          auth.forgetPassword(this.forgetPassword).then((success) => {
            if (success) {
              Toastr.success(`已向您的邮箱 ${this.forgetPassword.email} 发送一封邮件，请登录邮箱根据邮件指示重置您的密码。`)
            } else {
              Toastr.warning('您输入的邮箱不存在')
            }
          })
        }
      }
    },
    mounted () {
      // if ?redirect=xxx exists, prompt user the session has been expired
      if (this.$route.query.redirect) {
        this.redirectTo = decodeURIComponent(this.$route.query.redirect)
        Toastr.info('您的会话已过期！')
      }
    }
  }
</script>
