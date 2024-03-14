import { CacheEnum } from '@/enum/cacheEnum'
import store from '@/utils/store'
import { logout } from '@/utils/user'
import { URLSearchParams } from 'url'
import { http } from '../plugins/axios/index'


export interface LLMRequestType {
  model: string;
  messages: string;
  stream: boolean;
  max_tokens: number;
  temperature: number;
  top_p: number;
}

interface Message {
  role: string;
  content: string;
}

/**
 * 想LLM发送请求
*/
export function createCompletion(data: LLMRequestType) {
  return http.request({
    url: '/llm/completions',
    method: 'post',
    data
  })
}


export default { createCompletion }