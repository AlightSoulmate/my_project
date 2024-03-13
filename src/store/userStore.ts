import userApi, { User } from '../apis/userApi'
import { defineStore } from 'pinia'
import store from '@/utils/store'
import { CacheEnum } from '@/enum/cacheEnum'
export type HistoryType = {
  id: string,
  role: string,
  content: string,
  date: string
}
export default defineStore('user', {
  state: () => {
    return {
      info: {} as null | User,
      sessions: [] as HistoryType[][],
      currentIndex: 0
    }
  },
  actions: {
    async getUserInfo() {
      if (store.get(CacheEnum.TOKEN_NAME)) {
        const res = await userApi.getCurrentUser()
        this.info = res
        console.log('res', res)
      }
    },
    async getSessionIndex() {
      return this.currentIndex
    },
    async setSessionIndex(value: number) {
      this.currentIndex = value
    },
    async createSession(historySession: HistoryType[]) {
      if (store.get(CacheEnum.TOKEN_NAME)) {
        this.sessions.push(historySession)
      }
    },
    async getSessions() {
      if (store.get(CacheEnum.TOKEN_NAME)) {
        return this.sessions
      }
    },
    async getCurrentSession(index: number) {
      if (store.get(CacheEnum.TOKEN_NAME)) {
        return this.sessions[index]
      }
    },
    async updateCurrentSession(data: HistoryType) {
      if (store.get(CacheEnum.TOKEN_NAME)) {
        this.sessions[this.currentIndex].push(data)
      }
    }
  },
  persist: true
})
