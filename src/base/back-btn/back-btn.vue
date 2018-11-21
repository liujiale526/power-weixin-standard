<template>
  <div @click.stop.prevent="back" class="back-btn">
    <div class="back-icon">
      <span class="fa fa-reply"></span>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    where: {
      type: String,
      default: ''
    }
  },
  methods: {
    back () {
      switch (this.where) {
        case '':
          this.$router.back()
          break
        case 'peopleCenter':
          this.$router.push(`/${this.where}`)
          break
        default:
          this.$router.back()
      }
    }
  }
}
</script>
<style lang="less">
  .back-btn {
    position: relative;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: #C0C2CC;
    .back-icon {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: #ffffff;
    }
  }
</style>
