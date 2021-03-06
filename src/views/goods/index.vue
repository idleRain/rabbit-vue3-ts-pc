<script lang="ts" setup name="Goods">
import useStore from '@/store'
import { ref, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
import GoodsImage from './components/goods-image.vue'
import GoodsSales from './components/goods-sales.vue'
import GoodsName from './components/goods-name.vue'
import GoodsSku from './components/goods-sku.vue'
import GoodsDetail from '@/views/goods/components/goods-detail.vue'
import GoodsHot from '@/views/goods/components/goods-hot.vue'

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

// 子组件选中商品后接收传过来的 skuId
const handleChangeSku = (skuId: string) => {
  // console.log(skuId)
  // 根据 skuId 找到 sku 对象
  const sku = info.value.skus.find(item => item.id === skuId)
  // console.log(sku)
  if (!sku) return
  // 修改商品价格
  goods.updateGoodsPrice(sku.price, sku.oldPrice)
}

const count = ref(5)
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
          <GoodsSku v-if="info.id" @changeSku="handleChangeSku" sku-id="1369155864430120962" :goods="info"></GoodsSku>
          <!-- 数字选择框 -->
          <NumberBox v-model="count"></NumberBox>
          <Btn type="primary" style="margin-top: 20px;">加入购物车</Btn>
        </div>
      </div>
      <!-- 商品详情 -->
      <div class="goods-footer" v-if="info.details">
        <div class="goods-article">
          <!-- 商品+评价 -->
          <div class="goods-tabs">
            <!-- 商品详情 -->
            <GoodsDetail :goods="info"></GoodsDetail>
          </div>
        </div>
        <!-- 24热榜+专题推荐 -->
        <div class="goods-aside">
          <GoodsHot :type="1"></GoodsHot>
          <GoodsHot :type="2"></GoodsHot>
          <GoodsHot :type="3"></GoodsHot>
        </div>
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
