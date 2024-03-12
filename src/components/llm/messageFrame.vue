<template>
  <div class="flex">
    <el-avatar
      :size="40"
      src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
    />
    <div class="flex flex-col">
      <span>
        <slot name="name"></slot>
      </span>
      <slot name="content"></slot>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
