import { CacheEnum } from '@/enum/cacheEnum'
import store from '@/utils/store'
import { http } from '../plugins/axios/index'
import envs from '@/utils/env'
import { env } from 'process'

export interface HistoryType {
  id?: number
  owner_id?: number
  content: string
}

export function createConversation(userId: number, data: string) {
  // const url = env.DEV_MODE ? env.DEV_BACKEND_URL : env.PRODUCTION_BACKEND_URL
  const url = '/api'
  const prodUrl = "http://127.0.0.1:3000/api"
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




