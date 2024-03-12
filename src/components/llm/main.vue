<template>
  <el-container class="h-full w-full">
    <el-main class="main flex">
      <article class="h-flex-1">
        <messageVue></messageVue>
      </article>
    </el-main>
    <el-footer class="relative flex justify-center items-center">
      <drawerVue @configToggle="isConfigShow"></drawerVue>
      <Config
        theme="outline"
        size="28"
        fill="#686de0"
        class="cursor-pointer"
        @click="configShow"
      />
      <el-input
        v-model="input"
        style="width: 600px; height: 60px"
        size="large"
        placeholder="想了解点什么~"
        :suffix-icon="Search"
        @input="handleInput"
        @change="handleSubmit"
      />
    </el-footer>
  </el-container>
</template>

<script setup lang="ts">
import { Search } from "@icon-park/vue-next";
import { Config } from "@icon-park/vue-next";
import messageVue from "./message.vue";
import historyStore from "../../store/llmStore";
import drawerVue from "./drawer.vue";

const history = historyStore();
const isConfigShow = ref(false);
const messages = ref([]);
const input = ref("");

const configShow = () => {
  isConfigShow.value = !isConfigShow.value;
};
const handleInput = (e: any) => {
  console.log("e", e);
};

const handleSubmit = (e: any) => {
  input.value = e;
  history.updateUserHistory([
    {
      role: "user",
      question: e,
      answer: e,
    },
  ]);
  input.value = "";
};

watch(
  () => input.value,
  (value, oldvalue) => {
    console.log("input.value", input.value);
  }
);
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
