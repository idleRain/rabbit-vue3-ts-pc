<script setup lang="ts" name="GoodsSku">
import { GoodsInfo, Spec, SpecValue } from '@/types'
import bwPowerSet from '@/utils/power-set'

const props = defineProps<{
  goods: GoodsInfo
  skuId?: string
}>()

const emit = defineEmits<{
  (e: 'changeSku', skuId: string): void
}>()

const SEPARATOR = '★'

const changeSelected = (item: Spec, sub: SpecValue) => {
  if (sub.disabled) return
  // 先让所有的都不选中(除了自己)
  item.values.filter(v => sub.name !== v.name).forEach(v => v.selected = false)
  // 在处理自己
  sub.selected = !sub.selected
  // 调用 updateDisabledStatus
  // 更新组合规格的禁用状态
  // 该调用必须在排他结束后执行
  updateDisabledStatus()

  // 获取当前选中的规格
  // 判断是否选中了所有规格, 如果选中了就子传父将 skuId 传递过去
  const result = getSelectedSpec()
  // 当全部选中, 将 skuId 传递给父组件
  if (result.every(i => i)) {
    const val = pathMap[result.join(SEPARATOR)]
    emit('changeSku', val[0])
  }
}

// 目标: 生成路径字典(对象/映射)
// obj['中国+10cm']
// obj['中国', '10cm'] 无法取值, 需要拼接
function getPathMap() {
  // console.log('@@@',props.goods.skus)
  // 1. 筛选无效的数据 (没有库存的)
  const skus = props.goods.skus.filter(item => item.inventory > 0)
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
      // console.log(arrItem.join(SEPARATOR))
      const key = arrItem.join(SEPARATOR)
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

// 更新按钮的禁用状态
function updateDisabledStatus() {
  // 先获取所有选中商品规格
  const selectedArr = getSelectedSpec()
  // console.log(selectedArr)
  props.goods.specs.forEach((item, index) => {
    item.values.forEach(sub => {
      // sub.disabled = !(sub.name in pathMap)
      // 先获取所有选中商品规格
      // 返回的数据是: ['黑色', '', '']
      const selectedArr = getSelectedSpec()
      selectedArr[index] = sub.name
      // console.log(selectedArr, sub.name, index)
      // console.log(selectedArr.filter(v => v).join(SEPARATOR))
      const key = selectedArr.filter(v => v).join(SEPARATOR)
      // sub.disabled = !(sub.name in pathMap)
      sub.disabled = !(key in pathMap)
    })
  })
}

// 获取被选中的规格
function getSelectedSpec() {
  // 希望获取每个规格被选中的值: ['', '', '']
  const arr: string[] = []
  // 遍历所有的规格, 获取它们的选中状态 (selected)
  props.goods.specs.forEach(item => {
    const result = item.values.find(v => v.selected)
    // console.log(result?.name)
    arr.push(result?.name || '')
  })
  return arr
}

// 初始化勾选状态
function initSpecSelected() {
  // 如果没传 skuId 则返回
  if (!props.skuId) return
  // 通过 skuId 去找到当前 sku 勾选的规格
  const result = props.goods.skus.find(item => item.id === props.skuId)
  // 如果传的 skuId 是错的，则返回
  if (!result) return
  // console.log('通过 ID 找到的 sku:', result.specs)
  const selectArr = result.specs.map(item => item.valueName)
  // console.log(selectArr)
  // 遍历所有的规格, 处理选中状态
  props.goods.specs.forEach(item => item.values.forEach(sub => sub.selected = selectArr.includes(sub.name)))
}
// 1. 获取路径字典
const pathMap = getPathMap()
console.log('@pathMap', pathMap)
// 2. 初始化勾选状态
initSpecSelected()
// 3. 更新单个规格的禁用状态
updateDisabledStatus()

</script>
<template>
  <div class="goods-sku">
    <dl v-for="item in goods.specs" :key="item.name">
      <dt>{{ item.name }}</dt>
      <dd>
        <template v-for="sub in item.values" :key="sub.name">
          <img v-if="sub.picture"
               :src="sub.picture"
               :alt="sub.name"
               :title="sub.name"
               @click="changeSelected(item, sub)"
               :class="{ selected: sub.selected, disabled: sub.disabled }"/>
          <span v-else
                @click="changeSelected(item, sub)"
                :class="{ selected: sub.selected, disabled: sub.disabled }">
            {{ sub.name }}
          </span>
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

      > img {
        width: 50px;
        height: 50px;
        margin-top: 5px;
        .sku-state-mixin ();
      }

      > span {
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
