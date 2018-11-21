import * as types from './mutation-types.js'

const mutations = {
  // 设置loading
  [types.SHOWLOADING] (state, showLoading) {
    state.showLoading = showLoading
  },

  // 设置项目详情
  [types.SETPROJECTINFO] (state, projectInfo) {
    state.projectInfo = projectInfo
  },
  // 设置当前消息
  [types.SETCURRENTMESSAGE] (state, currentMessage) {
    state.currentMessage = currentMessage
  },

  // 设置当前表单的状态
  [types.SETFORMSTATUS] (state, formStatus) {
    state.formStatus = formStatus
  },
  // 设置当前表单的状态值
  [types.FORMSTATUSVALUE] (state, value) {
    state.formStatusValue = value
  },
  // 设置当前表单的路由
  [types.SETROUTERPARAMS] (state, routerParams) {
    state.routerParams = Object.assign({}, routerParams)
  },

  // 设置UserSession
  [types.USERINFO] (state, UserInfo) {
    state.UserInfo = Object.assign({}, UserInfo)
  },
  // 设置InformCount
  [types.INFORMCOUNT] (state, InformCount) {
    state.InformCount = Object.assign({}, InformCount)
  },
  // 设置alert
  [types.ALERT] (state, Alert) {
    state.Alert = Object.assign({}, Alert)
  },
  // 设置toast
  [types.TOAST] (state, toast) {
    state.Toast = Object.assign({}, toast)
  }
}

export default mutations
