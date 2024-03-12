import userApi, { User } from '../apis/userApi'
import { defineStore } from 'pinia'
import store from '@/utils/store'
import { CacheEnum } from '@/enum/cacheEnum'
export default defineStore('history', {
  state: () => {
    return {
      history: [],
    }
  },
  actions: {
    async getUserHistory() {
      if (store.get(CacheEnum.TOKEN_NAME)) {
        // const res = await userApi.info()
        // this.history = res.data
      }
    },
  },
})
