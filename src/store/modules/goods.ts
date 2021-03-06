import { defineStore } from 'pinia'
import { ApiRes, GoodsInfo } from '@/types'
import request from '@/utils/request'

export default defineStore('goods', {
  state: () => ({
    info: {} as GoodsInfo
  }),
  actions: {
    async getGoodsInfo(id: string) {
      const res = await request.get<ApiRes<GoodsInfo>>('/goods', {
        params: { id }
      })
      this.info = res.data.result
    },
    resetGoodsInfo() {
      this.info = {} as GoodsInfo
    },
    updateGoodsPrice(price: string, oldPrice: string) {
      this.info.price = price
      this.info.oldPrice = oldPrice
    }
  }
})
