<template>
  <div class="flex">
    <el-avatar v-if="role === 'user'" :size="40" src="/images/user.png" />
    <el-avatar v-else :size="40" src="/images/robot.png" />
    <div class="flex flex-col w-full pl-3">
      <div class="flex">
        <div>
          <slot name="name"></slot>
        </div>
        <div class="ml-3">
          <slot name="date"></slot>
        </div>
      </div>
      <slot name="content"></slot>

    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps(['role'])
const role = ref(props.role)
console.log('role',role.value)

</script>

<style scoped></style>
