<template>
  <div class="Report">
    <div class="report-lists-wrap">
      <ul class="report-lists">
        <li v-for="report in ReportData" :key="report.Id" class="report-list">
          <div @click="openReport(report)" class="report-list-inner">
            <div class="list-massage">
              <p class="text">{{ report.Name }}.{{ report.ExpType }}</p>
            </div>
            <div class="list-icon">
              <div class="icon-wrap">
                <x-icon type="ios-arrow-right" size="20"></x-icon>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="iframe-wrap" :style="{'transform': 'translate3d(' + this.offset + '%, 0, 0)'}">
      <iframe class="iframe" :src="fileLink" frameborder="0"></iframe>
      <div @click="closeFile" v-show="offset <= 100" class="back-wrap">
        <span class="fa fa-reply"></span>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import { mapGetters, mapActions } from 'vuex'
import { systemConfig } from 'common/js/config'

const debug = process.env.NODE_ENV !== 'production'

export default {
  props: {
    loadStart: {
      type: Boolean,
      default: false
    },
    KeyWord: {
      type: String,
      default: ''
    }
  },
  computed: {
    ...mapGetters([
      'routerParams'
    ])
  },
  data () {
    return {
      ReportData: [],
      fileLink: '',
      offset: 100
    }
  },
  methods: {
    // 获取报表数据
    GetReport () {
      let FormId = this.routerParams.FromId
      let where = ''

      this.GetReportData({FormId, where}).then((res) => {
        let value = res.data.value
        if (value) {
          this.ReportData = [...JSON.parse(value)]
        } else {
          this.ReportData = []
        }
      }).catch((e) => {
        this.AlertShowEvent(e.message)
      })
    },
    // 打开报表
    openReport (item) {
      let KeyValue = this.routerParams.Id
      let host = debug ? systemConfig.devDomainName : ''
      let link = `${host}/PowerPlat/FormXml/ReportView.aspx?rid=${item.Id}&KeyWord=${this.KeyWord}&KeyValue=${KeyValue}`

      this.fileLink = link
      this.offset = 0
    },
    // 关闭文件
    closeFile () {
      this.offset = 100
      if (this.timer) {
        clearTimeout(this.timer)
      }

      this.timer = setTimeout(() => {
        this.fileLink = ''
      }, 400)
    },
    ...mapActions([
      'GetReportData',
      'AlertShowEvent'
    ])
  },
  destroyed () {
    clearTimeout(this.timer)
  },
  watch: {
    loadStart: {
      handler (newLoad, oldLoad) {
        if (this.loadStart) {
          this.GetReport()
        }
      },
      immediate: true
    }
  }
}
</script>
<style lang="less" rel="stylesheet/less">
  @import "~common/styles/mixin.less";

  .Report {
    width: 100%;
    height: 100%;
    position: static;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    .report-lists-wrap {
      .report-lists {
        display: block;
        .report-list {
          margin-top: 10px;
          width: 100%;
          background-color: #ffffff;
          .top-line();
          .bottom-line();
          &:last-child {
            margin-bottom: 20px;
          }
          .report-list-inner {
            width: 100%;
            display: flex;
            .list-massage {
              flex: 1;
              position: relative;
              padding: 10px;
              // .css3-ellipsis();
              .text {
                width: 100%;
                font-size: 14px;
                line-height: 1.5;
                color: rgba(0, 0, 0, 0.8);
                word-break:break-all;
              }
            }
            .list-icon {
              flex: 0 0 30px;
              position: relative;
              .icon-wrap {
                .positionCenter();
                left: 0;
                .vux-x-icon {
                  fill: #8f8f94;
                }
              }
            }
          }
        }
      }
    }
    .iframe-wrap {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      transition: all 0.3s;
      z-index: 100;
      background-color: #ffffff;
      overflow: hidden;
      .iframe {
        width: 100%;
        height: 100%;
        border: 0;
        padding: 0;
        margin: 0;
      }
      .back-wrap {
        position: absolute;
        right: 15px;
        bottom: 40px;
        width: 40px;
        height: 40px;
        background-color: #D6D6D6;
        color: #ffffff;
        border-radius: 50%;
        line-height: 40px;
        text-align: center;
      }
    }
  }
</style>
