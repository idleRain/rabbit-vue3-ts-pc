<script lang="ts" setup name="TopCategory">
import useStore from '@/store'
import { useRoute } from 'vue-router'
import { watchEffect } from 'vue'
import SubCategory from './sub.vue'
import GoodsItem from './components/goods-item.vue'
import { storeToRefs } from 'pinia'

const { category, home } = useStore()
const route = useRoute()

/**************
watch(() => route.params.id, value => {
  if (!value) return
  category.getTopCategory(route.params.id as string)
},{ immediate: true })
 **************/

watchEffect(() => {
  if (!route.params.id) return
  category.getTopCategory(route.params.id as string)
})
// 获取轮播图数据
home.getBannerList()
const { topCategory } = storeToRefs(category)
</script>

<template>
  <div class="top-category">
    <div class="container">
      <!-- 渲染面包屑导航 -->
      <Bread>
        <BreadItem to="/">首页</BreadItem>
        <BreadItem>{{ category.topCategory.name }}</BreadItem>
      </Bread>
      <Carousel :slides="home.bannerList" style="height: 500px" auto-play />
      <!-- 所有二级分类 -->
      <div class="sub-list">
        <h3>全部分类</h3>
        <ul>
          <li v-for="item in topCategory.children" :key="item.id">
            <a href="javascript:;">
              <img v-lazy="item.picture" >
              <p>{{ item.name }}</p>
            </a>
          </li>
        </ul>
      </div>
      <!-- 分类关联商品 -->
      <div class="ref-goods" v-for="item in category.topCategory.children">
        <div class="head">
          <h3>- {{ item.name }} -</h3>
          <p class="tag">温暖柔软，品质之选</p>
          <More />
        </div>
        <div class="body">
          <GoodsItem
              v-for="goods in item.goods"
              :key="goods.id"
              :goods="goods"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less">
.top-category {
  h3 {
    font-size: 28px;
    color: #666;
    font-weight: normal;
    text-align: center;
    line-height: 100px;
  }
  .sub-list {
    margin-top: 20px;
    background-color: #fff;
    ul {
      display: flex;
      padding: 0 32px;
      flex-wrap: wrap;
      li {
        width: 168px;
        height: 160px;
        a {
          text-align: center;
          display: block;
          font-size: 16px;
          img {
            width: 100px;
            height: 100px;
          }
          p {
            line-height: 40px;
          }
          &:hover {
            color: @xtxColor;
          }
        }
      }
    }
  }
}
.ref-goods {
  background-color: #fff;
  margin-top: 20px;
  position: relative;
  .head {
    .xtx-more {
      position: absolute;
      top: 20px;
      right: 20px;
    }
    .tag {
      text-align: center;
      color: #999;
      font-size: 20px;
      position: relative;
      top: -20px;
    }
  }
  .body {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    padding: 0 65px 30px;
  }
}
</style>
