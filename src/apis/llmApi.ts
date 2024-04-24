<<<<<<< HEAD
import sessionStore from '@/store/sessionStore';
import { v4 } from 'uuid';
=======
import sessionStore from '@/store/sessionStore'
import { AxiosProgressEvent } from 'axios'
import { v4 } from 'uuid'
import { http } from '../plugins/axios/index'
import { env } from 'process';
const url = '/api'
const prodUrl = "http://127.0.0.1:8000/api"
>>>>>>> e5ea5b967028699b9f0a41c1736fcf5a659b67d7

interface Message {
  role: string;
  content: string;
}
export interface LLMRequestType {
  model: string;
  messages: Message[];
  stream: boolean;
  max_tokens: number;
  temperature: number;
  top_p: number;
}

/**
 * 获取对话, 以流式渲染
*/
export async function getStream(data: LLMRequestType) {
  const res = await fetch(`/api/llm/completions`, {
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
      return
    }
  }
}