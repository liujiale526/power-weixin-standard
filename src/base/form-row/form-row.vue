<template>
  <div class="form-row">
    <div v-if="type === '' || type === 'text'" class="input-row input">
      <label for="input框 text类型" class="label-text">{{ label }}</label>
      <div class="input">
        <input
        type="text"
        class="input-text"
        contenteditable="true"
        v-model="rowValue"
        :readonly="readonly"
        :required="required"
        :disabled="canEdit"
        :placeholder="placeholder">
      </div>
    </div>

    <div v-if="type === 'number'" class="input-row input">
      <label for="input框 number类型" class="label-text">{{ label }}</label>
      <div class="input">
        <input
        type="number"
        class="input-text"
        contenteditable="true"
        v-model="rowValue"
        :readonly="readonly"
        :required="required"
        :disabled="canEdit"
        :placeholder="placeholder">
      </div>
    </div>

    <div v-if="type === 'n2'" class="input-row input">
      <label for="input框 千分位类型" class="label-text">{{ label }}</label>
      <div class="input">
        <input
        type="text"
        class="input-text"
        contenteditable="true"
        v-model="rowValue"
        :readonly="readonly"
        :required="required"
        :disabled="canEdit"
        :placeholder="placeholder">
      </div>
    </div>

    <div v-if="type === 'rate'" class="input-row input">
      <label for="input框 rate" class="label-text">{{ label }}</label>
      <div class="input">
        <input
        type="text"
        class="input-text"
        contenteditable="true"
        v-model="rowValue"
        :readonly="readonly"
        :required="required"
        :disabled="canEdit"
        :placeholder="placeholder">
      </div>
    </div>

    <div v-if="type === 'percent'" class="input-row input">
      <label for="input框 percent类型" class="label-text">{{ label }}</label>
      <div class="input">
        <input
        type="number"
        class="input-text"
        contenteditable="true"
        v-model="rowValue"
        :readonly="readonly"
        :required="required"
        :disabled="canEdit"
        :placeholder="placeholder">
      </div>
    </div>

    <div v-if="type === 'checkBox'" class="input-row input">
      <label for="input框 checkBox类型" class="label-text">{{ label }}</label>
      <div @click="changeCheckBox" class="input">
        <check-icon class="input-text" :checked="rowValue"></check-icon>
      </div>
    </div>

    <div v-if="type.indexOf('yyyy') > -1" class="input-row datePicker">
      <label for="input框 datePicker类型" class="label-text">{{ label }}</label>
      <div class="input">
        <input
        type="text"
        class="input-text"
        contenteditable="true"
        @click="showDatePicker"
        v-model="rowValue"
        :readonly="true"
        :required="required"
        :disabled="canEdit"
        :placeholder="placeholder">
      </div>
    </div>

    <div v-if="type === 'combobox'" class="input-row select">
      <label for="移动端下拉框 select类型" class="label-text">{{ label }}</label>
      <power-select
        class="input"
        v-model="rowValue"
        :comboboxdata="comboboxdata"
        :KeyWord="KeyWord"
        :field="field"
        :title="label"
        :readonly="readonly"
        :required="canEdit"
        :disabled="canEdit"
        @change="change"
      >
      </power-select>
    </div>

    <div v-if="type === 'textarea'" class="textarea-row textarea">
      <label for="移动端多文本框 textarea类型" class="label-text">{{ label }}</label>
      <group class="textarea-content">
        <x-textarea
          name="description"
          contenteditable="true"
          v-model="rowValue"
          :max="200"
          :disabled="canEdit"
          :readonly="readonly"
          :required="required"
          :placeholder="placeholder"
        ></x-textarea>
      </group>
    </div>

    <date-picker v-if="type.indexOf('yyyy') > -1" class="data-picker" ref="updateDataPicker"
      :min="dataPicker.min"
      :max="dataPicker.max"
      :value="dataPicker.value"
      :title="dataPicker.title"
      :format="dataPicker.dateShowFormat"
      @select="selectDatePicker"
    >
    </date-picker>
  </div>
</template>
<script type="text/ecmascript-6">
import { mapGetters } from 'vuex'
import { PowerSelect } from 'components/index.js'
import { DatePicker } from 'cube-ui'
import { formatDate, toThousand, formatNumber } from 'common/js/Util.js'
import { XTextarea, Group } from 'vux'
import CheckIcon from 'base/check-icon/check-icon.vue'

