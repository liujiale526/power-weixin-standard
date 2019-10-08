<template>
  <div class="video-player-content" :style="{'transform': 'translate3d(' + this.offset + '%, 0, 0)'}">
    <video v-if="link" class="video" :src="link" controls="controls">
    your browser does not support the video tag
    </video>
    <div @click="closePlayer" class="back-wrap">
      <span class="fa fa-reply"></span>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
export default {
  data () {
    return {
      offset: 100,
      link: ''
    }
  },
  methods: {
    closePlayer () {
      this.isShow(false)

      this.link = ''
    },
    setVideoData (option) {
      this.isShow(true)

      this.link = option.url
    },
    isShow (show) {
      this.offset = show ? 0 : 100
    }
  }
}
</script>
<style lang="less" scoped rel="stylesheet/less">
  .video-player-content {
    height: 100%;
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background-color: #000;
    transition: all 0.3s;
    overflow: hidden;
    z-index: 2000;
    .back-wrap {
      position: absolute;
      right: 15px;
      bottom: 100px;
      width: 40px;
      height: 40px;
      background-color: #D6D6D6;
      color: #ffffff;
      border-radius: 50%;
      line-height: 40px;
      text-align: center;
    }
    .video {
      display: block;
      width: 100%;
      max-width: 100%;
      height: auto;
      max-height: 100%;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
</style>
