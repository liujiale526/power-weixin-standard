import * as types from './mutation-types.js'
import {
  getUserSession,
  storeUserSession,
  getStoreUserSession
} from 'api/UserSession.js'
import { Login } from 'api/login.js'

import {
  getUserInfo,
  UpdHumanInfo,
  LoginOut,
  MyInformCount,
  AlterNotifyMsg,
  getMenu,
  GridPageLoad,
  GetReport,
  GetComment,
  PostComment,
  GetDocFiles,
  deleteFile,
  GetJsSdk,
  AddImage,
  MyWorkInfos,
  MyMessageInfos,
  MyNotifyInfos,
  FlowAction,
  MenuWidget,
  FormInit,
  FormSave,
  FormLoad,
  FormData,
  APIMessages,
  getEpsProjects,
  SwitchEpsProject,
  getUserSessionData
} from 'api'

// 打开没有配置微信config的页面  需要重置 session
export const GetUserSessionData = function ({commit}, params) {
  return new Promise((resolve, reject) => {
    commit(types.SHOWLOADING, true)
    getUserSessionData(params).then((res) => {
      commit(types.SHOWLOADING, false)
      let result = res.data
      if (result.success) {
        resolve(result)
      } else {
        reject(getError(result.message))
      }
    }).catch((e) => {
      commit(types.SHOWLOADING, false)
      reject(e)
    })
  })
}

// 切换项目相关
// 获取项目和EPS
export const getEpsProjectsData = function ({commit}, obj) {
  return new Promise((resolve, reject) => {
    commit(types.SHOWLOADING, true)
    getEpsProjects(obj).then((res) => {
      commit(types.SHOWLOADING, false)
      if (res.success) {
        resolve(res)
      } else {
        reject(getError(res.message))
      }
    }).catch((e) => {
      commit(types.SHOWLOADING, false)
      reject(e)
    })
  })
}
// 切换项目
export const SwitchEpsProjectData = function ({commit}, ProjectGuid) {
  return new Promise((resolve, reject) => {
    commit(types.SHOWLOADING, true)
    SwitchEpsProject(ProjectGuid).then((res) => {
      commit(types.SHOWLOADING, false)
      if (res.success) {
        resolve(res)
      } else {
        reject(getError(res.message))
      }
    }).catch((e) => {
      commit(types.SHOWLOADING, false)
      reject(e)
    })
  })
}

// 窗体和表单相关
// 在走审批流之前 更新数据信息
export const UpDateFormData = function ({commit}, str) {
  return new Promise((resolve, reject) => {
    commit(types.SHOWLOADING, true)
    APIMessages(str).then((res) => {
      commit(types.SHOWLOADING, false)
      if (res.success) {
        resolve(res)
      } else {
        reject(getError(res.message))
      }
    }).catch((e) => {
      commit(types.SHOWLOADING, false)
      reject(e.message)
    })
  })
}
// 获取表单中所有子表数据
export const FormDataChilds = function ({commit}, params) {
  return new Promise((resolve, reject) => {
    commit(types.SHOWLOADING, true)
    FormData(params).then((res) => {
      commit(types.SHOWLOADING, false)
      if (res.success) {
        resolve(res)
      } else {
        reject(getError(res.message))
      }
    }).catch((e) => {
      commit(types.SHOWLOADING, false)
      reject(e)
    })
  })
}
// 获取表单主表信息
export const FormLoadData = function ({commit}, params) {
  return new Promise((resolve, reject) => {
    commit(types.SHOWLOADING, true)
    FormLoad(params).then((res) => {
      commit(types.SHOWLOADING, false)
      if (res.success) {
        resolve(res)
      } else {
        reject(getError(res.message))
      }
    }).catch((e) => {
      commit(types.SHOWLOADING, false)
      reject(e)
    })
  })
}
// 保存或者删除信息
export const FormSaveData = function ({commit}, params) {
  return new Promise((resolve, reject) => {
    commit(types.SHOWLOADING, true)
    FormSave(params).then((res) => {
      commit(types.SHOWLOADING, false)
      if (res.success) {
        resolve(res)
      } else {
        reject(getError(res.message))
      }
    }).catch((e) => {
      commit(types.SHOWLOADING, false)
      reject(e)
    })
  })
}
// 根据菜单的Id获取菜单的相关配置信息
export const MenuWidgetData = function ({commit}, MenuId) {
  return new Promise((resolve, reject) => {
    commit(types.SHOWLOADING, true)
    MenuWidget(MenuId).then((res) => {
      commit(types.SHOWLOADING, false)
      if (res.success) {
        resolve(res)
      } else {
        reject(getError(res.message))
      }
    }).catch((e) => {
      commit(types.SHOWLOADING, false)
      reject(e)
    })
  })
}
// 获取表单中对应的配置信息
export const FormInitData = function ({commit}, params) {
  return new Promise((resolve, reject) => {
    commit(types.SHOWLOADING, true)
    FormInit(params).then((res) => {
      commit(types.SHOWLOADING, false)
      if (res.success) {
        resolve(res)
      } else {
        reject(getError(res.message))
      }
    }).catch((e) => {
      commit(types.SHOWLOADING, false)
      reject(e)
    })
  })
}

