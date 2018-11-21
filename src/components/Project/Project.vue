<template>
  <div class="content-box business">
    <iframe ref="iframe" class="iframe" :src="link" frameborder="0"></iframe>
  </div>
</template>
<script type="text/ecmascript-6">
import { mapMutations, mapActions } from 'vuex'
const debug = process.env.NODE_ENV !== 'production'

export default {
  computed: {
    link () {
      let devLink = '/static/html/index.html'
      let proLink = '/weixin3.0/static/html/index.html'

      return debug ? devLink : proLink
    }
  },
  mounted () {
    this.loadPage()
  },
  methods: {
    loadPage () {
      let that = this
      that.showLoading(true)
      try {
        that.$refs.iframe.onload = function () {
          that.showLoading(false)
        }
      } catch (e) {
        that.AlertShowEvent(e.message)
      }
    },
    ...mapMutations({
      showLoading: 'SHOWLOADING'
    }),
    ...mapActions([
      'AlertShowEvent'
    ])
  }
}
</script>
<style lang="less" scoped  rel="stylesheet/less">
  @import "~common/styles/mixin.less";
  @import '~common/styles/colors.less';

  .content-box{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 56px;
    z-index: 100;
    .iframe {
      display: block;
      width: 100%;
      height: 100%;
      margin: 0;
      padding: 0;
      overflow-y: auto;
      overflow-x: hidden;
      -webkit-overflow-scrolling: touch;
      html {
        background-color: red;
      }
    }
  }
</style>
