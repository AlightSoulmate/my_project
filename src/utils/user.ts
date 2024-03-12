import userApi, { ILoginData } from '../apis/userApi';
import { CacheEnum } from './../enum/cacheEnum';
import  store from "./store";
import router from '@/router'
import userStore from '../store/userStore';

export async function login(values:ILoginData){
  const { access_token } = await userApi.login(values)
  store.set(CacheEnum.TOKEN_NAME, access_token)
  userStore().getUserInfo()
  const routeName = store.get(CacheEnum.REDIRECT_ROUTE_NAME)??'home'
  router.push({name:routeName})
}
export function logout(){
  store.remove(CacheEnum.TOKEN_NAME)
  router.push('/')
  userStore().info = null
}
export function isLogin(){
  return Boolean(store.get(CacheEnum.TOKEN_NAME))
}