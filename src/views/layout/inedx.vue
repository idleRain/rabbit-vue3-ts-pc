<script lang="ts" setup name="Layout">
import AppTopNav from '@/views/layout/components/app-top-nav.vue'
import AppHeader from '@/views/layout/components/app-header.vue'
import AppFooter from '@/views/layout/components/app-footer.vue'
import AppHeaderSticky from '@/views/layout/components/app-header-sticky.vue'
</script>
<template>
  <AppTopNav></AppTopNav>
  <AppHeader></AppHeader>
  <AppHeaderSticky></AppHeaderSticky>
  <div class="app-body" style="min-height: 500px">
    <!-- 路由出口 -->
    <router-view></router-view>
  </div>
  <AppFooter></AppFooter>
</template>

<style lang="less" scoped></style>
