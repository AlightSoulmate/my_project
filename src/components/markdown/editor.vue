<template>
  <div id="editor"></div>
</template>

<script lang="ts" setup>
import { nextTick } from 'vue'
import toastEditor from './toastEditor'
export interface IProps {
  modelValue?: string
  height?: number
  placeholder?: string
}
const props = withDefaults(defineProps<IProps>(), {
  modelValue: '',
  height: 500,
  placeholder: '',
})
const emit = defineEmits(['update:modelValue'])

nextTick(() => {
  const toastui = new toastEditor(
    '#editor',
    `${props.modelValue}`,
    `${props.height}px`,
  )
  toastui.editor.on('change', (type: string) => {
    emit(
      'update:modelValue',
      toastui.editor[type == 'markdown' ? 'getMarkdown' : 'getHTML'](),
    )
  })
})
</script>

<style lang="scss">
@import 'https://uicdn.toast.com/editor/latest/toastui-editor.min.css';
#editor {
  @apply bg-white;
  .fullscreen {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 999;
    background: #fff;
  }
}
</style>
