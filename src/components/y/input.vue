<template>
    <input type="text"  class="y_input" :value="props.modelValue" @input="$emit('update:modelValue',$event.target!.value!)">

</template>

<script setup lang="ts">
  const props = defineProps({
    modelValue:String
  })

</script>

<style scoped>
.y_input {
  @apply border border-gray-200 placeholder:text-xs w-full rounded py-1 px-2 outline-none focus:ring-2 ring-offset-2 ring-purple-600 duration-300 focus:border-white;
}
</style>
