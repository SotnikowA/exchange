<script setup>
import { ref } from 'vue'
import { onClickOutside } from '@vueuse/core'

defineProps({
  items: {
    type: Array,
    default: () => []
  },
  modelValue: {
    type: [Object, null],
    default: null
  }
})
const wrap = ref(null)
const show = ref(false)
const emits = defineEmits(['update:modelValue'])
const change = (value) => {
  emits('update:modelValue', value)
  show.value = false
}

onClickOutside(wrap, () => {
  show.value = false
})
</script>
<template>
  <div ref="wrap" class="flex h-14 relative">
    <button class="flex items-center w-full ps-3 pe-1 border border-gray-300" @click="show = !show">
      <span>{{ modelValue?.symbol }} <small>({{ modelValue?.name }})</small></span>
      <svg
        class="ms-auto transition"
        :class="{ 'rotate-180': show }"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
      </svg>
    </button>
    <transition name="fade">
      <div
        v-show="show"
        class="absolute min-w-full top-full start-0 z-10 max-h-[200px] overflow-auto bg-white border border-gray-300 border-t-0 shadow"
      >
        <button
          v-for="item in items"
          :key="item.id"
          class="flex items-center h-8 px-3"
          @click="change(item)"
        >
          <span>{{ item?.symbol }} <small>({{ item?.name }})</small></span>
        </button>
      </div>
    </transition>
  </div>
</template>

<style lang="scss" scoped></style>
