import {
  formatFromDataToSave,
  organizeParams
} from 'common/js/Util.js'
// 主要准对表单里面的业务进行处理

// 保存主表数据的参数组织处理 saveFromData
export function saveFromDataParams (option) {
  let thisOption = Object.assign({
    KeyWord: '',
    mainformData: {},
    routerParams: {},
    formAllConfig: {}
  }, option)

  let { KeyWord, mainformData, routerParams, formAllConfig } = thisOption
  let { FromId, formstate } = routerParams

  let objItem = formatFromDataToSave(
    formAllConfig.comboboxdata,
    mainformData,
    KeyWord
  )

  let obj = {
    KeyWord: KeyWord,
    formAllConfig: formAllConfig,
    KeyWordType: 'BO',
    data: [objItem],
    formDate: formstate,
    FormId: FromId
  }

  return organizeParams(obj)
}
