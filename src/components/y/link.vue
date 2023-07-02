<template>
  <router-link to="/" class="y_text">{{y_title}}</router-link>
</template>

<script setup lang="ts">
defineProps({
  y_title:String
})
</script>

<style scoped>
.y_text {
  @apply text-xs text-gray-600
}
</style>