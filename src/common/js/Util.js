import storage from 'good-storage'
import {
  systemConfig,
  localStorageTag,
  formActionMenuPre,
  ECanFlowOperate
} from 'common/js/config.js'
import { getTokenString, getTokenMsg } from 'api/login.js'
import { uploadFile } from 'api'

// 判断运行环境 是在开发中还是在生产环境中
const debug = process.env.NODE_ENV !== 'production'

const switchsTail = {
  fileAttach: {
    name: '附件',
    type: 'fileAttach'
  },
  report: {
    name: '报表',
    type: 'report'
  },
  comment: {
    name: '评论',
    type: 'comment'
  }
}

// 组装switchs 的数据
export function organizeSwitchsData (config) {
  let arr = []
  let configUI = Object.assign({}, config)
  let children = configUI.children || []

  let mainConfig = {
    KeyWord: configUI.KeyWord,
    name: configUI.name,
    style: 'none',
    type: 'mainTable',
    idfield: configUI.idfield,
    tableShowField: configUI.controls ? [...configUI.controls] : []
  }
  arr.push(mainConfig)

  children.forEach((item) => {
    let obj = {
      KeyWord: item.KeyWord,
      name: item.name,
      style: 'common',
      type: 'childTable',
      tableListType: item.tableListType,
      tableShowField: [...item.tableShowField],
      idfield: item.idfield,
      textNameOption: {
        title: item.title,
        left: item.left,
        center: item.center,
        right: item.right
      },
      data: {}
    }

    arr.push(obj)
  })

  // 附件
  if (configUI.fileAttach) {
    arr.push(switchsTail.fileAttach)
  }

  // 报表
  if (configUI.report) {
    arr.push(switchsTail.report)
  }

  // 评论
  if (configUI.comment) {
    arr.push(switchsTail.comment)
  }

  return arr
}

// 存储微信js-sdk的config
export function storeJSSDKConfig (value) {
  if (value) {
    storage.set(localStorageTag + 'JSSDK-config', value)
  }
}

// 获取微信js-sdk的config
export function getJSSDKConfig () {
  let config = storage.get(localStorageTag + 'JSSDK-config')

  return config
}

// create GUID
export function createGuid () {
  const s4 = function () {
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1)
  }

  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4()
}

// 判断表单是不是已经提交
export function WorkflowApproved (workflowdata, status) {
  // 1.针对的是业务不需要走流程业务的情况
  if (!workflowdata || workflowdata === '') {
    return false
  }

  // 2.流程结束 FlowRecordStatus.Finish 50 = 办结
  if (workflowdata.RecordStatus && (workflowdata.RecordStatus + '') === '50') {
    return true
  }

  // 3.状态=50,可能是手工批准的
  if (status && (status + '') === '50') {
    return true
  }

  return false
}

// 根据当前表单的流程信息，判断表单的操作按钮权限
export function settingActionPermission (workflowdata, formstate, status) {
  let btns = formActionMenuPre
  let result = []
  let isEdit = false
  let approved = WorkflowApproved(workflowdata, status)
  let sameMan = workflowdata.RecordRegHumId === workflowdata.UserID

  if (
    formstate === 'edit' ||
    formstate === 'add') {
    isEdit = true
  }

  for (let i = 0; i < btns.length; i++) {
    let btn = btns[i]

    if (btn.value === 'SaveForm') {
      if (isEdit && !approved && sameMan) {
        result.push(btn)
      }
    } else {
      if (workflowdata instanceof Object) {
        let isHasRight = 0
        let currentResult = workflowdata.CanFlowOperate
        if (currentResult && currentResult.CanFlowOperate) {
          let canFlowOperate = currentResult.CanFlowOperate
          isHasRight = (canFlowOperate & ECanFlowOperate[btn.value]) > 0
        }

        if (isHasRight && btn.enable) {
          result.push(btn)
        }
      } else if (!workflowdata || workflowdata === '') {
        break
      }
    }
  }

  result = result.sort((a, b) => {
    return a.index - b.index
  })

  return result
}

