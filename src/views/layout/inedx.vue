<script lang="ts" setup name="Layout">
import useStore from '@/store'
import AppTopNav from '@/views/layout/components/app-top-nav.vue'
import AppHeader from '@/views/layout/components/app-header.vue'
import AppFooter from '@/views/layout/components/app-footer.vue'
import AppHeaderSticky from '@/views/layout/components/app-header-sticky.vue'

const { category } = useStore()
// 调用方法，发送获取导航栏的请求
category.getAllCategory()
</script>
<template>
  <AppTopNav></AppTopNav>
  <AppHeader></AppHeader>
  <AppHeaderSticky></AppHeaderSticky>
  <main style="min-height: 500px">
    <!-- 路由出口 -->
    <router-view></router-view>
  </main>
  <AppFooter></AppFooter>
</template>

<style lang="less" scoped></style>
