import { type UserType, getCurrentUser } from '@/apis/user'
import { CacheEnum } from '@/enum/cacheEnum'
import store from '@/utils/store'
import { defineStore } from 'pinia'
export default defineStore('user', {
  state: () => {
    return {
      info: {} as null | UserType,
    }
  },
  actions: {
    async getUserInfo() {
      if (store.get(CacheEnum.TOKEN_NAME)) {
        const res = await getCurrentUser() as any
        this.info = res
      }
    },
  },
  persist: true
})