export default {
  props: {
    readonly: {
      type: Boolean,
      default: false
    },
    required: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    value: null,
    KeyWord: {
      type: String,
      default: ''
    },
    field: {
      type: String,
      default: ''
    },
    mainformData: {
      type: Object,
      default () {
        return {}
      }
    },
    label: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: ''
    },
    ToFixed: {
      type: Number,
      default: 2
    },
    placeholder: {
      type: String,
      default: '请输入'
    },
    comboboxdata: {
      type: Object,
      default () {
        return {}
      }
    },
    fieldItem: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  data () {
    return {
      rowValue: '',
      rowType: 'text',
      canEdit: false,
      dataPicker: {
        title: '日期',
        min: new Date(1920, 1, 1),
        max: new Date(2100, 12, 30),
        value: new Date(),
        dateShowFormat: {year: 'YYYY', month: 'MM', date: 'DD'}
      }
    }
  },
  computed: {
    ...mapGetters([
      'formStatus'
    ])
  },
  mounted () {
    this.setData()
  },
  methods: {
    setData () {
      this.$nextTick(() => {
        let value = this.mainformData[this.field]
        this.rowType = this.type
        if (this.readonly || this.disabled || this.formStatus === 'view') {
          this.canEdit = true
        }

        if (this.rowType.indexOf('yyyy') > -1) {
          this.rowType = 'datePicker'
        }

        switch (this.rowType) {
          case 'datePicker':
            this.rowValue = formatDate(value)
            break
          case 'number':
            if (!value || value === '') {
              value = 0
            }
            this.rowValue = parseFloat(value).toFixed(2)
            break
          case 'n2':
            if (!value || value === '') {
              value = 0
            }

            this.rowValue = value = toThousand(value)
            break
          case 'percent':
            if (!value || value === '') {
              value = 0
            }
            this.rowValue = parseFloat(Number(value) * 100).toFixed(2)
            break
          case 'rate':
            if (!value || value === '') {
              value = 0
            }

            value += ''

            let main = value.split('.')[0]
            let tail = value.split('.')[1]

            this.rowValue = `${toThousand(main, true)}.${formatNumber(tail, 8)}`
            break
          case 'checkBox':
            this.rowValue = this.formatCheckBoxDataToView(value)
            break
          default:
            this.rowValue = value
        }
      })
    },
    change (value) {
      this.rowValue = value
    },
    // checkbox数据为了数据展示转换
    formatCheckBoxDataToView (value) {
      let { fieldType } = this.fieldItem

      if (!fieldType) {
        throw new Error('checkBox need set fieldType')
      }

      switch (fieldType) {
        case 'Boolean':
          return value
        case 'Number':
          if (value === 1) {
            return true
          } else {
            return false
          }
        case 'String':
          if (value === '1') {
            return true
          } else {
            return false
          }
        default:
          return false
      }
    },
    // checkbox数据为了数据保存转换
    formatCheckBoxDataToSave (rowValue) {
      let { fieldType } = this.fieldItem

      if (!fieldType) {
        throw new Error('checkBox need set fieldType')
      }

      switch (fieldType) {
        case 'Boolean':
          return rowValue
        case 'Number':
          if (rowValue) {
            return 1
          } else {
            return 0
          }
        case 'String':
          if (rowValue) {
            return '1'
          } else {
            return '0'
          }
        default:
          return ''
      }
    },
    // checkBox的change事件
    changeCheckBox () {
      if (this.readonly === true || this.disabled === true || this.formStatus === 'view') {
        return false
      }

      let checked = this.rowValue

      if (checked) {
        this.rowValue = false
      } else {
        this.rowValue = true
      }
    },
    // 打开日期面板
    showDatePicker () {
      if (this.disabled || this.readonly) {
        return false
      } else {
        this.$refs.updateDataPicker.show()
      }
    },
    // 选中日期面板数据
    selectDatePicker (selectDate) {
      this.rowValue = formatDate(selectDate)
    }
  },
  watch: {
    mainformData (mainformData) {
      this.setData()
    },
    rowValue (newRowValue) {
      if (this.timer) {
        clearTimeout(this.timer)
      }

      this.timer = setTimeout(() => {
        let item = {
          KeyWord: this.KeyWord,
          field: this.field,
          value: newRowValue
        }

        if (this.KeyWord === '') {
          throw Error('your KeyWord is null, set it please')
        }
        if (this.field === '') {
          throw Error('your field is null, set it please')
        }

        switch (this.type) {
          case 'money':
            item.value = newRowValue.replace(',', '')
            break
          case 'percent':
            item.value = parseFloat(newRowValue) / 100
            break
          case 'checkBox':
            item.value = this.formatCheckBoxDataToSave(newRowValue)
            console.log(this.fieldItem, item)
            break
          default:
            item.value = item.value
        }

        this.$emit('enterChange', item)
      }, 500)
    }
  },
  components: {
    PowerSelect,
    XTextarea,
    Group,
    DatePicker,
    CheckIcon
  }
}
</script>
<style lang="less" rel="stylesheet/less">
  @import "~common/styles/mixin.less";

  .form-row {
    .input-row {
      .input-row();
      .label-text {
        .label-text();
      }
      .input {
        .input();
        line-height: 40px;
        .input-text {
          width: 95%;
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
          background-color: #FAFAFA;
          &.cube-select_active::after, &.cube-select::after {
            border: none!important;
          }
          padding-right: 10px;
        }
      }
    }
    .textarea-row {
      padding: 0 10px;
      .label-text {
        display: block;
        padding: 10px 0;
        font-size: 10px;
      }
      .textarea-content {
        .weui-cells{
          margin-top: 0;
          textarea {
            font-size: 10px;
            color: rgba(0, 0, 0, 0.6);
          }
        }
      }
    }
  }
</style>
