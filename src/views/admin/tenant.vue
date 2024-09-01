<template>
  <div>
    <section>
      <h2>学院-Tenants</h2>
      <el-table :data="tenants" style="width: 100%">
        <el-table-column prop="id" label="ID" />
        <el-table-column prop="name" label="学院名称 (英)" />
      </el-table>
    </section>
  </div>
</template>

<script setup lang="ts">
import { getTenants } from '@/apis/tenant'
const tenants = ref([])
onMounted(async () => {
  getTenants()
    .then((res) => res.json())
    .then((res) => (tenants.value = res))
})
</script>

<style scoped></style>
