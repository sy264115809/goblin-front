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
  var routes = {
    '': {
      breadcrumb: 'blank',
      component: Blank
    },
    '/blank': {
      name: 'blank',
      breadcrumb: 'blank',
      component: Blank
    }
  }

  // metronic startup js
  import App from './assets/js/app'
  import Layout from './assets/js/layout'

  export default {
    components: {
      LayoutHeader,
      LayoutSidebar,
      LayoutContent,
      LayoutFooter
    },
    ready () {
      App.init()
      Layout.init()
    },
    routes
  }
</script>
