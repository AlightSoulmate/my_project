<template>
  <el-table
    ref="singleTableRef"
    highlight-current-row
    style="width: 100%"
    @current-change="">
    <el-table-column type="index" width="50" />
    <el-table-column property="name" label="name" width="120" />
  </el-table>
</template>

<script setup lang="ts">

</script>

<style scoped></style>
