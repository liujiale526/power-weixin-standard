<template>
  <div class="peopleCenter">
      <cube-scroll
      ref="SettingScroll"
      :options="options"
      @pulling-down="onPullingDown"
      >
        <div class="header">
          <div class="header-top">
            <div class="avatar-wrap">
              <img class="avatar" :src="avatar" alt="头像">
            </div>
            <div class="text-wrap">
              <div class="header-text">
                {{ UserSession.UserName }}
              </div>
              <div class="header-text">
                {{ UserSession.UserCode }}
              </div>
            </div>
            <div @click="GoToPage('peopleCenter/Setting')" class="icon-wrap">
              <div v-if="!isAdmin" class="icon-content">
                <x-icon type="ios-arrow-right" size="25"></x-icon>
              </div>
            </div>
          </div>
          <div class="business-items">
            <div @click="GoToPage('workinfos')" class="business-item">
              <div class="num">{{InformCount.Work}}</div>
              <div class="text">我的审批</div>
            </div>
            <div @click="GoToPage('messageinfos')" class="business-item">
              <div class="num">{{InformCount.Message}}</div>
              <div class="text">我的消息</div>
            </div>
            <div @click="GoToPage('notifyInfos')" class="business-item">
              <div class="num">{{InformCount.Notify}}</div>
              <div class="text">我的通知</div>
            </div>
          </div>
        </div>
        <div class="user-action">
          <div class="action-item">
            <div class="change-text">
              <i class="fa fa-unlock" aria-hidden="true"></i>
              修改密码
            </div>
            <div @click="GoToPage('peopleCenter/resetpassword')" class="change-icon ">
              <div class="icon-wrap">
                <x-icon type="ios-arrow-right" size="20"></x-icon>
              </div>
            </div>
          </div>
          <div class="action-item">
            <div class="change-text">
              <i class="fa fa-list" aria-hidden="true"></i>
              设置子表主题
            </div>
            <div @click="GoToPage('peopleCenter/settablestyle')" class="change-icon ">
              <div class="icon-wrap">
                <x-icon type="ios-arrow-right" size="20"></x-icon>
              </div>
            </div>
          </div>
          <div class="action-item">
            <div class="change-text">
              <i class="fa fa-sign-out" aria-hidden="true"></i>
              强制退出(慎用)
            </div>
            <div @click="clearStore" class="change-icon ">
              <div class="icon-wrap">
                <x-icon type="ios-arrow-right" size="20"></x-icon>
              </div>
            </div>
          </div>
        </div>
        <div class="sign-out-wrap">
          <div @click="signOut" class="sign-out">
            退出登录
          </div>
        </div>
      </cube-scroll>
    <div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { mapGetters, mapActions } from 'vuex'
import { getStoreUserSession } from 'api/UserSession.js'
import { clearStorage, formatDate } from 'common/js/Util.js'
import { commonComponentMixin } from 'common/js/mixin.js'
import { systemConfig } from 'common/js/config.js'

const debug = process.env.NODE_ENV !== 'production'
const IMGBOOTURL = '/PowerPlat/Control/File.ashx?action=browser&_type=ftp&_fileid='

