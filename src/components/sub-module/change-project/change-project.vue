<template>
  <transition name="slide">
    <div class="change-project" ref="changeProject">
      <div class="header-change">
        <div class="searchWrap">
          <search-box placeholder="搜索项目名称"
            v-model="searchQuery"
            @change="searchChange"
          ></search-box>
        </div>
      </div>
      <div class="switches-wrap">
        <switches-box @switch="switchItem" :currentIndex="currentIndex"></switches-box>
      </div>
      <div class="project-lists-wrap">
        <div class="project-lists-change-wrap" :style="{'transform': 'translate3d(' + this.offset + '%, 0, 0)'}">
          <div class="project-full-msg project">
            <cube-scroll
            :data="projects"
            :options="options"
            @pulling-down="projectPullingDown"
            @pulling-up="projectPullingUp"
            >
              <div class="scroll-wrap">
                <ul class="project-lists">
                  <li @click="_switchEpsProject(item)" v-for="item in projects" :key="item.project_guid" class="project-list">
                    <div class="list-wrap">
                      <div class="icon-box">
                        <img v-lazy="computedLink(item)" alt="">
                      </div>
                      <div class="text-box">
                        <p class="v-text-inner title">
                          {{ item.project_name }}
                        </p>
                        <div class="v-text-inner">
                          <span>开工时间:</span>
                          <span> {{ _formatDate(item.target_start_date) }} </span>
                        </div>
                        <div class="v-text-inner">
                          <span>开工时间:</span>
                          <span>{{ _formatDate(item.target_end_date) }}</span>
                        </div>
                        <div class="v-text-inner">
                          <span>项目经理:</span>
                          <span>{{item.Pro_manager_name}}</span>
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </cube-scroll>
          </div>
          <div class="project-shot-msg eps">
            <cube-scroll
            :data="EPS"
            :options="options"
            @pulling-down="epsPullingDown"
            @pulling-up="epsPullingUp"
            >
              <div class="scroll-wrap">
                <ul class="project-lists">
                  <li @click="_switchEpsProject(item)" v-for="item in EPS" :key="item.project_guid" class="project-list">
                    <div class="shot-list-wrap">
                      <span class="project-eps">{{ item.project_name }}</span>
                    </div>
                  </li>
                </ul>
              </div>
            </cube-scroll>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script type="text/ecmascript-6">
import { mapMutations, mapActions } from 'vuex'
import {
  SearchBox,
  LineBreak,
  SwitchesBox
} from 'components'

import { formatDate } from 'common/js/Util.js'
import { systemConfig } from 'common/js/config.js'

const debug = process.env.NODE_ENV !== 'production'
const DATATYPE = 'yyyy-MM-dd HH:mm:ss'
const SWICTHSUCCESS = '切换成功'

