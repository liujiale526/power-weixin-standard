<template>
  <transition name="slide">
    <div class="message-box" ref="messageBox">
      <div class="message-header" ref="messageHeader">
        <cube-tab-bar
          v-model="selectedLabel"
          showSlider
          :useTransition="false"
          ref="tabNav"
          :data="tabLabels"
        >
      </cube-tab-bar>
      </div>

      <div class="message-content">
        <cube-slide
          ref="slide"
          v-if="ready"
          :loop="false"
          :initial-index="initialIndex"
          :auto-play="false"
          :show-dots="false"
          :options="slideOptions"
          @scroll="scroll"
          @change="changePage"
        >
          <cube-slide-item>
            <cube-scroll
                ref="Infos"
                :data="Infos"
                :options="scrollOptions"
                @pulling-down="onPullingDown('Infos')"
                @pulling-up="onPullingUp('Infos')"
              >
              <div class="message-item info">
                <div class="search-wrap">
                  <search-box
                    placeholder="搜索项目、标题"
                    target="Infos"
                    v-model="searchQuery"
                    @change="searchFunc"
                  ></search-box>
                </div>
                <ul class="message-lists">
                  <li @click="openFrom(item)" v-for="(item, index) in Infos" :key="index" class="message-list">
                    <div class="list-inner">
                      <div class="list-header">
                        <span class="fa fa-file-text-o font-color-blue"></span>
                        <span class="title">{{ item.Title }}</span>
                      </div>
                      <div class="list-body">
                        <p>
                          <span>发起人:</span>
                          <span>{{ item.FromHumanName }}</span>
                        </p>
                        <p>
                          <span>到达时间:</span>
                          <span>{{ _FormatDate(item.wfDate) }}</span>
                        </p>
                        <p>
                          <span>项目:</span>
                          <span>{{ item.EpsProjName }}</span>
                        </p>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </cube-scroll>
          </cube-slide-item>
          <cube-slide-item>
            <cube-scroll
                ref="Actived"
                :data="Actived"
                :options="scrollOptions"
                @pulling-down="onPullingDown('Actived')"
                @pulling-up="onPullingUp('Actived')"
              >
              <div class="message-item info">
                <div class="search-wrap">
                  <search-box
                    placeholder="搜索项目、标题"
                    target="Actived"
                    v-model="searchQuery"
                    @change="searchFunc"
                  ></search-box>
                </div>
                 <ul class="message-lists">
                  <li  @click="openFrom(item)" v-for="(item, index) in Actived" :key="index" class="message-list">
                    <div class="list-inner">
                      <div class="list-header">
                        <span class="fa fa-file-text-o font-color-blue"></span>
                        <span class="title">{{ item.Title }}</span>
                      </div>
                      <div class="list-body">
                        <p>
                          <span>处理人:</span>
                          <span>{{ item.ToHumanName }}</span>
                        </p>
                        <p>
                          <span>到达时间:</span>
                          <span>{{ _FormatDate(item.wfDate) }}</span>
                        </p>
                        <p>
                          <span>项目:</span>
                          <span>{{ item.EpsProjName }}</span>
                        </p>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </cube-scroll>
          </cube-slide-item>
          <cube-slide-item>
            <cube-scroll
                ref="Join"
                :data="Join"
                :options="scrollOptions"
                @pulling-down="onPullingDown('Join')"
                @pulling-up="onPullingUp('Join')"
              >
              <div class="message-item info">
                <div class="search-wrap">
                  <search-box
                    placeholder="搜索项目、标题"
                    target="Join"
                    v-model="searchQuery"
                    @change="searchFunc"
                  ></search-box>
                </div>
                <ul class="message-lists">
                  <li  @click="openFrom(item)" v-for="(item, index) in Join" :key="index" class="message-list">
                    <div class="list-inner">
                      <div class="list-header">
                        <span class="fa fa-file-text-o font-color-blue"></span>
                        <span class="title">{{ item.Title }}</span>
                      </div>
                      <div class="list-body">
                        <p>
                          <span>发起人:</span>
                          <span>{{ item.FromHumanName }}</span>
                        </p>
                        <p>
                          <span>到达时间:</span>
                          <span>{{ _FormatDate(item.wfDate) }}</span>
                        </p>
                        <p>
                          <span>项目:</span>
                          <span>{{ item.EpsProjName }}</span>
                        </p>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </cube-scroll>
          </cube-slide-item>
        </cube-slide>
      </div>
      <div class="back-btn-wrap">
        <back-btn where="peopleCenter"></back-btn>
      </div>
    </div>
  </transition>
