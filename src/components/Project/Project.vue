<template>
  <div class="content-box business">
    <iframe ref="iframe" scrolling="no" class="iframe" :src="link" frameborder="0"></iframe>
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
    let that = this
    window.getSecretKey = function () {
      return that.getSecretKey()
    }
    this.loadPage()
  },
  methods: {
    getSecretKey () {
      return {token: '123'}
    },
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
    z-index: 100;
    width: 100%;
    height: calc(100% - 56px);
    overflow-x: hidden;
    .iframe {
      display: block;
      margin: 0;
      padding: 0;
      overflow: scroll;
      -webkit-overflow-scrolling: touch;
      min-width: 100%;
      width: 1px;
      height: 100%;
    }
  }
</style>
