<template>
  <transition name="slide">
    <div class="work-node-select">
      <div class="after-select-content">
        <div class="people-select">
          <header class="header">
            <div class="title">人员选择</div>
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
                <h1 class="title">
                  <span>可送审人员</span>
                  <span
                    class="add-btn"
                    v-if="_judgeIsByDraft(NextNodeListItem)"
                    @click="openUserBlock(NextNodeListItem)"
                    >
                    {{_defineShowName(NextNodeListItem)}}
                  </span>
                </h1>
                <ul class="people-lists">
                  <li class="people-list"
                      v-for="(CanSelectUsersItem, CanSelectUsersIndex) in NextNodeListItem.CanSelectUsers"
                      :key="CanSelectUsersItem.UserID"
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
                      :key="CanSelectCopyUsersItem.UserID"
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
          <div @click="cancel" class="select-bar">
            <span>返回</span>
          </div>
          <div @click="submitFlow" class="select-bar">
            <span>提交</span>
          </div>
        </div>
      </div>

      <position-user-list
        ref="positionUserList"
        :currentUserList="currentUserList"
        @complete="completeSelectUser"
      ></position-user-list>
    </div>
  </transition>
</template>
<script type="text/ecmascript-6">
import { mapActions } from 'vuex'
import PositionUserList from 'base/position-user-list/position-user-list.vue'
import PersonSelectList from 'base/person-select-list/person-select-list.vue'
import { EFlowOperate, EFlowLineType, ESendUserMode } from 'common/js/config.js'
import { XTextarea, Group } from 'vux'
import CheckIcon from 'base/check-icon/check-icon.vue'

export default {
  name: 'workflow',
  data () {
    return {
      sendResultInfo: {},
      showPeopleContent: true,
      MindInfo: '',
      IsMindMustInput: true,
      NextNodeList: [],
      current: {},
      currentUserList: [],
      currentNodeCode: ''
    }
  },
  computed: {
    // 计算指定容器的高度
    PeopleContentHeight () {
      return this.showPeopleContent ? 'calc(60% - 50px)' : '0px'
    },
    // 获取url链接里面的参数
    query () {
      return this.$router.history.current.query
    },
    // 获取表单的当前状态
    formState () {
      return this.query.FormState
    }
  },
  mounted () {
    this.workNodeLoad()
  },
  methods: {
    // 执行数据加载
    workNodeLoad () {
      if (this.query.flowOperate) {
        this.getSelectPeople()
      }
    },
    // 获取 可选人员流程数据
    getSelectPeople () {
      let obj = Object.assign({}, {
        WorkInfoID: this.query.WorkInfoID,
        FormId: this.query.FormId,
        KeyWord: this.query.KeyWord,
        KeyValue: this.query.KeyValue,
        SequeID: this.query.SequeID
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

      let params = {
        Current: obj,
        FlowOperate: EFlowOperate.SupplyInstance,
        SubOperate: 'ReadSendNodeList'
      }

      this.FlowActionData(JSON.stringify(params)).then((response) => {
        let value = response.data.value
        let NextNodeList = []

        if (value) {
          this.sendResultInfo = Object.assign({}, value)
          NextNodeList = value.NextNodeList || NextNodeList
        }

        this.current = Object.assign({}, value.Current)
        this.NextNodeList = this.formatNextNodeList(NextNodeList)
      }).catch((e) => {
        this.AlertShowEvent(e.message)
      })
    },
    // 提交意见
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
        this.ToastShowEvent('完成提交')
        this.GetInformCount().then(() => {
          if (this.timer) {
            clearTimeout(this.timer)
          }

          this.timer = setTimeout(() => {
            if (this.formState === 'view') {
              this.$router.push('/workinfos')
            } else {
              this.$router.back()
            }
          }, 1000)
        }).catch((e) => {
          this.AlertShowEvent(e)
        })
      }).catch((e) => {
        this.AlertShowEvent(e.message)
      })
    },
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
    // 获取选择的节点和人员(送审和抄送) 组织数据
    getSelectedNode () {
      let array = []
      let msg = ''

      this.NextNodeList.forEach((item, index) => {
        let obj = {}
        obj.NodeCode = item.NodeCode
        obj.SendUserList = []
        obj.CopyUserList = []

        if (item.checked) {
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

          if (obj.SendUserList.length === 0 && !item.IsMustNotUsers) {
            msg = `${item.NodeName}节点没有选择送审人员`
          }

          if (item.checked) {
            array.push(obj)
          }
        }
      })

      if (array.length === 0) {
        msg = `节点数据为空,请选择一个节点`
      }

      return {
        data: array,
        error: msg
      }
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
    // 返回路由
    cancel () {
      this.$router.back()
    },
    // 打开人员选择面板
    openUserBlock (node) {
      this.currentUserList = [...node.CanSelectUsers]
      this.currentNodeCode = node.NodeCode
      this.$refs.positionUserList.load()
    },
    // 获取自定义起草的人员
    completeSelectUser (data) {
      let NextNodeList = [...this.NextNodeList]
      NextNodeList.forEach((node) => {
        if (node.NodeCode === this.currentNodeCode) {
          node.CanSelectUsers = [...data]
        }
      })

      this.NextNodeList = [...NextNodeList]
      this.currentNodeCode = ''
      this.currentUserList = []
    },
    // 判断当前节点是否需要对人员进行起草
    _judgeIsByDraft (currentSelectNodeList) {
      if (this.sendResultInfo.IsAllPass) {
        let SendUserMode = currentSelectNodeList.SendUserMode

        switch (SendUserMode) {
          case ESendUserMode.Normal:
            return false
          case ESendUserMode.ByDraft:
            return true
          case ESendUserMode.BySendUser:
            return false
          default:
            return false
        }
      } else {
        return false
      }
    },
    // 判断选择人员的时候 要显示什么名称
    _defineShowName (currentSelectNodeList) {
      let CanSelectUsers = currentSelectNodeList.CanSelectUsers
      if (CanSelectUsers.length > 0) {
        return '二次筛选'
      } else {
        return '选择人员'
      }
    },
    ...mapActions([
      'GetInformCount',
      'FlowActionData',
      'AlertShowEvent',
      'ToastShowEvent'
    ])
  },
  destroyed () {
    if (this.timer) {
      clearTimeout(this.timer)
    }
  },
  components: {
    PersonSelectList,
    XTextarea,
    Group,
    CheckIcon,
    PositionUserList
  }
}
</script>
<style lang="less" rel="stylesheet/less">
  @import "~common/styles/mixin.less";
  @import "~common/styles/colors.less";

  .work-node-select {
    position: absolute;
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
    .after-select-content {
      width: 100%;
      height: 100%;
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
          -webkit-overflow-scrolling: touch;
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
                .add-btn {
                  float: right;
                  color: @mainColor;
                }
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
