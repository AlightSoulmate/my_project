<template>
  <div class="article">
    <AnimateList tag="ul" :duration="1" :delay="0.05">
      <li
        v-for="(article, index) of articles"
        :data-index="index"
        :key="article.id"
        @click="del(index)"
      >
        {{ article.title }}
      </li>
    </AnimateList>
  </div>
</template>

<script setup lang="ts">
import { article } from '@/apis/articleApi'
// const { result } = await article()
const articles = ref()
article().then(({ data }) => (articles.value = data))

const del = (index: number) => {
  articles.value.splice(index, 1)
}
</script>

<style lang="scss" scoped>
.article {
  padding: 30px;
  width: 100vw;
  height: 100vh;
  background-color: #314155;
  ul {
    position: relative;
    li {
      padding: 10px;
      margin-bottom: 20px;
      background-color: #f7b731;
      color: white;
      border-radius: 10px;
    }
  }
}
  .animate-leave-active {
    transition: 1s all ease;
    position: absolute;
    width: 100%;
  }
  .animate-leave-to {
    opacity: 0;
  }
  .animate-move {
    transition: 1s all ease;
  }
</style>
