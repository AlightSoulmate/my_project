<template>
  <div class="h-screen w-screen">
    <!-- <drawerVue @getConfig="getConfig"/> -->
    <el-container class="h-full w-full">
      <el-aside width="300px" class="h-full">
        <sideVue></sideVue>
      </el-aside>
      <el-main>
        <mainVue></mainVue>
      </el-main>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import drawerVue from "@/components/llm/drawer.vue";
import mainVue from "@/components/llm/main.vue";
import sideVue from "@/components/llm/side.vue";
const content = ref("");
let initModel = reactive<LLMModel>({
  model: "chatglm3-6b",
  messages: [
    {
      role: "system",
      content:
        "You are ChatGLM3, a large language model trained by Zhipu.AI. Follow the user's instructions carefully. Respond using markdown.",
    },
    {
      role: "user",
      content: content.value || "你好，给我讲一个故事，大概100字",
    },
  ],
  stream: false,
  max_tokens: 100,
  temperature: 0.8,
  top_p: 0.8,
});

const getConfig = (v: LLMModel) => {
  console.log("v", v);
  console.log("🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹");
  console.log(initModel);
  console.log("🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹");
  initModel = {
    ...initModel,
    ...v,
  };
  console.log("🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹");
  console.log(initModel);
  console.log("🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹");
};
</script>

<style scoped></style>
