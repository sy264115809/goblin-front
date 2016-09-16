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
      <ul class="page-breadcrumb breadcrumb" v-if="$breadcrumbs.length">
        <template v-for="(i, crumb) in $breadcrumbs">
          <template v-if="i != $breadcrumbs.length - 1">
            <li>
              <a v-link="crumb.handler.path">{{ crumb.handler.breadcrumb }}</a>
              <i class="fa fa-circle"></i>
            </li>
          </template>
          <template v-else>
            <span class="active">{{ crumb.handler.breadcrumb }}</span>
          </template>
        </template>
      </ul>
      <!-- END PAGE BREADCRUMB -->
      <!-- BEGIN PAGE BASE CONTENT -->
      <router-view
      @titl-change="changeTitle"
      keep-alive
      transition
      transition-mode="out-in">
      </router-view>
      <!-- END PAGE BASE CONTENT -->
    </div>
    <!-- END CONTENT BODY -->
  </div>
</template>

<script>
  export default{
    name: 'Content',
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
