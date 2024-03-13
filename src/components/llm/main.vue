<template>
  <el-container class="h-full w-full">
    <el-main class="main flex">
      <article class="h-flex-1">
        <messageVue></messageVue>
      </article>
    </el-main>
    <el-footer class="relative flex justify-center items-center">
      <drawerVue></drawerVue>
      <el-input
        v-model="userInput"
        style="width: 600px; height: 60px"
        size="large"
        placeholder="想了解点什么~"
        :suffix-icon="Search"
        @change="handleSubmit"
      />
    </el-footer>
  </el-container>
</template>

<script setup lang="ts">
import { createConversation, getHistory } from "@/apis/historyApi";
import { User } from "@/apis/userApi";
import { Search } from "@icon-park/vue-next";
import drawerVue from "./drawer.vue";
import messageVue from "./message.vue";

const userInput = ref("");

const handleSubmit = async (e: any) => {
  userInput.value = e;
  const userId = (await getHistory().then((r) => r.json() as unknown as User))
    .id;
  if (userId) {
    createConversation(
      userId,
      JSON.stringify({
        content: JSON.stringify({
          role: "user",
          content: userInput.value,
        }),
        owner_id: userId,
        id: 0,
      })
    );
  }
  userInput.value = "";
};
</script>

<style scoped lang="scss">
.main::-webkit-scrollbar-track {
  background-color: #929ca059; /* 设置轨道背景色 */
  border-radius: 10px; /* 轨道边框圆角 */
}
/* 定义滚动条 */
.main::-webkit-scrollbar {
  width: 5px; /* 设置滚动条宽度 */
  background-color: #f1f1f1; /* 设置滚动条背景色 */
}

/* 定义滚动条滑块 */
.main::-webkit-scrollbar-thumb {
  background-color: #878b8d; /* 设置滑块背景色 */
  border-radius: 10px; /* 轨道边框圆角 */
}
</style>
