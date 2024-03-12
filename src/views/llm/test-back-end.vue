<template>
  <div>
    <el-button type="primary" size="default" @click="handleClick"></el-button>
  </div>
</template>

<script setup lang="ts">
import { login } from "@/apis/userApi";
const handleClick = () => {
  login({ name: "root", password: "root" }).then((r) => {
    console.log("r", r);
  });
};
</script>

<style scoped></style>
