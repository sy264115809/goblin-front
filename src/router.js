import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

function ResolveRoutes (routes) {
  for (let route of routes) {
    // treat route.component.routes as it's sub-routes
    if (route.component && route.component.routes) {
      route.children = route.component.routes
      ResolveRoutes(route.children)
    }
  }
  return routes
}

export function NewRouter (routes, mode = 'history', base = '/', linkActiveClass = 'router-link-active') {
  return new VueRouter({
    mode,
    base,
    linkActiveClass,
    routes: ResolveRoutes(routes)
  })
}
