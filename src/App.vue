<template>
  <div class="app">
    <router-view></router-view>

    <div class="tab-bar-wrap">
      <tab-bar></tab-bar>
    </div>

    <div>
      <loading v-model="showLoading"></loading>
      <toast
        v-model="ToastShow.show" type="text"
        :time="ToastShow.time">{{ToastShow.text}}</toast>
      <alert
        v-model="AlertShow.show"
        @on-hide="AlertHideEvent"
        :title="AlertShow.title"
        :content="AlertShow.text"
      ></alert>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { mapGetters, mapActions } from 'vuex'
import { commonMixin } from 'common/js/mixin.js'
import TabBar from 'base/TabBar/TabBar.vue'

export default {
  name: 'App',
  mixins: [commonMixin],
  computed: {
    AlertShow () {
      return Object.assign({}, this.Alert)
    },
    ToastShow () {
      return Object.assign({}, this.Toast)
    },
    ...mapGetters([
      'showLoading',
      'Alert',
      'Toast'
    ])
  },
  methods: {
    ...mapActions([
      'AlertHideEvent'
    ])
  },
  components: {
    TabBar
  }
}
</script>

<style lang="less" scoped  rel="stylesheet/less">
  @import "~common/styles/mixin.less";
  html,body{
    .baseBgColor();
  }
  .app {
    width: 100%;
    height: 100%;
  }
  .tab-bar-wrap {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 0;
  }
</style>