// 识别子表是不是新增的
export function checkChildTableIsAdded (foreignfield, currentItem) {
  let isAddedItem = false

  for (let key in foreignfield) {
    if (!currentItem[key]) {
      isAddedItem = true
    }
  }

  return isAddedItem
}
// 子表新增的时候set对应的关系值
export function setChildTableData (foreignfield, currentItem, mainformData, success) {
  let obj = Object.assign({}, currentItem)
  for (let key in foreignfield) {
    let itemData = foreignfield[key]
    obj[key] = success ? mainformData[itemData] : null
  }
  return obj
}

// 获取tableType
export function getTableType (configType) {
  let tableType = storage.get(localStorageTag + 'tableStyle')
  let type = 'default'

  if (!configType && !tableType) {
    type = 'default'
  }
  if ((!configType && tableType) || (configType && tableType)) {
    type = tableType
  }

  if (configType && !tableType) {
    type = configType
  }

  return type
}

// transformStatus 处理formList组件的tag数据 主要针对Status
export function transformStatus (value, comboboxdata, keyWord, field, position) {
  let itemConfigData = Object.assign({}, comboboxdata[keyWord + '.' + field])
  let Data = itemConfigData.Data
  let textField = itemConfigData.TextField
  let valueField = itemConfigData.ValueField

  let color = 'power-project-menu-bg7'
  let result = ''

  switch (value) {
    case '0':
      color = 'power-project-menu-bg7'
      break
    case '20':
      color = 'power-project-menu-bg1'
      break
    case '30':
      color = 'power-project-menu-bg5'
      break
    case '35':
      color = 'power-project-menu-bg5'
      break
    case '40':
      color = 'power-project-menu-bg9'
      break
    case '50':
      color = 'power-project-menu-bg0'
      break
    default:
      color = 'power-project-menu-bg7'
  }

  for (let i = 0; i < Data.length; i++) {
    let item = Data[i]
    if (item[valueField] === value) {
      result = item[textField]
      break
    }
  }
  if (position !== 'tag') {
    return result
  } else {
    return {
      value: result,
      color: color
    }
  }
}

// 数据转换
export function dataConversion (value, type, comboboxdata, KeyWord, field, position) {
  let result = value + ''
  if (value === null || value === undefined) {
    return ''
  }

  switch (type) {
    case 'number':
      return Number(value).toFixed(2)
    case 'percent':
      return (Number(result) * 100).toFixed(2) + '%'
    case 'money':
      return toThousand(result)
    case 'yyyy-MM-dd':
      return formatDate(result, 'yyyy-MM-dd')
    case 'combobox':
      return transformStatus(value, comboboxdata, KeyWord, field, position)
    case 'rate':
      let main = value.split('.')[0]
      let tail = value.split('.')[1]

      return `${main}.${formatNumber(tail, 8)}`
    default:
      return result
  }
}

export function formatNumber (str, n) {
  if (str === null || str === undefined) {
    str = ''
  }

  let arr = str.split('') // 字符串拆分数组
  let reArr = [] // 预留数组， 用来返回最终数据
  let i = 0

  // 空值处理
  if (n === null || n === undefined) {
    n = 4
  }

  // 主体部分 处理数据
  while (i < n) {
    reArr[i] = (arr[i] === null || arr[i] === undefined) ? '0' : arr[i]
    i++
  }

  // 四舍五入处理
  if (arr.length > n && arr[n] > 4) {
    reArr[reArr.length - 1] = parseInt(reArr[reArr.length - 1]) + 1
  }

  return reArr.join('')
}

// 退出的时候清空缓存
export function clearStorage () {
  storage.clear()
}

// 登录成功之后路由重定向
export function redirectRoutes (Map) {
  let Token = getTokenString()
  let TokenMsg = getTokenMsg()
  let routes = []
  let obj = {}
  let keepLogin = checkLoginTime(TokenMsg)

  if (Token && keepLogin) {
    obj = Object.assign({}, {
      path: '/',
      redirect: '/business'
    })
    routes.push(obj)
  }

  routes = routes.concat(Map)
  return routes
}

// 设置菜单的字体和背景
export function setFontColor (data) {
  let fontMap = systemConfig.fontMap
  data.forEach((item, index) => {
    let reIndex = index % fontMap.length
    item = Object.assign(item, fontMap[reIndex])
  })

  return data
}

