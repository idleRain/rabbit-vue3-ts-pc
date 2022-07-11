import { defineStore } from 'pinia'
import request from '@/utils/request'
import { CategoryItem, ApiRes, TopCategory, SubCategory } from '@/types'
import { topCategory } from '@/store/constants'

// 对顶部导航列表进行优化，使其有初始值，首屏不会显示空白
const defaultTopCategory = topCategory.map(item => ({ name: item }))

export default defineStore('category', {
  state: () => ({
    // 导航栏一级导航以及二级导航数据
    list: defaultTopCategory as CategoryItem[],
    topCategory: {} as TopCategory,
    subCategory: {} as SubCategory
  }),
  actions: {
    // 获取导航栏数据
    async getAllCategory() {
      const res = await request.get<ApiRes<CategoryItem[]>>('/home/category/head')
      // 1. 给每一个一级分类添加一个open属性，用于控制显示隐藏
      res.data.result.forEach(item => item!.open = false)
      // console.log(res)
      this.list = res.data.result
    },
    // 设置二级菜单显示与隐藏
    showOrHide(id: string, state: boolean) {
      this.list.find(item => item.id === id)!.open = state
    },
    async getTopCategory(id: string) {
      const res = await request.get('/category', {
        params: { id }
      })
      this.topCategory = res.data.result
    },
    async getSubFilter(id: string) {
      const res = await request.get<ApiRes<SubCategory>>(
        '/category/sub/filter',
        {
          params: { id }
        }
      )
      this.subCategory = res.data.result
    },
    resetSubCategory() {
      this.subCategory = {} as SubCategory
    }
  }
})
