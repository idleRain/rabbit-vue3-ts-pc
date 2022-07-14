<script lang="ts" setup>
import HomeBanner from './components/home-banner.vue'
import HomeCategory from './components/home-category.vue'
import HomeNew from '@/views/home/components/home-new.vue'
import HomeHot from '@/views/home/components/home-hot.vue'
import HomeBrand from '@/views/home/components/home-brand.vue'
import HomeProduct from '@/views/home/components/home-product.vue'
import HomeSpecial from '@/views/home/components/home-special.vue'
</script>

<template>
  <div class="page-home">
    <div class="home-entry">
      <div class="container">
        <!-- 左侧分类 -->
        <HomeCategory />
        <!-- banner轮播图 -->
        <HomeBanner />
      </div>
      <!-- 新鲜好物 -->
      <HomeNew></HomeNew>
      <!-- 人气推荐 -->
      <HomeHot></HomeHot>
      <!-- 热门品牌 -->
      <HomeBrand></HomeBrand>
      <!--商品区域-->
      <HomeProduct></HomeProduct>
      <!-- 最新专题 -->
      <HomeSpecial></HomeSpecial>
    </div>
  </div>
</template>


<style lang="less" scoped></style>
