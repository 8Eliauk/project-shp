<template>
  <div class="spec-preview">
    <img :src="imgObj.imgUrl" />
    <div class="event" @mousemove="handler"></div>
    <div class="big">
      <img :src="imgObj.imgUrl" ref="big" />
    </div>
    <!-- 遮罩层 -->
    <div class="mask" ref="mack"></div>
  </div>
</template>

<script>
  export default {
    name: "Zoom",
    props:['skuImageList'],
    data() {
      return {
        currentIndex:0
      }
    },
    computed: {
      imgObj() {
        return this.skuImageList[this.currentIndex] || {};
      }
    },
    mounted() {
      // 全局事件总线,获取兄弟组件传递过来的索引值
      this.$bus.$on('getIndex',(index)=> {
        // 修改当前响应式数据
        this.currentIndex = index
      })
    },
    methods: {
      handler(event) {
        let mack = this.$refs.mack
        let big = this.$refs.big
        let left = event.offsetX - mack.offsetWidth/2;
        let top = event.offsetY - mack.offsetHeight/2;
        // 约束范围
        if(left < 0) left = 0
        if(left >= mack.offsetWidth) left = mack.offsetWidth
        if(top < 0) top = 0
        if(top >= mack.offsetHeight) top = mack.offsetHeight
        // 修改元素的left|top属性值
        mack.style.left = left + 'px';
        mack.style.top = top + 'px';
        big.style.left = -left*2 + 'px';
        big.style.top = -top*2 + 'px';
      }
    },
  }
</script>

<style lang="less">
  .spec-preview {
    position: relative;
    width: 400px;
    height: 400px;
    border: 1px solid #ccc;

    img {
      width: 100%;
      height: 100%;
    }

    .event {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 998;
    }

    .mask {
      width: 50%;
      height: 50%;
      background-color: rgba(0, 255, 0, 0.3);
      position: absolute;
      left: 0;
      top: 0;
      display: none;
    }

    .big {
      width: 100%;
      height: 100%;
      position: absolute;
      top: -1px;
      left: 100%;
      border: 1px solid #aaa;
      overflow: hidden;
      z-index: 998;
      display: none;
      background: white;

      img {
        width: 200%;
        max-width: 200%;
        height: 200%;
        position: absolute;
        left: 0;
        top: 0;
      }
    }

    .event:hover~.mask,
    .event:hover~.big {
      display: block;
    }
  }
</style>