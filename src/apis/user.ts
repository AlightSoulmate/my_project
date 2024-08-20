import { CacheEnum } from '@/enum/cacheEnum'
import store from '@/utils/store'
import { logout } from '@/utils/user'
export interface AuthReturnType {
  access_token: string
  token_type: string
}
export interface UserRegistryType {
  name: string
  password: string
  email: string
}

export interface UserLoginType {
  account: string
  password: string
}

export interface User {
  id: number,
  name: string,
  email: string,
  permissions: string[]
}

interface AuthType {
  access_token: string
  token_type: string
}

/**
 * 获取当前用户信息
 * 若有返回值(已授权), 则返回json数据, 若无返回值, 既清理token, 路由跳转到登录界面
*/
export async function getCurrentUser(): Promise<User | undefined> {
  const result = await fetch("/base/current", {
    headers: {
      'Authorization': `Bearer ${store.get(CacheEnum.TOKEN_NAME)}`,
      "Content-Type": "application/json"
    },
  }).then((r: any) => {
    if (r) {
      if (r?.detail) {
        logout()
      } else {
        return r
      }
    }
    return undefined
  })
  return result as User | undefined
}

/**
 * 用户注册, 输入用户名和密码
*/
export function registry(data: UserRegistryType) {
  return fetch("/api/base/registry", {
    method: 'post',
    body: JSON.stringify(data)
  })
}

/**
 * 用户登录, 输入用户名和密码
 * 最终会把用户名和密码通过x-www-form-urlencoded的方式发送给服务端
*/
export async function login(data: UserLoginType): Promise<AuthType> {
  // globalThis: 明确是浏览器环境
  const params: URLSearchParams = new URLSearchParams() as any
  params.append("username", data.account)
  params.append("password", data.password)
  return await fetch("/api/base/auth", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: params
  }).then(res => res.json()
  )
}


export default { getCurrentUser, login }