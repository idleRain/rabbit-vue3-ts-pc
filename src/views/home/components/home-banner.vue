<script lang="ts" setup name="HomeBanner">
import useStore from '@/store'

const { home } = useStore()
home.getBannerList()
</script>
<template>
  <div class="home-banner">
    <!-- 轮播图 -->
    <Carousel :slides="home.bannerList" autoplay :duration="2400"></Carousel>
  </div>
</template>

<style scoped lang="less">
.home-banner {
  width: 1240px;
  height: 500px;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 98;
  //background-color: pink;
  //background-color: #bfa;
  background-color: #fba;

  :deep(.xtx-carousel .carousel-btn.prev) {
    transform: translateX(250px);
  }
  :deep(.xtx-carousel .carousel-indicator) {
    padding-left: 250px;
  }
}
</style>