// 获取上一级菜单
export function getNextHigherLevel (ParentId, menuList) {
  let obj = {
    menu: [],
    title: ''
  }

  function getHigherLevel (ParentId, menu) {
    let menuList = menu.concat()
    if (!ParentId || ParentId === '') {
      obj.menu = menuList
      obj.title = ''
      return obj
    }

    let item = null
    for (let i = 0; i < menuList.length; i++) {
      item = menuList[i]
      if (item.ParentId !== '' && item.Id === ParentId) {
        obj.menu = item.children
        obj.title = item.Name
      } else if (item.children && item.children.length > 0) {
        getHigherLevel(ParentId, item.children)
      }
    }

    return obj
  }
  getHigherLevel(ParentId, menuList)

  return obj
}

// 自定义时间格式 ：format
// "yyyy-MM-dd HH:mm:ss";"yyyy-MM-dd-HH-mm-ss"
// "yyyy-MM-ddTHH:mm:ss" ....
export function formatDate (time, format) {
  if (!time) {
    return ''
  }

  if (typeof time === 'string') {
    time = time.replace('T', ' ').replace(new RegExp('-', 'gm'), '/')
  }

  let t = new Date(time)

  if (t.getTime() === 0) {
    t = new Date()
  }

  let tf = function (i) {
    return (i < 10 ? '0' : '') + i
  }
  if (!format) {
    format = 'yyyy-MM-dd'
  }

  return format.replace(/yyyy|MM|dd|HH|mm|ss/g, function (type) {
    switch (type) {
      case 'yyyy':
        return tf(t.getFullYear())
      case 'MM':
        return tf(t.getMonth() + 1)
      case 'mm':
        return tf(t.getMinutes())
      case 'dd':
        return tf(t.getDate())
      case 'HH':
        return tf(t.getHours())
      case 'ss':
        return tf(t.getSeconds())
    }
  })
}

// 获取子菜单
export function getChildrenMenu (parent) {
  var menu = []
  if (parent.children && parent.children.length > 0) {
    menu = parent.children
  }
  return menu
}
// 导航守卫 处理title 和判断登录的问题
export function routerBeforeEach (router) {
  router.beforeEach((to, from, next) => {
    window.document.title = to.meta.title
    const Token = getTokenString()
    const isLoginPage = to.fullPath === '/login'
    const TokenMsg = getTokenMsg()
    const hasLogin = checkLoginTime(TokenMsg)

    if (!Token && !isLoginPage && !hasLogin) {
      // 回到登录页 要清除缓存
      storage.clear()
      if (debug) {
        next('/login')
      } else {
        next()
      }

      return false
    }

    if (to.query.url === from.path) {
      next('/workinfos')
      return false
    }

    next()
  })
}

// 判断两个对象的属性值、和属性是否相等
// 不考虑像个对象的__proto__属性里面的东西
// 这个方法的原理和Object.is()方法不同
export function isObjectValueEqual (a, b) {
  let aKeys = Object.keys(a)
  let bKeys = Object.keys(b)

  if (aKeys.length !== bKeys.length) {
    return false
  }

  for (var i = 0; i < aKeys.length; i++) {
    var keyName = aKeys[i]
    if (a[keyName] !== b[keyName]) {
      return false
    }
  }

  return true
}

export function findIndex (ary, fn) {
  if (ary.findIndex) {
    return ary.findIndex(fn)
  }
  /* istanbul ignore next */
  let index = -1
  /* istanbul ignore next */
  ary.some(function (item, i, ary) {
    const ret = fn.call(this, item, i, ary)
    if (ret) {
      index = i
      return ret
    }
  })
  /* istanbul ignore next */
  return index
}

// 删除数组的一条信息
export function removeList (arr, item) {
  let selfItem = {}
  for (let i = 0; i < arr.length; i++) {
    selfItem = arr[i]
    if (selfItem.Id === item.Id) {
      arr.splice(i, 1)
      break
    }
  }
  return arr
}

// 格式化formAllConfig中的信息
export function formatFormAllConfig (formAllConfig) {
  let obj = Object.assign({}, formAllConfig)

  if (obj.formconfig !== '') {
    obj.formconfig = JSON.parse(obj.formconfig)
  }

  if (obj.keywordright !== '') {
    obj.keywordright = JSON.parse(obj.keywordright)
  }

  if (obj.sessiondata !== '') {
    obj.sessiondata = JSON.parse(obj.sessiondata)
  }

  if (obj.workflowdata !== '') {
    obj.workflowdata = JSON.parse(obj.workflowdata)
  }

  if (obj.comboboxdata !== '') {
    obj.comboboxdata = JSON.parse(obj.comboboxdata)
  }

  return obj
}

