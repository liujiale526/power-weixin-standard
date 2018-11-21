import Vue from 'vue'
import Router from 'vue-router'

import Login from 'components/Login/Login'
import project from 'components/Project/Project'
import peopleCenter from 'components/peopleCenter/peopleCenter'
import Business from 'components/Business/Business'
import NotFondComponent from 'components/NotFond/NotFond'
import ResetPassword from 'base/reset-password/reset-password.vue'
import WorkInfos from 'components/sub-module/workInfos/workInfos.vue'
import MessageInfos from 'components/sub-module/messageInfos/messageInfos.vue'
import NotifyInfos from 'components/sub-module/notifyInfos/notifyInfos.vue'
import ChangeProject from 'components/sub-module/change-project/change-project.vue'
import setTableStyle from 'base/set-table-style/set-table-style.vue'
import Setting from 'components/sub-module/Setting/Setting.vue'
import UpdateHumanInfo from 'base/update-human-info/update-human-info.vue'
import Redirect from 'components/Redirect/Redirect.vue'
import { winsForms } from 'common/js/winFormLoad.js'

import { redirectRoutes } from 'common/js/Util.js'

Vue.use(Router)
let routes = []

// 基础路由
let routesMap = [
  {
    path: '/redirect',
    name: 'Redirect',
    meta: {
      title: '定向中...'
    },
    component: Redirect
  },
  {
    path: '/login',
    name: 'Login',
    meta: {
      title: '登录'
    },
    component: Login
  },
  {
    path: '/business',
    name: 'business',
    meta: {
      title: '业务中心'
    },
    component: Business,
    children: [
      {
        path: '/changeproject',
        name: 'changeProject',
        meta: {
          title: '选择项目'
        },
        component: ChangeProject
      }
    ]
  },
  {
    path: '/project',
    name: 'project',
    meta: {
      title: '项目门户'
    },
    component: project
  },
  {
    path: '/peopleCenter',
    name: 'peopleCenter',
    meta: {
      title: '我的'
    },
    component: peopleCenter,
    children: [
      {
        path: '/peopleCenter/Setting',
        name: 'Setting',
        meta: {
          title: '设置'
        },
        component: Setting,
        children: [
          {
            path: '/peopleCenter/Setting/updateinfo',
            name: 'UpdateHumanInfo',
            meta: {
              title: '修改信息'
            },
            component: UpdateHumanInfo
          }
        ]
      },
      {
        path: '/peopleCenter/resetpassword',
        name: 'ResetPassword',
        meta: {
          title: '重置密码'
        },
        component: ResetPassword
      },
      {
        path: '/peopleCenter/settablestyle',
        name: 'setTableStyle',
        meta: {
          title: '设置表格主题'
        },
        component: setTableStyle
      }
    ]
  },
  {
    path: '/workinfos',
    name: 'ExamineApprove',
    meta: {
      title: '审批待办'
    },
    component: WorkInfos
  },
  {
    path: '/messageinfos',
    name: 'message',
    meta: {
      title: '消息'
    },
    component: MessageInfos
  },
  {
    path: '/notifyInfos',
    name: 'notify',
    meta: {
      title: '通知'
    },
    component: NotifyInfos
  }
]

let routeNot = [{
  path: '/weixin',
  name: 'weixin',
  meta: {
    title: '首页'
  },
  component: Login
}, {
  path: '*',
  name: 'NotFondComponent',
  meta: {
    title: '404, 页面没有找到'
  },
  component: NotFondComponent
}]
// 窗体和表单的路由
let forms = winsForms()
routesMap = routesMap.concat(forms, routeNot)
routes = redirectRoutes(routesMap)

export default new Router({
  // mode: 'history',
  routes
})
