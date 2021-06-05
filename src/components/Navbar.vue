<template>
  <nav class="navbar fixed top-0 w-full sm:pl-60" role="navigation" aria-label="main navigation">
    <div class="border-b bg-white dark:bg-dark-900 dark:border-dark-300 shadow-sm w-full h-full my-auto flex px-4">
      <h1 class="flex-grow dark:text-light-200 flex items-center font-serif text-lg tracking-wider">
        Calendar
      </h1>
      <div class="flex gap-4 items-center">
        <button class="nav-button" @click="toggle">
          <i-bx:bx-moon v-show="isDark" />
          <i-ion-ios-sunny v-show="!isDark" />
        </button>

        <button class="nav-button">
          <i-ic:round-add-circle-outline />
        </button>
      </div>
    </div>
  </nav>
</template>

<style lang="postcss">
  .navbar {
    @apply relative z-30 h-16 md:(flex items-center);
  }
  .nav-button {
    @apply rounded-lg bg-blue-gray-100 hover:bg-blue-gray-200 p-2 text-gray-700 dark:text-light-300 dark:bg-dark-700 dark:hover:bg-dark-500;
  }
</style>

<script setup lang="ts">
import { useToggle } from '@vueuse/core'
import { isDark } from '../composables/dark'

const toggle = useToggle(isDark)
</script>