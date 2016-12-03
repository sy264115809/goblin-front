<template>
  <div>
  <div class="row">
    <div class="col-md-12">
      <div class="portlet light portlet-fit bordered">
        <div class="portlet-title">
          <div class="caption">
            <i class="icon-compass font-dark"></i>
            <span class="caption-subject font-dark bold uppercase">旅游产品管理</span>
          </div>
          <div class="actions">
            <div class="btn-group btn-group-devided" data-toggle="buttons">
              <router-link :to="{name: 'tourCreate'}" class="btn btn-outline btn-circle btn-sm blue">
                <i class="fa fa-plus"></i> 创建 </a>
              </router-link>
            </div>
          </div>
        </div>
        <div class="portlet-body">
          <div class="table-scrollable">
            <table class="table table-bordered table-hover">
              <thead>
                <tr>
                  <th> # </th>
                  <th> 代号 </th>
                  <th> 名字 </th>
                  <th> 描述 </th>
                  <th> 状态 </th>
                  <th> 操作 </th>
                </tr>
              </thead>
              <tbody>
                <template v-for="(tour, i) in tours">
                  <tr>
                    <td>{{i + 1}}</td>
                    <td>{{tour.Code}}</td>
                    <td>{{tour.Name}}</td>
                    <td>{{tour.Description}}</td>
                    <td></td>
                    <td></td>
                  </tr>
                </template>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
  export default {
    name: 'TourList',
    data () {
      return {
        tours: []
      }
    }
  }
</script>
