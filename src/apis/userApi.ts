import store from '@/utils/store'
import { http } from '../plugins/axios/index'
import { CacheEnum } from '@/enum/cacheEnum'
import { Header } from 'element-plus/es/components/table-v2/src/components'
import axios, { RawAxiosRequestHeaders } from 'axios'
import Axios from '@/plugins/axios/Axios'
import { URLSearchParams } from 'url'
export interface AuthReturnType {
  access_token: string
  token_type: string
}
export interface UserLoginType extends URLSearchParams {
  username: string
  password: string
}

export interface User {
  id: number,
  name: string,
  emai: string,
  history: {}[]
}

function getCurrentUser() {
  return fetch("http://127.0.0.1:5173/api/current", {
    headers: {
      "Authorization": `Bearer ${store.get(CacheEnum.TOKEN_NAME)}`,
    },
  }).then(r => r.json())
}

export function login(data: UserLoginType |  URLSearchParams) {
  return http.request({
    url: '/auth',
    method: 'post',
    data
  })
}


export default { getCurrentUser, login }