import { CacheEnum } from '@/enum/cacheEnum'
import store from '@/utils/store'
import { defineStore } from 'pinia'
export default defineStore('llm-config', {
  state: () => {
    return {
      currentData: {}
    }
  },
  actions: {
    async getCurrentData() {
      if (store.get(CacheEnum.TOKEN_NAME)) {
        return this.currentData
      }
    },
  },
  persist: true
})
