<template>
  <div class="at-human-block" :style="{'transform': 'translate3d(' + this.offset + '%, 0, 0)'}">
    <div class="people-list-content">
      <div class="search-box-wrap">
        <search-box
          v-model="searchQuery"
          @change="searchChange"
          placeholder="输入名字/登录名"
        ></search-box>
      </div>
      <div class="list-content">
        <cube-scroll
            ref="Scroll"
            :data="List"
            :options="options"
            @pulling-down="onPullingDown"
            @pulling-up="onPullingUp"
          >
          <div>
            <ul class="lists">
              <li
                v-for="item in List" :key="item.Id"
                @click="selectItem(item)"
                class="list-unit">
                <div class="list-inner">
                  <div class="checkbox">
                    <check-break :checked="usersId.includes(item.Id)"></check-break>
                  </div>
                  <div class="list-msg">
                    <div class="name">{{item.Name}}({{item.DeptName}})</div>
                    <div class="code">{{item.Code}}</div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </cube-scroll>
      </div>
    </div>
    <div class="action-btn">
      <div @click="hide" class="action-item">关闭</div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import { mapActions } from 'vuex'
import { SearchBox, checkBreak } from 'components'

const TOLANG = '@人员最多选择3个'
const PULLUP = 'PullUp'
const PULLDOWN = 'PullDown'

export default {
  props: {
    selectUsers: {
      type: Array,
      default () {
        return []
      }
    },
    HumanId: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      searchQuery: '',
      offset: 100,
      List: [],
      index: 0,
      size: 20,
      pullDownRefreshThreshold: 60
    }
  },
  computed: {
    options () {
      return {
        pullDownRefresh: {
          threshold: parseInt(this.pullDownRefreshThreshold),
          txt: '刷新成功'
        },
        pullUpLoad: {
          threshold: parseInt(this.pullDownRefreshThreshold),
          txt: '加载成功'
        },
        scrollbar: true
      }
    },
    usersId () {
      let users = [...this.selectUsers]
      let usersId = users.map((list) => {
        return list.Id
      })

      return usersId
    }
  },
  methods: {
    // 加载数据
    load (type, callback) {
      let params = this.organizeParams(type)

      this.GridPageLoadData(params).then((response) => {
        let value = response.data.value
        if (value) {
          this.organizeGetData(type, [...JSON.parse(value)])
        }
        callback && callback()
      }).catch((e) => {
        this.AlertShowEvent(e.message)
      })
    },
    // 上拉加载
    onPullingUp () {
      this.load(PULLUP, () => {
        this.$refs.Scroll.forceUpdate()
      })
    },
    // 下拉刷新
    onPullingDown () {
      this.load(PULLDOWN, () => {
        this.$refs.Scroll.forceUpdate()
      })
    },
    // 传递赋值 执行搜索
    searchChange (query) {
      this.searchQuery = query
      this.load()
    },
    // 组织参数
    organizeParams (type) {
      // 过滤自己 直接sql过滤，不需要前端在过滤
      let where = ' 1=1 and Id<>\'' + this.HumanId + '\''

      if (!this.searchQuery) {
        this.size = 20
        if (type === 'PullDown') {
          this.index = 0
        } else if (type === 'PullUp') {
          this.index++
        } else {
          this.index = 0
        }
      } else {
        where += ' and (Name like \'%' + this.searchQuery + '%\'' + ' or Code like \'%' + this.searchQuery + '%\')'
        this.index = 0
        this.size = 0
      }

      let params = {
        KeyWord: 'Human',
        KeyWordType: 'BO',
        index: this.index,
        size: this.size,
        swhere: where,
        select: '',
        sort: '',
        extparams: ''
      }

      return params
    },
    // 组织获取的数据
    organizeGetData (type, data) {
      if (!this.searchQuery) {
        if (type === 'PullDown') {
          this.List = [...data]
        } else if (type === 'PullUp') {
          if (data.length === 0) {
            this.index--
          }

          this.List = [...this.List, ...data]
        } else {
          this.List = [...data]
        }
      } else if (this.searchQuery || this.searchQuery !== '') {
        this.List = [...data]
      }
    },
    // 选择人员数据
    selectItem (item) {
      let users = [...this.selectUsers]

      if (!this.usersId.includes(item.Id)) {
        users.push(item)
      } else {
        users = [...this.filerUsers(users, item.Id)]
      }

      if (users.length > 3) {
        this.AlertShowEvent(TOLANG)
        return false
      }

      this.$emit('getAtUsers', users)
    },
    // 过滤数据
    filerUsers (users, Id) {
      let arr = []

      users.forEach((item) => {
        if (item.Id !== Id) {
          arr.push(item)
        }
      })

      return arr
    },
    // 显示面板， 加载数据
    show () {
      // 显示面板
      this.offset = 0
      // 强制渲染scroll组件
      this.$refs.Scroll.forceUpdate()
      // 加载数据
      this.load()
    },
    // 隐藏面板 清空数据
    hide () {
      this.offset = 100
      this.List = []
    },
    ...mapActions([
      'GridPageLoadData',
      'AlertShowEvent'
    ])
  },
  components: {
    SearchBox,
    checkBreak
  }
}
</script>
<style lang="less" rel="stylesheet/less">
  @import "~common/styles/mixin.less";

  .at-human-block {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 100;
    transition: all 0.3s;
    background-color: #ffffff;
    display: flex;
    flex-direction: column;
    .people-list-content {
      flex: 1;
      background-color: #ffffff;
      display: flex;
      flex-direction: column;
      .search-box-wrap {
        padding: 10px;
        flex: 0 0 50px;
        .bottom-line();
      }
      .list-content {
        flex: 1;
        overflow: hidden;
        .lists {
          background-color: #ffffff;
          .list-unit {
            .bottom-line();
            .list-inner {
              display: flex;
              padding: 10px;
              .checkbox {
                flex: 0 0 50px;
              }
              .list-msg {
                flex: 1;
                .name {
                  font-size: 16px;
                }
                .code {
                  font-size: 14px;
                  color: rgba(0, 0, 0, 0.7);
                }
              }
            }
          }
        }
      }
    }
    .action-btn {
      .top-line();
      flex: 0 0 50px;
      display: flex;
      .action-item {
        flex: 1;
        line-height: 50px;
        text-align: center;
        font-size: 14px;
        border-right: 1px solid #dddddd;
        &:last-child{
          border-right: 0px solid transparent;
        }
      }
    }
  }
</style>
