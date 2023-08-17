<script setup>
import { nextTick } from 'vue'

const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: ''
  }
})
const emits = defineEmits(['update:modelValue'])
const input = async (e) => {
  if (!e.target.value.length) {
    emits('update:modelValue', '')
    return
  }
  const pattern = /^\d+(\.?)\d*$/g
  const value = e.target.value || ''
  const isValid = value.match(pattern)
  !isValid && (e.target.value = props.modelValue)
  emits('update:modelValue', e.target.value)
}
</script>
<template>
  <div>
    <input
      :value="modelValue"
      type="text"
      class="block w-full border border-gray-300 h-14 px-3 !outline-none"
      @input="input"
    />
  </div>
</template>

<style lang="scss" scoped></style>
