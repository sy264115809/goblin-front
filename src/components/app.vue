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
  import store from 'store'
  var RouterMiddlewares = {
    Auth (transition) {
      if (transition.to.auth) {
        if (store.get('accessToken')) {
          transition.next()
        } else {
          Toastr.info('请您先登录！')
          var redirect = encodeURIComponent(transition.to.path)
          transition.redirect('/login?redirect=' + redirect)
        }
      } else {
        transition.next()
      }
    }
  }

  import {Toastr} from '../utils'
  var ResourceInterceptors = {
    SetAuthorizationHeader (request, next) {
      request.headers.set('Authorization', `Bearer ${store.get('accessToken')}`)
      next()
    },
    Handle401 (vueRouter) {
      return (request, next) => {
        next((response) => {
          if (response.status === 401) {
            store.remove('accessToken')
            vueRouter.go('login')
          }
        })
      }
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
