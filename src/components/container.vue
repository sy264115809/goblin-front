<template>
<div>
  <app-header></app-header>
  <div class="clearfix"> </div>
  <div class="page-container">
    <app-sidebar></app-sidebar>
    <app-content></app-content>
  </div>
  <app-footer></app-footer>
</div>
</template>

<script>
  import appHeader from './layout/header'
  import appSidebar from './layout/sidebar'
  import appContent from './layout/content'
  import appFooter from './layout/footer'

  export default {
    name: 'container',
    data () {
      return {}
    },
    components: {
      'app-header': appHeader,
      'app-sidebar': appSidebar,
      'app-content': appContent,
      'app-footer': appFooter
    }
  }
</script>

<style lang="scss">
  @import "./layout/assets/scss/themes/default.scss";
  @import "./layout/assets/scss/layout.scss";
</style>
