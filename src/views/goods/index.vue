<script lang="ts" setup name="Goods">
import useStore from '@/store';
import { watchEffect } from 'vue';
import { useRoute } from 'vue-router';
import { storeToRefs } from 'pinia'
import GoodsImage from './components/goods-image.vue'
import GoodsSales from './components/goods-sales.vue'
import GoodsName from './components/goods-name.vue';
import GoodsSku from './components/goods-sku.vue';

const { goods } = useStore()
const route = useRoute()
watchEffect(() => {
  if (route.fullPath !== '/goods/' + route.params.id) return
  // 先清空数据
  goods.resetGoodsInfo()
  // 再发送请求
  goods.getGoodsInfo(route.params.id as string)
})
const { info } = storeToRefs(goods)
</script>
<template>
  <div class="-goods-page">
    <div class="container">
      <!-- 面包屑 -->
      <div style="height: 70px;">
        <transition name="fade-in-out">
          <Bread v-if="goods.info.categories">
            <BreadItem to="/">首页</BreadItem>
            <BreadItem :to="`/category/${ goods.info.categories[1].id }`">{{
              goods.info.categories[1].name
              }}
            </BreadItem>
            <BreadItem :to="`/category/sub/${ goods.info.categories[0].id }`">{{
              goods.info.categories[0].name
              }}
            </BreadItem>
            <BreadItem>{{ goods.info.name }}</BreadItem>
          </Bread>

          <Bread v-else>
            <BreadItem to="/">首页</BreadItem>
            <BreadItem>
              <Skeleton opacity="0.2" bg="#27bb9a" animated :width="28" :height="18" />
            </BreadItem>
            <BreadItem>
              <Skeleton opacity="0.2" bg="#27bb9a" animated :width="76" :height="18" />
            </BreadItem>
            <BreadItem>
              <Skeleton opacity="0.2" bg="#27bb9a" animated :width="156" :height="18" />
            </BreadItem>
          </Bread>
        </transition>
      </div>
      <!-- 商品信息 -->
      <div class="goods-info">
        <div class="media">
          <GoodsImage :images="info.mainPictures" v-if="info.mainPictures"></GoodsImage>
          <GoodsSales></GoodsSales>
        </div>
        <div class="spec">
          <GoodsName :goods="info"></GoodsName>
          <GoodsSku :goods="info"></GoodsSku>
        </div>
      </div>
      <!-- 商品详情 -->
      <div class="goods-footer">
        <div class="goods-article">
          <!-- 商品+评价 -->
          <div class="goods-tabs"></div>
        </div>
        <!-- 24热榜+专题推荐 -->
        <div class="goods-aside"></div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.goods-info {
  min-height: 600px;
  background: #fff;
}

.goods-footer {
  display: flex;
  margin-top: 20px;

  .goods-article {
    width: 940px;
    margin-right: 20px;
  }

  .goods-aside {
    width: 280px;
    min-height: 1000px;
  }
}

.goods-tabs {
  min-height: 600px;
  background: #fff;
}

.goods-warn {
  min-height: 600px;
  background: #fff;
  margin-top: 20px;
}

.goods-info {
  min-height: 600px;
  background: #fff;
  display: flex;

  .media {
    width: 580px;
    height: 600px;
    padding: 30px 50px;
  }

  .spec {
    flex: 1;
    padding: 30px 30px 30px 0;
  }
}
</style>
