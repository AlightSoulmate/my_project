import { CacheEnum } from './../../enum/cacheEnum';
import store from '@/utils/store';
import Axios from './Axios'
import { AxiosRequestConfig, RawAxiosRequestHeaders } from 'axios';
import { url } from '@/utils/url';
const http = new Axios({
  baseURL: url || '/api',
  timeout: 100000,
  headers: {},
})
export { http }