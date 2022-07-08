import { defineStore } from 'pinia'
import request from '@/utils/request'
import { ApiRes, BannerItem, HotItem, NewItem } from '@/types'

export default defineStore('home', {
  state: () => ({
    // Banner 列表数据
    bannerList: [] as BannerItem[],
    newGoodList: [] as NewItem[],
    hotGoodList: [] as HotItem[]
  }),
  actions: {
    // 获取 Banner 列表
    async getBannerList() {
      const { data: res } = await request.get<ApiRes<BannerItem>>('/home/banner')
      // console.log(res)
      this.bannerList = res.result
    },
    async getNewList() {
      const { data: res } = await request.get<ApiRes<NewItem>>('/home/new')
      // console.log(res)
      this.newGoodList = res.result
    },
    async getHotList() {
      const { data: res } = await request.get<ApiRes<HotItem>>('/home/hot')
      // console.log(res)
      this.hotGoodList = res.result
    }
  }
})
