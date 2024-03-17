import { CacheEnum } from '@/enum/cacheEnum'
import store from '@/utils/store'
import { http } from '../plugins/axios/index'
import envs from '@/utils/env'
import { url } from '@/utils/url'

export interface HistoryType {
  id?: number
  owner_id?: number
  content: string
}

export function createConversation(userId: number, data: string) {
  return fetch(`${url}/user/${userId}/history`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${store.get(CacheEnum.TOKEN_NAME)}`,
      "Accept": "application/json",
      "Content-Type": "application/json"
    },
    body: data as any
  })
}




