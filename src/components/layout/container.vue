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
  import appHeader from './header'
  import appSidebar from './sidebar'
  import appContent from './content'
  import appFooter from './footer'

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
  @import "./assets/scss/themes/default.scss";
  @import "./assets/scss/layout.scss";
</style>