// 审批流相关
export const FlowActionData = function ({commit}, str) {
  return new Promise((resolve, reject) => {
    commit(types.SHOWLOADING, true)
    FlowAction(str).then((res) => {
      commit(types.SHOWLOADING, false)
      if (res.success) {
        resolve(res)
      } else {
        reject(getError(res.message))
      }
    }).catch((e) => {
      commit(types.SHOWLOADING, false)
      reject(e)
    })
  })
}

// 附件相关
// 上传微信图片
export const AddImageData = function ({commit}, params) {
  return new Promise((resolve, reject) => {
    let obj = Object.assign({
      imgServerIds: [],
      KeyValue: '',
      KeyWord: ''
    }, params)

    commit(types.SHOWLOADING, true)
    AddImage(obj).then((res) => {
      commit(types.SHOWLOADING, false)
      if (res.success) {
        resolve(res)
      } else {
        reject(getError(res.message))
      }
    }).catch((e) => {
      commit(types.SHOWLOADING, false)
      reject(e)
    })
  })
}
// 获取微信sdk的配置
export const GetJsSdkData = function ({commit}, url) {
  return new Promise((resolve, reject) => {
    commit(types.SHOWLOADING, true)
    GetJsSdk(url).then((res) => {
      commit(types.SHOWLOADING, false)
      let result = res
      if (result.success) {
        resolve(result)
      } else {
        reject(getError(result.msg))
      }
    }).catch((e) => {
      commit(types.SHOWLOADING, false)
      reject(e)
    })
  })
}
// 删除表单里面的附件
export const deleteFileData = function ({commit}, id) {
  return new Promise((resolve, reject) => {
    commit(types.SHOWLOADING, true)
    deleteFile(id).then((res) => {
      let result = res
      commit(types.SHOWLOADING, false)
      if (result.success) {
        resolve(result)
      } else {
        reject(getError(result.message))
      }
    }).catch((e) => {
      commit(types.SHOWLOADING, false)
      reject(e)
    })
  })
}
// 获取表单对应的附件
export const GetDocFilesData = function ({commit}, params) {
  return new Promise((resolve, reject) => {
    let obj = Object.assign({
      KeyWord: '',
      KeyValue: '',
      index: '0',
      size: '0',
      sort: '',
      select: '',
      swhere: ''
    }, params)

    commit(types.SHOWLOADING, true)
    GetDocFiles(obj).then((res) => {
      commit(types.SHOWLOADING, false)
      if (res.success) {
        resolve(res)
      } else {
        reject(getError(res.message))
      }
    }).catch((e) => {
      commit(types.SHOWLOADING, false)
      reject(e)
    })
  })
}

