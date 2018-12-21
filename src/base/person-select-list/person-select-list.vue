<template>
  <div class="person-select-list">
    <div class="person-select-item title">
      <p class="text">{{ item.WorkFlowName }}</p>
    </div>
    <div class="person-select-item select-box">
      <div class="check-icon-wrap">
        <div class="vux-check-icon">
          <i v-if="checked" class="weui-icon weui_icon_success weui-icon-success"></i>
          <i v-if="!checked" class="weui-icon weui_icon_circle weui-icon-circle"></i>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
export default {
  props: {
    selectedWorkFlows: {
      type: Array,
      default () {
        return []
      }
    },
    item: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  computed: {
    WorkFlowIDs () {
      return this.selectedWorkFlows.map((item) => {
        return item.WorkFlowID
      })
    },
    checked () {
      return this.WorkFlowIDs.includes(this.item.WorkFlowID)
    }
  }
}
</script>
<style lang="less" rel="stylesheet/less">
  @import "~common/styles/mixin.less";

  .person-select-list {
    display: flex;
    background-color:#ffffff;
    width: 100%;
    .person-select-item {
      min-width: 0px;
      &.title {
        flex: 1;
        .text {
          line-height: 40px;
          font-size: 14px;
          color: rgba(0, 0, 0, 0.8);
          padding: 0px 10px;
          .css3-ellipsis();
        }
      }
      &.select-box {
        flex: 0 0 40px;
        width: 40px;
        height: 40px;
        position: relative;
        .check-icon-wrap {
          .positionCenter();
        }
      }
    }
  }
</style>
