<template>
  <modal :show="show" :clickClose="true" :title="title" @close="reset">

    <div class="row" slot="body">
      <div class="col-md-12">
        <form>
            <div class="form-group form-md-line-input form-md-floating-label" :class="{'has-error': errors.has('name')}">
              <input v-validate v-model="form.name" data-rules="required"
                type="text" :class="['form-control', {'edited': form.name}]" id="name" name="name">
              <label for="name">集散点名字</label>
              <span class="help-block">
                <i class="fa fa-check" v-show="!errors.has('name')"></i> 请输入一个集散点的名字...
              </span>
            </div>
            <div class="form-group form-md-line-input form-md-floating-label" :class="{'has-error': errors.has('description')}">
              <input v-validate v-model="form.description" data-rules="required"
                type="text" :class="['form-control', {'edited': form.description}]" id="description" name="description">
              <label for="description">描述</label>
              <span class="help-block">
                <i class="fa fa-check" v-show="!errors.has('description')"></i> 对集散点做一些描述...
              </span>
            </div>
        </form>
      </div>
    </div>

    <ladda slot="footer-button" @click="submit">保存</ladda>
  </modal>
</template>

<script>
  import Modal from '../../components/Modal.vue'
  export default {
    components: {
      Modal
    },
    props: {
      pickup: {
        type: Object,
        default () {
          return {
            Name: '',
            Description: ''
          }
        }
      },
      show: {
        type: Boolean,
        default: false
      },
      title: {
        type: String,
        required: true
      },
      error: {
        type: Object
      }
    },
    data () {
      return {
        form: {
          name: '',
          description: ''
        }
      }
    },
    watch: {
      error (val) {
        for (let field in val) {
          if (this.fields[field] !== undefined) {
            let v = val[field]
            if (typeof (v) === 'string') {
              this.errors.add(field, v)
              return
            } else if (v instanceof Array) {
              for (let msg of v) {
                if (typeof (msg) === 'string') {
                  this.errors.add(field, v)
                }
              }
            }
          }
        }
      },
      show (val) {
        // reset status when show
        if (val) {
          this.form.name = this.pickup.Name
          this.form.description = this.pickup.Description
          this.form.id = this.pickup.ID
          this.errors.clear()
        }
      }
    },
    methods: {
      submit (ladda) {
        this.$validator.validateAll()
        if (!this.errors.any()) {
          this.$emit('submit', this.form, ladda)
        }
      },
      reset () {
        this.$emit('close')
      }
    }
  }
</script>
