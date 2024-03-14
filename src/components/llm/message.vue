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
import { getCurrentUser } from "@/apis/userApi";
import sessionStore, { HistoryType } from "@/store/sessionStore";
import messageFrame from "./messageFrame.vue";
const name = ref("");
const email = ref("");
getCurrentUser().then((r: any) => {
  name.value = r.name;
  email.value = r.email;
});
let data = ref<HistoryType[]>(
  sessionStore().getCurrentSession(sessionStore().currentIndex) as any
);
watch(sessionStore(), async () => {
  data.value = (await sessionStore().getCurrentSession(
    sessionStore().currentIndex
  )) as any;
});

sessionStore().setFlush();
</script>

<style scoped></style>
