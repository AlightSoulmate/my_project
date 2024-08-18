<template>
  <div>
    <editor v-model="content"></editor>
    {{ content }}
  </div>
</template>

<script setup lang="ts">
import editor from '@/components/markdown/editor.vue'
import { ref } from 'vue';
const content = ref('')

</script>

<style scoped></style>
