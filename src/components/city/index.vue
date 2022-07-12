<script lang="ts" setup name="City">
import { onClickOutside } from '@vueuse/core';
import { ref, watchEffect } from 'vue';
import axios from 'axios';
import { AreaList } from '@/types';

// 省市县数据
const cityList = ref<AreaList[]>([])
// 获取省市县
const getCityList = async () => {
  const { data: res } = await axios.get<AreaList[]>('https://yjy-oss-files.oss-cn-zhangjiakou.aliyuncs.com/tuxian/area.json')
  cityList.value = res
}

const active = ref(false)

// 点击外面，关闭弹窗
const target = ref(null)
onClickOutside(target, () => {
  active.value = false
})
// 省市县切换交互
const selectCity = (item: AreaList) => {
  if (!item.areaList) return active.value = false
  cityList.value = item.areaList
}
watchEffect(() => {
  if (!active.value) cityList.value = cityList.value
})

getCityList()

</script>
<template>
  <div class="xtx-city" ref="target">
    <div class="select" @click="active = !active" :class="{ active: active }">
      <span class="placeholder">请选择配送地址</span>
      <span class="value"></span>
      <i class="iconfont icon-angle-down"></i>
    </div>
    <div class="option" v-show="active">
      <span class="ellipsis" v-for="item in cityList" :key="item.code" @click="selectCity(item)">
        {{ item.name }}</span>
    </div>
  </div>
</template>

<style scoped lang="less">
.xtx-city {
  display: inline-block;
  position: relative;
  z-index: 400;

  .select {
    border: 1px solid #e4e4e4;
    height: 30px;
    padding: 0 5px;
    line-height: 28px;
    cursor: pointer;

    &.active {
      background: #fff;
    }

    .placeholder {
      color: #999;
    }

    .value {
      color: #666;
      font-size: 12px;
    }

    i {
      font-size: 12px;
      margin-left: 5px;
    }
  }

  .option {
    width: 542px;
    border: 1px solid #e4e4e4;
    position: absolute;
    left: 0;
    top: 29px;
    background: #fff;
    min-height: 30px;
    line-height: 30px;
    display: flex;
    flex-wrap: wrap;
    padding: 10px;

    >span {
      width: 130px;
      text-align: center;
      cursor: pointer;
      border-radius: 4px;
      padding: 0 3px;

      &:hover {
        background: #f5f5f5;
      }
    }
  }
}
</style>