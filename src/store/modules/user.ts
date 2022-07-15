import { defineStore } from 'pinia'
import { ApiRes } from '@/types'
import { Profile } from '@/types/user'
import request from '@/utils/request'

export default defineStore('user', {
  state: () => ({
    profile: {} as Profile
  }),
  actions: {
    // 用户名和密码登录
    async login(account: string, password: string) {
      const { data: res } = await request.post<ApiRes<Profile>>('/login', {
        account, password
      })
      console.log(res)
      this.profile = res.result
    }
  }
})
