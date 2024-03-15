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

export default defineStore('session', {
  state: () => {
    return {
      sessions: [] as HistoryType[][],
      currentIndex: 0,
      isNeedFlush: true,
      currentConversationIndex: 0
    }
  },
  actions: {
    async getSessionIndex() {
      return this.currentIndex
    },
    async setSessionIndex(value: number) {
      this.currentIndex = value
      return this.currentIndex
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
    },
    async pushItemToCurrentSession(data: any) {
      setTimeout(() => {
        if (store.get(CacheEnum.TOKEN_NAME)) {
          console.log('data', data)
          console.log(this.sessions[this.currentIndex][this.sessions[this.currentIndex].length])
          this.sessions[this.currentIndex][this.sessions[this.currentIndex].length].content += data.content
          this.sessions[this.currentIndex][this.sessions[this.currentIndex].length].id = data.id
          this.sessions[this.currentIndex][this.sessions[this.currentIndex].length].date = new Date().toUTCString()
          this.sessions[this.currentIndex][this.sessions[this.currentIndex].length].role = 'machine'
        }
      }, 1000)
    },
    async setCurrentConversationIndex(value: number) {
      if (store.get(CacheEnum.TOKEN_NAME)) {
        this.currentConversationIndex = value
      }
    },
    async setFlush() {
      if (store.get(CacheEnum.TOKEN_NAME)) {
        this.isNeedFlush = !this.isNeedFlush
      }
    },
  },
  persist: true
})
