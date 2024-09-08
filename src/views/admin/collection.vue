<template>
  <div>
    <section>
      <h2>集合 - Collection</h2>

      <!-- 搜索框和创建按钮 -->
      <div class="header-container">
        <el-button @click="isDialogVisible = true" type="primary">创建集合</el-button>
        <span style="display: inline-flex;">
          <el-input v-model="searchQuery" placeholder="请输入集合名称搜索" clearable style="margin-right:5px;"/>
          <el-button @click="performSearch" type="primary">搜索</el-button>
        </span>
      </div>

      <!-- 集合展示表格 -->
      <el-table :data="collections" style="width: 100%">
        <el-table-column prop="id" label="ID" />
        <el-table-column prop="name" label="集合名称" />
        <el-table-column prop="vest_database" label="归属数据库" />
        <el-table-column prop="vest_tenant" label="归属学院 (英)" />
      </el-table>

      <!-- 弹窗：创建集合 -->
      <el-dialog title="创建新集合" v-model="isDialogVisible" width="500" @close="resetDialogForm" style="z-index: 9999;">
        <el-form :model="newCollection">
          <el-form-item label="集合名称" required>
            <el-input v-model="newCollection.name" />
          </el-form-item>
          <el-form-item label="归属数据库" required>
            <el-input v-model="newCollection.database_name" />
          </el-form-item>
          <el-form-item label="归属学院 (英)" required>
            <el-input v-model="newCollection.tenant_name" />
          </el-form-item>
        </el-form>

        <template #footer>
          <el-button @click="isDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="createNewCollection">创建</el-button>
        </template>
      </el-dialog>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getCollections, createCollection, getCollectionByName } from '@/apis/collection'
// import { v4 as uuidv4 } from 'uuid'

// Collection接口
interface Collection {
  id: string;
  name: string;
  database_name: string;
  tenant_name: string;
}

const collections = ref<Collection[]>([])
const searchQuery = ref('')
const newCollection = ref({
  name: '',
  tenant_name: '',
  database_name: ''
})
const isDialogVisible = ref(false)

// 页面加载时获取所有集合
onMounted(async () => {
  await fetchCollections()
})

// 获取所有集合的函数
async function fetchCollections() {
  const response = await getCollections()
  const data = await response.json()
  collections.value = data // 确保数据结构与Collection匹配
}

// onMounted(async () => {
//   getCollections()
//     .then((res) => res.json())
//     .then((res) => (collections.value = res)).then(res => {
//       console.log('res', res)
//     })
// })

// 搜索集合 （input直接搜索）
async function searchCollections() {
  if (searchQuery.value) {
    const response = await getCollectionByName(searchQuery.value)
    const data = await response.json()
    collections.value = [data] // 确保返回的是Collection类型
  } else {
    fetchCollections()
  }
}

// 搜索集合（点击搜索按钮搜索）
async function performSearch() {
  if (searchQuery.value) {
    const response = await getCollectionByName(searchQuery.value)
    const data = await response.json()
    // getCollectionByName返回单个对象，放入数组  
    collections.value = [data]; 
  } else {
    fetchCollections(); // 如果没有搜索词，重新获取所有集合  
  }
}

// 打开弹窗的函数 
// function openDialog() {
//   console.log('Dialog Opened');
//   isDialogVisible.value = true
// }

// 重置弹窗表单的函数
function resetDialogForm() {
  newCollection.value = {
    name: '',
    tenant_name: '',
    database_name: ''
  }
}

// 创建新集合的函数
async function createNewCollection() {
  if (!newCollection.value.name || !newCollection.value.tenant_name || !newCollection.value.database_name) {
    return alert('请填写完整的信息')
  }

  // const newId = uuidv4()

  const newData = newCollection.value
  // id: newId,

  const response = await createCollection(newData)
  if (response.ok) {
    alert('集合创建成功')
    newCollection.value = { name: '', tenant_name: '', database_name: '' } // 清空表单
    fetchCollections() // 重新获取集合列表
    isDialogVisible.value = false // 关闭弹窗
  } else {
    alert('创建失败')
  }
}
</script>

<style scoped>
  .header-container {
    display: flex;
    justify-content:space-between;
    margin-bottom: 10px;
    flex-wrap: nowrap;
    margin-top: 5px;
  }
</style>

<!-- 原代码 -->
<!-- <template>
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

<style scoped></style> -->

<!-- filter筛选-->
<!-- <template>
  <div>
    <section>
      <h2>集合-Collection</h2>
      <el-table :data="filteredCollections" style="width: 100%" @filter-change="filterChange">
        <el-table-column prop="id" label="ID" />
        <el-table-column prop="name" label="集合名称" />
        <el-table-column prop="vest_database" label="归属数据库" />
        <el-table-column prop="vest_tenant" label="归属学院 (英)" column-key="vest_tenant" :filters="[
          { text: 'yingwen', value: 'yingwen' },
          { text: 'guoshang', value: 'guoshang' },
          { text: 'zhongwen', value: 'zhongwen' },
          { text: 'dongyu', value: 'dongyu' }
        ]" :filter-multiple="false" />
      </el-table>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const collections = [
  { id: '2017-05-03', name: 'Tom', vest_database: 'No. 183', vest_tenant: 'yingwen' },
  { id: '2018-02-28', name: 'John', vest_database: 'No. 112', vest_tenant: 'guoshang' },
  { id: '2024-07-21', name: 'Cindy', vest_database: 'No. 99', vest_tenant: 'zhongwen' },
  { id: '2022-11-01', name: 'Jack', vest_database: 'No. 421', vest_tenant: 'dongyu' }
]

const filteredCollections = ref([...collections])  // 使用ref来响应式处理筛选结果

function filterChange(filters: any) {
  const { vest_tenant } = filters
  if (vest_tenant && vest_tenant.length > 0) {
    // 筛选条件
    filteredCollections.value = collections.filter(item => item.vest_tenant === vest_tenant[0])
    console.log('点击筛选', vest_tenant)
  } else {
    // 重置筛选
    filteredCollections.value = [...collections]
    console.log('点击重置')
  }
}
</script> -->