<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
  import List from './List.vue'
  import Create from './Create.vue'
  let routes = [
    {
      path: '',
      name: 'tourList',
      component: List
    },
    {
      path: 'create',
      name: 'tourCreate',
      component: Create,
      meta: {
        breadcrumb: '创建'
      }
    },
    {
      path: ':id/edit',
      name: 'tourEdit',
      component: List,
      meta: {
        breadcrumb: '编辑'
      }
    },
    {
      path: ':id',
      name: 'tourDetail',
      component: List,
      meta: {
        breadcrumb: '详情'
      }
    }
  ]

  export default {
    name: 'tours',
    routes
  }
</script>
