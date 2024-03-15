import userApi, { AuthReturnType, UserLoginType } from '../apis/userApi';
import { CacheEnum } from './../enum/cacheEnum';
import store from "./store";
import router from '@/router'
import userStore from '../store/userStore';
import sessionStore from '@/store/sessionStore';

export async function login(values: UserLoginType | URLSearchParams) {
  const { access_token } = await userApi.login(values) as any
  if ((access_token !== null) || (access_token !== undefined)) {
    store.set(CacheEnum.TOKEN_NAME, access_token)
    if (!store.get(CacheEnum.REDIRECT_ROUTE_NAME)) {
      store.set(CacheEnum.REDIRECT_ROUTE_NAME, "llm")
    }
    const routeName = store.get(CacheEnum.REDIRECT_ROUTE_NAME) ?? 'home'
    userStore().getUserInfo()
    console.log('routeName', routeName)
    router.push({ name: routeName })
  }
}
export function logout() {
  store.remove(CacheEnum.TOKEN_NAME)
  router.push('/login')
  sessionStore().clearAllSession()
  location.reload()
  userStore().info = null
}
export function isLogin() {
  return Boolean(store.get(CacheEnum.TOKEN_NAME))
}