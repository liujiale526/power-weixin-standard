<template>
  <div class="login-box">
    <div v-if="tokenErr" class="token-error-wrap">
      登录超时,等重新登录
    </div>
    <div class="login-logo">
      <img class="logo-bg" src="./login-banner.png">
      <div class="logo-content">
        <img class="logo" src="./logo.png">
        <h3 class="logo-text">PowerOn</h3>
        <h3 class="logo-text">普华项目管理系统</h3>
      </div>
    </div>
    <div class="inputs-warp">
      <div class="row-input">
        <div class="icon">
          <span class="fa fa-user"></span>
        </div>
        <div class="input-box">
          <div class="input-inner">
            <input v-model="Name" type="text" contenteditable="true" placeholder="用户名">
          </div>
        </div>
      </div>
      <div class="row-input">
        <div class="icon">
          <span class="fa fa-lock"></span>
        </div>
        <div class="input-box">
          <div class="input-inner">
            <input v-model="PassWord" type="password" contenteditable="true" placeholder="输入密码">
          </div>
        </div>
      </div>
    </div>
    <div class="login-btn-wrap">
      <div @click="login" @keyup.enter="login" class="login-btn">登录</div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import { mapGetters, mapActions, mapMutations } from 'vuex'
import { getTokenString } from 'api/login.js'

const debug = process.env.NODE_ENV !== 'production'

export default {
  data () {
    return {
      Name: '',
      PassWord: '',
      mx_message: '',
      mx_alertShow: false,
      mx_alertTitle: '提示',
      mx_toastShow: false,
      mx_deleyTime: 1000
    }
  },
  created () {
    this.keydownEvent()
  },
  computed: {
    ...mapGetters([
      'tokenErr'
    ])
  },
  mounted () {
    let Token = getTokenString()

    if (Token) {
      this.$router.push('/business')
    }
  },
  methods: {
    // 解绑
    unbindKeyDown () {
      document.removeEventListener('keydown', this.bindKeyDown)
    },
    // 绑定事件
    bindKeyDown (e) {
      var keyCode = e.keyCode
      if (keyCode === 13) {
        if (!this.Name) {
          return false
        }
        this.login()
      }
    },
    // 点击enter 执行提交
    keydownEvent () {
      document.addEventListener('keydown', this.bindKeyDown)
    },
    // 登录事件
    login () {
      // 先执行登录
      this.LoginIN({
        Name: this.Name,
        PassWord: this.PassWord
      }).then(() => {
        this.SetTokenError(false)
        // 在执行获取UserSession
        this.GetUserSession().then((res) => {
          let { HumanId } = res
          this.UserSession = Object.assign({}, res)

          if (debug) {
            this.$router.push('/business')
          } else {
            window.open('/weixin3.0/Reg.ashx?hum=' + HumanId, '_self')
          }
        }).catch((e) => {
          this.AlertShowEvent(e.message)
        })
      }).catch((e) => {
        this.AlertShowEvent(e.message)
      })
    },
    ...mapActions([
      'LoginIN',
      'GetUserSession',
      'AlertShowEvent'
    ]),
    ...mapMutations({
      'SetTokenError': 'TOKENERR'
    })
  },
  destroyed () {
    this.unbindKeyDown()
  }
}
</script>
<style lang="less" scoped  rel="stylesheet/less">
  @import "~common/styles/mixin.less";
  @import "~common/styles/transition.less";

  .login-box{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 100;
    .baseBgColor();
    .token-error-wrap {
      height: 40px;
      width: 100%;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 100;
      background-color: rgba(0, 0, 0, 0.6);
      line-height: 40px;
      text-align: center;
      font-size: 16px;
      color: red;
    }
    .login-logo {
        position: relative;
        width: 100%;
        height: 0;
        padding-top: 70%;
        overflow: hidden;
      .logo-bg {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
      }
      .logo-content {
        height: 80%;
        width: 80%;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        .logo {
          display: block;
          width: 100px;
          height: 100px;
          margin: 0 auto;
          animation: Rotate 10s infinite linear;
        }
        .logo-text {
          color: #fff;
          font-family: "PingFangSC-Regular", sans-serif;
          font-size: 18px;
          text-align: center;
          padding: 10px;
        }
      }
    }
    .inputs-warp{
      margin-top: 10px;
      padding: 20px 10px;
      .row-input{
        padding: 5px;
        margin: 20px 0;
        border-bottom: 1px solid #ddd;
        display: flex;
        .icon{
          position: relative;
          width: 30px;
          height: 30px;
          flex: 0 0 30px;
          font-size: 20px;
          .active-status();
          .fa{
            position: absolute;
            top:50%;
            left:50%;
            transform: translate(-50%,-50%);
          }
        }
        .input-box{
          flex:1;
          .input-inner{
            input{
              display: block;
              width: calc(100% - 20px);
              padding: 5px 10px;
              font-size: 14px;
              background-color: transparent;
            }
          }
        }
      }
    }
    .login-btn-wrap {
      width: 100%;
      .login-btn{
        width: 85%;
        margin: 0 auto;
        color: #fff;
        text-align: center;
        padding: 10px;
        border-radius: 5px;
        background-color: #007ACC;
      }
    }
  }
</style>
