<template>
  <transition name="slide">
    <div class="work-node-select">
      <div v-show="isShow('selectFlow')" class="before-select-content">
        <div class="workflow-select">
          <header class="header">
            <div class="title">
              流程选择
            </div>
          </header>
          <line-break></line-break>
          <ul class="select-lists">
            <li class="select-list"
                v-if="WorkFlowList.length > 0"
                v-for="item in WorkFlowList"
                @click="selectItem(item)"
                :key="item.WorkFlowID">
                <person-select-list
                  ref="personSelectList"
                  :selectedWorkFlows="selectedWorkFlows"
                  :item="item"
                ></person-select-list>
            </li>
          </ul>
        </div>
        <div class="person-select-bar">
          <div @click="toNextStep('nodeSelect')" class="select-bar">
            <span>下一步</span>
          </div>
          <div @click="cancel" class="select-bar">
            <span>返回</span>
          </div>
        </div>
      </div>
      <div v-show="isShow('nodeSelect')" class="node-select-content">
        <div class="node-select">
          <header class="header">
            <div class="title">
              节点选择
            </div>
            <div class="toggle-bar">
             <cube-switch class="toggle-switch" v-model="filterNormalNode"></cube-switch>
            </div>
          </header>
          <line-break></line-break>
          <ul class="node-select-lists">
            <li class="node-select-list"
                v-for="(item, index) in NodeLists"
                :key="index"
                v-show="_normalNodeIsShow(item)"
              >
              <div class="list-inner">
                <div class="list-inner-header">
                  <div class="node-name">
                    <span class="name">节点名称:</span>
                    <span class="text">{{ item.NodeName }}</span>
                  </div>
                  <div class="node-status">
                    <span class="name">节点状态:</span>
                    <span class="text">{{ _tranformStatus(item.Status) }}</span>
                  </div>
                </div>
                <div class="list-inner-body">
                  <div class="node-info">
                    <span class="name">节点描述:</span>
                    <span class="text">{{ item.ShowUserInfo }}</span>
                  </div>
                  <div class="node-info">
                    <span class="name">可选人员:</span>
                    <span class="text">{{ _setCanselectUserString(item) }}</span>
                  </div>
                  <div class="node-action">
                    <span class="name">操作:</span>
                    <span
                      @click.prevent.stop="_draftUser(item)"
                      :class="'text ' + _setTextColor(item)"
                      >
                        {{ _transformNodeListAction(item) }}
                    </span>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div class="person-select-bar">
          <div @click="toNextStep('peopleSelect')" class="select-bar">
            <span>下一步</span>
          </div>
          <div v-if="formState!== 'view'" @click="toUpStep('selectFlow')" class="select-bar">
            <span>上一步</span>
          </div>
        </div>
      </div>
      <div v-show="isShow('peopleSelect')" class="after-select-content">
        <div class="people-select">
          <header class="header">
            <div class="title">
              人员选择
            </div>
            <div class="toggle-bar">
             <cube-switch class="toggle-switch" v-model="showPeopleContent"></cube-switch>
            </div>
          </header>
          <section class="people-content" :style="{height: PeopleContentHeight}">
            <div class="next-node-list"
              v-for="(NextNodeListItem, NextNodeListIndex) in NextNodeList" :key="NextNodeListIndex"
              >
              <h1 class="node-list-title"
                @click="nodeListTitleSelect(NextNodeListIndex)"
              >
                <div class="name">{{ NextNodeListItem.NodeName }}</div>
                <div class="check-box">
                  <check-icon :checked="NextNodeListItem.checked"></check-icon>
                </div>
              </h1>
              <div v-if="NextNodeListItem.CanSelectUsers.length > 0" class="next-node-list-unit can-select-users">
                <h1 class="title">可送审人员</h1>
                <ul class="people-lists">
                  <li class="people-list"
                      v-for="(CanSelectUsersItem, CanSelectUsersIndex) in NextNodeListItem.CanSelectUsers"
                      :key="CanSelectUsersIndex"
                      @click="selectUsersEvent(NextNodeListIndex, CanSelectUsersIndex)"
                    >
                    <div class="user-name">{{ CanSelectUsersItem.UserName }}</div>
                    <div class="check-box">
                      <check-icon :checked="CanSelectUsersItem.checked"></check-icon>
                    </div>
                  </li>
                </ul>
              </div>
              <div v-if="NextNodeListItem.CanSelectCopyUsers.length > 0" class="next-node-list-unit can-select-copy-users">
                <h1 class="title">可抄送人员</h1>
                <ul class="people-lists">
                  <li class="people-list"
                       v-for="(CanSelectCopyUsersItem, CanSelectCopyUsersIndex) in NextNodeListItem.CanSelectCopyUsers"
                      :key="CanSelectCopyUsersIndex"
                      @click="selectCopyUsersEvent(NextNodeListIndex, CanSelectCopyUsersIndex)"
                    >
                    <div class="user-name">{{ CanSelectCopyUsersItem.UserName }}</div>
                    <div class="check-box">
                      <check-icon :checked="CanSelectCopyUsersItem.checked"></check-icon>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </section>
          <section class="approve-text-content">
            <h1 class="text-title">审批意见</h1>
            <group class="textarea-content">
              <x-textarea
                name="description"
                v-model.trim="MindInfo"
                :max="300"
                placeholder="输入审批意见"
              ></x-textarea>
            </group>
          </section>
        </div>
        <div class="person-select-bar">
          <div @click="submitFlow" class="select-bar">
            <span>提交</span>
          </div>
          <div v-if="formState!== 'view'" @click="toUpStep('nodeSelect')" class="select-bar">
            <span>上一步</span>
          </div>
        </div>
      </div>

      <position-user-list
        ref="positionUserList"
        :subParams="positionUserParams"
        :currentUserList="ConfigUserList"
        @complete="_completeByDraft"
      ></position-user-list>
    </div>
  </transition>
