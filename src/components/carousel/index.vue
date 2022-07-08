<script lang="ts" setup name="Carousel">
import { BannerItem } from '@/types'
import { nextTick, onMounted, onUnmounted, ref } from 'vue'

const props = withDefaults(defineProps<{
  slides: BannerItem[]
  autoplay?: boolean
  duration?: number
}>(), {
  autoplay: false,
  duration: 3000
})

// 选中图片的索引
const active = ref(0)
// 定时器
let timerId = -1
// 上一张
const prev = () => {
  active.value--
  if (active.value < 0) active.value = props.slides.length - 1
}
// 下一张
const next = () => {
  active.value++
  if (active.value >= props.slides.length) active.value = 0
}
// 开始
const start = () => {
  // 如果没有传入 autoplay 属性则不自动播放
  if (!props.autoplay) return
  timerId = window.setInterval(() => next(), props.duration)
}
// 停止播放
const stop = () => {
  window.clearInterval(timerId)
}
onMounted(() => {
  start()
})
onUnmounted(() => {
  stop()
})
</script>

<template>
  <div class="xtx-carousel" @mouseenter="stop" @mouseleave="start">
    <ul class="carousel-body">
      <li class="carousel-item" v-for="(item,index) in slides" :key="item.id" :class="{fade: index === active}">
        <RouterLink :to="item.hrefUrl">
          <img
              :src="item.imgUrl"
              alt=""
          />
        </RouterLink>
      </li>
    </ul>
    <a href="javascript:void (0);" class="carousel-btn prev" @click="prev">
      <i class="iconfont icon-angle-left"></i>
    </a>
    <a href="javascript:void (0);" class="carousel-btn next" @click="next">
      <i class="iconfont icon-angle-right"></i>
    </a>
    <div class="carousel-indicator">
      <span v-for="(item,index) in slides"
            :key="item.id"
            :class="{active: index === active}"
            @click="active = index"
      >
      </span>
    </div>
  </div>
</template>

<style scoped lang="less">
.xtx-carousel {
  width: 100%;
  height: 100%;
  min-width: 300px;
  min-height: 150px;
  position: relative;

  .carousel {
    &-body {
      width: 100%;
      height: 100%;
    }

    &-item {
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      opacity: 0;
      transition: opacity 0.5s linear;

      &.fade {
        opacity: 1;
        z-index: 1;
      }

      img {
        width: 100%;
        height: 100%;
      }
    }

    &-indicator {
      position: absolute;
      left: 0;
      bottom: 20px;
      z-index: 2;
      width: 100%;
      text-align: center;

      span {
        display: inline-block;
        width: 12px;
        height: 12px;
        background: rgba(0, 0, 0, 0.2);
        border-radius: 50%;
        cursor: pointer;

        ~ span {
          margin-left: 12px;
        }

        &.active {
          background: #fff;
        }
      }
    }

    &-btn {
      width: 44px;
      height: 44px;
      background: rgba(0, 0, 0, 0.2);
      color: #fff;
      border-radius: 50%;
      position: absolute;
      top: 228px;
      z-index: 2;
      text-align: center;
      line-height: 44px;
      opacity: 0;
      transition: all 0.5s;

      &.prev {
        left: 20px;
      }

      &.next {
        right: 20px;
      }
    }
  }

  &:hover {
    .carousel-btn {
      opacity: 1;
    }
  }
}
</style>
