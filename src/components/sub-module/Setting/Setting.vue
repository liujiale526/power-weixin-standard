<template>
  <transition name="slide">
    <div class="setting">
      <div class="header-block">
        <ul class="lists">
          <li class="list-item">
            <div class="item-block text">姓名</div>
            <div class="item-block name">{{UserInfo.Name}}</div>
            <div class="item-block icon">
              <div class="icon-content">
                <x-icon type="ios-arrow-right" size="20"></x-icon>
              </div>
            </div>
          </li>
          <li class="list-item">
            <div class="item-block text">登录名</div>
            <div class="item-block name">{{UserInfo.Code}}</div>
            <div class="item-block icon">
              <div class="icon-content">
                <x-icon type="ios-arrow-right" size="20"></x-icon>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div class="content">
        <ul class="lists">
          <li @click="openEditBlock('PosiName')" class="list-item">
            <div class="item-block text">职位名称</div>
            <div class="item-block name">{{UserInfo.PosiName}}</div>
            <div class="item-block icon">
              <div class="icon-content">
                <x-icon type="ios-arrow-right" size="20"></x-icon>
              </div>
            </div>
          </li>
          <li @click="openEditBlock('Email')" class="list-item">
            <div class="item-block text">Email</div>
            <div class="item-block name">{{UserInfo.Email}}</div>
            <div class="item-block icon">
              <div class="icon-content">
                <x-icon type="ios-arrow-right" size="20"></x-icon>
              </div>
            </div>
          </li>
          <li @click="openEditBlock('QQ')" class="list-item">
            <div class="item-block text">QQ账号</div>
            <div class="item-block name">{{UserInfo.QQ}}</div>
            <div class="item-block icon">
              <div class="icon-content">
                <x-icon type="ios-arrow-right" size="20"></x-icon>
              </div>
            </div>
          </li>
          <li @click="openEditBlock('WeChat')" class="list-item">
            <div class="item-block text">微信账号</div>
            <div class="item-block name">{{UserInfo.WeChat}}</div>
            <div class="item-block icon">
              <div class="icon-content">
                <x-icon type="ios-arrow-right" size="20"></x-icon>
              </div>
            </div>
          </li>
          <li @click="openEditBlock('Mobile')" class="list-item">
            <div class="item-block text">手机号</div>
            <div class="item-block name">{{UserInfo.Mobile}}</div>
            <div class="item-block icon">
              <div class="icon-content">
                <x-icon type="ios-arrow-right" size="20"></x-icon>
              </div>
            </div>
          </li>
          <li @click="openEditBlock('Birthday')" class="list-item">
            <div class="item-block text">出生日期</div>
            <div class="item-block name">{{UserInfo.Birthday}}</div>
            <div class="item-block icon">
              <div class="icon-content">
                <x-icon type="ios-arrow-right" size="20"></x-icon>
              </div>
            </div>
          </li>
          <li @click="openEditBlock('Schoole')" class="list-item">
            <div class="item-block text">毕业院校</div>
            <div class="item-block name">{{UserInfo.Schoole}}</div>
            <div class="item-block icon">
              <div class="icon-content">
                <x-icon type="ios-arrow-right" size="20"></x-icon>
              </div>
            </div>
          </li>
        </ul>
      </div>

      <div>
        <router-view></router-view>
      </div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
import { mapGetters } from 'vuex'
import { getStoreUserSession } from 'api/UserSession.js'

export default {
  computed: {
    UserSession () {
      return getStoreUserSession()
    },
    ...mapGetters([
      'UserInfo'
    ])
  },
  methods: {
    openEditBlock (field) {
      this.$router.push({
        path: '/peopleCenter/Setting/updateinfo',
        query: {
          field: field
        }
      })
    }
  }
}
</script>
<style lang="less"  rel="stylesheet/less">
  @import "~common/styles/mixin.less";
  @import '~common/styles/colors.less';

  .setting{
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 100;
    width: 100%;
    background-color: #F7F7F7;
    &.slide-enter-active, &.slide-leave-active{
      transition: all 0.3s
    }
    &.slide-enter, &.slide-leave-to{
      transform: translate3d(100%, 0, 0)
    }
    .content {
      margin-top: 15px;
    }
    .header-block, .content {
      width: 100%;
      background-color: @commonBGColor;
      .lists {
        width: 100%;
        .list-item {
          display: flex;
          padding: 0 10px;
          line-height: 40px;
          .bottom-line();
          &:last-child {
            &:after {
              height: 0;
            }
          }
          .item-block {
            font-size: 14px;
            &.text {
              flex: 1;
              color: @commonKeyColor;
            }
            &.name {
              flex: 1;
              text-align: right;
              color: @commonValueColor;
            }
            &.icon {
              flex: 0 0 30px;
              height: 40px;
              width: 30px;
              position: relative;
              .icon-content {
                height: 27px;
                .positionCenter();
                .vux-x-icon {
                  fill: @commonValueColor;
                }
              }
            }
          }
        }
      }
    }
  }
</style>
