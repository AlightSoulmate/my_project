<template>
  <section class="px-32">
    <messageFrame class="" v-for="qa in data">
      <template #name> {{ qa.role }} </template>
      <template #content>
        {{ qa.answer || qa.question }}
      </template>
    </messageFrame>
  </section>
</template>

<script setup lang="ts">
import messageFrame from "./messageFrame.vue";
import historyStore from "../../store/llmStore";
let data = ref([]);

const history = historyStore();
history.getUserHistory().then((r) => {
  data.value.push(...r);
  console.log("r", r);
});

// 每当pinia中的history数据更新后(用户submit && 服务端返回), 刷新视图
watch(
  () => history.history,
  () => {
    console.log("REFRESH");
    history.getUserHistory().then((r) => {
      data.value.splice(0, data.value.length, ...r);
    });
  }
);
</script>

<style scoped></style>
