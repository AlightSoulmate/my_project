<template>
  <div>
    llm
    <button @click="request">发送请求</button>
  </div>
</template>

<script setup lang="ts">
import Axios from '@/plugins/axios/Axios';

// import {} from 'vue'

const request = () => {
  new Axios().request({
    url: "/api",
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    data: JSON.stringify({
      prompt: "你好",
      history: []
    })
  }).then(res => {
    console.log('res', res)
  }).then(res=>{
    console.log('res',res)
  })
}
</script>

<style scoped></style>