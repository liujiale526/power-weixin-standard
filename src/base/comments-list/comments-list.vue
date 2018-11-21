<template>
  <div class="comments-list">
    <div class="comments-main-content" v-if="self">
      <div class="send-time" :style="{'text-align': self ? 'right': 'left'}">
        {{ formatDate(list.RegDate) }} {{list.RegHumName}}
      </div>
      <div class="list-main">
        <div class="list-text-content right">
          <p class="at-warp" :style="{'text-align': 'left'}">
            <span class="at-group" v-if="list.AtHumanList.length">
              <span class="at-list"
                v-for="atItem in list.AtHumanList" :key="atItem.HumanId" >
                @{{ atItem.HumanName }}
              </span>
            </span>
            <span class="list-text">{{ list.CommentText }}</span>
          </p>
        </div>
        <div class="list-avatar">
          <img :src="RegHeader" alt="">
        </div>
      </div>
    </div>
    <div class="comments-main-content" v-else>
      <div class="send-time" :style="{'text-align': self ? 'right': 'left'}">
        {{list.RegHumName}} {{ formatDate(list.RegDate) }}
      </div>
      <div class="list-main">
        <div class="list-avatar">
          <img :src="RegHeader" alt="">
        </div>
        <div class="list-text-content left">
          <p class="at-warp" :style="{'text-align': 'left'}">
            <span class="at-group" v-if="list.AtHumanList.length">
              <span class="at-list"
                v-for="atItem in list.AtHumanList" :key="atItem.HumanId"
                >@{{ atItem.HumanName }}</span>
            </span>
            <span class="list-text">{{ list.CommentText }}</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import { systemConfig } from 'common/js/config'
import { formatDate } from 'common/js/Util.js'

const debug = process.env.NODE_ENV !== 'production'
const formatDateType = 'yyyy-MM-dd HH:mm:ss'

export default {
  props: {
    list: {
      type: Object,
      default () {
        return {}
      }
    },
    self: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    RegHeader () {
      return debug ? `${systemConfig.devDomainName}${this.list.RegHeader}` : this.list.RegHeader
    }
  },
  methods: {
    // 日期格式化
    formatDate (time) {
      return formatDate(time, formatDateType)
    }
  }
}
</script>
<style lang="less" rel="stylesheet/less">
  @import "~common/styles/mixin.less";

  .comments-list {
    width: 100%;
    padding: 10px 10px 0px 10px;
    .comments-main-content {
      .send-time {
        font-size: 13px;
        color: rgba(0, 0, 0, 0.6);
        padding: 5px 0px;
        &.left {
          text-align: left;
        }
        &.right {
          text-align: right;
        }
      }
      .list-main {
        display: flex;
        width: 100%;
        .list-text-content {
          flex: 1;
          min-width: 10px;
          position: relative;
          padding: 0 10px;
          line-height: 40px;
          .at-warp {
            padding: 0 10px;
            display: inline-block;
            line-height: 30px;
            border-radius: 5px;
            font-size: 14px;
            max-width: 90%;
            word-break: break-all;
            .at-group {
              .at-list {
                color: #0AB9F5;
                padding-right: 10px;
              }
            }
          }
          &.right {
            text-align: right;
            .at-warp {
              background-color: #98E165;
              .right-arrow();
            }
          }
          &.left {
            text-align: left;
            .at-warp {
              background-color: #ffffff;
              .left-arrow();
            }
          }
        }
        .list-avatar {
          flex: 0 0 40px;
          width: 40px;
          height: 40px;
          position: relative;
          img {
            width: 100%;
            height: 100%;
            border-radius: 50%;
            .positionCenter();
          }
        }
      }
    }
  }
</style>
