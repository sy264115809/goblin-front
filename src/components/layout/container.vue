<template>
<div class="page-container-bg-solid page-header-fixed page-sidebar-closed-hide-logo page-md">
  <layout-header></layout-header>
  <div class="clearfix"></div>
  <div class="page-container">
    <layout-sidebar></layout-sidebar>
    <layout-content></layout-content>
  </div>
  <layout-footer></layout-footer>
</div>
</template>

<script>
  // css
  import '../../assets/metronic/app/css/layout.css'
  import '../../assets/metronic/app/css/themes/default.css'

  // components
  import LayoutHeader from './header'
  import LayoutSidebar from './sidebar'
  import LayoutContent from './content'
  import LayoutFooter from './footer'

  // router
  import Blank from '../pages/blank'
  let routes = [
    {
      path: '',
      redirect: {name: 'blank'}
    },
    {
      path: 'blank',
      name: 'blank',
      component: Blank,
      meta: {
        breadcrumb: '空白页'
      }
    }
  ]

  // metronic startup js
  import App from './assets/js/app'
  import Layout from './assets/js/layout'

  import auth from '../auth'
  export default {
    name: 'LayoutContainer',
    components: {
      LayoutHeader,
      LayoutSidebar,
      LayoutContent,
      LayoutFooter
    },
    mounted () {
      this.$nextTick(() => {
        App.init()
        Layout.init()
        setInterval(() => auth.relogin(), 10 * 60 * 1000)
      })
    },
    routes
  }
</script>