// 评论相关
// 提交评论数据
export const PostCommentData = function ({commit}, params) {
  return new Promise((resolve, reject) => {
    let obj = Object.assign({
      FormId: '',
      KeyWord: '',
      KeyValue: '',
      CommentText: '',
      AtHumanList: []
    }, params)

    commit(types.SHOWLOADING, true)
    PostComment(JSON.stringify(obj)).then((res) => {
      commit(types.SHOWLOADING, false)
      if (res.success) {
        resolve(res)
      } else {
        reject(getError(res.message))
      }
    }).catch((e) => {
      reject(e)
    })
  })
}
// 获取评论的数据列表
export const GetCommentData = function ({commit}, {KeyWord, KeyValue}) {
  return new Promise((resolve, reject) => {
    commit(types.SHOWLOADING, true)
    GetComment(KeyWord, KeyValue).then((res) => {
      commit(types.SHOWLOADING, false)
      if (res.success) {
        resolve(res)
      } else {
        reject(getError(res.message))
      }
    }).catch((e) => {
      reject(e)
    })
  })
}
// 通用加载数据接口
export const GridPageLoadData = function ({commit}, params) {
  let obj = Object.assign({}, params)

  return new Promise((resolve, reject) => {
    commit(types.SHOWLOADING, true)
    GridPageLoad(obj).then((res) => {
      commit(types.SHOWLOADING, false)
      if (res.success) {
        resolve(res)
      } else {
        reject(getError(res.message))
      }
    }).catch((e) => {
      commit(types.SHOWLOADING, false)
      reject(e)
    })
  })
}

// 报表相关
// 获取表单报表的数据
export const GetReportData = function ({commit}, {FormId, where}) {
  return new Promise((resolve, reject) => {
    commit(types.SHOWLOADING, false)
    GetReport(FormId, where).then((res) => {
      commit(types.SHOWLOADING, false)
      if (res.success) {
        resolve(res)
      } else {
        reject(getError(res.message))
      }
    }).catch((e) => {
      commit(types.SHOWLOADING, false)
      reject(e)
    })
  })
}

// 组件相关
// 显示toast组件
export const ToastShowEvent = function ({commit}, text) {
  let obj = {
    time: 1000,
    text,
    show: true
  }
  commit(types.TOAST, obj)
}
// 显示alert组件
export const AlertShowEvent = function ({commit}, text) {
  let obj = Object.assign({}, {
    show: true,
    title: '提示',
    text
  })

  commit(types.ALERT, obj)
}
// 隐藏alert组件
export const AlertHideEvent = function ({commit}) {
  let obj = Object.assign({}, {
    show: false,
    title: '',
    text: ''
  })

  commit(types.ALERT, obj)
}

// 登录相关
// 开始获取UserSession
export const GetUserSession = function ({commit}) {
  return new Promise((resolve, reject) => {
    commit(types.SHOWLOADING, true)
    getUserSession().then((res) => {
      commit(types.SHOWLOADING, false)
      if (res.success) {
        let value = Object.assign({}, res.data.value)
        storeUserSession(value)
        resolve(value)
      } else {
        reject(getError(res.message))
      }
    }).catch((e) => {
      commit(types.SHOWLOADING, false)
      reject(e)
    })
  })
}
// 开始登录
export const LoginIN = function ({commit}, {Name, PassWord}) {
  return new Promise((resolve, reject) => {
    commit(types.SHOWLOADING, true)
    Login(Name, PassWord).then((res) => {
      commit(types.SHOWLOADING, false)
      if (res.success) {
        resolve(res)
      } else {
        reject(getError(res.message))
      }
    }).catch((e) => {
      commit(types.SHOWLOADING, false)
      reject(e)
    })
  })
}
// 退出登录
export const LoginOUT = function ({commit}) {
  let params = {
    IsWxUnbind: 'true'
  }

  return new Promise((resolve, reject) => {
    commit(types.SHOWLOADING, true)
    LoginOut(params).then((res) => {
      commit(types.SHOWLOADING, false)
      if (res.success) {
        resolve(res)
      } else {
        reject(getError(res.message))
      }
    }).catch((e) => {
      commit(types.SHOWLOADING, false)
      reject(e)
    })
  })
}
// 获取 设置UserInfo
export const setUserInfo = function ({commit}) {
  return new Promise((resolve, reject) => {
    commit(types.SHOWLOADING, true)
    getUserInfo().then((res) => {
      commit(types.SHOWLOADING, false)
      if (res.success) {
        let UserInfo = Object.assign({}, res.data)

        commit(types.USERINFO, UserInfo)
        resolve(res)
      } else {
        commit(types.SHOWLOADING, false)
        reject(getError(res.message))
      }
    }).catch((e) => {
      commit(types.SHOWLOADING, false)
      reject(e)
    })
  })
}
// 更新UserInfo的数据信息
export const UpDatedHumanInfo = function ({commit}, UserInfo) {
  return new Promise((resolve, reject) => {
    commit(types.SHOWLOADING, true)
    UpdHumanInfo(UserInfo).then((res) => {
      commit(types.SHOWLOADING, false)
      if (res.success) {
        resolve(res)
      } else {
        reject(getError(res.message))
      }
    }).catch((e) => {
      commit(types.SHOWLOADING, false)
      reject(e)
    })
  })
}

