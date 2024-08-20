<template>
  <el-container class="h-full w-full">
    <el-main class="main flex" id="main-window">
      <article v-if="!isEmpty" class="flex-1">
        <messageVue></messageVue>
      </article>
      <article v-else class="flex-1 h-full flex flex-col justify-center items-center">
        <el-image src="/images/empty.png" fit="contain" :lazy="true" class="py-12 scale-150"></el-image>
        <h1 class="opacity-70 text-slate-600 mt-6">当前还没有记录, 快去聊聊吧~</h1>
      </article>
    </el-main>
    <el-footer class="relative flex flex-col justify-center items-center mt-3">
      <section class="flex-1 flex justify-center items-center mt-4">
        <Drawer></Drawer>
        <input
          class="w-[650px] h-[50px] outline-none px-6 rounded-lg duration-300 hover:shadow-md focus:shadow-md"
          type="text"
          v-model="userInput"
          placeholder="想了解点什么~"
          @keyup.enter="handleSubmit" />
        <el-switch
          v-model="chatMode"
          inline-prompt
          style="margin-left: 12px; --el-switch-on-color: #a29bfe; --el-switch-off-color: #74b9ff"
          active-text="检索模式"
          width="100%"
          size="large"
          inactive-text="基础模式" />
      </section>
      <section class="text-xs opacity-30 p-1">给出的建议可能会有错误, 请仔细鉴别</section>
    </el-footer>
  </el-container>
</template>

<script setup lang="ts">
import { getStream } from '@/apis/llm'
import llmStore from '@/store/llmStore'
import sessionStore from '@/store/sessionStore'
import { v4 } from 'uuid'
import { onMounted, ref } from 'vue'
import messageVue from './message.vue'
import Drawer from './drawer.vue'
const userInput = ref('')
const isEmpty = ref(await sessionStore().isSessionEmpty())
// false: 基础LLM模式; true: RAG模式
const chatMode = ref('基础模式')

// 初始化滑动与流式渲染监听滑动
onMounted(() => {
  const mainWindow = document.getElementById('main-window')
  mainWindow?.scroll({ top: mainWindow?.scrollHeight })
})
watch(await sessionStore(), async () => {
  const mainWindow = document.getElementById('main-window')
  mainWindow?.scroll({ top: mainWindow?.scrollHeight })
  isEmpty.value = await sessionStore().isSessionEmpty()
})

// 发起对话
const handleSubmit = async (e: KeyboardEvent) => {
  const ipt = e.target as HTMLInputElement
  userInput.value = ipt.value
  try {
    await sessionStore()
      .updateCurrentSession({
        id: v4(),
        content: JSON.stringify({
          content: ipt.value,
        }),
        role: 'user',
        date: new Date().toUTCString(),
      })
      .then(async () => {
        await sessionStore().updateCurrentSession({
          date: new Date().toUTCString(),
          id: v4(),
          role: 'machine',
          content: '...',
        })
      })
      .then(dispatch)
  } catch (e) {
    console.error(e)
  }
  userInput.value = ''
}

const dispatch = async () => {
  const config = (await llmStore().getConfig()) as any
  const de = await sessionStore().getCurrentSession(await sessionStore().getSessionIndex())
  const histories: string[] = []
  de?.forEach((item) => {
    if (item.role === 'user') {
      histories.push(JSON.parse(item.content).content)
    } else {
      if (item.content !== '...') histories.push(item.content)
    }
  })
  const start = histories.length - 10 >= 0 ? histories.length - 10 : 0
  const slice = histories.slice(start, histories.length - 1)
  handleStream(slice)
}

const handleStream = async (slice: string[]) => {
  const res = await getStream({
    mode: chatMode.value ? 'rag' : 'llm',
    prompt: userInput.value,
    system_prompt: '',
    chat_history: [
      {
        role: 'user',
        content: `These are our conversation histories:${slice}.`,
      },
      {
        role: 'user',
        content: `This is what i want know now: ${userInput.value}.`,
      },
    ],
  })
  if (res.body) {
    const reader = res.body.getReader()
    const decoder = new TextDecoder('utf-8')

    // 逐块读取数据
    while (true) {
      const { done, value } = await reader.read()
      if (done) break
      let chunk
      try {
        chunk = decoder.decode(value, { stream: true })
        JSON.parse(chunk)
        console.log(chunk)
      } catch (e) {
        chunk = decoder.decode(value).split('\n')
        console.log('🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸')
        console.log(chunk)
        console.log('🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸')
      } finally {
        // console.log(value)
        // const postProcessData = JSON.parse(chunk)
        // console.log(postProcessData)
        // const item = {
        //   id: v4(),
        //   date: new Date().toUTCString(),
        //   role: 'machine',
        //   content: postProcessData.choices[0].delta.content,
        // }
        // console.log(item)
        // sessionStore().pushItemToCurrentSession(item)
      }
    }
  } else {
    throw new Error('Stream not available')
  }
}
</script>

<style scoped lang="scss">
.main::-webkit-scrollbar-track {
  background-color: #b8bfc259;
  border-radius: 10px;
}

.main::-webkit-scrollbar {
  width: 5px;
  background-color: #f1f1f1;
}

/* 定义滚动条滑块 */
.main::-webkit-scrollbar-thumb {
  background-color: #c4c4c4;
  /* 设置滑块背景色 */
  border-radius: 10px;
  /* 轨道边框圆角 */
}
</style>
