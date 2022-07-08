<script lang="ts" setup>
import HomePanel from './home-panel.vue'
</script>
<template>
  <div class="home-new">
    <HomePanel title="新鲜好物" sub-title="新鲜出炉 品质靠谱">
      <template #right><More path="/" /></template>
      <!-- 面板内容 -->
      <ul class="goods-list">
        <li v-for="item in 4" :key="item">
          <RouterLink to="/">
            <img
                src="https://yanxuan-item.nosdn.127.net/e7337596de7161c57c27e8d8040231aa.jpg"
                alt=""
            />
            <p class="name ellipsis">情侣款时尚户外轻型徒步鞋环保大底</p>
            <p class="price">&yen;364.00</p>
          </RouterLink>
        </li>
      </ul>
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
