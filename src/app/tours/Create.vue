<template>
  <div>
    <div class="row">
      <div class="col-md-12">
        <div class="portlet light bordered">
          <div class="portlet-title">
            <div class="caption font-blue">
              <span class="caption-subject bold uppercase">创建一个新的旅游产品</span>
            </div>
          </div>
          <div class="portlet-body form">
            <form>
              <div class="form-body">
                <div class="row">
                  <div class="col-md-5">
                    <div class="font-dark bold uppercase margin-bottom-15">基本信息</div>

                    <div class="form-group form-md-line-input form-md-floating-label" :class="{'has-error': errors.has('code')}">
                      <input v-validate v-model="form.code" data-rules="required"
                        type="text" :class="['form-control', {'edited': form.code}]" id="code" name="code">
                      <label for="code">产品代号 *</label>
                      <span class="help-block">
                        <i class="fa fa-check" v-show="!errors.has('code') && form.code"></i> 请为您的新产品起一个代号
                      </span>
                    </div>

                    <div class="form-group form-md-line-input form-md-floating-label" :class="{'has-error': errors.has('name')}">
                      <input v-validate v-model="form.name" data-rules="required"
                        type="text" :class="['form-control', {'edited': form.name}]" id="name" name="name">
                      <label for="name">产品名称 *</label>
                      <span class="help-block">
                        <i class="fa fa-check" v-show="!errors.has('name') && form.name"></i> 请为您的新产品起一个名字
                      </span>
                    </div>

                    <div class="form-group form-md-line-input form-md-floating-label" :class="{'has-error': errors.has('description')}">
                      <input v-validate v-model="form.description" data-rules="required|max:20"
                        type="text" :class="['form-control', {'edited': form.description}]" id="description" name="description">
                      <label for="description">简介 *</label>
                      <span class="help-block">
                        <i class="fa fa-check" v-show="!errors.has('description') && form.description"></i> 请简短的描述您的产品(20字内)
                      </span>
                    </div>

                    <div class="form-group form-md-line-input form-md-floating-label">
                      <textarea v-model="form.detail" class="form-control" id="detail" name="detail" rows="3"></textarea>
                      <label for="detail">详细描述</label>
                      <span class="help-block">
                        <i class="fa fa-check" v-show="form.detail"></i> 对产品更详细的描述
                      </span>
                    </div>

                    <div class="form-group form-md-line-input form-md-floating-label">
                      <textarea v-model="form.remark" class="form-control" id="remark" name="remark" rows="3"></textarea>
                      <label for="remark">备注</label>
                      <span class="help-block">
                        <i class="fa fa-check" v-show="form.remark"></i> 对产品的备注(只有管理人员才能看到)
                      </span>
                    </div>

                  </div>

                  <div class="col-md-2">
                    <div class="font-dark bold uppercase margin-bottom-15">时间</div>

                    <div class="form-group form-md-line-input form-md-floating-label" :class="{'has-error': errors.has('duration')}">
                      <input v-validate v-model.number="form.duration" data-rules="required|between:1,30" data-inputmask-duration
                        type="text" min="1" max="30" :class="['form-control', {'edited': form.duration}]" id="duration" name="duration">
                      <label for="duration">全程时间 *</label>
                      <span class="help-block">
                        <i class="fa fa-check" v-show="!errors.has('duration') && form.duration !== ''"></i> 整个旅行所需要的时间
                      </span>
                    </div>

                  </div>

                  <div class="col-md-5">
                    <div class="font-dark bold uppercase margin-bottom-15">费用与佣金</div>

                      <div class="form-group form-md-checkboxes">
                        <div class="md-checkbox">
                          <input v-model="form.rmCheck" type="checkbox" id="sgl-checkbox" class="md-check" value="sgl">
                          <label for="sgl-checkbox">
                            <span class="inc"></span>
                            <span class="check"></span>
                            <span class="box"></span> 提供单人间？ </label>
                        </div>
                      </div>

                      <transition name="fadeRight">
                        <div class="well" v-if="form.rmCheck.includes('sgl')">
                          <div class="row">

                            <div class="col-md-6">
                              <div class="form-group form-md-line-input form-md-floating-label" :class="{'has-error': errors.has('sgl-rm-price')}">
                                <input v-validate v-model.number="form.sglRmPrice" data-rules="required" v-inputmask="priceInputMask()"
                                  type="text" :class="['form-control', {'edited': form.sglRmPrice !== '' }]" id="sgl-rm-price" name="sgl-rm-price">
                                <label for="code">单人间价格 *</label>
                                <span class="help-block">
                                  <i class="fa fa-check" v-show="!errors.has('sgl-rm-price') && form.sglRmPrice"></i> 单人间可供1~2人使用
                                </span>
                              </div>
                            </div>

                            <div class="col-md-6">
                              <div class="form-group form-md-line-input form-md-floating-label" :class="{'has-error': errors.has('sgl-rm-bonus')}">
                                <input v-validate v-model.number="form.sglRmBonus" data-rules="required" data-inputmask-bonus
                                  type="text" :class="['form-control', {'edited': form.sglRmBonus !== '' }]" id="sgl-rm-bonus" name="sgl-rm-bonus">
                                <label for="code">代理商回报率 *</label>
                                <span class="help-block">
                                  <i class="fa fa-check" v-show="!errors.has('sgl-rm-bonus') && form.sglRmBonus"></i>代理商能从被售出的单人间获得的回报
                                </span>
                              </div>
                            </div>
                          </div>
                      </transition>

                      <div class="form-group form-md-checkboxes">
                        <div class="md-checkbox">
                          <input v-model="form.rmCheck" type="checkbox" id="dbl-checkbox" class="md-check" value="dbl">
                          <label for="dbl-checkbox">
                            <span class="inc"></span>
                            <span class="check"></span>
                            <span class="box"></span> 提供双人间？ </label>
                        </div>
                      </div>

                      <transition name="fadeRight">
                        <div class="well" v-if="form.rmCheck.includes('dbl')">
                          <div class="row">

                            <div class="col-md-6">
                              <div class="form-group form-md-line-input form-md-floating-label" :class="{'has-error': errors.has('dbl-rm-price')}">
                                <input v-validate v-model.number="form.dblRmPrice" data-rules="required" data-inputmask-price
                                  type="text" :class="['form-control', {'edited': form.dblRmPrice !== '' }]" id="dbl-rm-price" name="dbl-rm-price">
                                <label for="code">双人间价格 *</label>
                                <span class="help-block">
                                  <i class="fa fa-check" v-show="!errors.has('dbl-rm-price') && form.dblRmPrice"></i> 双人间可供2~4人使用
                                </span>
                              </div>
                            </div>

                            <div class="col-md-6">
                              <div class="form-group form-md-line-input form-md-floating-label" :class="{'has-error': errors.has('dbl-rm-bonus')}">
                                <input v-validate v-model.number="form.dblRmBonus" data-rules="required" data-inputmask-bonus
                                  type="text" :class="['form-control', {'edited': form.dblRmBonus !== '' }]" id="dbl-rm-bonus" name="dbl-rm-bonus">
                                <label for="code">代理商回报率 *</label>
                                <span class="help-block">
                                  <i class="fa fa-check" v-show="!errors.has('dbl-rm-bonus') && form.dblRmBonus"></i>代理商能从被售出的单人间获得的回报
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </transition>
                      fs - {{form.sglRmPrice}},
                      fb - {{form.sglRmBonus}},
                      ds - {{form.dblRmPrice}},
                      ds - {{form.dblRmBonus}},
                  </div>
                </div>
              </div>
              <div class="form-actions right">
                <ladda class="blue" @click="submit">保存</ladda>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Ladda from '../../components/Ladda.vue'
  import $ from 'jquery'
  import 'jquery.inputmask/dist/jquery.inputmask.bundle.js'

  export default {
    name: 'TourCreate',
    data () {
      return {
        form: {
          code: '',
          name: '',
          description: '',
          detail: '',
          comment: '',
          duration: 1,
          rmCheck: [],
          sglRmPrice: 0,
          sglRmBonus: 0,
          dblRmPrice: 0,
          dblRmBonus: 0
        }
      }
    },
    components: {
      Ladda
    },
    methods: {
      submit () {
        this.$validator.validateAll()
      },
      inputmask (selector, options) {
        $(selector).each((i, e) => {
          if (!e.inputmask) {
            $(e).inputmask(options)
          }
        })
      },
      priceInputMask () {
        return {
          alias: 'currency',
          rightAlign: false,
          min: 0,
          showMaskOnHover: false
        }
      }
    },
    watch: {
      'form.rmCheck' (val) {
        this.$nextTick(() => {
          this.inputmask('input[data-inputmask-price]', {
            alias: 'currency',
            rightAlign: false,
            min: 0,
            showMaskOnHover: false,
            onKeyValidation () {
              console.log(this.inputmask.unmaskedvalue())
            }
          })

          this.inputmask('input[data-inputmask-bonus]', {
            alias: 'percentage',
            rightAlign: false,
            showMaskOnHover: false,
            clearMaskOnLostFocus: false
          })
        })
      }
    },
    mounted () {
      this.$nextTick(() => {
        $('input[data-inputmask-duration]').inputmask('numeric', {
          digits: 0,
          rightAlign: false,
          min: 1,
          max: 30,
          suffix: ' 天',
          showMaskOnHover: false
        })
      })
    }
  }
</script>
