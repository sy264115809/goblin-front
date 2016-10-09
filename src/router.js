import Vue from 'vue'
import VueRouter from 'vue-router'
import VueBreadcrumbs from 'vue-breadcrumbs'

Vue.use(VueRouter)
Vue.use(VueBreadcrumbs)

function ResolveRoutes (routes) {
  for (let path in routes) {
    let route = routes[path]
    if (route) {
      // name component if the route has a name
      if (route.name) {
        route.component.name = route.name
      }
      // treat route.component.routes as it's sub-routes
      if (route.component.routes) {
        route.subRoutes = route.component.routes
        ResolveRoutes(route.subRoutes)
      }
    }
  }
  return routes
}

function H5Router () {
  return new VueRouter({
    hashbang: false,
    history: true
  })
}

function NormalRouter () {
  return new VueRouter()
}

export function NewRouter (routes, h5 = false) {
  var router = h5 ? H5Router() : NormalRouter()
  router.map(ResolveRoutes(routes))
  return router
}
