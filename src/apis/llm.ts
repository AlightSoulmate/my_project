import { apiEnum } from "@/enum/apiEnum";

export interface LLMRequestType {
  prompt: string
  mode: "llm" | "rag"
  system_prompt?: string
  chat_history?: Message[]
}
interface Message {
  role: string;
  content: string;
  user?: string
  tool_calls?: string[]
}

export async function getStream(data: LLMRequestType) {
  const { mode, prompt, chat_history, system_prompt } = data
  const url = mode === "llm" ? apiEnum.LLM_CHAT : apiEnum.RAG_CHAT;
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
