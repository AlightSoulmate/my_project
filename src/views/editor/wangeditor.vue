<template>
  <div>
    <wangEditor v-model="content"></wangEditor>
    <div class="bg-gray w-full mt-3 border">
      {{ content }}
    </div>
  </div>
</template>

<script setup lang="ts">
import wangEditor from '@/components/wangEditor/editor.vue'

const content = ref('<p>young</p>')
</script>
<style scoped></style>
