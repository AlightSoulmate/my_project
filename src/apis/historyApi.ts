import { CacheEnum } from '@/enum/cacheEnum'
import store from '@/utils/store'
import { http } from '../plugins/axios/index'
export interface HistoryType {
  id?: number
  owner_id?: number
  content: string
}

export function createConversation(userId: number, data: string) {
  return fetch(`http://127.0.0.1:5173/api/user/${userId}/history`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${store.get(CacheEnum.TOKEN_NAME)}`,
      "Accept": "application/json",
      "Content-Type": "application/json"
    },
    body: data as any
  })
}


export function getHistory(): Promise<Response> {
  return fetch("http://127.0.0.1:5173/api/current", {
    headers: {
      "Authorization": `Bearer ${store.get(CacheEnum.TOKEN_NAME)}`,
      "Accept": "application/json"
    }
  })
}


