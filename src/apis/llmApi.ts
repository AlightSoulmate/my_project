import sessionStore from '@/store/sessionStore';
import { v4 } from 'uuid';

interface Message {
  role: string;
  content: string;
  user?: string
  tool_calls?: string[]
}
export interface LLMRequestType {
  prompt: string
  system_prompt?: string
  chat_history?: Message[]
}

export interface StreamDataType {
  choices: Array<{
    delta: {
      content: string
    }
    finish_reason: null | string
    index: number
  }>
  created: number
  id: string
  model: string
  object: string
}

/**
 * 获取对话, 以XINFERENCE接口流式渲染
*/
export async function getStream(data: LLMRequestType) {
  const res = await fetch(`/api/llm/chat`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      ...data
    })
  });
  const reader = res.body!.getReader();
  let signal = false;
  while (!signal) {
    const { value } = await reader.read()
    const chunk = value ? new TextDecoder().decode(value) : ''
    if (chunk) {
      chunk.split("\n").forEach(ck => {
        if (ck !== '') {
          const postProcessData: StreamDataType = JSON.parse(ck)
          if (postProcessData.choices[0].finish_reason !== null) signal = true
          try {
            const item = {
              id: v4(),
              date: new Date().toUTCString(),
              role: 'machine',
              content: postProcessData.choices[0].delta.content
            }
            sessionStore().pushItemToCurrentSession(item)
          } catch (e) {
            console.error(e)
            return
          }
        }
      })
    }
  }
}