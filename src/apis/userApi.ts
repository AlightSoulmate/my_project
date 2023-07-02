import { http } from '../plugins/axios/index'
interface LoginInterface {
  token: string
}
export interface ILoginData{
  account:string
  password:string
}
// export default class
export interface User {
  name: string,
  age: number,
  avatar: string,
  permissions:string[]
}
function info() {
  return http.request<User>({
    url: `user/info`,
  })
}

export function login (data:ILoginData) {
  return http.request<LoginInterface>({
    url: 'login',
    method:'post',
    data

  })

}

export default { info, login }