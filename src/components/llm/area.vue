<template>
  <div class="w-full flex flex-col justify-center items-center">
    <section class="flex flex-col">
      <h2 class="text-center">您的微调进度</h2>
      <el-progress type="dashboard" :percentage="percentage" :color="color" />
    </section>
    <el-divider />
    <section class="w-3/4">
      <div class="flex flex-col justify-center items-center">
        <el-cascader placeholder="选择目标区域" class="w-full mb-2" size="large" :options="pcTextArr"
          v-model="selectedOptions">
        </el-cascader>
        <el-slider class="mb-12" v-model="crawlAmount" :step=10 show-stops :min="10" :max="500" :marks="marks"
          show-input />
        <el-popconfirm title="请确认区域选择无误" @confirm="requestCrawl">
          <template #reference>
            <el-button class="w-full" type="primary" size="default">确定</el-button>
          </template>
        </el-popconfirm>
      </div>
    </section>
    <el-divider />


    <section>
      <h2>对目标地区进行更多的训练, 能提高小助理的回答质量哦</h2>
    </section>

  </div>
</template>

<script setup lang="ts">
import { http } from "@/plugins/axios";
import {
  pcTextArr
} from "element-china-area-data";
import { CSSProperties, watch } from 'vue'

enum COLOR {
  ERROR = "#eb2f06",
  INIT = "#ffffff",
  BEGIN = "#0c2461",
  AFTER_CRAWL = "#38ada9",
  AFTER_FINETUNE = "#b8e994",
  SUCCESS = "#2ed573"
}
enum PERCENTAGE {
  INIT = 0,
  BEGIN = 20,
  AFTER_CRAWL = 40,
  AFTER_FINETUNE = 90,
  SUCCESS = 100
}

interface Mark {
  style: CSSProperties
  label: string
}
type Marks = Record<number, Mark | string>

const selectedOptions = ref([])
const crawlCity = ref("")
const crawlAmount = ref("0")

const marks = reactive<Marks>({
  80: '较少数据',
  200: '中等数据',
  400: '较多数据',
})

const percentage = ref<PERCENTAGE>(PERCENTAGE.INIT)
const color = ref<COLOR>(COLOR.INIT)


watch(() => selectedOptions.value, (newValue) => {
  crawlCity.value = newValue.join("")
})

watch(() => crawlAmount.value, (newValue) => {
  console.log('newValue', newValue)
})

const requestCrawl = () => {
  http.request({
    url: "/llm/crawl",
    method: 'POST',
    data: {
      city: crawlCity.value,
      amount: crawlAmount.value
    }
  }).then(res => {
    console.log('res', res)
  })
}

</script>

<style scoped></style>