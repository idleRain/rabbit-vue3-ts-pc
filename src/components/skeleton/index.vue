<script lang="ts" setup name="Skeleton">
/*****************
 defineProps({
  bg: { type: String, default: '#efefef' },
  width: { type: Number, required: true },
  height: { type: Number, required: true },
  animated: { type: Boolean, default: false },
  fade: { type: Boolean, default: false }
})
*****************/

interface Props {
  bg?: string
  width: number | string
  height: number | string
  animated?: boolean
  fade?: boolean
  opacity?: string
}

const props = withDefaults(defineProps<Props>(), {
  bg: '#efefef',
  animated: false,
  fade: false,
  opacity: '1'
})
</script>
<template>
  <div
      class="xtx-skeleton"
      :style="{ width: props.width + 'px', height: props.height + 'px' }"
      :class="{ shan: props.animated, fade: props.fade }"
  >
    <!-- 1 盒子-->
    <div class="block" :style="{ backgroundColor: props.bg, opacity: props.opacity }"></div>
    <!-- 2 闪效果 xtx-skeleton 伪元素 --->
  </div>
  <transition-group></transition-group>
</template>

<style scoped lang="less">
.xtx-skeleton {
  display: inline-block;
  position: relative;
  overflow: hidden;
  vertical-align: middle;

  .block {
    width: 100%;
    height: 100%;
    border-radius: 2px;
  }
}

.shan {
  &::after {
    content: '';
    position: absolute;
    animation: shan 1.5s ease 0s infinite;
    top: 0;
    width: 50%;
    height: 100%;
    background: linear-gradient(to left,
    rgba(255, 255, 255, 0) 0,
    rgba(255, 255, 255, 0.3) 50%,
    rgba(255, 255, 255, 0) 100%);
    transform: skewX(-45deg);
  }
}

@keyframes shan {
  0% {
    left: -100%;
  }
  100% {
    left: 120%;
  }
}

.fade {
  animation: fade 1s linear infinite alternate;
}

@keyframes fade {
  from {
    opacity: 0.2;
  }
  to {
    opacity: 1;
  }
}
</style>
