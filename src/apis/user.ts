import { apiEnum } from '@/enum/apiEnum'
import { CacheEnum } from '@/enum/cacheEnum'
import store from '@/utils/store'
import { logout } from '@/utils/user'

export interface UserType {
  id: number,
  name: string,
  email: string,
  permissions: string[]
}
export interface UserLoginType {
  account: string
  password: string
}
export interface UserRegistryType {
  name: string
  password: string
  email: string
}

export interface AuthReturnType {
  access_token: string
  token_type: string
}

export async function login(data: UserLoginType): Promise<AuthReturnType> {
  const params: URLSearchParams = new URLSearchParams() as any
  params.append("username", data.account)
  params.append("password", data.password)
  return await fetch(apiEnum.LOGIN, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: params
  }).then(res => res.json()
  )
}

export function registry(data: UserRegistryType) {
  return fetch(apiEnum.REGISTRY, {
    method: 'post',
    body: JSON.stringify(data)
  })
}

export async function getCurrentUser(): Promise<UserType | undefined> {
  const result = await fetch(apiEnum.GET_CURRENT_USER, {
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
  return result as UserType | undefined
}