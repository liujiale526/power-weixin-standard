<template>
  <div class="banners">
    <div v-if="type==='project'" class="banner-list type-1">
      <img class="banner-bg" src="./banner.png">
      <div class="human-message">
        <div class="project-message">
          <div class="project-msg-wrap">
            <div class="project-name">
              <p>{{ projectInfo.project_name || '' }}</p>
            </div>
          </div>
          <div @click="changeShow" class="icon-wrap">
            <x-icon type="ios-arrow-right" size="25"></x-icon>
          </div>
        </div>

        <div class="project-time">
          <div class="time-list">
            <p>计划开工</p>
            <p>{{ _formatDate(projectInfo.target_start_date) || '0000-00-00' }}</p>
          </div>
          <div class="time-list">
            <p>计划竣工</p>
            <p>{{ _formatDate(projectInfo.target_end_date) || '0000-00-00' }}</p>
          </div>
        </div>
      </div>
    </div>

    <div v-if="type==='base'" class="banner-list type-2">
      <img class="banner-bg" src="./banner.png">
      <div class="human-message">
        <div class="avatar">
          <img class="header-logo" src="./default-sir.jpg" alt="头像">
        </div>
        <div class="message">
          <p>
            <span>你好</span>
            <span class=""></span>
            <span>{{ UserSession.UserName || "" }}</span>
          </p>
          <p>
            <span>{{ UserSession.UserCode || "" }}</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import { mapGetters, mapMutations, mapActions } from 'vuex'
import { ProjectInfo } from 'api/index.js'
import { getStoreUserSession } from 'api/UserSession.js'
import { formatDate } from 'common/js/Util.js'

export default {
  props: {
    type: {
      type: String,
      default: 'project'
    }
  },
  data () {
    return {
      projectInfoMsg: {},
      UserSession: {}
    }
  },
  computed: {
    ...mapGetters([
      'projectInfo'
    ])
  },
  created () {
    this.UserSession = getStoreUserSession()
  },
  mounted () {
    if (this.type === 'project') {
      if (this.timer) {
        clearTimeout(this.timer)
      }

      this.timer = setTimeout(() => {
        this.getProjectInfo()
      }, 500)
    }
  },
  methods: {
    // 获取项目详情
    getProjectInfo () {
      let { EpsProjId } = this.UserSession
      ProjectInfo(EpsProjId).then((response) => {
        this.setProjectInfo(response.data)
        this.projectInfoMsg = Object.assign({}, response.data)
      }).catch((e) => {
        this.AlertShowEvent(e)
      })
    },
    _formatDate (time) {
      return formatDate(time)
    },
    // 打开切换项目面板
    changeShow () {
      this.$router.push('/changeproject')
    },
    ...mapMutations({
      setProjectInfo: 'SET_PROJECTINFO'
    }),
    ...mapActions([
      'AlertShowEvent'
    ])
  }
}
</script>
<style lang="less" scoped  rel="stylesheet/less">
@import "~common/styles/mixin.less";

.banners {
  .banner-list {
    position: relative;
    width: 100%;
    height: 0;
    padding-top: 40%;
    overflow: hidden;
    &.type-1 {
      .banner-bg {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
      }
      .human-message {
        width: 80%;
        position: absolute;
        top: 20%;
        left: 50%;
        transform: translate(-50%, -7.5%);
        .project-message {
          display: flex;
          width: 100%;
          height: 100%;
          .project-msg-wrap {
            flex: 1;
            width: 100%;
            .project-name {
              line-height: 18px;
              text-align: center;
              color: #ffffff;
              font-size: 14px;
              padding: 5px;
              p {
                width: 100%;
              }
            }
          }
          .icon-wrap {
            flex: 0 0 20px;
            width: 20px;
            height: 20px;
            .vux-x-icon {
              fill: #ffffff;
            }
          }
        }
        .project-time {
          display: flex;
          width: 100%;
          .time-list {
            flex: 1;
            padding: 5px 0;
            border-right: 1px solid #ffffff;
            &:last-child {
              border-right: 1px solid transparent;
            }
            p {
              padding: 5px 0;
              text-align: center;
              color: #ffffff;
              font-size: 14px;
            }
          }
        }
      }
    }
    &.type-2 {
      .banner-bg {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
      }
      .human-message {
        width: 80%;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        display: flex;
        .avatar {
          width: 60px;
          height: 60px;
          flex: 0 0 60px;
          .header-logo{
            display: block;
            width: 100%;
            height: 100%;
            border-radius: 50%;
          }
        }
        .message{
          flex: 1;
          font-size: 14px;
          padding-left: 20%;
          color: #ffffff;
          text-align: left;
          p {
            line-height: 30px;
          }
        }
      }
    }
  }
}
</style>
