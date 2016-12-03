<template>
<div>
  <div class="row">
    <div class="col-md-12">
      <div class="portlet light portlet-fit bordered">
        <div class="portlet-title">
          <div class="caption">
            <i class="icon-flag font-dark"></i>
            <span class="caption-subject font-dark bold uppercase">集散点信息管理</span>
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
                  <th> 集散点名字 </th>
                  <th> 描述 </th>
                  <th> 状态 </th>
                  <th> 操作 </th>
                </tr>
              </thead>
              <tbody>
                <template v-for="(pickup, i) in pickups">
                  <tr>
                    <td>{{i + 1}}</td>
                    <td>{{pickup.Name}}</td>
                    <td>{{pickup.Description}}</td>
                    <template v-if="pickup.DeletedAt">
                      <td>
                        <span class="label label-sm label-danger"> 已停用 </span>
                      </td>
                      <td>
                        <button type="button" class="btn btn-xs green-meadow" @click="triggerRestore(pickup)"><i class="fa fa-undo"></i> 恢复 </button>
                      </td>
                    </template>
                    <template v-else>
                      <td>
                        <span class="label label-sm label-info"> 使用中 </span>
                      </td>
                      <td>
                        <button type="button" class="btn btn-xs btn-info" @click="triggerEdit(pickup)"><i class="fa fa-edit"></i>编辑</button>
                        <button type="button" class="btn btn-xs red" @click="triggerRemove(pickup)"><i class="fa fa-close"></i> 停用 </button>
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

  <form-modal :show="creation.show" title="创建集散点信息" :error="creation.error"
    @submit="submitCreate" @close="creation.show = false"></form-modal>

  <form-modal :show="edit.show" title="修改集散点信息" :error="edit.error" :pickup="edit.pickup"
    @submit="submitEdit" @close="edit.show = false"></form-modal>

  <modal :show="remove.show" :clickClose="true" title="停用集散点信息" @close="remove.show = false">
    <div slot="body">确认停用集散点信息 <b><u>{{remove.pickup.Name}}</u> <i>({{remove.pickup.Description}})</i> </b> 吗？</div>
    <ladda slot="footer-button" @click="submitRemove">确定</ladda>
  </modal>

  <modal :show="restore.show" :clickClose="true" title="恢复集散点信息" @close="restore.show = false">
    <div slot="body">确认恢复集散点信息 <b><u>{{restore.pickup.Name}}</u> <i>({{restore.pickup.Description}})</i> </b> 吗？</div>
    <ladda slot="footer-button" @click="submitRestore">确定</ladda>
  </modal>
</div>
</template>

<script>
  import Modal from '../../components/Modal.vue'
  import FormModal from './FormModal.vue'

  import {Toastr} from '../../utils'

  import pickupsApi from './services'
  export default {
    name: 'pickups',
    data () {
      return {
        pickups: [],
        creation: {
          show: false,
          error: {
            field: '',
            msg: ''
          }
        },
        edit: {
          pickup: {},
          show: false,
          error: {
            field: '',
            msg: ''
          }
        },
        remove: {
          pickup: {},
          show: false
        },
        restore: {
          pickup: {},
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
      submitCreate (pickup, ladda) {
        ladda.start()
        pickupsApi.create({name: pickup.name, description: pickup.description}).then(id => {
          if (id) {
            this.listpickups()
            Toastr.success('新建集散点信息成功')
            this.creation.show = false
          } else {
            let msg = '集散点名字不能重复！'
            this.creation.error = {name: msg}
            Toastr.error(msg)
          }
        }).then(() => {
          ladda.stop()
        })
      },
      // list pickups
      listpickups () {
        return pickupsApi.list().then(items => {
          this.pickups = items
        })
      },
      // handle edit action
      triggerEdit (pickup) {
        this.edit.pickup = pickup
        this.edit.show = true
      },
      submitEdit (pickup, ladda) {
        ladda.start()
        pickupsApi.update(pickup.id, pickup.name, pickup.description).then(success => {
          if (success) {
            this.listpickups()
            Toastr.success('更新集散点信息成功')
            this.edit.show = false
          } else {
            let msg = '集散点名字不能重复！'
            this.edit.error = {name: [msg]}
            Toastr.error(msg)
          }
        }).then(() => {
          ladda.stop()
        })
      },
      // handle remove action
      triggerRemove (pickup) {
        this.remove = {
          pickup,
          show: true
        }
      },
      submitRemove (ladda) {
        ladda.start()
        pickupsApi.remove(this.remove.pickup.ID).then(success => {
          if (success) {
            this.listpickups()
            Toastr.success(`集散点信息${this.remove.pickup.Name}已停用`, '停用集散点信息成功')
          }
        }).then(() => {
          ladda.stop()
          this.remove.show = false
        })
      },
      // handle restore action
      triggerRestore (pickup) {
        this.restore = {
          pickup,
          show: true
        }
      },
      submitRestore (ladda) {
        ladda.start()
        pickupsApi.restore(this.restore.pickup.ID).then(success => {
          if (success) {
            this.listpickups()
            Toastr.success(`集散点信息${this.restore.pickup.Name}已恢复`, '恢复集散点信息成功')
          }
        }).then(() => {
          ladda.stop()
          this.restore.show = false
        })
      }
    },
    mounted () {
      this.listpickups()
    }
  }
</script>
