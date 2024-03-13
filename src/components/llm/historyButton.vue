<template>
  <button
    class="flex flex-col text-left py-2 transition-[.3s] hover:bg-slate-200"
  >
    <div class="w-full flex">
      <p class="pl-1"><slot name="title"></slot></p>
      <p class="ml-auto pr-1"><slot name="length"></slot></p>
    </div>
    <div>
      <p class="text-sm pl-1">
        <slot name="time"></slot>
      </p>
    </div>
  </button>
</template>

<script setup lang="ts"></script>

<style scoped></style>
