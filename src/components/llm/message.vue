<template>
  <section class="px-32">
    <messageFrame class="" v-for="history in data!.history">
      <template #name> {{ name || email }} </template>
      <template #content>
        {{ JSON.parse(history.content).content }}
      </template>
    </messageFrame>
    <el-button type="primary" size="default" @click="sendRequest"
      >send request</el-button
    >
  </section>
</template>

<script setup lang="ts">
import messageFrame from "./messageFrame.vue";
import { getHistory } from "@/apis/historyApi";
const name = ref("");
const email = ref("");

type HistoryType = {
  id: number;
  owner_id: number;
  content: string;
};

type Item = {
  id: number;
  name: string;
  email: string;
  history: HistoryType[];
};

let data = ref<Item>({} as any);
async function sendRequest() {
  getHistory()
    .then((r) => r.json())
    .then((r: any) => {
      data.value!.history = { ...data.value!.history, ...r.history };
      name.value = r.name;
      email.value = r.email;
    });
}
</script>

<style scoped></style>
