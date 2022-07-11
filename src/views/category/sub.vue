<script lang="ts" setup name="SubCategory">
import useStore from '@/store'
import { watchEffect } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()
const { category } = useStore()
watchEffect(() => {
  const id = route.params.id as string
  if (route.fullPath !== `/category/sub/${id}`) return
  category.getSubFilter(id)
})
</script>
<template>
  <div class="sub-category">
    <div class="container">
      <!-- 面包屑 -->
      <Bread>
        <BreadItem to="/">首页</BreadItem>
        <BreadItem :to="`/category/${category.subCategory.parentId}`">
          {{ category.subCategory.parentName }}
        </BreadItem>
        <BreadItem>
          {{ category.subCategory.name }}
        </BreadItem>
      </Bread>
    </div>
  </div>
</template>

<style scoped lang="less">

</style>
