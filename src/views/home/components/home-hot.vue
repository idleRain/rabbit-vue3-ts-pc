<script lang="ts" setup>
import useStore from '@/store'
import HomePanel from './home-panel.vue'
// import { useIntersectionObserver } from '@vueuse/core'
// import { ref } from 'vue'
import { useLazyData } from '@/hooks/lazy'
const { home } = useStore()
// home.getHotList()
// 数据请求的懒加载
/***************
let target = ref(null)
const { stop } = useIntersectionObserver(target, ([{isIntersecting}]) => {
  if (isIntersecting) {
    home.getHotList()
    stop()
  }
})
 ***************/

// 对数据懒加载进行优化
const target = useLazyData(home.getHotList)
</script>

<template>
  <HomePanel ref="target" title="人气推荐" sub-title="人气爆款 不容错过">
    <ul ref="pannel" class="goods-list">
      <li v-for="item in home.hotGoodList" :key="item.id">
        <RouterLink to="/">
          <img v-lazy="item.picture" alt="" />
          <p class="name">{{ item.title }}</p>
          <p class="desc">{{ item.alt }}</p>
        </RouterLink>
      </li>
    </ul>
  </HomePanel>
</template>

<style scoped lang="less">
.goods-list {
  display: flex;
  justify-content: space-between;
  height: 426px;
  li {
    width: 306px;
    height: 406px;
    .hoverShadow();
    img {
      width: 306px;
      height: 306px;
    }
    p {
      font-size: 22px;
      padding-top: 12px;
      text-align: center;
    }
    .desc {
      color: #999;
      font-size: 18px;
    }
  }
}
</style>
