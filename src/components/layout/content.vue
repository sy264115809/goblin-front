<template>
  <div class="page-content-wrapper">
    <!-- BEGIN CONTENT BODY -->
    <div class="page-content" style="min-height:1155px">
      <!-- BEGIN PAGE HEAD-->
      <div class="page-head">
        <!-- BEGIN PAGE TITLE -->
        <div class="page-title">
          <h1>
            {{title}}
          </h1>
        </div>
        <!-- END PAGE TITLE -->
      </div>
      <!-- END PAGE HEAD-->
      <!-- BEGIN PAGE BREADCRUMB -->
      <ul class="page-breadcrumb breadcrumb" v-if="$route.meta.breadcrumbs.length">
        <template v-for="(crumb, i) in $route.meta.breadcrumbs">
          <template v-if="i != $route.meta.breadcrumbs.length - 1">
            <li>
              <router-link :to="crumb.path">{{ crumb.name }}</router-link>
              <i class="fa fa-circle"></i>
            </li>
          </template>
          <template v-else>
            <span class="active">{{ crumb.name }}</span>
          </template>
        </template>
      </ul>
      <!-- END PAGE BREADCRUMB -->
      <!-- BEGIN PAGE BASE CONTENT -->
      <transition name="fade">
        <keep-alive>
          <router-view @title-change="changeTitle"></router-view>
        </keep-alive>
      </transition>
      <!-- END PAGE BASE CONTENT -->
    </div>
    <!-- END CONTENT BODY -->
  </div>
</template>

<script>
  export default{
    data () {
      return {
        title: ''
      }
    },
    methods: {
      changeTitle (title) {
        this.title = title
      }
    }
  }
</script>