// 返回一个主机名和端口号
export function hostAddress (NODE_ENV) {
  const debug = NODE_ENV !== 'production'
  let url = debug ? systemConfig.devDomainName + '/' : location.origin

  return url
}

// 获取附件的icon
export function getFileIcon (item) {
  const debug = process.env.NODE_ENV !== 'production'
  let imgPath = `${systemConfig.devDomainName}/Hoter/showFile?token=${getTokenString()}&fileId=`
  let publicPath = debug ? '/static/img/' : '/weixin3.0/static/img/'

  if (/\.(png|jpe?g|gif|svg)(\?.*)?$/.test(item.FileExt)) {
    return imgPath + item.Id
  } else if (/\.(mp4|webm|ogg|flv|mpg)(\?.*)?$/.test(item.FileExt)) {
    return publicPath + 'fileVideo.png'
  } else if (/\.(mp3|wav|flac|aac)(\?.*)?$/.test(item.FileExt)) {
    return publicPath + 'fileAudio.png'
  } else if (/\.(doc|docx|docm|dot|dotx|dotm)(\?.*)?$/.test(item.FileExt)) {
    return publicPath + 'fileWord.png'
  } else if (/\.(pdf)(\?.*)?$/.test(item.FileExt)) {
    return publicPath + 'filePdf.png'
  } else if (/\.(xls|xlsx|xlsm|xlt|xltx|xltm|csv)(\?.*)?$/.test(item.FileExt)) {
    return publicPath + 'fileExcel.png'
  } else if (/\.(ppt|pptx|pptm|pot|potx|potm|pps|ppsx|ppsm)(\?.*)?$/.test(item.FileExt)) {
    return publicPath + 'filePpt.png'
  } else {
    return publicPath + 'fileOther.png'
  }
}

// 获取信息修改成前端可以显示的数据
// 主要是针对下拉框里面的数据进行转换
export function formatFromDataToView (comboboxdata, formData, keyWord) {
  let obj = Object.assign({}, formData)

  for (let key in comboboxdata) {
    let _keyWord = key.split('.')[0]
    let field = key.split('.')[1]

    if (!field && _keyWord === 'Status') {
      field = _keyWord
    }

    if (obj[field] && _keyWord === keyWord) {
      let selectItem = comboboxdata[key]
      let TextField = selectItem['TextField']
      let ValueField = selectItem['ValueField']
      let value = obj[field]

      let dataItem = findDataItem(selectItem['Data'], value, ValueField, TextField)

      obj[field] = dataItem[TextField]
    }
  }

  return obj
}

// 获取页面显示信息修改成后端可以识别的数据
// 主要是针对下拉框里面的数据进行转换
export function formatFromDataToSave (comboboxdata, formData, keyWord) {
  let obj = Object.assign({}, formData)
  for (let key in comboboxdata) {
    let _keyWord = key.split('.')[0]
    let field = key.split('.')[1]

    if (!field && _keyWord === 'Status') {
      field = _keyWord
    }

    if (obj[field] && _keyWord === keyWord) {
      let selectItem = comboboxdata[key]
      let TextField = selectItem['TextField']
      let ValueField = selectItem['ValueField']
      let text = obj[field]
      let dataItem = findTextItem(selectItem['Data'], text, TextField, ValueField)

      obj[field] = dataItem[ValueField]
    }
  }
  return obj
}

// 组织保存表单的参数
// @obj KeyWord, comboboxdata, KeyWordType, data, formDate,FormId
export function organizeParams (objParmas) {
  let parmas = {
    JsonData: '',
    FormId: ''
  }

  let obj = {}
  let data = objParmas.data.concat()
  data = data.map((item) => {
    let objItem = Object.assign({}, item)
    item = formatFromDataToSave(
      objParmas.formAllConfig.comboboxdata,
      objItem,
      objParmas.KeyWord
    )
    if (objParmas.formDate === 'edit') {
      item['_state'] = 'modified'
    } else if (objParmas.formDate === 'add') {
      item['_state'] = 'added'
    } else if (objParmas.formDate === 'delete') {
      item['_state'] = 'removed'
    } else if (objParmas.formDate === 'view') {
      item['_state'] = 'modified'
    }
    return item
  })

  obj[objParmas['KeyWord']] = {
    KeyWordType: objParmas.KeyWordType || 'BO',
    data: data
  }

  parmas.JsonData = JSON.stringify(obj)
  parmas.FormId = objParmas.FormId
  parmas.Encode = ''
  parmas.Params = ''
  return parmas
}

