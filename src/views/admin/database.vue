<template>
  <div>
    <section>
      <h2>数据库-Database</h2>
      <el-table :data="databases" style="width: 100%">
        <el-table-column prop="id" label="ID" />
        <el-table-column prop="name" label="数据库名称" />
        <el-table-column prop="tenant_name" label="归属学院 (英)" />
      </el-table>
    </section>
  </div>
</template>

<script setup lang="ts">
import { getDatabases } from '@/apis/database';
const databases = ref([])
onMounted(async () => {
  getDatabases()
    .then((res) => res.json())
    .then((res) => (databases.value = res))
})
</script>

<style scoped></style>
