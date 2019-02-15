const state = {
  showLoading: false, // 是否显示loading
  projectInfo: {}, // 当前项目
  currentMessage: {}, // 当前的消息或者通知
  formStatus: '', // 表单的状态
  formStatusValue: '', // 当前表单状态的值
  routerParams: {}, // 当前表单的路由参数
  UserInfo: {}, // 用户数据
  InformCount: { // 带处理数据个数 审批，通知，消息
    Message: 0,
    Notify: 0,
    Work: 0
  },
  Alert: { // alert弹出框
    show: false,
    title: '',
    text: ''
  },
  Toast: { // toast显示
    show: false,
    time: 1000,
    text: ''
  },
  tokenErr: false
}

export default state
