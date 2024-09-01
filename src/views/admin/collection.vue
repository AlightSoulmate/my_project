<template>
  <div>
    <section>
      <h2>集合-Collection</h2>
      <el-table :data="collections" style="width: 100%">
        <el-table-column prop="id" label="ID" />
        <el-table-column prop="name" label="集合名称" />
        <el-table-column prop="vest_database" label="归属数据库" />
        <el-table-column prop="vest_tenant" label="归属学院 (英)" />
      </el-table>
    </section>
  </div>
</template>

<script setup lang="ts">
import { getCollections } from '@/apis/collection';
const collections = ref([])
onMounted(async () => {
  getCollections()
    .then((res) => res.json())
    .then((res) => (collections.value = res)).then(res=>{
      console.log('res',res)
    })
})
</script>

<style scoped></style>
