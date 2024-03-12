import store from '@/utils/store'
import { http } from '../plugins/axios/index'
import { CacheEnum } from '@/enum/cacheEnum'
interface LoginInterface {
  token: string
}
export interface ILoginData {
  account: string
  password: string
}
// export default class
export interface User {
  name: string,
  age: number,
  avatar: string,
  permissions: string[]
}

function info() {
  console.log(CacheEnum.TOKEN_NAME)
  console.log(typeof store.get(CacheEnum.TOKEN_NAME))
  return http.request<User>({
    url: `/current`,
    headers: {
      'Content-Type': 'application/json',
      "Authorization": `Bearer ${store.get(CacheEnum.TOKEN_NAME)}`
    }
  })
}

export function login(data: ILoginData) {
  return http.request<LoginInterface>({
    url: '/auth',
    method: 'post',
    data
  })
}


// function info() {
//   return http.request<User>({
//     url: `user/info`,
//   })
// }

// export function login(data: ILoginData) {
//   return http.request<LoginInterface>({
//     url: 'login',
//     method: 'post',
//     data
//   })
// }

export default { info, login }