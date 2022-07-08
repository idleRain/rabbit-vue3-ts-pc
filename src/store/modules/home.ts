import { defineStore } from 'pinia'
import request from '@/utils/request'
import { ApiRes, BannerItem } from '@/types'

export default defineStore('home', {
  state: () => ({
    // Banner 列表数据
    bannerList: [] as BannerItem[]
  }),
  actions: {
    // 获取 Banner 列表
    async getBannerList() {
      const { data: res } = await request.get<ApiRes<BannerItem>>('/home/banner')
      // console.log(res)
      this.bannerList = res.result
    }
  }
})
