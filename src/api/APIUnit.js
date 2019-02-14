import axios from 'axios'
import qs from 'qs'
import { systemConfig } from 'common/js/config'
import { checkLoginTime } from 'common/js/Util.js'
import { getTokenMsg } from 'api/login.js'

// 判断运行环境 是在开发中还是在生产环境中
const debug = process.env.NODE_ENV !== 'production'

// APIUnit 封装一个统一的ajax方法
export function APIUnit (api, params) {
  let url = debug ? systemConfig.devDomainName + api : api

  return new Promise((resolve, reject) => {
    let TokenMsg = getTokenMsg()
    let keepLogin = checkLoginTime(TokenMsg)
    if (!keepLogin) {
      let err = {}
      err['message'] = '201'
      reject(err)
    } else {
      axios.post(url, qs.stringify(params)).then((response) => {
        resolve(response.data)
      }).catch((e) => {
        reject(e)
      })
    }
  })
}