export default {
  name: 'Setting',
  mixins: [commonComponentMixin],
  data () {
    return {
      title: '我的',
      field: '',
      pullDownRefreshThreshold: 60
    }
  },
  computed: {
    UserSession () {
      return getStoreUserSession()
    },
    isAdmin () {
      return this.UserSession.isAdmin || this.UserSession.IsITAdmin
    },
    ...mapGetters([
      'UserInfo',
      'InformCount'
    ]),
    avatar () {
      // 如果UserSession 里面有HumanHeadSmall
      // 则使用UserSession里面的HumanHeadSmall
      if (this.UserSession.HumanHeadSmall !== '') {
        if (debug) {
          return `${systemConfig.devDomainName}${IMGBOOTURL}${this.UserSession.HumanHeadSmall}`
        } else {
          return `${IMGBOOTURL}${this.UserSession.HumanHeadSmall}`
        }
      } else {
        let Sex = ''
        if (this.UserSession.Sex !== '') {
          Sex = this.UserSession.Sex
        } else if (this.UserInfo.Sex !== '') {
          Sex = this.UserInfo.Sex
        }

        if (debug) {
          switch (Sex) {
            case '0':
              return '/static/img/header/default-lady.jpg'
            case '1':
              return '/static/img/header/default-sir.jpg'
            default:
              return '/static/img/header/default-sir.jpg'
          }
        } else {
          switch (Sex) {
            case '0':
              return '/weixin3.0/static/img/header/default-lady.jpg'
            case '1':
              return '/weixin3.0/static/img/header/default-sir.jpg'
            default:
              return '/weixin3.0/static/img/header/default-sir.jpg'
          }
        }
      }
    },
    options () {
      return {
        pullDownRefresh: {
          threshold: parseInt(this.pullDownRefreshThreshold),
          txt: '刷新成功'
        },
        scrollbar: false
      }
    }
  },
  mounted () {
    this.settingLoad()
  },
  methods: {
    GoToPage (page) {
      let { IsAdmin, IsITAdmin } = this.UserSession
      if (IsAdmin || IsITAdmin) {
        return false
      } else {
        this.$router.push(`/${page}`)
      }
    },
    clearStore () {
      clearStorage()
      this.$router.push('/login')
    },
    // 加载数据
    settingLoad (callback) {
      this.GetInformCount().catch((e) => {
        this.AlertShowEvent(e.message)
      })

      if (!this.isAdmin) {
        this.setUserInfo().then(() => {
          if (callback) { callback() }
        }).catch((e) => {
          this.AlertShowEvent(e.message)
        })
      } else {
        if (callback) { callback() }
      }
    },
    // 下拉刷新
    onPullingDown () {
      this.settingLoad(() => {
        this.$refs.SettingScroll.forceUpdate()
      })
    },
    // 打开更新信息面板
    showUpDateBlock (field) {
      this.field = field
      this.$refs.UpdateHumanInfo.show()
    },
    // 退出
    signOut () {
      this.LoginOUT().then((res) => {
        clearStorage()
        this.$router.push('/login')
      }).catch((e) => {
        this.AlertShowEvent(e.message)
      })
    },
    // 日期
    _formatDate (data) {
      return formatDate(data)
    },
    ...mapActions([
      'setUserInfo',
      'LoginOUT',
      'GetInformCount',
      'AlertShowEvent'
    ])
  }
}
</script>

<style lang="less" scoped  rel="stylesheet/less">
  @import "~common/styles/mixin.less";
  @import '~common/styles/colors.less';

  .peopleCenter {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 56px;
    width: 100%;
    background-color: #f4f4f4;
    overflow-y: auto;
    .header {
      padding: 10px;
      background-color: #ffffff;
      .header-top {
        width: 85%;
        margin: 0 auto;
        display: flex;
         .avatar-wrap {
          flex: 0 0 50px;
          width: 50px;
          height: 50px;
          .avatar {
            display: block;
            width: 100%;
            height: 100%;
            border-radius: 50%;
            border: 1px solid @commonBorderColor
          }
        }
        .text-wrap{
          flex: 1;
          padding: 0 5px 0 15px;
          display: flex;
          flex-direction: column;
          .header-text{
            flex: 1;
            line-height: 25px;
            .baseFontColor()
          }
        }
        .icon-wrap {
          flex: 0 0 30px;
          position: relative;
          .icon-content {
            .positionCenter();
            .vux-x-icon {
              fill:rgba(0, 0, 0, 0.6);
            }
          }
        }
      }
      .business-items {
        width: 100%;
        display: flex;
        margin-top: 10px;
        padding: 15px 0 5px 0;
        .top-line();
        .business-item {
          flex: 1;
          border-right: 1px solid #dddddd;
          &:last-child {
            border-right: 0px solid transparent;
          }
          .num, .text {
            text-align: center;
            padding: 5px 0;
            font-size: 14px;
          }
          .num {
            color: @mainColor;
          }
        }
      }
    }
    .user-action{
      margin-top: 15px;
      .action-item{
        display: flex;
        padding: 0 10px;
        background-color: #ffffff;
        .bottom-line();
        &:last-child {
          &:after {
            height: 0px;
          }
        }
        .change-text{
          flex: 0 0 150px;
          .baseFontColor();
          font-size: 14px;
          line-height: 40px;
          .fa {
            font-size: 16px;
            color: @mainColor;
          }
        }
        .change-icon{
          flex: 1;
          color: rgba(0, 0, 0, 0.7);
          font-size: 14px;
          .icon-wrap {
            width: 100%;
            height: 100%;
            line-height: 40px;
            position: relative;
            .vux-x-icon {
              position: absolute;
              right: 5px;
              top: 50%;
              transform: translate(0, -50%);
              fill:rgba(0, 0, 0, 0.6);
            }
          }
        }
      }
    }
    .sign-out-wrap {
      width: 100%;
      margin-top: 20px;
      background-color: #ffffff;
      .sign-out{
        padding: 15px 0px;
        text-align: center;
        color: @errorColor;
        font-size: 14px;
        .top-line();
        .bottom-line();
      }
    }
  }
</style>
