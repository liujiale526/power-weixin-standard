<template>
  <transition name="slide">
    <div ref="mainForm" class="main-form">
      <header class="nav-bar nav-header">
        <nav-list v-if="switches.length > 0" ref="navBarScroll" class="nav-bar-scroll"
          :probe-type="probeType"
          :data="switches"
          :direction="direction"
          :unitWidth="tabUnitWidth"
        >
          <div class="nav-scroll-inner">
            <switches-box @switch="switchItem" :switcheWidth="switcheWidth" :lineHeight="lineHeight" :switches="switches" :currentIndex="currentIndex"></switches-box>
          </div>
        </nav-list>
      </header>
      <div v-if="switches.length > 0" class="form-content">
        <div
            v-for="(tableItem, tableIndex) in switches"
            :key="tableIndex"
            :class="'form-content-item ' +  tableItem.type"
            v-show="_isShow(tableIndex)"
          >
          <div class="main-table-item" for="主表"
            v-if="tableItem.type === 'mainTable'"
            >
            <form class="input-textarea-group">
              <form-row
                v-if="tableItem.tableShowField.length > 0 && KeyWord !== ''"
                v-for="fieldItem in tableItem.tableShowField"
                :key="fieldItem.field"
                :label="fieldItem.title"
                :type="fieldItem.format"
                :readonly="fieldItem.readonly"
                :required="fieldItem.required"
                :disabled="fieldItem.disabled"
                :placeholder="fieldItem.placeholder"
                :field="fieldItem.field"
                :KeyWord="KeyWord"
                :fieldItem="fieldItem"
                :mainformData="mainformData"
                :comboboxdata="formAllConfig.comboboxdata || {}"
                @enterChange="formRowChange"
              ></form-row>
            </form>
            <div class="form-action-wrap"
              v-if="(actionMenu.length > 0) && (formStatusValue !== '40' || formStatusValue !== '50')"
              >
              <form-action
                :actions="actionMenu"
                @selectActionMenu="selectActionMenu"
              ></form-action>
            </div>
          </div>

          <div
              :class="'form-content-item ' + tableItem.type"
              for="子表list"
              v-if="tableItem.type === 'childTable'"
              v-show="_isShow(tableIndex)"
            >
            <common-child-table for="common"
              v-if="tableItem.data &&
              (tableItem.style === 'common' || !tableItem.style)"
              :KeyValue="routerParams.Id"
              :formAllConfig="formAllConfig"
              :comboboxdata="formAllConfig.comboboxdata"
              :chileTableItem="tableItem"
              :tableData="tableItem.data"
              :mainformData="mainformData"
              @saveChildFrom="_FormData()"
            ></common-child-table>

            <tree-grid-child-table
              v-if="tableItem.data &&
              tableItem.style === 'treeGrid'"
              :KeyValue="routerParams.Id"
              :formAllConfig="formAllConfig"
              :openformid="openformid"
              :comboboxdata="formAllConfig.comboboxdata"
              :chileTableItem="tableItem"
              :tableData="tableItem.data"
              :mainformData="mainformData"
              @saveChildFrom="_FormData()"
            ></tree-grid-child-table>

            <tree-grid-child-table-customize
              v-if="tableItem.data &&
              tableItem.style === 'treeGridCustomize'"
              :KeyValue="routerParams.Id"
              :formAllConfig="formAllConfig"
              :openformid="openformid"
              :comboboxdata="formAllConfig.comboboxdata"
              :chileTableItem="tableItem"
              :tableData="tableItem.data"
              :mainformData="mainformData"
              @saveChildFrom="_FormData()"
            ></tree-grid-child-table-customize>
          </div>

          <div
              class="form-content-item file-attach"
              for="附件"
              v-if="tableItem.type === 'fileAttach'"
              v-show="_isShow(tableIndex)"
            >
            <file-attach
              :loadStart="currentIndex === tableIndex"
              :KeyWord="KeyWord"
              :KeyValue="routerParams.Id"
            ></file-attach>
          </div>
          <div
              class="form-content-item"
              for="报表"
              v-if="tableItem.type === 'report'"
              v-show="_isShow(tableIndex)"
            >
              <report
                ref="Report"
                :loadStart="currentIndex === tableIndex"
                :KeyWord="KeyWord"
              ></report>
          </div>
          <div
              class="form-content-item"
              for="评论"
              v-if="tableItem.type === 'comment'"
              v-show="_isShow(tableIndex)"
            >
            <comment
              :loadStart="currentIndex === tableIndex"
              :KeyWord="KeyWord"
            ></comment>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script type="text/ecmascript-6">
