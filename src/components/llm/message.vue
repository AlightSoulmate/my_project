<template>
  <section class="px-32 flex flex-col">
    <messageFrame class="my-4" v-for="history in data">
      <template #name> {{ history.role }} </template>
      <template #date> {{ history.date }} </template>
      <template #content>
        {{ JSON.parse(history.content).content }}
      </template>
    </messageFrame>
  </section>
</template>

<script setup lang="ts">
import userStore, { HistoryType } from "@/store/userStore";
import messageFrame from "./messageFrame.vue";
import { getHistory } from "@/apis/historyApi";
const name = ref("");
const email = ref("");
getHistory()
    .then((r) => r.json())
    .then((r: any) => {
      name.value = r.name;
      email.value = r.email;
    });
let data = ref<HistoryType[]>([]);
watch(userStore(), async () => {
  data.value = (await userStore().getCurrentSession(
    userStore().currentIndex
  )) as any;
  console.log("data", data.value);
});
</script>

<style scoped></style>
