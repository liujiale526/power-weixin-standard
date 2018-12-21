<template>
  <div ref="positionUserList"
    class="position-user-list"
    :style="{'transform': 'translate3d(' + offset + '%, 0, 0)'}">
    <header class="header">
      <div class="search-box-wrap">
        <search-box placeholder="搜索人员姓名/编号/岗位、部门"
          v-model="searchQuery"
          @change="change"
        ></search-box>
      </div>
      <div class="condition-lists">
        <div class="condition-list">
          <div class="text">
            部门
          </div>
          <div @click="changeDepart" class="icon">
            <check-icon :checked="depart"></check-icon>
          </div>
        </div>
        <div class="condition-list">
          <div class="text">
            岗位
          </div>
          <div @click="changePosition" class="icon">
            <check-icon :checked="position"></check-icon>
          </div>
        </div>
      </div>
    </header>
    <line-break></line-break>
    <section class="user-content">
      <div class="user-inner-content">
        <ul class="user-lists">
          <li class="user-list"
            v-for="(item, index) in UserList" :key="index + '@' +item.UserID"
            @click="selectItem(index)"
            >
            <div class="user-list-inner">
              <div class="check-box">
                <div class="check-icon-wrap">
                  <check-icon :checked="item.checked"></check-icon>
                </div>
              </div>
              <div class="user-list-content">
                <div class="user-msg">
                  <div class="msg-item">
                    <span>姓名:</span>
                    <span>{{ item.UserName }}</span>
                  </div>
                  <div class="msg-item">
                    <span>编号:</span>
                    <span>{{ item.UserCode }}</span>
                  </div>
                </div>
                <div class="user-msg">
                  <div class="msg-item">
                    <span>岗位/部门:</span>
                    <span>{{ item.DeptPositionName }}</span>
                  </div>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div class="user-action-bar">
        <div @click="getSelectedUsers" class="user-action">确定</div>
        <div @click="openPrevBlock" class="user-action">预览</div>
        <div @click="hide" class="user-action">取消</div>
      </div>
    </section>
    <section class="prev-view-block" :style="{'transform': 'translate3d(' + prevOffset + '%, 0, 0)'}">
      <h1 class="title">已选择的人员</h1>
      <div class="prev-view-wrap">
        <ul class="prev-view-lists">
          <li
            class="prev-view-list"
            v-for="userItem in selectedLists"
            :key="'prev@' + userItem.UserID"
            >
            <div class="prev-list-msg">
              {{userItem.UserName}} ({{userItem.DeptPositionName}})
            </div>
            <div @click="deletePrevItem(userItem)" class="prev-delete-wrap">
              <i class="cubeic-close"></i>
            </div>
          </li>
        </ul>
      </div>
      <div class="prev-view-actions">
        <div @click="closePrevBlock" class="prev-view-action">
          关闭
        </div>
      </div>
    </section>
  </div>
</template>
<script type="text/ecmascript-6">
import { mapActions } from 'vuex'
import LineBreak from 'base/line/line.vue'
import { SearchBox } from 'components/index.js'
import CheckIcon from 'base/check-icon/check-icon.vue'

