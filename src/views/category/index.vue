<script lang="ts" setup name="TopCategory">
import useStore from '@/store'
import { useRoute } from 'vue-router'
import { watch } from 'vue'

const { category } = useStore()
const route = useRoute()

watch(() => route.params.id, value => {
  if (!value) return
  category.getTopCategory(route.params.id as string)
},{ immediate: true })
</script>

<template>
  <div class="top-category">
    <div class="container">
      <!-- 渲染面包屑导航 -->
      <Bread>
        <BreadItem to="/">首页</BreadItem>
        <BreadItem>{{ category.topCategory.name }}</BreadItem>
      </Bread>
    </div>
  </div>
</template>
