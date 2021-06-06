<template>
  <div class="modal" :class="{ 'is-active': open }">
    <div class="modal-background" @click="$emit('close')"></div>
    <div class="modal-content bg-white/50 dark:bg-dark-900/80 rounded-lg shadow-xl backdrop-filter backdrop-blur-md relative">
      <slot/>
      <button class="modal-close" aria-label="close" @click="$emit('close')">
        <i-mdi:close/>
      </button>
    </div>
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
    @apply absolute inset-0 hidden items-center flex-col justify-center overflow-hidden fixed z-50;
    &.is-active {
      @apply flex;
    }
    &-background {
      @apply absolute inset-0 bg-light-300/50 backdrop-filter backdrop-blur-sm dark:bg-dark-600/90;
    }
    &-content {
      @apply my-0 mx-5 overflow-auto relative w-full h-full md:(my-0 mx-auto h-auto w-screen-sm);
    }
    &-close {
      @apply fixed top-5 right-5 w-8 h-8 bg-none rounded-full bg-gray-200 hover:bg-gray-300 text-gray-600 dark:(bg-dark-400 hover:bg-dark-500 text-light-300) flex items-center justify-center;
    }
  }
</style>