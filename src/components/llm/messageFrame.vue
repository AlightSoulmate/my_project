<template>
  <div class="flex">
    <el-avatar
      :size="40"
      src="/images/user.png"
    />
    <div class="flex flex-col w-full pl-3">
      <div class="flex">
        <div><slot name="name"></slot></div>
        <div class="ml-3"><slot name="date"></slot></div>
      </div>
      <slot name="content"></slot>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
