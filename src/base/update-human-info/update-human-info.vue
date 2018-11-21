<template>
  <transition name="slide">
    <div class="update-human-info">
      <div class="inputs-warp">
        <div v-if="field === 'PosiName'" class="row-input">
          <div class="icon">
            <span class="fa fa-user-circle"></span>
          </div>
          <div class="input-box">
            <div class="input-inner">
              <input v-model="UserInfoMsg.PosiName" type="text" contenteditable="true" placeholder="输入职位名称">
            </div>
          </div>
        </div>
        <div v-if="field === 'Email'" class="row-input">
          <div class="icon">
            <span class="fa fa-envelope-o"></span>
          </div>
          <div class="input-box">
            <div class="input-inner">
              <input v-model="UserInfoMsg.Email"  type="text" contenteditable="true" placeholder="输入邮箱">
            </div>
          </div>
        </div>
        <div v-if="field === 'QQ'" class="row-input">
          <div class="icon">
            <span class="fa fa-qq"></span>
          </div>
          <div class="input-box">
            <div class="input-inner">
              <input v-model="UserInfoMsg.QQ" type="number" contenteditable="true" placeholder="输入QQ账号">
            </div>
          </div>
        </div>
        <div v-if="field === 'WeChat'" class="row-input">
          <div class="icon">
            <span class="fa fa-mobile-phone"></span>
          </div>
          <div class="input-box">
            <div class="input-inner">
              <input v-model="UserInfoMsg.WeChat" type="text" contenteditable="true" placeholder="输入微信">
            </div>
          </div>
        </div>
        <div v-if="field === 'Mobile'" class="row-input">
          <div class="icon">
            <span class="fa fa-mobile-phone"></span>
          </div>
          <div class="input-box">
            <div class="input-inner">
              <input v-model="UserInfoMsg.Mobile" type="number" contenteditable="true" placeholder="输入手机号">
            </div>
          </div>
        </div>
        <div v-if="field === 'Birthday'" class="row-input">
          <div class="icon">
            <span class="fa fa-clock-o"></span>
          </div>
          <div class="input-box">
            <div @click="showDataPicker" class="input-inner">
              <input readonly v-model="UserInfoMsg.Birthday" type="text" contenteditable="true" placeholder="输入出生日期">
            </div>
          </div>
        </div>
        <div v-if="field === 'Schoole'" class="row-input">
          <div class="icon">
            <span class="fa fa-fort-awesome"></span>
          </div>
          <div class="input-box">
            <div class="input-inner">
              <input  v-model="UserInfoMsg.Schoole" type="text" contenteditable="true" placeholder="输入毕业院校">
            </div>
          </div>
        </div>
      </div>
      <div class="update-human-btn-wrap">
        <div @click="upDateHuman" class="update-human-btn">
          确定修改
        </div>
      </div>
      <date-picker class="data-picker" ref="updateDataPicker"
        :min="min"
        :max="max"
        :value="value"
        :title="title"
        :format="dateShowFormat"
        @select="selectDate"
      >
      </date-picker>
    </div>
  </transition>
</template>
<script type="text/ecmascript-6">
import { mapGetters, mapActions } from 'vuex'
import { getStoreUserSession } from 'api/UserSession.js'
import { formatDate } from 'common/js/Util.js'
import { DatePicker } from 'cube-ui'

const SAVESUCCESS = '保存成功'

export default {
  created () {
    this.query = this.$router.history.current.query
  },
  computed: {
    field () {
      return this.query.field
    },
    UserInfoMsg () {
      return Object.assign({}, this.UserInfo)
    },
    ...mapGetters([
      'UserInfo'
    ])
  },
  data () {
    return {
      title: '日期',
      query: {},
      min: new Date(1900, 1, 1),
      max: new Date(2100, 12, 30),
      value: new Date(),
      dateShowFormat: {year: 'YYYY', month: 'MM', date: 'DD'}
    }
  },
  methods: {
    // 选择日期
    selectDate (selectDate) {
      this.UserInfo.Birthday = formatDate(selectDate)
    },
    // 显示日期面板
    showDataPicker () {
      this.$refs.updateDataPicker.show()
    },
    // 更新Human的数据信息
    upDateHuman () {
      let UserSession = getStoreUserSession()

      // 提交数据
      this.UpDatedHumanInfo(this.UserInfoMsg, UserSession).then(() => {
        // 提交成功之后更新数据
        this.setUserInfo()
        this.ToastShowEvent(SAVESUCCESS)

        if (this.timer) {
          clearTimeout(this.timer)
        }

        this.timer = setTimeout(() => {
          this.$router.back()
        }, 1000)
      }).catch((e) => {
        if (!UserSession.isAdmin) {
          this.AlertShowEvent(e.message)
        }
      })
    },
    ...mapActions([
      'UpDatedHumanInfo',
      'setUserInfo',
      'ToastShowEvent',
      'AlertShowEvent'
    ])
  },
  destroyed () {
    if (this.timer) {
      clearTimeout(this.timer)
    }
  },
  components: {
    DatePicker
  }
}
</script>
<style lang="less" rel="stylesheet/less">
  @import "~common/styles/mixin.less";
  .update-human-info {
    position: fixed;
    top: 0;
    bottom: 0;
    z-index: 100;
    width: 100%;
    transition: all 0.3s;
    background-color: #ffffff;
    &.slide-enter-active, &.slide-leave-active{
      transition: all 0.3s
    }
    &.slide-enter, &.slide-leave-to{
      transform: translate3d(100%, 0, 0)
    }
    .inputs-warp{
      padding: 10px;
      .row-input{
        padding: 5px;
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
    .update-human-btn-wrap {
      width: 100%;
      .update-human-btn {
        margin: 30px 10px 10px 10px;
        padding: 10px 10px;
        border-radius: 5px;
        text-align: center;
        color: #ffffff;
        font-size: 14px;
        background-color: #007ACC;
      }
    }
    .data-picker {
      .cube-picker-choose {
        &.border-bottom-1px {
          border-bottom: 1px solid #dddddd;
        }
      }
      .cube-picker-content {
        .border-bottom-1px {
          border-bottom: 1px solid #dddddd;
        }
        .border-top-1px {
          border-top: 1px solid #dddddd;
        }
      }
    }
  }
</style>
