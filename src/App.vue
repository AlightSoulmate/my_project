<script setup lang="ts">
// import { info } from 'console';

// import userApi from './apis/userApi';

// interface User {
//   code: number,
//   message: string,
//   type: 'success' | 'error',
//   result: {
//     name: string,
//     age: number,
//     avatar: string
//   }
// }

// 发送get请求获取信息
// const response: User = await userApi.info()
// console.log (response.result);

// // 发送post请求登陆（因为模拟，使用的是get）
// const response = await userApi.login()
// console.log(response);
</script>

<template>
  <Suspense>
    <router-view></router-view>
  </Suspense>
</template>

<style></style>
