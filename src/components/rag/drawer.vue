<template>
  <div class="pr-3">
    <el-drawer size="700px" v-model="isDrawerShow" direction="rtl" :before-close="tip">
      <template #header>
        <h1 class="text-xl border-b-2 py-6">对话设置</h1>
      </template>
      <template #default>
        <div class="flex flex-col">
          
        </div>
      </template>
    </el-drawer>
    <div class="duration-300 hover:scale-125">
      <Config theme="outline" size="28" fill="#6a89cc" class="cursor-pointer" @click="toggleDrawerShow" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ElNotification } from "element-plus";
import { defineEmits } from "vue";
import { Config, Equalizer } from "@icon-park/vue-next";
import llmStore from "@/store/llmStore";
const conf = llmStore()
const emit = defineEmits(["getConfig"]);
const isDrawerShow = ref(false);
const stream = ref(await conf.getConfig().then(r => r?.stream));

const toggleDrawerShow = () => {
  isDrawerShow.value = !isDrawerShow.value;
};
const tip = (done: any) => {
  done();
  ElNotification({
    title: "配置重载成功",
    message: "快去对话试试吧!",
    type: "success",
  });
};
</script>
