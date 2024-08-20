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
  mode: "llm" | "rag"
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

export async function getStream(data: LLMRequestType) {
  const { mode, prompt, chat_history, system_prompt } = data
  const url = mode === "llm" ? "/api/llm/chat" : "/api/rag/chat";
  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      prompt,
      system_prompt,
      chat_history
    }),
  })
}
