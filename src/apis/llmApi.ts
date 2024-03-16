import sessionStore from '@/store/sessionStore'
import { AxiosProgressEvent } from 'axios'
import { v4 } from 'uuid'
import { http } from '../plugins/axios/index'


export interface LLMRequestType {
  model: string;
  messages: Message[];
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
 * 向LLM发送请求
*/

export function createCompletion(data: LLMRequestType) {
  return http.request({
    url: '/llm/completions',
    method: 'post',
    responseType: 'stream',
    async onDownloadProgress(progressEvent: AxiosProgressEvent) {
      const responseStream = progressEvent.event?.currentTarget.response as string
      const res = new ReadableStream(responseStream)
      const reader = res.pipeThrough(new TextDecoderStream()).getReader()
      // 读取并处理流中的数据
      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        const chunk = value ? new TextDecoder().decode(value) : ''
        // 在这里处理每个数据块
        console.log('Received chunk:', chunk)
      }

      // 所有数据已接收完毕
      console.log('All data received.')
    },
    data
  })
}
export function createCompletionFetch(data: LLMRequestType) {
  return fetch('http://127.0.0.1:5173/api/llm/completions', {
    method: 'post',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      ...data
    })
  })
}


export async function getStream(data: LLMRequestType) {
  const res = await fetch("/api/llm/completions", {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      ...data
    })
  });
  const reader = res.body!.getReader();
  while (true) {
    const { done, value } = await reader.read()
    if (done) break
    const chunk = value ? new TextDecoder().decode(value) : ''
    const part = chunk.split("data:")[1]
    try {
      if (part.match(/\[DONE\]/)) {
      } else {
        const postProcessData = JSON.parse(part)
        const item = {
          id: v4(),
          date: new Date().toUTCString(),
          role: 'machine',
          content: postProcessData.choices[0].delta.content
        }
        sessionStore().pushItemToCurrentSession(item)
      }
    } catch (e) {
      console.error(e)
    }
  }
}




export default { createCompletion }