</template>
<script type="text/ecmascript-6">
import { mapMutations, mapActions } from 'vuex'
import { SwitchesBox, SearchBox, backBtn } from 'components'
import { findIndex, formatDate } from 'common/js/Util.js'
import { errLoginMixin } from 'common/js/mixin.js'

export default {
  mixins: [errLoginMixin],
  name: 'workflow',
  data () {
    return {
      searchQuery: '',
      ready: false,
      notifyInfos: {},
      selectedLabel: '待处理的',
      tabLabels: [
        {
          label: '待处理的'
        },
        {
          label: '我发起的'
        },
        {
          label: '我参与的'
        }
      ],
      messageHeight: 200,
      slideOptions: {
        listenScroll: true,
        probeType: 3,
        directionLockThreshold: 0
      },
      scrollOptions: {
        directionLockThreshold: 0,
        pullDownRefresh: {
          threshold: 60,
          txt: '刷新成功'
        },
        pullUpLoad: true
      },
      Infos: [],
      Actived: [],
      Join: [],
      currentPage: {
        Infos: 0,
        Actived: 0,
        Join: 0
      }
    }
  },
  created () {
    this.checkHeight()

    window.addEventListener('resize', () => {
      this.checkHeight()
    })
  },
  computed: {
    initialIndex () {
      let index = 0
      index = findIndex(this.tabLabels, item => item.label === this.selectedLabel)
      return index
    }
  },
  mounted () {
    // 默认初始加载数据
    let that = this
    this._MyNotifyInfos({
      success (data) {
        that.Infos = [...data.infos]
        that.Actived = [...data.actived]
        that.Join = [...data.join]
      }
    })
  },
  methods: {
    // 下拉刷新
    onPullingDown (type) {
      let that = this
      that.currentPage[type] = 0
      that._MyNotifyInfos({
        type,
        success (data) {
          that[type] = [...data[type.toLowerCase()]]
          that.$refs[type].forceUpdate()
        }
      })
    },
    // 上拉加载下一页数据
    onPullingUp (type) {
      let that = this
      that.currentPage[type] += 1
      that._MyNotifyInfos({
        type,
        index: this.currentPage[type],
        success (data) {
          let newData = [...data[type.toLowerCase()]]

          if (newData.length === 0) {
            that.currentPage[type] -= 1
          }

          that[type] = that[type].concat(newData)
          that.$refs[type].forceUpdate()
        }
      })
    },
    // 搜索
    searchFunc (query, target) {
      this.searchQuery = query

      let that = this
      let search = true
      let type = target

      that.currentPage[type] = 0
      if (query === '' || !query) {
        search = false
      }

      that._MyNotifyInfos({
        type,
        search: search,
        success (data) {
          that[type] = [...data[type.toLowerCase()]]
          that.$refs[type].forceUpdate()
        }
      })
    },
    // 打开待审批的表单
    openFrom (item) {
      if (!item.KeyValue || !item.KeyWord) {
        this.setCurrentMessage(item)
        this.$router.push(`/showMessage/${item.Id}`)
      } else {
        let url = `/weixinform/${item.HtmlPath}/view/${item.KeyValue}`

        if (item.IsPowerMessage === 3) {
          this.$router.push(url)
        } else {
          this.HasReadMessage(item).then(() => {
            this.GetInformCount().then(() => {
              this.$router.push(url)
            }).catch((e) => {
              this.errLogin(e)
            })
          }).catch((e) => {
            this.errLogin(e)
          })
        }
      }
    },
    // 获取通知
    _MyNotifyInfos (option) {
      let types = this.getTypes(option.type)
      let params = Object.assign({}, {
        types: types,
        index: option.index || 0,
        size: option.size || 8,
        swhere: '1=1',
        humanid: ''
      })

      if (option.search) {
        params.swhere += ` and (Title like '%${this.searchQuery}%' or EpsProjName like '%${this.searchQuery}%')`
      }

      this.MyNotifyInfosData(params).then((res) => {
        this.ready = true
        if (option.success) {
          option.success(res.data)
        }
      }).catch((e) => {
        this.ready = false
        this.errLogin(e)
      })
    },
    // 获取数据的分类
    getTypes (type) {
      let types = 'infos,actived,join'

      if (type === 'Infos') {
        types = 'infos'
      } else if (type === 'Actived') {
        types = 'actived'
      } else if (type === 'Join') {
        types = 'join'
      }

      return types
    },
    // 时间格式化
    _FormatDate (date) {
      return formatDate(date, 'yyyy-MM-dd HH:mm:ss')
    },
    changePage (current) {
      this.selectedLabel = this.tabLabels[current].label
    },
    scroll (pos) {
      const x = Math.abs(pos.x)
      const tabItemWidth = this.$refs.tabNav.$el.clientWidth
      const slideScrollerWidth = this.$refs.slide.slide.scrollerWidth
      const deltaX = x / slideScrollerWidth * tabItemWidth
      this.$refs.tabNav.setSliderTransform(deltaX)
    },
    checkHeight () {
      this.$nextTick(() => {
        this.messageHeight =
        this.$refs.messageBox.offsetHeight -
        this.$refs.messageHeader.offsetHeight
      })
    },
    isShow (num) {
      return num === this.currentIndex
    },
    switchItem (index) {
      this.currentIndex = index
    },
    ...mapMutations({
      setCurrentMessage: 'SET_CURRENTMESSAGE'
    }),
    ...mapActions([
      'MyNotifyInfosData',
      'HasReadMessage',
      'GetInformCount',
      'AlertShowEvent'
    ])
  },
  components: {
    SwitchesBox,
    SearchBox,
    backBtn
  }
}
</script>
<style lang="less"  rel="stylesheet/less">
  @import "~common/styles/mixin.less";

  .message-box {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 100;
    width: 100%;
    display: flex;
    flex-direction: column;
    background-color: #F7F7F7;
    &.slide-enter-active, &.slide-leave-active {
      transition: all 0.3s;
    }
    &.slide-enter, &.slide-leave-to {
      transform: translate3d(100%, 0, 0);
    }
    .message-header {
      padding-bottom: 3px;
      min-height: 0px;
      flex:  0 0 44px;
      .cube-tab-bar {
        .cube-tab {
          padding: 13px 0;
          font-size: 14px;
          &.cube-tab_active {
            .active-status();
          }
        }
        .cube-tab-bar-slider {
          background-color: #007ACC;
        }
      }
    }
    .message-content {
      display: block;
      min-height: 0px;
      flex: 1;
      width: 100%;
      position: relative;
      .message-item{
        width: 100%;
        height: 100%;
        position: relative;
        .search-wrap {
          background-color: #ffffff;
          padding: 10px;
        }
        .message-lists {
          width: calc(100% - 20px);
          margin: 0 auto;
          .message-list {
            width: 100%;
            margin-top: 15px;
            background-color: #ffffff;
            border-radius: 5px;
            &:last-child {
              margin-bottom: 10px;
            }
            .list-inner {
              padding: 10px;
              .list-header {
                font-size: 14px;
                text-align: left;
                white-space: normal;
                line-height: 18px;
                span{
                  display: inline-block;
                  &.fa {
                    vertical-align: top;
                  }
                  &.title {
                    color: rgba(0, 0, 0, 0.7);
                  }
                }
              }
              .list-body {
                margin-top: 5px;
                p {
                  text-align: left;
                  padding-top: 5px;
                  color: rgba(0, 0, 0, 0.5);
                  font-size: 12px;
                }
              }
            }
          }
        }
      }
    }
    .back-btn-wrap {
      position: absolute;
      bottom: 50px;
      right: 15px;
      z-index: 500;
    }
  }
</style>
