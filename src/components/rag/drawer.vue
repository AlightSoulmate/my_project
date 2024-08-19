<template>
  <div class="pr-3">
    <el-drawer size="700px" v-model="isDrawerShow" direction="rtl">
      <template #header>
        <h1 class="text-xl border-b-2 py-6">上传设置</h1>
      </template>
      <template #default>
        <div class="flex flex-col">
          <section>
            <UploadDocument />
          </section>
        </div>
      </template>
    </el-drawer>
    <div class="duration-300 hover:scale-125">
      <Config theme="outline" size="28" fill="#6a89cc" class="cursor-pointer" @click="toggleDrawerShow" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ElNotification } from 'element-plus'
import { defineEmits } from 'vue'
import { Config, Equalizer, UploadLogs } from '@icon-park/vue-next'
import llmStore from '@/store/llmStore'
import UploadDocument from './uploadDocument.vue'
const conf = llmStore()
const emit = defineEmits(['getConfig'])
const isDrawerShow = ref(false)

const toggleDrawerShow = () => {
  isDrawerShow.value = !isDrawerShow.value
}
</script>