import { Base64 } from 'js-base64'
import { mapGetters, mapMutations, mapActions } from 'vuex'
// 引入子表和通用相关组件
import {
  commonChildTable,
  treeGridChildTable,
  treeGridChildTableCustomize,
  FormAction,
  FormRow
} from 'components/index.js'

import { formComponentMixin } from 'common/js/mixin.js'
import {
  formatFormAllConfig,
  formatFromDataToView,
  formatFromDataToSave,
  organizeParams,
  organizeSwitchsData,
  settingActionPermission,
  getTabShowRight
} from 'common/js/Util.js'

import { saveFromDataParams } from 'common/js/form.js'

const DIRICTION_H = 'horizontal'
const debug = process.env.NODE_ENV !== 'production'
const UPDATESUCCESS = '更新数据完毕'

export default {
  name: 'h5Form',
  mixins: [formComponentMixin],
  data () {
    return {
      currentIndex: 0,
      switches: [],
      actionMenu: [],
      tabUnitWidth: 100,
      mainformData: {},
      KeyWord: '',
      openformid: '',
      lineHeight: 1.5,
      direction: DIRICTION_H,
      computedWidth: {
        width: '400px'
      },
      formAllConfig: {},
      keywordright: {},
      workflowdata: {}
    }
  },
  computed: {
    switcheWidth () {
      return this.tabUnitWidth * this.switches.length + 'px'
    },
    ...mapGetters([
      'formStatus',
      'routerParams',
      'formStatusValue'
    ])
  },
  created () {
    const { params } = this.$router.history.current

    this.probeType = 1
    this.setFormStatus(params.formstate)
    this.setRouterParams(params)
  },
  mounted () {
    this.$nextTick(() => {
      if (this.timer) {
        clearTimeout(this.timer)
      }

      this.timer = setTimeout(() => {
        this.mainLoad()
      }, 500)
    })
  },
  methods: {
    // 加载数据
    mainLoad () {
      this._FormInit(() => {
        this._FormMainLoad()
        let { formstate } = this.routerParams
        if (formstate !== 'add') {
          this._FormData()
        }
      })
    },
    // 保存主表
    saveFromData (callback, msg) {
      let { formstate } = this.routerParams
      let params = saveFromDataParams({
        KeyWord: this.KeyWord,
        mainformData: this.mainformData,
        routerParams: this.routerParams,
        formAllConfig: this.formAllConfig
      })

      this.FormSaveData(params).then((response) => {
        if (!msg) {
          this.ToastShowEvent('保存数据完成')
        } else {
          this.ToastShowEvent(msg)
        }
        callback && callback()
        if (formstate === 'add') {
          this.$router.back()
        }
      }).catch((e) => {
        this.AlertShowEvent(e.message)
      })
    },
    // 从获取的配置信息赋予当前表单
    setFormDataFromConfig (formConfigUI) {
      let { formTitle } = formConfigUI

      document.title = formTitle || '表单详情'
      this.switches = organizeSwitchsData(formConfigUI)
      this.tabUnitWidth = 140
    },
    // 获取表单的配置信息
    _FormInit (callback) {
      let { FromId, formstate, Id } = this.routerParams
      let KeyValue = Id

      if (formstate === 'add') { KeyValue = '' }
      if (!FromId) {
        this.$nextTick(() => {
          this.AlertShowEvent('openformid is ' + FromId)
        })
      } else {
        let params = {
          FormId: FromId,
          KeyValue: KeyValue || '',
          FormState: formstate
        }

        this.FormInitData(params).then((response) => {
          let obj = Object.assign({}, response.data)

          this.formAllConfig = formatFormAllConfig(obj)
          this.keywordright = this.formAllConfig.keywordright
          this.workflowdata = this.formAllConfig.workflowdata

          let appconfig = this.formAllConfig.formconfig.appconfig
          if (appconfig) {
            this.KeyWord = appconfig.KeyWord
            this.setFormDataFromConfig(appconfig)
            callback && callback()
          } else {
            if (debug) {
              this.$nextTick(() => {
                this.AlertShowEvent('获取不到App的配置信息')
              })
            } else {
              this.openPCForm(FromId, formstate, Id)
            }
          }
        }).catch((e) => {
          this.AlertShowEvent(e.message)
        })
      }
    },
    // 打开PC端的表单
    openPCForm (FromId, formstate, Id) {
      let baseLink = '/Form/ValidForm/650540a6-af98-4669-b1c3-925691912d79'
      let query = `?FormId=${FromId}&KeyValue=${Id}`
      let link = `${baseLink}/${formstate}/${Id}/${Base64.encode(FromId)}${query}`

      window.open(link, '_self')
    },
    // 判断tab的显示方法
    checkSwitchPermission (formConfigUI, formData, value, subPermission) {
      let switchsPermission = formConfigUI.switchsPermission
      let switchs = formConfigUI.switchs
      let formstate = this.routerParams.formstate

      this.tabUnitWidth = formConfigUI.tabUnitWidth

      switchs = getTabShowRight(switchs, switchsPermission, formData, formstate, value, subPermission)
      this.switches = organizeSwitchsData(switchs, formConfigUI)

      this.timer = setTimeout(() => {
        this.$refs.navBarScroll.refresh()
      }, 200)
    },
    // 加载主表数据
    _FormMainLoad () {
      let { formstate, Id } = this.routerParams
      let KeyValue = Id

      if (formstate === 'add') { KeyValue = '' }
      let params = {
        KeyWord: this.KeyWord,
        KeyValue: KeyValue,
        KeyWordType: 'BO',
        swhere: '',
        select: '',
        formstate: formstate
      }

      this.FormLoadData(params).then((response) => {
        let statusField = this.formAllConfig.formconfig.config.joindata.statusfield
        let value = response.data.value
        let getData = JSON.parse(value)
        let Status = getData[statusField]

        this.setFormStatusValue(Status)
        this.actionMenu = settingActionPermission(this.workflowdata, formstate, Status)
        if (value || value !== '') {
          let mainformData = formatFromDataToView(
            this.formAllConfig.comboboxdata,
            getData,
            this.KeyWord
          )

          this.mainformData = Object.assign({}, mainformData)
        }
      }).catch((e) => {
        this.AlertShowEvent(e.message)
      })
    },
    // 获取表单的所有子表信息
    _FormData () {
      let params = {
        FormId: this.routerParams.FromId,
        KeyValue: this.routerParams.Id,
        extparams: ''
      }

      this.FormDataChilds(params).then((response) => {
        let getData = response.data.value
        let childrenData = [...getData.children]
        childrenData.forEach((item, index) => {
          if (!item.values) {
            item.values = []
          }

          this.switches.forEach((switchItem, switchIndex) => {
            if (switchItem.KeyWord === item.KeyWord) {
              switchItem.data = Object.assign({}, item)
            }
          })
        })
      }).catch((e) => {
        this.AlertShowEvent(e.message)
      })
    },
    // 走流程之前都要更新的数据
    upDateForm (callback, msg) {
      let KeyWord = this.KeyWord
      let formDate = this.routerParams.formstate
      let objItem = formatFromDataToSave(
        this.formAllConfig.comboboxdata,
        this.mainformData,
        KeyWord
      )
      let obj = {
        KeyWord: KeyWord,
        formAllConfig: this.formAllConfig,
        KeyWordType: 'BO',
        data: [objItem],
        formDate: formDate,
        FormId: this.routerParams.FromId
      }

      let params = organizeParams(obj)
      let roleParams = {}

      if (this.workflowdata && formDate === 'view') {
        roleParams.IsWorkFlowHuman = '1'
      } else if (formDate === 'add') {
        roleParams.IsRegHuman = '1'
      }

      let upDateParams = {
        OpenTrans: 'true',
        Update: {
          MessageCode: 'Power.Controls.PMS.SaveWebForm',
          data: {
            formId: params.FormId,
            json: JSON.parse(params.JsonData),
            params: Base64.encode(JSON.stringify(roleParams)),
            FlowOperate: 'Update'
          }
        }
      }

      this.UpDateFormData(JSON.stringify(upDateParams)).then(() => {
        if (!msg) {
          this.ToastShowEvent(UPDATESUCCESS)
        } else {
          this.ToastShowEvent(msg)
        }
        callback && callback()
      }).catch((e) => {
        this.AlertShowEvent(e.message)
      })
    },
    // selectAction中的驱动事件
    selectActionMenu (item) {
      let { formstate, Id, FromId } = this.routerParams

      // 如果点击取消，返回false
      if (!item) {
        return false
      }

      // 执行保存
      if (item.value && item.value === 'SaveForm') {
        this.saveFromData(() => {
          this.mainLoad()
        })
      }

      // 执行送审
      if (item.value && item.value === 'Active') {
        this.upDateForm(() => {
          let query = {
            KeyWord: this.KeyWord,
            KeyValue: Id,
            FormId: FromId,
            flowOperate: 'Active',
            SequeID: this.workflowdata.CanFlowOperate.SequeID,
            FormState: formstate
          }

          this.$router.push({
            path: '/forkflow/active',
            query: query
          })
        }, UPDATESUCCESS)
      }

      // 执行同意
      if (item.value && item.value === 'Send') {
        this.upDateForm(() => {
          let query = {
            KeyWord: this.KeyWord,
            KeyValue: Id,
            FormId: FromId,
            flowOperate: 'Send',
            SequeID: this.workflowdata.CanFlowOperate.SequeID,
            WorkInfoID: this.workflowdata.CanFlowOperate.CanFlowList.ShowMonitor.WorkInfoID,
            FormState: formstate
          }

          this.$router.push({
            path: '/forkflow/agree',
            query: query
          })
        }, UPDATESUCCESS)
      }

      // 执行回收
      if (item.value && item.value === 'GetBack') {
        this.upDateForm(() => {
          let params = Object.assign({}, {
            Current: {
              KeyWord: this.KeyWord,
              KeyValue: Id,
              FormId: FromId,
              SequeID: this.workflowdata.CanFlowOperate.SequeID + '',
              FormState: formstate
            },
            FlowOperate: 'GetBack'
          })

          this.FlowActionData(JSON.stringify(params)).then((response) => {
            this.mainLoad()
          }).catch((e) => {
            this.AlertShowEvent(e.message)
          })
        }, UPDATESUCCESS)
      }

      // 执行查看监控 不需要更新数据
      if (item.value && item.value === 'ShowMonitor') {
        let query = {
          flowOperate: 'ShowMonitor',
          WorkInfoID: this.workflowdata.CanFlowOperate.CanFlowList.ShowMonitor.WorkInfoID
        }

        this.$router.push({
          path: '/forkflow/monitor',
          query: query
        })
      }

      // 执行驳回
      if (item.value && item.value === 'Return') {
        this.upDateForm(() => {
          let query = {
            KeyWord: this.KeyWord,
            KeyValue: Id,
            FormId: FromId,
            SequeID: this.workflowdata.CanFlowOperate.SequeID,
            FormState: formstate
          }

          this.$router.push({
            path: '/forkflow/return',
            query: query
          })
        }, UPDATESUCCESS)
      }

      // 执行委派
      if (item.value && item.value === 'Delegate') {
        this.upDateForm(() => {
          let query = {
            KeyWord: this.KeyWord,
            KeyValue: Id,
            FormId: FromId,
            SequeID: this.workflowdata.CanFlowOperate.SequeID,
            FormState: formstate
          }

          this.$router.push({
            path: '/forkflow/delegate',
            query: query
          })
        }, UPDATESUCCESS)
      }

      // 委派处理
      if (item.value && item.value === 'Delegateing') {
        this.upDateForm(() => {
          let query = {
            KeyWord: this.KeyWord,
            KeyValue: Id,
            FormId: FromId,
            SequeID: this.workflowdata.CanFlowOperate.SequeID,
            FormState: formstate
          }

          this.$router.push({
            path: '/forkflow/delegateing',
            query: query
          })
        }, UPDATESUCCESS)
      }

      // 终止
      if (item.value && item.value === 'Stop') {
        this.upDateForm(() => {
          let query = {
            KeyWord: this.KeyWord,
            KeyValue: this.routerParams.Id,
            FormId: this.routerParams.FromId,
            SequeID: this.workflowdata.CanFlowOperate.SequeID,
            FormState: formstate
          }

          this.$router.push({
            path: '/forkflow/stop',
            query: query
          })
        }, UPDATESUCCESS)
      }

      // 查看历史
      if (item.value && item.value === 'ShowHistoryMonitor') {
        let query = {
          KeyWord: this.KeyWord,
          KeyValue: this.routerParams.Id,
          FormId: this.routerParams.FromId,
          SequeID: this.workflowdata.CanFlowOperate.SequeID,
          FormState: formstate
        }

        this.$router.push({
          path: '/forkflow/history',
          query: query
        })
      }
    },
    // 检测数据修改动态
    formRowChange (item) {
      this.mainformData[item.field] = item.value
    },
    switchItem (index) {
      this.currentIndex = index
    },
    _isShow (index) {
      return this.currentIndex === index
    },
    ...mapMutations({
      setFormStatus: 'SET_FORM_STATUS',
      setRouterParams: 'SET_ROUTER_PARAMS',
      setFormStatusValue: 'FORMSTATUSVALUE'
    }),
    ...mapActions([
      'FormInitData',
      'FormLoadData',
      'FormSaveData',
      'FormDataChilds',
      'FlowActionData',
      'UpDateFormData',
      'AlertShowEvent',
      'ToastShowEvent'
    ])
  },
  destroyed () {
    this.timer && clearTimeout(this.timer)
  },
  components: {
    FormRow,
    FormAction,
    commonChildTable,
    treeGridChildTable,
    treeGridChildTableCustomize
  }
}
</script>
<style lang="less" rel="stylesheet/less">
  @import "~common/styles/mixin.less";

  .main-form {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 100;
    overflow: hidden;
    background-color: #f4f4f4;
    &.slide-enter-active, &.slide-leave-active {
      transition: all 0.3s;
    }
    &.slide-enter, &.slide-leave-to {
      transform: translate3d(100%, 0, 0)
    }
    .nav-bar {
      display: block;
      border-bottom: 1px solid #dddddd;
      &.nav-header {
        height: auto;
      }
      .nav-bar-scroll{
        width: 100%;
        position: relative;
        height: auto;
      }
    }
    .form-content{
      display: block;
      height: -moz-calc(100% - 38px);
      height: -webkit-calc(100% - 38px);
      height: calc(100% - 38px);
      .form-content-item {
        position: relative;
        display: block;
        width: 100%;
        height: 100%;
        &.mainTable {
          .main-table-item {
            position: relative;
            display: flex;
            flex-direction: column;
            width: 100%;
            height: 100%;
            .input-textarea-group {
              position: static;
              flex: 1;
              min-height: 0px;
              overflow-y: auto;
              padding-bottom: 10px;
              -webkit-overflow-scrolling:touch;
            }
            .form-action-wrap{
              flex: 0 0 50px;
              .top-line();
              text-align: center;
              line-height: 50px;
              height: 50px;
              color: #295AA6;
            }
          }
        }
      }
    }
  }
</style>
