import { defineStore } from 'pinia'
import request from '@/utils/request'
import { ApiRes, BannerItem, BrandItem, HomeProduct, HotItem, NewItem, SpecialItem } from '@/types'

export default defineStore('home', {
  state: () => ({
    // Banner 列表数据
    bannerList: [] as BannerItem[],
    newGoodList: [] as NewItem[],
    hotGoodList: [] as HotItem[],
    brandList: [] as BrandItem[],
    productList: [] as HomeProduct[],
    specialList: [] as SpecialItem[]
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
    },
    async getBrandList() {
      const { data: res } = await request.get<ApiRes<BrandItem>>('/home/brand')
      // console.log(res)
      this.brandList = res.result
    },
    async getProductList() {
      const { data: res } = await request.get<ApiRes<HomeProduct>>('/home/goods')
      this.productList = res.result
    },
    async getSpecialList() {
      const { data: res } = await request.get<ApiRes<SpecialItem>>('/home/special')
      this.specialList = res.result
    },
  }
})
