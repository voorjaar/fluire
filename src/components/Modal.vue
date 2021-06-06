<template>
  <div class="modal" :class="{ 'is-active': open }">
    <div class="modal-background" @click="$emit('close')"></div>
    <div class="modal-content bg-white">
      Any other elements you want
    </div>
    <button class="modal-close" aria-label="close" @click="$emit('close')">
      <i-mdi:close/>
    </button>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

defineProps({
  open: {
    type: Boolean,
    required: true,
    default: false
  }
})
</script>

<style lang="postcss">
  .modal {
    @apply absolute inset-0 hidden items-center flex-col justify-center overflow-hidden fixed z-40;
    &.is-active {
      @apply flex;
    }
    &-background {
      @apply absolute inset-0 bg-light-300/50 backdrop-filter backdrop-blur-sm dark:bg-dark-900/90;
    }
    &-content {
      @apply my-0 mx-5 overflow-auto relative w-full md:(my-0 mx-auto w-screen-sm);
    }
    &-close {
      @apply fixed top-5 right-5 w-8 h-8 bg-none rounded-full bg-gray-200 hover:bg-gray-300 text-gray-600 dark:(bg-dark-500 hover:bg-dark-700 text-light-300) flex items-center justify-center;
    }
  }
</style>