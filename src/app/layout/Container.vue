<template>
<div class="page-container-bg-solid page-header-fixed page-sidebar-closed-hide-logo page-md">
  <layout-header></layout-header>
  <div class="clearfix"></div>
  <div class="page-container">
    <layout-sidebar></layout-sidebar>
    <layout-content :title="title"></layout-content>
  </div>
  <layout-footer></layout-footer>
</div>
</template>

<script>
  // css
  import '../../assets/metronic/app/css/layout.css'
  import '../../assets/metronic/app/css/themes/default.css'

  // components
  import LayoutHeader from './Header.vue'
  import LayoutSidebar from './Sidebar.vue'
  import LayoutContent from './Content.vue'
  import LayoutFooter from './Footer.vue'

  // router
  let Blank = {
    name: 'Blank',
    template: '<div class="note note-info"><p>这是一个仅供展示的空白页。</p></div>'
  }

  import Airpotrs from '../airports/Airports.vue'
  import Pickups from '../pickups/Pickups.vue'
  import Tours from '../tours/Index.vue'
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
    },
    {
      path: 'airports',
      name: 'airports',
      component: Airpotrs,
      meta: {
        breadcrumb: '机场信息'
      }
    },
    {
      path: 'pickups',
      name: 'pickups',
      component: Pickups,
      meta: {
        breadcrumb: '集散点信息'
      }
    },
    {
      path: 'tours',
      name: 'tours',
      component: Tours,
      meta: {
        breadcrumb: '旅游产品'
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
    data () {
      return {
        title: ''
      }
    },
    created () {
      this.setTitle()
      setInterval(() => auth.relogin(), 10 * 60 * 1000)
    },
    watch: {
      '$route': 'setTitle'
    },
    mounted () {
      this.$nextTick(() => {
        App.init()
        Layout.init()
      })
    },
    methods: {
      setTitle () {
        if (this.$route.meta.breadcrumb) {
          this.title = this.$route.meta.breadcrumb
        }
      }
    },
    routes
  }
</script>