// 列表转换成树形结构 递归
export function listToTreeData (bootItem, Data) {
  bootItem.children = []
  Data.forEach((item) => {
    if (item.ParentId === bootItem.Id) {
      bootItem.children.push(item)
    }
  })

  if (bootItem.children.length > 0) {
    bootItem.children.forEach((item) => {
      listToTreeData(item, Data)
    })
  } else {
    return false
  }
}

// 根据searchField搜索
export function searchLists (searchField, query, arr) {
  let data = arr.concat()
  let result = []
  let pattern = new RegExp(query, 'i')
  data.forEach((item) => {
    if (pattern.test(item[searchField])) {
      result.push(item)
    }
  })

  return result
}

// 获取table样式的index
export function getTableStyleIndex (style, styles) {
  let num = 0
  styles.forEach((item, index) => {
    if (style === item.style) {
      num = index
    }
  })
  return num
}

// 判定switch的显示权限
export function getTabShowRight (switchs, switchsPermission, formData, formstate, ajaxValue, subPermission) {
  let arr = []
  let tabs = [...switchs]
  let field = switchsPermission.field
  let fieldType = switchsPermission.fieldType
  let value = ''
  let values = switchsPermission.condition.value

  if (fieldType === 'select') {
    value = formData[field]
  } else if (fieldType === 'ajax') {
    value = ajaxValue
  }

  let include = values.includes(value)
  let yes = switchsPermission.condition.yes.excludeIndex
  let no = switchsPermission.condition.no.excludeIndex
  let addStatus = switchsPermission.condition.addStatus.excludeIndex
  let viewStatus = switchsPermission.condition.viewStatus.excludeIndex

  for (let i = 0; i < tabs.length; i++) {
    let item = tabs[i]

    if (fieldType === 'select') {
      if (formstate === 'edit') {
        if (include) {
          if (yes && !yes.includes(i)) {
            arr.push(item)
          }
        } else {
          if (no && !no.includes(i)) {
            arr.push(item)
          }
        }
      } else if (formstate === 'add') {
        if (addStatus && !addStatus.includes(i)) {
          arr.push(item)
        }
      } else if (formstate === 'view') {
        if (viewStatus && !viewStatus.includes(i)) {
          arr.push(item)
        }
      }
    }

    if (fieldType === 'ajax') {
      if (include) {
        if (yes && !yes.includes(i)) {
          arr.push(item)
        }
      } else {
        if (no && !no.includes(i)) {
          arr.push(item)
        }
      }
    }
  }

  if (arr.length === 0) {
    arr = tabs
  }

  if (subPermission) {
    try {
      arr = [...checkSubPermission(arr, subPermission, formData)]
    } catch (e) {
      console.log(e)
      arr = [...arr]
    }
  }

  return arr
}

export function checkSubPermission (arr, subPermission, formData) {
  let array = []

  subPermission.forEach((item) => {
    let fieldValue = formData[item.field]
    let values = item.condition.value
    let yes = item.condition.yes.targetKeyWords
    let no = item.condition.no.targetKeyWords

    if (values.includes(fieldValue)) {
      arr.forEach((switchItem) => {
        if (no && !no.includes(switchItem.KeyWord)) {
          array.push(switchItem)
        }
      })
    } else {
      arr.forEach((switchItem) => {
        if (yes && !yes.includes(switchItem.KeyWord)) {
          array.push(switchItem)
        }
      })
    }
  })

  return array
}

// 金额转换成千分位
export function toThousand (money, noPoint) {
  let parts = money.toString().split('.')
  let main = parts[0]
  let tail = parts[1]

  main = main.replace(/\B(?=(\d{3})+(?!\d))/g, ',')

  if (!tail) {
    tail = '00'
  } else if (tail.length === 1) {
    tail += '0'
  }

  if (!tail) {
    tail = ''
  }

  switch (tail.length) {
    case 0:
      tail += '00'
      break
    case 1:
      tail += '0'
      break
    default:
      tail = tail.slice(0, 2)
  }

  if (noPoint) {
    return money.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  } else {
    return `${main}.${tail}`
  }
}

