<script lang="ts" setup name="SubCategory">
import useStore from '@/store'
import { watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'

const route = useRoute()
const { category } = useStore()
watchEffect(() => {
  const id = route.params.id as string
  // 清空数据
  category.resetSubCategory()
  // 再发请求
  if (route.fullPath !== `/category/sub/${ id }`) return
  category.getSubFilter(id)
})
const { subCategory } = storeToRefs(category)
</script>
<template>
  <div class="sub-category">
    <div class="container">
      <!-- 面包屑 -->
      <transition name="fade-in-out">
        <Bread v-if="subCategory.parentName">
          <BreadItem to="/">首页</BreadItem>
          <BreadItem :to="`/category/${ subCategory.parentId }`">{{ subCategory.parentName }}</BreadItem>
          <BreadItem>{{ subCategory.name }}</BreadItem>
        </Bread>

        <Bread v-else>
          <BreadItem to="/">首页</BreadItem>
          <BreadItem>
            <Skeleton opacity="0.2" bg="#27bb9a" animated :width="28" :height="18" />
          </BreadItem>
          <BreadItem>
            <Skeleton opacity="0.2" bg="#27bb9a" animated :width="56" :height="18" />
          </BreadItem>
        </Bread>
      </transition>
    </div>
  </div>
</template>

<style scoped lang="less">

</style>
