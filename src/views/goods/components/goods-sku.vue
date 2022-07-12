<script setup lang="ts" name="GoodsSku">
import { GoodsInfo, Spec, SpecValue } from '@/types'
import bwPowerSet from '@/utils/power-set'

const props = defineProps<{
  goods: GoodsInfo
}>()

const changeSelected = (item: Spec, sub: SpecValue) => {
  // 先让所有的都不选中
  item.values.forEach(v => v.selected = false)
  // 在处理自己
  sub.selected = !sub.selected
}

// 目标: 生成路径字典(对象/映射) => 传入一个 庆友黄+中国 => 有货
// obj['中国+10cm']
// obj['中国', '10cm'] 无法取值, 需要拼接
function getPathMap() {
  // console.log('@@@',props.goods.skus);
  
  // 1. 筛选无效的数据 (没有库存的)
  const skus = props.goods.skus.filter(item => item.inventory > 0)
  // console.log(skus)
  // 创建一个路径字典
  const pathMap: any = {}
  skus.forEach(item => {
    // 2. 将 skus 转成字符串数组 (都是有货的 sku)
    // 算法要的是字符串数组 => 我们就将对象数组转成字符串数组
    // valueName
    const arr = item.specs.map(v => v.valueName)
    // console.log(arr)
    // 3. 调用算法生成子集
    const result = bwPowerSet(arr)
    // console.log(result)
    // 4. 往路径字典对象中添加属性
    result.forEach(arrItem => {
      // console.log(arrItem.join('★'))
      const key = arrItem.join('★')
      // pathMap[key] = true
      // 'xxx' in 对象 作用是判断 'xxx' 是否是对象的属性, 有就返回 true, 没有就是 false
      if (key in pathMap) {
        // 4.2 如果对象中有这个属性, 就直接添加 id 到数组
        pathMap[key].push(item.id)
      } else {
        // 4.1 如果对象中没有这个属性, 就创建一个数组, 添加 id
        // const arr = [1, 2, 3, 4, item.id]
        pathMap[key] = [item.id]
        // pathMap[key].push(item.id)
      }
    })
  })
  return pathMap
}

const pathMap = getPathMap()
console.log('###',pathMap)

</script>
<template>
  <div class="goods-sku">
    <dl v-for="item in goods.specs" :key="item.name">
      <dt>{{ item.name }}</dt>
      <dd>
        <template v-for="sub in item.values" :key="sub.name">
          <img v-if="sub.picture" :src="sub.picture" :alt="sub.name" :title="sub.name"
            @click="changeSelected(item, sub)" :class="{ selected: sub.selected }" />
          <span v-else @click="changeSelected(item, sub)" :class="{ selected: sub.selected }">{{ sub.name }}</span>
        </template>
      </dd>
    </dl>
  </div>
</template>

<style scoped lang="less">
.sku-state-mixin () {
  border: 1px solid #e4e4e4;
  margin-right: 10px;
  cursor: pointer;

  &.selected {
    border-color: @xtxColor;
  }

  &.disabled {
    opacity: 0.6;
    border-style: dashed;
    cursor: not-allowed;
  }
}

.goods-sku {
  padding-left: 10px;
  padding-top: 20px;

  dl {
    display: flex;
    padding-bottom: 20px;
    align-items: center;

    dt {
      width: 50px;
      color: #999;
    }

    dd {
      flex: 1;
      color: #666;

      >img {
        width: 50px;
        height: 50px;
        margin-top: 5px;
        .sku-state-mixin ();
      }

      >span {
        display: inline-block;
        height: 30px;
        line-height: 30px;
        padding: 0 20px;
        margin-top: 5px;
        .sku-state-mixin ();
      }
    }
  }
}
</style>
