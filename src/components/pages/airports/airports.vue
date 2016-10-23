<template>
<div>
  <div class="row">
    <div class="col-md-12">
      <div class="portlet light portlet-fit bordered">
        <div class="portlet-title">
          <div class="caption">
            <i class="icon-plane font-dark"></i>
            <span class="caption-subject font-dark bold uppercase">机场信息管理</span>
          </div>
          <div class="actions">
            <div class="btn-group btn-group-devided" data-toggle="buttons">
              <a href="javascript:;" class="btn btn-outline btn-circle btn-sm blue" @click="creation.show = true">
                <i class="fa fa-plus"></i> 创建 </a>
            </div>
          </div>
        </div>
        <div class="portlet-body">
          <div class="table-scrollable">
            <table class="table table-bordered table-hover">
              <thead>
                <tr>
                  <th> # </th>
                  <th> 机场名字 </th>
                  <th> 描述 </th>
                  <th> 状态 </th>
                  <th> 操作 </th>
                </tr>
              </thead>
              <tbody>
                <template v-for="(airport, i) in airports">
                  <tr>
                    <td>{{i + 1}}</td>
                    <td>{{airport.Name}}</td>
                    <td>{{airport.Description}}</td>
                    <template v-if="airport.DeletedAt">
                      <td>
                        <span class="label label-sm label-danger"> 已停用 </span>
                      </td>
                      <td>
                        <button type="button" class="btn btn-xs green-meadow" @click="triggerRestore(airport)"><i class="fa fa-undo"></i> 恢复 </button>
                      </td>
                    </template>
                    <template v-else>
                      <td>
                        <span class="label label-sm label-info"> 使用中 </span>
                      </td>
                      <td>
                        <button type="button" class="btn btn-xs btn-info" @click="triggerEdit(airport)"><i class="fa fa-edit"></i>编辑</button>
                        <button type="button" class="btn btn-xs red" @click="triggerRemove(airport)"><i class="fa fa-close"></i> 停用 </button>
                      </td>
                    </template>
                  </tr>
                </template>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>

  <form-modal :show="creation.show" title="创建机场信息" :error="creation.error"
    @submit="submitCreate" @close="creation.show = false"></form-modal>

  <form-modal :show="edit.show" title="修改机场信息" :error="edit.error" :airport="edit.airport"
    @submit="submitEdit" @close="edit.show = false"></form-modal>

  <modal :show="remove.show" :clickClose="true" title="停用机场信息" @close="remove.show = false">
    <div slot="body">确认停用机场信息 <b><u>{{remove.airport.Name}}</u> <i>({{remove.airport.Description}})</i> </b> 吗？</div>
    <ladda slot="footer-button" @click="submitRemove">确定</ladda>
  </modal>

  <modal :show="restore.show" :clickClose="true" title="恢复机场信息" @close="restore.show = false">
    <div slot="body">确认恢复机场信息 <b><u>{{restore.airport.Name}}</u> <i>({{restore.airport.Description}})</i> </b> 吗？</div>
    <ladda slot="footer-button" @click="submitRestore">确定</ladda>
  </modal>
</div>
</template>

<script>
  import Modal from '../../modal/modal'
  import FormModal from './form-modal'

  import {Toastr} from '../../../utils'

  import {emitTitleChanged} from '../helper'
  import airportsApi from './services'
  export default {
    name: 'Airports',
    data () {
      return {
        airports: [],
        creation: {
          show: false,
          error: {
            field: '',
            msg: ''
          }
        },
        edit: {
          airport: {},
          show: false,
          error: {
            field: '',
            msg: ''
          }
        },
        remove: {
          airport: {},
          show: false
        },
        restore: {
          airport: {},
          show: false
        }
      }
    },
    components: {
      Modal,
      FormModal
    },
    methods: {
      // handle create action
      submitCreate (airport, ladda) {
        ladda.start()
        airportsApi.create({name: airport.name, description: airport.description}).then(id => {
          if (id) {
            this.listAirports()
            Toastr.success('新建机场信息成功')
            this.creation.show = false
          } else {
            let msg = '机场名字不能重复！'
            this.creation.error = {name: msg}
            Toastr.error(msg)
          }
        }).then(() => {
          ladda.stop()
        })
      },
      // list airports
      listAirports () {
        return airportsApi.list().then(items => {
          this.airports = items
        })
      },
      // handle edit action
      triggerEdit (airport) {
        this.edit.airport = airport
        this.edit.show = true
      },
      submitEdit (airport, ladda) {
        ladda.start()
        airportsApi.update(airport.id, airport.name, airport.description).then(success => {
          if (success) {
            this.listAirports()
            Toastr.success('更新机场信息成功')
            this.edit.show = false
          } else {
            let msg = '机场名字不能重复！'
            this.edit.error = {name: [msg]}
            Toastr.error(msg)
          }
        }).then(() => {
          ladda.stop()
        })
      },
      // handle remove action
      triggerRemove (airport) {
        this.remove = {
          airport,
          show: true
        }
      },
      submitRemove (ladda) {
        ladda.start()
        airportsApi.remove(this.remove.airport.ID).then(success => {
          if (success) {
            this.listAirports()
            Toastr.success(`机场信息${this.remove.airport.Name}已停用`, '停用机场信息成功')
          }
        }).then(() => {
          ladda.stop()
          this.remove.show = false
        })
      },
      // handle restore action
      triggerRestore (airport) {
        this.restore = {
          airport,
          show: true
        }
      },
      submitRestore (ladda) {
        ladda.start()
        airportsApi.restore(this.restore.airport.ID).then(success => {
          if (success) {
            this.listAirports()
            Toastr.success(`机场信息${this.restore.airport.Name}已恢复`, '恢复机场信息成功')
          }
        }).then(() => {
          ladda.stop()
          this.restore.show = false
        })
      }
    },
    mounted () {
      this.listAirports()
    },
    beforeRouteEnter: emitTitleChanged('机场信息管理')
  }
</script>