// 在comboboxdata Text查询指定的数据
function findTextItem (data, text, TextField, ValueField) {
  let obj = {}
  if (data.length) {
    for (let i = 0; i < data.length; i++) {
      let item = data[i]
      if (item[TextField] === text) {
        obj = item
        break
      }
    }
  }

  if (obj[ValueField] === undefined || obj[ValueField] === null) {
    obj = reFindTextItem(data, text, ValueField)
  }

  return obj
}

// 在comboboxdata Text查询指定的数据
function reFindTextItem (data, text, TextField) {
  let obj = {}
  if (data.length) {
    for (let i = 0; i < data.length; i++) {
      let item = data[i]
      if (item[TextField] === text) {
        obj = item
        break
      }
    }
  }
  return obj
}

// 在comboboxdata Data查询指定的数据
function findDataItem (data, value, ValueField, TextField) {
  let obj = {}

  if (data.length) {
    for (let i = 0; i < data.length; i++) {
      let item = data[i]
      if ((item[ValueField] + '') === value) {
        obj = item
        break
      }
    }
  }

  if (obj[TextField] === undefined || obj[TextField] === null) {
    obj = reFindDataItem(data, value, TextField)
  }

  return obj
}

// 遇到不规则的数据 在comboboxdata Data查询指定的数据
function reFindDataItem (data, value, ValueField) {
  let obj = {}

  if (data.length) {
    for (let i = 0; i < data.length; i++) {
      let item = data[i]
      if (item[ValueField] === value) {
        obj = item
        break
      }
    }
  }

  return obj
}

// 检测是否还是持续登录的状态
export function checkLoginTime (TokenMsg) {
  let nowTime = (new Date()).getTime()

  if (!TokenMsg.exp) {
    return false
  }
  // 结束时间
  let exp = TokenMsg.exp * 1000

  if ((exp - nowTime - 3600) > 0) {
    return true
  } else {
    return false
  }
}
// h5 原生文件流上传方法
export class UploadFile {
  constructor (token, KeyValue, KeyWord, successCallBack, errorCallBack, humLogo = false) {
    if (!humLogo && (!token || !KeyValue || !KeyWord)) {
      throw new Error('请传入必要参数')
    }
    this.token = token
    this.KeyValue = KeyValue
    this.KeyWord = KeyWord
    this.successCallBack = successCallBack
    this.errorCallBack = errorCallBack
    this.humLogo = humLogo
    this.selectFile = null
    this.init()
  }
  // 初始化事件
  init () {
    this.destroy()
    let InputFileWrap = document.createElement('div')
    let template = ''
    if (!this.humLogo) {
      template = '<input type="file" name="file" id="selectFile">'
    } else {
      template = '<input type="file" name="file" id="selectFile" accept="image/*">'
    }
    InputFileWrap.id = 'InputFile'
    InputFileWrap.style['opacity'] = 0
    InputFileWrap.style['width'] = 0
    InputFileWrap.style['height'] = 0
    InputFileWrap.innerHTML = template
    if (document.body.appendChild) {
      document.body.appendChild(InputFileWrap)
    } else if (document.body.append) {
      document.body.append(InputFileWrap)
    }
    this.selectFile = document.getElementById('selectFile')
    // 绑定事件
    this.clickHandle()
    this.selectFile.click()
  }

  clickHandle () {
    if (this.selectFile) {
      this.selectFile.onchange = (event) => {
        let e = window.event || event
        let file = e.target.files[0]
        let formData = new FormData()

        formData.append('FileData', file)
        formData.append('token', this.token || '')
        formData.append('KeyValue', this.KeyValue)
        formData.append('KeyWord', this.KeyWord)

        uploadFile(formData).then((res) => {
          this.successCallBack && this.successCallBack(res)
          this.destroy()
        }).catch((e) => {
          this.errorCallBack && this.errorCallBack(e)
          this.destroy()
        })
      }
    }
  }

  destroy () {
    let isInputFile = document.getElementById('InputFile')
    if (isInputFile) {
      document.body.removeChild(isInputFile)
    }
    this.selectFile = null
  }
}
