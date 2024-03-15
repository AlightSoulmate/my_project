<template>
  <el-container class="h-full w-full">
    <el-main class="main flex" id="main-window">
      <article class="flex-1">
        <messageVue></messageVue>
      </article>
    </el-main>
    <el-footer class="relative flex justify-center items-center mt-3">
      <drawerVue></drawerVue>
      <el-input v-model="userInput" style="width: 600px; height: 60px" size="large" placeholder="想了解点什么~"
        :suffix-icon="Search" @change="handleSubmit" />
    </el-footer>
  </el-container>
</template>

<script setup lang="ts">
import sessionStore from "@/store/sessionStore";
import { Search } from "@icon-park/vue-next";
import { v4 } from 'uuid';
import drawerVue from "./drawer.vue";
import messageVue from "./message.vue";
import { createCompletion, createCompletionFetch, getStream } from "@/apis/llmApi";
import llmStore, { LLMResponse } from "@/store/llmStore";
import { ref, onMounted } from 'vue'
onMounted(() => {
  const mainWindow = document.getElementById("main-window")
  mainWindow?.scroll({ top: mainWindow?.scrollHeight, behavior: 'smooth' })
})

watch(await sessionStore(), () => {
  const mainWindow = document.getElementById("main-window")
  mainWindow?.scroll({ top: mainWindow?.scrollHeight, behavior: 'smooth' })
})

const userInput = ref("");

const handleSubmit = async (e: any) => {
  userInput.value = e;
  try {
    await sessionStore().updateCurrentSession({
      id: v4(),
      content: JSON.stringify({
        content: e
      }),
      role: "user",
      date: new Date().toUTCString()
    }).then(async () => {
      await sessionStore().updateCurrentSession({
        date: new Date().toUTCString(),
        id: v4(),
        role: 'machine',
        content: '...'
      })
    }).then(dispatch)
  } catch (e) {
    console.error(e);
  }
  userInput.value = "";
};

const dispatch = async () => {
  const config = await llmStore().getConfig()
  getStream({
    ...config,
    messages: [
      {
        "role": "system",
        "content": "You are ChatGLM3, a large language model trained by Zhipu.AI. Follow the user's instructions carefully. Respond using markdown."
      },
      {
        "role": "user",
        "content": `${userInput.value}`
      }
    ],
  })
}
</script>

<style scoped lang="scss">
.main::-webkit-scrollbar-track {
  background-color: #929ca059;
  /* 设置轨道背景色 */
  border-radius: 10px;
  /* 轨道边框圆角 */
}

/* 定义滚动条 */
.main::-webkit-scrollbar {
  width: 5px;
  /* 设置滚动条宽度 */
  background-color: #f1f1f1;
  /* 设置滚动条背景色 */
}

/* 定义滚动条滑块 */
.main::-webkit-scrollbar-thumb {
  background-color: #878b8d;
  /* 设置滑块背景色 */
  border-radius: 10px;
  /* 轨道边框圆角 */
}
</style>
