<template>
  <nav class="navbar fixed top-0 w-full sm:pl-60" role="navigation" aria-label="main navigation">
    <div class="border-b bg-white/70 backdrop-filter backdrop-blur-md dark:bg-dark-900/80 dark:border-dark-300 shadow-sm w-full h-full my-auto flex px-4">
      <h1 class="flex-grow dark:text-light-200 flex items-center font-serif text-lg tracking-wider">
        Calendar
      </h1>

      <Searchbar/>

      <div class="nav-divider hidden lg:block"></div>

      <Dropdown/>

      <div class="nav-divider hidden lg:block"></div>

      <div class="flex gap-4 items-center">
        <button class="nav-button">
          <i-simple-line-icons:settings/>
        </button>

        <button class="nav-button" @click="toggle">
          <i-cil:moon v-show="isDark"/>
          <i-ion:sunny-outline v-show="!isDark" />
        </button>

        <button class="nav-button" @click="$emit('timer')">
          <i-ion:ios-timer-outline/>
        </button>

        <button class="nav-button" @click="$emit('add')">
          <i-ion:add/>
        </button>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { defineEmit } from 'vue'
import { useToggle } from '@vueuse/core'
import { isDark } from '../composables/dark'
import Searchbar from './Searchbar.vue'
import Dropdown from './Dropdown.vue'

const toggle = useToggle(isDark)
</script>

<style lang="postcss">
  .navbar {
    @apply relative z-30 h-16 md:(flex items-center);
  }
  .nav-button {
    @apply rounded-lg bg-blue-gray-100 hover:bg-blue-gray-200 p-2 text-lg text-gray-600 dark:(text-light-300 bg-dark-700 hover:bg-dark-500);
  }
  .nav-divider {
    @apply w-px bg-gray-300 dark:bg-dark-300 my-5 mx-4;
  }
</style>