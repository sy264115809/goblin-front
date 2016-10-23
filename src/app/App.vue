<script>
  // css
  import 'bootstrap/dist/css/bootstrap.css'
  import 'font-awesome/css/font-awesome.css'
  import 'simple-line-icons/css/simple-line-icons.css'
  import '../assets/metronic/global/css/components-md.css'

  // router
  import Container from './layout/Container.vue'
  import Login from './login/Login.vue'

  import auth from './auth'
  const routes = [
    {
      path: 'login',
      name: 'login',
      component: Login,
      beforeEnter (to, from, next) {
        if (auth.authentication()) {
          from.matched.length ? next(false) : next('/')
        } else {
          next()
        }
      }
    },
    {
      path: '',
      name: 'index',
      component: Container,
      meta: {
        requiresAuth: true,
        breadcrumb: '首页'
      }
    },
    {
      path: '*',
      redirect: {name: 'login'}
    }
  ]

  import {Toastr} from '../utils'
  import {router} from '../main'
  const ResourceInterceptors = {
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
          router.replace({name: 'login'})
        }
      })
    },
    Handle403 (request, next) {
      next((response) => {
        if (response.status === 403) {
          Toastr.warning('您没有权限！')
          router.push('/')
        }
      })
    },
    Handle500 (request, next) {
      next((response) => {
        if (response.status === 500) {
          Toastr.error('服务器出现了错误，请稍后再试~')
        }
      })
    }
  }

  const BeforeEachCallbacks = {
    // 登录验证中间件，页面需要登录而没有登录的情况直接跳转登录
    HandleAuth (to, from, next) {
      if (to.matched.some(record => record.meta.requiresAuth)) {
        if (!auth.authentication()) {
          Toastr.info('请您先登录！')
          next({
            name: 'login',
            query: {redirect: to.fullPath}
          })
        } else {
          auth.relogin()
        }
      }
      next()
    },
    // 面包屑处理中间件，为面包屑附带路由信息
    HandleBreadcrumbs (to, from, next) {
      if (to.matched.some(record => record.meta.breadcrumb)) {
        let breadcrumbs = []
        for (let route of to.matched) {
          if (route.meta.breadcrumb) {
            breadcrumbs.push({
              path: route.path === '' ? '/' : route.path,
              name: route.meta.breadcrumb
            })
          }
        }
        to.meta.breadcrumbs = breadcrumbs
      }
      next()
    }
  }

  const RouterSettings = {
    routes,
    BeforeEachCallbacks: [
      BeforeEachCallbacks.HandleAuth,
      BeforeEachCallbacks.HandleBreadcrumbs
    ]
  }

  export default {
    name: 'App',
    RouterSettings,
    ResourceInterceptors: [
      ResourceInterceptors.SetAuthorizationHeader,
      ResourceInterceptors.Handle401,
      ResourceInterceptors.Handle403,
      ResourceInterceptors.Handle500
    ]
  }
</script>
