<template>
<!-- BEGIN HEADER -->
<div class="page-header navbar navbar-fixed-top">
  <!-- BEGIN HEADER INNER -->
  <div class="page-header-inner ">
    <!-- BEGIN LOGO -->
    <div class="page-logo">
      <a href="index.html">
        <img src="./assets/img/logo.png" alt="logo" class="logo-default">
      </a>
      <div class="menu-toggler sidebar-toggler">
        <!-- DOC: Remove the above "hide" to enable the sidebar toggler button on header -->
      </div>
    </div>
    <!-- END LOGO -->
    <!-- BEGIN RESPONSIVE MENU TOGGLER -->
    <a href="javascript:;" class="menu-toggler responsive-toggler" data-toggle="collapse" data-target=".navbar-collapse"> </a>
    <!-- END RESPONSIVE MENU TOGGLER -->
    <!-- BEGIN PAGE TOP -->
    <div class="page-top">
      <!-- BEGIN TOP NAVIGATION MENU -->
      <div class="top-menu">
        <ul class="nav navbar-nav pull-right">
          <li class="separator hide"> </li>
          <!-- BEGIN USER LOGIN DROPDOWN -->
          <!-- DOC: Apply "dropdown-dark" class after below "dropdown-extended" to change the dropdown styte -->
          <li class="dropdown dropdown-user dropdown-dark">
            <a href="javascript:;" class="dropdown-toggle" data-toggle="dropdown" data-hover="dropdown" data-close-others="true">
              <span class="username username-hide-on-mobile"> Nick </span>
              <!-- DOC: Do not remove below empty space(&nbsp;) as its purposely used -->
              <img alt="" class="img-circle" src="./assets/img/avatar.png" /> </a>
            <ul class="dropdown-menu dropdown-menu-default">
              <li>
                <a href="">
                  <i class="icon-user"></i> My Profile </a>
              </li>
              <li>
                <a href="">
                  <i class="icon-calendar"></i> My Calendar </a>
              </li>
              <li>
                <a href="">
                  <i class="icon-envelope-open"></i> My Inbox
                  <span class="badge badge-danger"> 3 </span>
                </a>
              </li>
              <li>
                <a href="">
                  <i class="icon-rocket"></i> My Tasks
                  <span class="badge badge-success"> 7 </span>
                </a>
              </li>
              <li class="divider"> </li>
              <li>
                <a href="">
                  <i class="icon-lock"></i> Lock Screen </a>
              </li>
              <li>
                <a @click="logout">
                  <i class="icon-key"></i> Log Out </a>
              </li>
            </ul>
          </li>
          <!-- END USER LOGIN DROPDOWN -->
        </ul>
      </div>
      <!-- END TOP NAVIGATION MENU -->
    </div>
    <!-- END PAGE TOP -->
  </div>
  <!-- END HEADER INNER -->
</div>
<!-- END HEADER -->
</template>

<script>
  import auth from '../auth'
  import {Toastr} from '../../utils'
  export default {
    methods: {
      logout () {
        auth.logout()
        Toastr.success('登出成功！')
        this.$router.push({name: 'login'})
      }
    }
  }
</script>
