<template>
  <nav class="overflow-y-scroll w-full vstack p-3" in:fade>
    <slot />
    <div class="vstack select-none my-3" v-for="nav in navs">
      <h2 class="text-gray-600 dark:text-light-600 font-serif font-medium text-xs ml-1 mb-1">{{ nav.title }}</h2>
      <div class="vstack">
        <button v-for="child in nav.children" class="hstack rounded py-1.5 px-1 my-0.5 hocus:(bg-gray-100 bg-opacity-70 blur-5) dark:hocus:bg-dark-400">
          <span class="text-blue-500 text-xl" />
          <svg class="w-5 h-5 fill-blue-500 mr-2" viewBox="0 0 24 24"><path :d="child.icon" /></svg>
          <span class="text-gray-900 dark:text-gray-100 text-sm align-bottom inline-block">{{ child.name }}</span>
        </button>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import type { PropType } from 'vue'
import type { Nav } from '../interfaces'

defineProps({
  navs: {
    type: Array as PropType<Nav[]>,
    required: true
  }
})
</script>