// 待处理相关
// 获取等待处理的数据个数 个人中心的审批，消息，通知
export const GetInformCount = function ({commit}) {
  let { HumanId } = getStoreUserSession()
  return new Promise((resolve, reject) => {
    commit(types.SHOWLOADING, true)
    MyInformCount(HumanId).then((res) => {
      commit(types.SHOWLOADING, false)
      if (res.success) {
        commit(types.INFORMCOUNT, res.data)
        resolve(res.data)
      } else {
        reject(getError(res.message))
      }
    }).catch((e) => {
      commit(types.SHOWLOADING, false)
      reject(e)
    })
  })
}
// 已读数据处理 主要针对个人中心的 消息和通知
export const HasReadMessage = function ({commit}, item) {
  return new Promise((resolve, reject) => {
    commit(types.SHOWLOADING, true)
    AlterNotifyMsg(item.Id).then((res) => {
      commit(types.SHOWLOADING, false)
      if (res.success) {
        resolve(res)
      } else {
        reject(getError(res.message))
      }
    }).catch((e) => {
      commit(types.SHOWLOADING, false)
      reject(e)
    })
  })
}
// 获取审批的数据接口
export const MyWorkInfosData = function ({commit}, params) {
  return new Promise((resolve, reject) => {
    let obj = Object.assign({
      types: '',
      index: 0,
      size: 8,
      swhere: '1=1',
      humanid: ''
    }, params)
    commit(types.SHOWLOADING, true)
    MyWorkInfos(obj).then((res) => {
      commit(types.SHOWLOADING, false)
      if (res.success) {
        resolve(res)
      } else {
        reject(getError(res.message))
      }
    }).catch((e) => {
      commit(types.SHOWLOADING, false)
      reject(e)
    })
  })
}
// 获取消息的数据接口
export const MyMessageInfosData = function ({commit}, params) {
  return new Promise((resolve, reject) => {
    let obj = Object.assign({
      types: '',
      index: 0,
      size: 8,
      swhere: '1=1',
      humanid: ''
    }, params)

    commit(types.SHOWLOADING, true)
    MyMessageInfos(obj).then((res) => {
      commit(types.SHOWLOADING, false)
      if (res.success) {
        resolve(res)
      } else {
        reject(getError(res.message))
      }
    }).catch((e) => {
      commit(types.SHOWLOADING, false)
      reject(e)
    })
  })
}
// 获取通知的数据接口
export const MyNotifyInfosData = function ({commit}, params) {
  return new Promise((resolve, reject) => {
    let obj = Object.assign({
      types: '',
      index: 0,
      size: 8,
      swhere: '1=1',
      humanid: ''
    }, params)

    commit(types.SHOWLOADING, true)
    MyNotifyInfos(obj).then((res) => {
      commit(types.SHOWLOADING, false)
      if (res.success) {
        resolve(res)
      } else {
        reject(getError(res.message))
      }
    }).catch((e) => {
      commit(types.SHOWLOADING, false)
      reject(e)
    })
  })
}

// 菜单相关
// 获取项目中心菜单数据
export const GetMenu = function ({commit}) {
  return new Promise((resolve, reject) => {
    commit(types.SHOWLOADING, true)
    getMenu().then((res) => {
      commit(types.SHOWLOADING, false)
      if (res.success) {
        resolve(res)
      } else {
        reject(getError(res.message))
      }
    }).catch((e) => {
      commit(types.SHOWLOADING, false)
      reject(e)
    })
  })
}

// 返回一个错误对象
function getError (msg) {
  return {
    message: msg
  }
}
