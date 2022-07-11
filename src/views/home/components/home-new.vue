<script lang="ts" setup>
import HomePanel from './home-panel.vue'
import useStore from '@/store'
// import { ref } from 'vue'
// import { useIntersectionObserver } from '@vueuse/core'
import { useLazyData } from '@/hooks/lazy'
import HomeSkeleton from './home-skeleton.vue'

const { home } = useStore()
// home.getNewList()
// 数据请求的懒加载
/***************
 let target = ref(null)
 const { stop } = useIntersectionObserver(target, ([{isIntersecting}]) => {
  if (isIntersecting) {
    home.getNewList()
    stop()
  }
})
 ***************/
// 对数据懒加载进行优化
const target = useLazyData(home.getNewList)
</script>
<template>
  <div class="home-new">
    <HomePanel ref="target" title="新鲜好物" sub-title="新鲜出炉 品质靠谱">
      <template #right>
        <More path="/"/>
      </template>
      <!-- 面板内容 -->
      <ul class="goods-list" v-if="home.newGoodList.length">
        <li v-for="item in home.newGoodList" :key="item.id">
          <RouterLink :to="`/goods/${item.id}`">
            <img v-lazy="item.picture"
                 :alt="item.name"
            />
            <p class="name ellipsis">{{ item.name }}</p>
            <p class="price">&yen;{{ item.price }}</p>
          </RouterLink>
        </li>
      </ul>
      <HomeSkeleton :count="4" v-else></HomeSkeleton>
    </HomePanel>
  </div>
</template>

<style scoped lang="less">
.goods-list {
  display: flex;
  justify-content: space-between;
  height: 406px;

  li {
    width: 306px;
    height: 406px;
    background: #f0f9f4;
    .hoverShadow();

    img {
      width: 306px;
      height: 306px;
    }

    p {
      font-size: 22px;
      padding: 12px 30px 0 30px;
      text-align: center;
    }

    .price {
      color: @priceColor;
    }
  }
}
</style>
