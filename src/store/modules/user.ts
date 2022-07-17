import { defineStore } from 'pinia'
import { ApiRes } from '@/types'
import { Profile } from '@/types/user'
import request from '@/utils/request'
import { getProfile, PROFILE_KEY, removeProfile, setProfile } from '@/utils/storage'

export default defineStore('user', {
  state: () => ({
    profile: (getProfile() || {}) as Profile
  }),
  actions: {
    // 用户名和密码登录
    async login(account: string, password: string) {
      const { data: res } = await request.post<ApiRes<Profile>>('/login', {
        account, password
      })
      // console.log(res)
      this.profile = res.result
      setProfile(res.result)
    },
    // 获取手机验证码
    async sendMobileMsg(mobile: string) {
      await request.get('/login/code', {
        params: { mobile }
      })
    },
    async mobileLogin(mobile: string, code: string) {
      const { data: res } = await request.post<ApiRes<Profile>>('/login/code', {
        mobile,
        code
      })
      // 1. 保存用户信息到 state 中
      this.profile = res.result
      setProfile(res.result)
    },
    logout() {
      // 清空本地数据
      removeProfile()
      // 清空 pinia
      this.profile = {} as Profile
    }
  }
})
