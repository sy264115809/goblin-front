<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
  // css
  import 'bootstrap/dist/css/bootstrap.css'
  import 'font-awesome/css/font-awesome.css'
  import 'simple-line-icons/css/simple-line-icons.css'
  import '../assets/metronic/global/css/components-md.css'

  // router
  import Container from './layout/container'
  import Login from './login/login'
  var routes = {
    '/login': {
      name: 'login',
      component: Login
    },
    '/': {
      name: 'index',
      component: Container,
      auth: true
    }
  }

  // 登录验证中间件，页面需要登录而没有登录的情况直接跳转登录
  import auth from '../services/auth'
  var RouterMiddlewares = {
    Auth (transition) {
      if (transition.to.auth) {
        if (!auth.authentication()) {
          Toastr.info('请您先登录！')
          var redirect = encodeURIComponent(transition.to.path)
          transition.redirect('/login?redirect=' + redirect)
        } else {
          auth.relogin()
        }
      }
      transition.next()
    }
  }

  import {Toastr} from '../utils'
  import {router} from '../main'
  var ResourceInterceptors = {
    SetAuthorizationHeader (request, next) {
      if (auth.authentication()) {
        request.headers.set('Authorization', auth.getAuthHeader())
      }
      next()
    },
    Handle401 (request, next) {
      next((response) => {
        if (response.status === 401) {
          auth.expired()
          router.go('login')
        }
      })
    },
    Handle403 (request, next) {
      next((response) => {
        if (response.status === 403) {
          Toastr.warning('您没有权限！')
        }
      })
    },
    Handle500 (request, next) {
      next((response) => {
        if (response.status === 403) {
          Toastr.error('服务器出现了错误，请稍后再试~')
        }
      })
    }
  }

  export default {
    name: 'app',
    routes,
    RouterMiddlewares,
    ResourceInterceptors
  }
</script>