export default {
  name: 'changeproject',
  data () {
    return {
      currentIndex: 0,
      pullDownRefreshThreshold: 60,
      projects: [],
      EPS: [],
      focused: false,
      searchQuery: '',
      searchField: 'project_name',
      epsSize: 20,
      epsIndex: 0,
      projectSize: 10,
      projectIndex: 0
    }
  },
  computed: {
    offset () {
      return this.currentIndex === 0 ? 0 : -50
    },
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
        scrollbar: false
      }
    }
  },
  mounted () {
    // 先加载项目
    this.projectPullingDown()
  },
  methods: {
    // 计算图片地址
    computedLink (item) {
      if (debug) {
        return '/static/img/projectDefault.png'
      } else {
        if (item.EpsProjIcon) {
          return `${systemConfig.imgBaseUrl}${item.EpsProjIcon}`
        } else {
          return '/weixin3.0/static/img/projectDefault.png'
        }
      }
    },
    // 获取项目列表
    getProjects (type = 'normal') {
      let obj = {
        type: 'proj',
        showClose: '0',
        keyword: this.searchQuery,
        index: this.projectIndex + '',
        size: this.projectSize + ''
      }

      this.getEpsProjectsData(obj).then((response) => {
        let data = response.data.value || []

        if (type === 'init') {
          this.projects = [...data]
        } else {
          this.projects = [...this.projects, ...data]
        }

        this.projectIndex += 1

        if (data.length === 0) {
          this.projectIndex -= 1
        }
      }).catch((e) => {
        this.AlertShowEvent(e.message)
      })
    },
    // 项目下拉刷新
    projectPullingDown () {
      this.projectIndex = 0
      this.getProjects('init')
    },
    // 项目滚动事件
    projectPullingUp () {
      this.getProjects()
    },

    // 获取EPS分类
    getEPS (type = 'normal') {
      let obj = {
        type: 'eps',
        showClose: '0',
        keyword: this.searchQuery,
        index: this.epsIndex + '',
        size: this.epsSize + ''
      }

      this.getEpsProjectsData(obj).then((response) => {
        let data = response.data.value || []

        if (type === 'init') {
          this.EPS = [...data]
        } else {
          this.EPS = [...this.EPS, ...data]
        }

        this.epsIndex += 1
        if (data.length === 0) {
          this.epsIndex -= 1
        }
      }).catch((e) => {
        this.AlertShowEvent(e.message)
      })
    },
    // eps下拉刷新
    epsPullingDown () {
      this.epsIndex = 0
      this.getEPS('init')
    },
    // eps滚动加载
    epsPullingUp () {
      this.getEPS()
    },
    // 选择项目
    _switchEpsProject (item) {
      let ProjectGuid = item.project_guid
      this.SwitchEpsProjectData(ProjectGuid).then((response) => {
        this.ToastShowEvent(SWICTHSUCCESS)
        this.setProjectInfo(item)
        this.GetUserSession().then(() => {
          if (this.timer) {
            clearTimeout(this.timer)
          }
          this.timer = setTimeout(() => {
            this.$router.back()
            this.$emit('ReLoad')
          }, 1000)
        }).catch((e) => {
          this.AlertShowEvent(e.message)
        })
      }).catch((e) => {
        this.AlertShowEvent(e.message)
      })
    },
    // 执行搜索
    searchChange (query) {
      this.searchQuery = query

      if (this.currentIndex === 0) {
        this.projectPullingDown()
      } else {
        this.epsPullingDown()
      }
    },
    // 切换tab
    switchItem (index) {
      this.currentIndex = index
      if (this.currentIndex === 0) {
        if (!this.searchQuery) {
          if (this.projects.length === 0) {
            this.getProjects()
          }
        } else {
          this.projectPullingDown()
        }
      } else {
        if (!this.searchQuery) {
          if (this.EPS.length === 0) {
            this.getEPS()
          }
        } else {
          this.epsPullingDown()
        }
      }
    },
    _formatDate (time) {
      return formatDate(time, DATATYPE)
    },
    ...mapMutations({
      setProjectInfo: 'SET_PROJECTINFO'
    }),
    ...mapActions([
      'GetUserSession',
      'getEpsProjectsData',
      'SwitchEpsProjectData',
      'AlertShowEvent',
      'ToastShowEvent'
    ])
  },
  destroyed () {
    this.timer && clearTimeout(this.timer)
  },
  components: {
    SearchBox,
    SwitchesBox,
    LineBreak
  }
}
</script>
<style lang="less" scoped rel="stylesheet/less">
  @import "~common/styles/mixin.less";

  .change-project {
    position: fixed;
    top: 0;
    bottom: 0;
    z-index: 500;
    width: 100%;
    background-color: #ffffff;
    &.slide-enter-active, &.slide-leave-active{
      transition: all 0.3s
    }
    &.slide-enter, &.slide-leave-to{
      transform: translate3d(100%, 0, 0)
    }
    .header-change {
      width: 100%;
      display: flex;
      border-bottom: 1px solid #dddddd;
      line-height: 25px;
      .searchWrap {
        flex: 1;
        padding: 5px;
      }
      .back-icon {
        font-size: 30px;
        width: 30px;
        position: relative;
        color: rgba(0, 0, 0, 0.6);
        transition: all 0.3s;
        .fa {
          position: absolute;
          top:50%;
          left: 50%;
          transform: translate(-50%,-50%);
        }
      }
    }
    .search-wrap {
      width: 100%;
      margin-top: 5px;
    }
    .switches-wrap {
      border-bottom: 1px solid #dddddd;
    }
    .project-lists-wrap {
      width: 200%;
      height: calc(100% - 73px);
      .project-lists-change-wrap {
        width: 100%;
        height: 100%;
        display: flex;
        transition: all 0.3s;
        scroll-wrap {
          width: 100%;
          height: 100%;
        }
        .project-full-msg {
          width: 50%;
          flex: 1;
          .project-lists {
            .project-list {
              border-bottom: 5px solid #EBEEEE;
              &:last-child {
                border-bottom: 0px solid #EBEEEE;
              }
              .list-wrap{
                padding: 10px;
                display: flex;
                .icon-box{
                  width: 70px;
                  height: 70px;
                  flex: 0 0 70px;
                  img{
                    display: block;
                    width: 100%;
                    height: 100%;
                    border-radius: 5px;
                  }
                }
                .text-box {
                  flex: 1;
                  padding-left: 10px;
                  display: flex;
                  min-width: 10px;
                  flex-direction: column;
                  .v-text-inner{
                    flex: 1;
                    font-size: 12px;
                    color: rgba(0, 0, 0, 0.6);
                    padding: 3px 0;
                    &.title {
                      color: rgba(0, 0, 0, 0.9);
                      width: 100%;
                      // .css3-ellipsis();
                    }
                  }
                }
              }
            }
          }
        }
        .project-shot-msg {
          width: 50%;
          flex: 1;
          .shot-list-wrap {
            padding: 15px 10px;
            font-size: 13px;
            .bottom-line();
          }
        }
      }
    }
  }
</style>