export default {
  props: {
    currentUserList: {
      type: Array,
      default () {
        return []
      }
    }
  },
  computed: {
    SourceMode () {
      if (this.depart) {
        return 'DeptAndUser'
      } else {
        return 'PositionAndUser'
      }
    }
  },
  data () {
    return {
      depart: true,
      position: false,
      searchQuery: '',
      UserList: [],
      defaultUserList: [],
      offset: 100,
      prevOffset: 100,
      selectedLists: []
    }
  },
  methods: {
    change (query) {
      this.searchQuery = query
    },
    // 关闭预览面板
    closePrevBlock () {
      this.prevOffset = 100
    },
    // 打开预览面板
    openPrevBlock () {
      this.prevOffset = 0
    },
    // 删除预览中的数据
    deletePrevItem (item) {
      let arr = [...this.selectedLists]
      let UserIDs = arr.map((item) => {
        return item.UserID
      })
      let index = UserIDs.indexOf(item.UserID)
      arr.splice(index, 1)
      this.selectedLists = [...arr]
    },
    // 改变岗位
    changePosition () {
      if (this.position) {
        return false
      }
      this.position = !this.position
      this.depart = !this.depart
      this.loadPositionUsers()
    },
    // 改变 部门
    changeDepart () {
      if (this.depart) {
        return false
      }
      this.depart = !this.depart
      this.position = !this.position
      this.loadPositionUsers()
    },
    // 加载数据入口 加载数据，显示面板
    load () {
      this.show()

      if (this.timer) {
        clearTimeout(this.timer)
      }

      this.timer = setTimeout(() => {
        this.loadPositionUsers()
      }, 300)
    },
    // 选择与取消
    selectItem (index) {
      let UserList = this.UserList.concat()
      UserList[index].checked = !UserList[index].checked

      let checked = UserList[index].checked
      this.toggleSelectItem(UserList, index, checked)
    },
    // 添加选择的数据
    toggleSelectItem (UserList, index, checked) {
      let selectItem = UserList[index]

      UserList.map((listItem, listIndex) => {
        if (selectItem.UserID === listItem.UserID) {
          if (index !== listIndex) {
            listItem.checked = false
          }
        }
        return listItem
      })

      this.UserList = UserList.concat()
      this.selectedLists = this.fliterUser(checked, selectItem)
    },
    // 过滤相同的UserID的人员
    fliterUser (checked, selectItem) {
      let arr = []

      this.selectedLists.forEach((listItem, listIndex) => {
        if (selectItem.UserID !== listItem.UserID) {
          arr.push(listItem)
        }
      })

      if (checked) {
        arr.push(selectItem)
      }

      return arr
    },
    // 加载数据
    loadPositionUsers () {
      let obj = Object.assign({}, {
        Where: '',
        order: 'x1.Name',
        SubOperate: 'ReadUserList',
        SourceMode: this.SourceMode,
        ShowAllEps: 'true',
        pageIndex: 0,
        pageSize: 0,
        Current: {},
        FlowOperate: 'SupplyFlow'
      })

      this.selectedLists = this.currentUserList.concat()

      this.FlowActionData(JSON.stringify(obj)).then((response) => {
        let value = response.data.value
        let UserList = value.UserList ? JSON.parse(value.UserList).concat() : []

        this.UserList = UserList.concat()

        this.UserList.map((item, index) => {
          item.checked = false
          return item
        })

        this.defaultUserList = this.UserList.concat()
      }).catch((e) => {
        this.AlertShowEvent(e.message)
      })
    },
    // 传回选择的数据
    getSelectedUsers () {
      let selectedLists = JSON.parse(JSON.stringify(this.selectedLists))

      selectedLists.map((item) => {
        delete item.checked
        return item
      })

      this.$emit('complete', selectedLists)
      this.hide()
    },
    // 执行搜索功能
    search (query) {
      let arr = []
      let pattern = new RegExp(query)

      this.defaultUserList.forEach((item) => {
        if (
          pattern.test(item.UserName) ||
          pattern.test(item.UserCode) ||
          pattern.test(item.DeptPositionName)
        ) {
          item.checked = false
          arr.push(item)
        }
      })

      this.UserList = arr.concat()
    },
    // 显示面板
    show () {
      this.offset = 0
    },
    // 隐藏面板
    hide () {
      let UserList = this.UserList.concat()

      UserList.map((item) => {
        item.checked = false
        return item
      })

      this.UserList = UserList
      this.selectedLists = []
      this.offset = 100
    },
    ...mapActions([
      'FlowActionData',
      'AlertShowEvent'
    ])
  },
  watch: {
    searchQuery (query) {
      if (query !== '') {
        this.search(query)
      } else {
        this.load()
      }
    }
  },
  components: {
    LineBreak,
    SearchBox,
    CheckIcon
  }
}
</script>
<style lang="less" rel="stylesheet/less">
  @import "~common/styles/mixin.less";
  @import "~common/styles/colors.less";

  .position-user-list {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow-y: auto;
    background-color: #EBEBEB;
    transition: all 0.3s;
    .header {
      height: 75px;
      background-color: #ffffff;
      padding: 10px 5px;
      .condition-lists {
        display: flex;
        .condition-list {
          flex: 1;
          line-height: 35px;
          display: flex;
          .text {
            flex: 1;
            font-size: 14px;
            text-align: right;
          }
          .icon {
            flex: 1;
          }
        }
      }
    }
    .user-content {
      width: 100%;
      height: calc(100% - 86px);
      .user-inner-content {
        height: calc(100% - 50px);
        overflow-y: auto;
        .user-lists {
          width: 100%;
          .user-list {
            width: 100%;
            .user-list-inner {
              display: flex;
              background-color: #ffffff;
              margin: 5px;
              padding: 3px 0;
              border-radius: 3px;
              .check-box {
                flex: 0 0 50px;
                width: 50px;
                height: 50px;
                position: relative;
                .vux-check-icon {
                  .positionCenter();
                }
              }
              .user-list-content {
                flex: 1;
                .title {
                  padding: 5px 0;
                  font-size: 14px;
                  color: rgba(0, 0, 0, 0.7);
                }
                .user-msg {
                  display: flex;
                  padding: 5px 0;
                  color: rgba(0, 0, 0, 0.7);
                  .msg-item {
                    flex: 1;
                    font-size: 14px;
                  }
                }
              }
            }
          }
        }
      }
      .user-action-bar {
        line-height: 50px;
        display: flex;
        border-top: 1px solid #dddddd;
        background-color: #ffffff;
        .user-action {
          flex: 1;
          text-align: center;
          font-size: 14px;
          border-right: 1px solid #dddddd;
          &:last-child{
            border-right: 1px solid #dddddd;
          }
        }
      }
    }
    .prev-view-block {
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      background-color: @commonBGColor;
      display: flex;
      flex-direction: column;
      transition: all 0.3s;
      .title {
        flex: 0 0 40px;
        padding: 0 10px;
        line-height: 40px;
        color: @mainColor;
        .bottom-line();
      }
      .prev-view-wrap {
        flex: 1;
        overflow-y: auto;
        -webkit-overflow-scrolling: touch;
        .prev-view-lists {
          padding: 5px 10px 5px 10px;
          .prev-view-list {
            display: flex;
            .bottom-line();
            &:last-child {
              &:after {
                height: 0;
              }
            }
            .prev-list-msg {
              flex: 1;
              line-height: 40px;
              font-size: 14px;
            }
            .prev-delete-wrap {
              flex: 0 0 35px;
              font-size: 16px;
              line-height: 40px;
              text-align: center;
            }
          }
        }
      }
      .prev-view-actions {
        flex: 0 0 50px;
        .top-line();
        .prev-view-action {
          line-height: 50px;
          text-align: center;
          font-size: 14px;
        }
      }
    }
  }
</style>
