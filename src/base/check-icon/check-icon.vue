<template>
  <div class="vux-check-icon">
    <i v-if="checked" class="weui-icon weui_icon_success weui-icon-success"></i>
    <i v-if="!checked" class="weui-icon weui_icon_circle weui-icon-circle"></i> <span></span>
  </div>
</template>
<script type="text/ecmascript-6">
export default {
  props: {
    checked: {
      type: Boolean,
      default: false
    }
  }
}
</script>
<style lang="less">
  @import "~common/styles/colors.less";

  .weui-icon-success {
    font-size: 23px;
    color: @mainColor;
  }
  .vux-check-icon > .weui-icon-success:before,
  .vux-check-icon > .weui-icon-success-circle:before {
    color: @mainColor;
  }
</style>