</template>
<script type="text/ecmascript-6">
import { mapActions } from 'vuex'
import LineBreak from 'base/line/line.vue'
import PositionUserList from 'base/position-user-list/position-user-list.vue'
import PersonSelectList from 'base/person-select-list/person-select-list.vue'
import { EFlowOperate, EFlowLineType } from 'common/js/config.js'
import { XTextarea, Group, InlineXSwitch } from 'vux'
import CheckIcon from 'base/check-icon/check-icon.vue'
import { createGuid } from 'common/js/Util.js'

const SELECTFLOW = '请选择一个流程'
const NODELISTERROR = '节点有异常没有处理'

export default {
  name: 'workflow',
  data () {
    return {
      // 流程相关
      WorkFlowData: {},
      WorkFlowList: [],
      selectedWorkFlows: [],
      currentWorkFlow: null,
      // 节点相关
      NodeLists: [],
      currentNodeList: null,
      showPeopleContent: true,
      filterNormalNode: true,
      currentStop: '',
      peopleLists: [],
      MindInfo: '',
      IsMindMustInput: true,
      NextNodeList: [],
      current: {},
      positionUserParams: {},
      byDraft: {
        users: [],
        NodeCode: ''
      },
      ConfigUserList: [],
      currentRow: {}
    }
  },
  computed: {
    // 计算人员选择的容器的高度
    PeopleContentHeight () {
      return this.showPeopleContent ? 'calc(60% - 50px)' : '0px'
    },
    query () {
      return this.$router.history.current.query || {}
    },
    formState () {
      return this.query.FormState || ''
    }
  },
  mounted () {
    this.getWorkFlowData()
  },
  methods: {
    // 获取所有流程后台数据
    getWorkFlowData () {
      let params = {
        KeyWord: this.query.KeyWord,
        KeyValue: this.query.KeyValue,
        FormId: this.query.FormId,
        FlowOperate: EFlowOperate.SelectFlow,
        SequeID: this.query.SequeID
      }

      this.FlowActionData(JSON.stringify(params)).then((res) => {
        let value = res.data.value
        let WorkFlowList = []

        this.WorkFlowData = Object.assign({}, value)
        if (value && value.WorkFlowList) {
          WorkFlowList = [...value.WorkFlowList]
        }

        WorkFlowList.forEach((item, index) => {
          // 如果存在默认WorkFlowID，则默认选中
          // 如果流程的长度是1， 则默认选中
          // 如果每一条数据中IsAutoSelect字段为true，则默认选中
          if (value.WorkFlowID) {
            let hasInfoFlow = value.WorkFlowID === item.WorkFlowID
            hasInfoFlow && this.selectedWorkFlows.push(item)
          } else {
            if (item.IsAutoSelect) {
              this.selectedWorkFlows.push(item)
            } else {
              (WorkFlowList.length === 1) && this.selectedWorkFlows.push(item)
            }
          }
        })

        this.WorkFlowList = [...WorkFlowList]
        if (this.timer) { clearTimeout(this.timer) }
        this.timer = setTimeout(() => {
          if (this.selectedWorkFlows.length === 0) {
            this.toNextStep('selectFlow')
          } else {
            this.toNextStep('nodeSelect')
          }
        }, 300)
      }).catch((e) => {
        this.AlertShowEvent(e.message)
      })
    },
    // 节点选择数据获取（自定义起草人）
    getFlowNode (flow) {
      let current = Object.assign({}, {
        WorkFlowID: flow.WorkFlowID,
        Version: flow.Version,
        FormId: this.query.FormId,
        KeyWord: this.query.KeyWord,
        KeyValue: this.query.KeyValue,
        WorkInfoID: flow.WorkInfoID ? flow.WorkInfoID : createGuid()
      })

      this.positionUserParams = Object.assign({}, {
        SubOperate: 'SaveUserToInstanNode',
        FlowOperate: 'SupplyFlow',
        Current: current,
        ConfigUserList: []
      })

      let obj = Object.assign({}, {
        SubOperate: 'ReadNodeList',
        FlowOperate: 'SupplyFlow',
        Current: current
      })

      this.FlowActionData(JSON.stringify(obj)).then((response) => {
        let value = response.data.value
        let NodeLists = (value && value.NodeList) ? [...value.NodeList] : []

        NodeLists.map((item, index) => {
          item.CanSendUsers = JSON.parse(item.CanSendUsers)
          return item
        })

        this.NodeLists = [...NodeLists]

        let UnormalNode = this._findUnormalNodeList()
        if (UnormalNode.length === 0) {
          this.toNextStep('peopleSelect')
        }
      }).catch((e) => {
        this.AlertShowEvent(e)
      })
    },
    // 加载人员选择数据
    peopleSelectFlow (flow) {
      let obj = Object.assign({}, {
        WorkFlowID: flow.WorkFlowID,
        Version: flow.Version,
        PlanEndDate: flow.PlanEndDate,
        FormId: this.query.FormId,
        KeyWord: this.query.KeyWord,
        KeyValue: this.query.KeyValue
      })

      if (this.query.WorkInfoID) {
        obj = Object.assign(obj, {
          WorkInfoID: this.query.WorkInfoID
        })
      }

      if (this.query.GroupID) {
        obj = Object.assign(obj, {
          GroupID: this.query.GroupID
        })
      }

      if (flow.WorkInfoID) {
        obj = Object.assign(obj, {
          WorkInfoID: flow.WorkInfoID
        })
      } else {
        if (!obj.WorkInfoID) {
          obj = Object.assign(obj, {
            WorkInfoID: createGuid()
          })
        }
      }

      let params = {
        Current: obj,
        FlowOperate: EFlowOperate.Active
      }

      this.FlowActionData(JSON.stringify(params)).then((response) => {
        let value = response.data.value
        let NextNodeList = []

        console.log(value)
        if (value) {
          NextNodeList = [...value.NextNodeList]
        }

        if (this.byDraft.users.length > 0) {
          NextNodeList.forEach((item) => {
            if (item.NodeCode === this.byDraft.NodeCode) {
              item.CanSelectUsers = [...this.byDraft.users]
            }
          })
        }

        this.current = Object.assign({}, value.Current)
        this.NextNodeList = this.formatNextNodeList(NextNodeList)
      }).catch((e) => {
        this.AlertShowEvent(e.message)
      })
    },
    // 提交意见数据
    submitFlow () {
      let selectedNode = this.getSelectedNode()

      if (selectedNode.error !== '') {
        this.AlertShowEvent(selectedNode.error)
        return false
      }

      if (this.IsMindMustInput && this.MindInfo === '') {
        this.AlertShowEvent('审批意见不许为空')
        return false
      }

      let current = Object.assign(this.current, {
        KeyWord: this.query.KeyWord,
        KeyValue: this.query.KeyValue,
        FormId: this.query.FormId
      })

      let params = Object.assign({
        Current: current,
        FlowOperate: 'Send',
        MindInfo: this.MindInfo,
        SelectedNode: selectedNode.data,
        VoteText: '',
        VoteValue: ''
      })

      this.FlowActionData(JSON.stringify(params)).then((response) => {
        this.GetInformCount().then(() => {
          if (this.formState === 'view') {
            this.$router.push('/workinfos')
          } else {
            this.$router.back()
          }
        }).catch((e) => {
          this.AlertShowEvent(e.message)
        })
      }).catch((e) => {
        this.AlertShowEvent(e.message)
      })
    },
    // 下一步
    toNextStep (step) {
      let flow = this.getCurrentFlowItem()

      switch (step) {
        // 流程选择
        case 'selectFlow':
          this.currentStop = step
          break
        // 节点选择
        case 'nodeSelect':
          if (!flow) {
            this.AlertShowEvent(SELECTFLOW)
            return false
          }
          this.currentStop = step
          this.getFlowNode(flow)
          break
        // 人员选择
        case 'peopleSelect':
          let UnormalNode = this._findUnormalNodeList()
          if (!flow) {
            this.AlertShowEvent(SELECTFLOW)
            return false
          }
          if (UnormalNode.length > 0) {
            this.AlertShowEvent(NODELISTERROR)
            return false
          }
          this.currentStop = step
          this.peopleSelectFlow(flow)
          break
        default:
          return false
      }
    },
    // 上一步
    toUpStep (step) {
      this.currentStop = step
    },
    // 获取选择的节点和人员(送审和抄送)
    getSelectedNode () {
      let array = []
      let msg = ''

      this.NextNodeList.forEach((item, index) => {
        let obj = {}
        obj.NodeCode = item.NodeCode
        obj.SendUserList = []
        obj.CopyUserList = []

        item.CanSelectUsers.forEach((userItem, userIndex) => {
          if (userItem.checked && userItem.checked === true) {
            let userObj = Object.assign({}, userItem)
            delete userObj.checked
            obj.SendUserList.push(userObj)
          }
        })

        item.CanSelectCopyUsers.forEach((copyUserItem, copyUserIndex) => {
          if (copyUserItem.checked && copyUserItem.checked === true) {
            let copyUserObj = Object.assign({}, copyUserItem)
            delete copyUserObj.checked
            obj.CopyUserList.push(copyUserObj)
          }
        })

        if (obj.SendUserList.length === 0 && item.IsMustNotUsers === false) {
          msg = `${item.NodeName}节点没有选择送审人员`
        }

        if (item.checked) {
          array.push(obj)
        }
      })

      if (array.length === 0) {
        msg = `节点数据为空`
      }

      return {
        data: array,
        error: msg
      }
    },
    // 人员选择相关 **********************************
    // 抄送人员的点击事件
    selectCopyUsersEvent (a, b) {
      let NextNodeList = [...this.NextNodeList]
      let lineChecked = NextNodeList[a].checked

      if (!lineChecked) {
        this.AlertShowEvent(`请先选择${this.NextNodeList[a].NodeName}节点`)
      } else {
        NextNodeList[a].CanSelectCopyUsers[b].checked =
        !NextNodeList[a].CanSelectCopyUsers[b].checked
      }

      this.NextNodeList = [...NextNodeList]
    },
    // 可送审人员的点击事件
    selectUsersEvent (a, b) {
      let NextNodeList = [...this.NextNodeList]
      let lineChecked = NextNodeList[a].checked
      let allowMulitUser = NextNodeList[a].AllowMulitUser
      let SelectUserMode = NextNodeList[a].SelectUserMode

      if (!lineChecked) {
        this.AlertShowEvent(`请先选择${NextNodeList[a].NodeName}节点`)
      } else {
        if (SelectUserMode === 'SelectAllAndDisabled') {
          this.AlertShowEvent('你没有修改权限')
          return false
        }

        if (allowMulitUser) {
          NextNodeList[a].CanSelectUsers[b].checked =
          !NextNodeList[a].CanSelectUsers[b].checked
        } else {
          NextNodeList[a].CanSelectUsers.forEach((item, index) => {
            if (index === b) {
              item.checked = !item.checked
            } else {
              item.checked = false
            }
          })
        }
      }

      this.NextNodeList = [...NextNodeList]
    },
    // 节点选择事件
    nodeListTitleSelect (index) {
      let NextNodeList = this.NextNodeList
      let checked = NextNodeList[index].checked
      let selectNodeMode = NextNodeList[index].SelectNodeMode
      let LineType = NextNodeList[index].LineType
      let IsLastReturnNode = NextNodeList[index].IsLastReturnNode

      switch (selectNodeMode) {
        case 'SelectedNode':
          NextNodeList[index].checked = !checked
          NextNodeList[index] = Object.assign(NextNodeList[index], this.computedUserIsSelected(NextNodeList[index]))
          if (LineType === EFlowLineType.ExcludeLine) {
            NextNodeList.forEach((item, itemIndex) => {
              if (itemIndex !== index) {
                NextNodeList[itemIndex].checked = false
                NextNodeList[itemIndex] = Object.assign(NextNodeList[itemIndex], this.computedUserIsSelected(NextNodeList[itemIndex]))
              }
            })
          }
          if (IsLastReturnNode) {
            NextNodeList.forEach((item, itemIndex) => {
              if (itemIndex !== index) {
                NextNodeList[itemIndex].checked = false
                NextNodeList[itemIndex] = Object.assign(NextNodeList[itemIndex], this.computedUserIsSelected(NextNodeList[itemIndex]))
              }
            })
          }
          break
        case 'SelectedAndDisabled':
          this.AlertShowEvent('禁止取消')
          break
        default:
          NextNodeList[index].checked = !checked
          NextNodeList[index] = Object.assign(NextNodeList[index], this.computedUserIsSelected(NextNodeList[index]))
          if (LineType === EFlowLineType.ExcludeLine) {
            NextNodeList.forEach((item, itemIndex) => {
              if (itemIndex !== index) {
                NextNodeList[itemIndex].checked = false
                NextNodeList[itemIndex] = Object.assign(NextNodeList[itemIndex], this.computedUserIsSelected(NextNodeList[itemIndex]))
              }
            })
          }
          if (IsLastReturnNode) {
            NextNodeList.forEach((item, itemIndex) => {
              if (itemIndex !== index) {
                NextNodeList[itemIndex].checked = false
                NextNodeList[itemIndex] = Object.assign(NextNodeList[itemIndex], this.computedUserIsSelected(NextNodeList[itemIndex]))
              }
            })
          }
      }
      this.NextNodeList = [...NextNodeList]
    },
    // 组织数据，添加权限
    formatNextNodeList (array) {
      let arr = []
      let mustLists = []
      array.forEach((item, index) => {
        if (item.IsMindMustInput) {
          mustLists.push(item)
        }

        switch (item.SelectNodeMode) {
          // 默认选中
          case 'SelectedNode':
            if (item.IsLastReturnNode) {
              item.checked = false
            } else {
              item.checked = true
            }
            item = Object.assign(item, this.computedUserIsSelected(item))
            break
          // 默认选中 切禁止取消
          case 'SelectedAndDisabled':
            item.checked = true
            item = Object.assign(item, this.computedUserIsSelected(item))
            break
          default:
            item.checked = false
            item = Object.assign(item, this.computedUserIsSelected(item))
        }

        !item.IsCancel && arr.push(item)
      })

      // if 节点长度等于1 默认选中
      if (arr.length === 1) {
        arr[0].checked = true
      }

      if (mustLists.length > 0) {
        this.IsMindMustInput = true
      } else {
        this.IsMindMustInput = false
      }
      return arr
    },
    // 计算送审人员是否被选择
    computedUserIsSelected (item) {
      let CanSelectUsers = item.CanSelectUsers || []
      let CanSelectCopyUsers = item.CanSelectCopyUsers || []
      let SelectUserMode = item.SelectUserMode

      switch (SelectUserMode) {
        // 默认不选中
        case 'DeselectAll':
          CanSelectUsers.forEach((userItem, userIndex) => {
            userItem.checked = false
          })
          break
        case 'SelectAll':
          CanSelectUsers.forEach((userItem, userIndex) => {
            if (item.checked) {
              userItem.checked = true
            } else {
              userItem.checked = false
            }
          })
          break
        case 'SelectAllAndDisabled':
          CanSelectUsers.forEach((userItem, userIndex) => {
            if (item.checked) {
              userItem.checked = true
            } else {
              userItem.checked = false
            }
          })
          break
        default:
          CanSelectUsers.forEach((userItem, userIndex) => {
            if (item.checked) {
              if (CanSelectUsers.length === 1) {
                userItem.checked = true
              } else {
                userItem.checked = false
              }
            } else {
              userItem.checked = false
            }
          })
      }

      CanSelectCopyUsers.forEach((copyUsersItem, index) => {
        if (item.checked) {
          if (CanSelectCopyUsers.length === 1) {
            copyUsersItem.checked = true
          } else {
            copyUsersItem.checked = false
          }
        } else {
          copyUsersItem.checked = false
        }
      })

      return {
        CanSelectUsers,
        CanSelectCopyUsers
      }
    },
    // 选择流程相关 **********************************
    // 选择一条流程 当前组件调用
    selectItem (item) {
      let arr = this.selectedWorkFlows.map((item) => {
        return item.WorkFlowID
      })

      if (!arr.includes(item.WorkFlowID)) {
        this.selectedWorkFlows = [item]
      } else {
        this.selectedWorkFlows = []
      }
    },
    // 获取选择的流程数据
    getCurrentFlowItem () {
      return this.selectedWorkFlows[0]
    },
    // 节点相关 **************************************
    // 节点选择的时候选择节点
    // 查询是否有异常节点
    _findUnormalNodeList () {
      return this.NodeLists.filter((item) => {
        if (!item.Status) {
          return item
        }
      })
    },
    // 是否显示正常节点
    _normalNodeIsShow (row) {
      if (row.SendUserMode === 'Normal' && this.filterNormalNode) {
        return false
      } else {
        return true
      }
    },
    // 转变状态的显示
    _tranformStatus (status) {
      return status === true ? '正常' : '异常'
    },
    // 转变NodeList的action操作
    _transformNodeListAction (row) {
      let CanSendUsers = row.CanSendUsers
      let SendUserMode = row.SendUserMode

      if (CanSendUsers) {
        switch (SendUserMode) {
          case 'ByDraft':
            if (CanSendUsers.length === 0) {
              return '选择人员'
            } else {
              return '二次筛选'
            }
          case 'ByMainNode':
            if (CanSendUsers.length === 0) {
              return '选择人员(指定节点定义,微信无法操作)'
            } else {
              return '二次筛选(指定节点定义,微信无法操作)'
            }
          case 'BySendUser':
            return '发送时定义'
        }
      } else {
        return ''
      }
    },
    // 选择当前节点
    _draftUser (item) {
      let row = this.currentNodeList = Object.assign({}, item)
      let SendUserMode = row.SendUserMode

      if (SendUserMode === 'ByDraft') {
        this.ConfigUserList = [...row.CanSendUsers]
        this._openPositionAndUserBlock(row)
      }
    },
    // 获取岗位人员
    _openPositionAndUserBlock (row) {
      this.currentRow = Object.assign({}, row)
      this.$refs.positionUserList.load()
    },
    // 完成起草
    _completeByDraft (lists) {
      let row = this.currentRow
      let params = Object.assign(this.positionUserParams, {
        NodeCode: row.NodeCode,
        ConfigUserList: lists
      })

      if (lists.length === 0) {
        this.AlertShowEvent('人员不能为空')
        return false
      }

      this.byDraft.users = [...lists]
      this.byDraft.NodeCode = row.NodeCode

      this.NodeLists.forEach((item, index) => {
        if (item.NodeCode === row.NodeCode) {
          item.UserList = JSON.stringify(lists)
          item.CanSendUsers = lists
          item.Status = true
        }
      })

      this.ConfigUserList = []
      this.FlowActionData(JSON.stringify(params)).then(() => {
        this.ToastShowEvent('完成选择')
      }).catch((e) => {
        this.AlertShowEvent(e.message)
      })
    },
    _setTextColor (nodeList) {
      if (nodeList.Status) {
        return ''
      } else {
        return 'action'
      }
    },
    _setCanselectUserString (item) {
      let lists = [...item.CanSendUsers]
      if (item.Status) {
        return lists.map((item) => {
          return item.UserName
        }).join('，')
      } else {
        return ''
      }
    },
    // 全局相关 **************************************
    // 控制步奏的显示
    isShow (stop) {
      return this.currentStop === stop
    },
    // 返回表单
    cancel () {
      this.$router.back()
    },
    ...mapActions([
      'GetInformCount',
      'FlowActionData',
      'AlertShowEvent',
      'ToastShowEvent'
    ])
  },
  destroyed () {
    this.timer && clearTimeout(this.timer)
  },
  components: {
    PersonSelectList,
    XTextarea,
    Group,
    InlineXSwitch,
    CheckIcon,
    LineBreak,
    PositionUserList
  }
}
</script>
<style lang="less" rel="stylesheet/less">
  @import "~common/styles/mixin.less";
  @import "~common/styles/colors.less";

  .work-node-select {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 100;
    width: 100%;
    background-color: #EBEBEB;
    &.slide-enter-active, &.slide-leave-active{
      transition: all 0.3s
    }
    &.slide-enter, &.slide-leave-to{
      transform: translate3d(100%, 0, 0)
    }
    .before-select-content, .node-select-content, .after-select-content {
      width: 100%;
      height: 100%;
    }
    .before-select-content, .node-select-content, .after-select-content {
      .workflow-select, .people-select, .node-select{
        width: 100%;
        height: calc(100% - 45px);
        overflow-y: auto;
        .select-lists {
          .select-list {
            margin-bottom: 10px;
          }
        }
      }
      .workflow-select, .node-select,.people-select {
        .header {
          display: flex;
          width: 100%;
          background-color: #ffffff;
          line-height: 40px;
          .title {
            min-width: 0px;
            flex: 1;
            padding: 0 10px;
            font-size: 16px;
            color: rgba(0, 0, 0, 0.8);
          }
          .toggle-bar {
            min-width: 0px;
            flex: 0 0 60px;
            width: 60px;
            height: 40px;
            text-align: center;
            position: relative;
            .toggle-switch {
              .positionCenter();
              .cube-switch-ui {
                background-color: @mainColor;
                border-color: @mainColor;
              }
            }
          }
        }
        .people-content {
          margin-top: 10px;
          height: calc(60% - 50px);
          background-color: #ffffff;
          overflow-y: auto;
          transition: all 0.3s;
          .next-node-list {
            border-bottom: 20px solid #EBEBEB;
            .node-list-title {
              padding: 10px;
              font-size: 14px;
              display: flex;
              border-left: 3px solid @mainColor;
              .name {
                flex: 1;
                min-width: 0px;
              }
              .check-box {
                flex: 0 0 30px;
                position: relative;
                .vux-check-icon {
                  .positionCenter();
                }
              }
            }
            .next-node-list-unit {
              .title {
                padding: 10px;
                font-size: 14px;
                background-color: #f1f1f1;
              }
              .people-lists {
                padding: 0 10px;
                .people-list {
                  padding: 12px 0;
                  font-size: 14px;
                  display: flex;
                  .bottom-line();
                  &:last-child {
                    .no-bottom-line();
                  }
                  .user-name {
                    flex: 1;
                    min-width: 0px;
                  }
                  .check-box {
                    flex: 0 0 30px;
                    position: relative;
                    .vux-check-icon {
                      .positionCenter();
                    }
                  }
                }
              }
            }
          }
        }
        .approve-text-content {
          .text-title {
            padding: 10px;
            font-size: 16px;
          }
          .textarea-content .weui-cells {
            margin-top: 0;
          }
        }
      }
      .node-select, .node-select-lists, .node-select-list, .list-inner{
        width: 100%;
      }
      .node-select .node-select-lists .node-select-list {
        margin-bottom: 10px;
        background-color: #ffffff;
        &.selected {
          background-color: #dddddd;
        }
      }
      .node-select-list .list-inner {
        .name {
          color:#007ACC;
          opacity: 0.7;
        }
        .text {
          color: rgba(0, 0, 0, 0.6);
          &.action {
            color: #295AA6;
          }
        }
        .list-inner-header {
          display: flex;
          width: 100%;
          padding: 5px;
          font-size: 14px;
          .node-name {
            flex: 1;
            min-width: 10px;
            .css3-ellipsis();
          }
          .node-status {
            flex: 0 0 100px;
            min-width: 10px;
            text-align: center;
          }
        }
        .list-inner-body {
          width: 100%;
          font-size: 14px;
          .node-info {
            padding: 5px;
            line-height: 18px;
          }
          .node-action {
            padding: 10px 5px;
          }
        }
      }
      .person-select-bar {
        display: flex;
        .top-line();
        background-color: #ffffff;
        font-size: 16px;
        .select-bar {
          flex: 1;
          line-height: 45px;
          text-align: center;
          &:first-child {
            border-right: 1px solid #dddddd;
          }
        }
      }
    }
  }
</style>
