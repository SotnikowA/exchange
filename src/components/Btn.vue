<script setup>
defineProps({
  disabled: {
    type: Boolean,
    default: false
  }
})
</script>
<template>
  <button
    class="inline-flex items-center justify-center h-14 transition text-white bg-green-700 px-10 uppercase disabled:grayscale disabled:cursor-not-allowed hover:bg-green-800"
    :disabled="disabled"
  >
    <slot></slot>
  </button>
</template>
<style lang="scss" scoped></style>
