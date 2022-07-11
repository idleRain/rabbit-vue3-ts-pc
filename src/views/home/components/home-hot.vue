<script lang="ts" setup>
import useStore from '@/store'
import HomePanel from './home-panel.vue'
// import { useIntersectionObserver } from '@vueuse/core'
// import { ref } from 'vue'
import { useLazyData } from '@/hooks/lazy'
import HomeSkeleton from './home-skeleton.vue'
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
    <ul ref="pannel" class="goods-list" v-if="home.hotGoodList.length">
      <li v-for="item in home.hotGoodList" :key="item.id">
        <RouterLink :to="`/goods/${item.id}`">
          <img v-lazy="item.picture" alt="" />
          <p class="name">{{ item.title }}</p>
          <p class="desc">{{ item.alt }}</p>
        </RouterLink>
      </li>
    </ul>
    <HomeSkeleton v-else :count="4"></HomeSkeleton>
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
