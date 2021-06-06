<template>
  <div class="dropdown" :class="{'is-active': open}">
    <div class="dropdown-trigger">
      <button class="text-gray-600 bg-blue-gray-100 mr-4 lg:mr-0 hover:bg-blue-gray-200 text-gray-600 dark:(text-light-300 bg-dark-700 hover:bg-dark-500) rounded-lg pl-4 pr-2 py-1.9 focus:outline-none" @click="open=!open" aria-haspopup="true" aria-controls="dropdown-menu">
        <span>Day</span>
        <svg class="fill-current w-5 h-5 inline-block ml-2" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 24 24"><path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"/></svg>
      </button>
    </div>
    <div class="dropdown-menu" id="dropdown-menu" role="menu">
      <div class="dropdown-content">
        <a href="#" class="dropdown-item">
          Day
        </a>
        <a href="#" class="dropdown-item">
          Week
        </a>
        <a href="#" class="dropdown-item">
          Month
        </a>
        <a href="#" class="dropdown-item">
          Year
        </a>
        <a href="#" class="dropdown-item">
          Schedule
        </a>
        <a href="#" class="dropdown-item">
          2 days
        </a>
        <hr class="dropdown-divider">
        <a href="#" class="dropdown-item">
          Show weekends
        </a>
        <a href="#" class="dropdown-item">
          Show declined events
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  let open = ref(false)
</script>

<style lang="postcss">
  .dropdown {
    @apply inline-flex relative align-top items-center font-serif text-base;
    &.is-active {
      .dropdown-menu {
        @apply block;
      }
    }
    &-menu {
      @apply hidden absolute top-full left-0 z-40 min-w-48 pt-1 -mt-1 bg-white/70 dark:bg-dark-900/80 rounded-lg border dark:border-dark-300;
    }
    &-content {
      @apply bg-white/70 dark:bg-dark-900/80 py-2 rounded shadow;
    }
    &-divider {
      @apply bg-gray-300 dark:bg-dark-300 block h-px my-2 border-none;
    }
    &-item {
      @apply relative text-sm block text-warm-gray-800 dark:text-light-300 py-2 px-4;
      a&, button& {
        @apply pr-12 whitespace-nowrap w-full hover:(bg-blue-gray-100 text-warm-gray-900) dark:hover:(bg-dark-400 text-light-300) active:(bg-blue-400 text-warm-gray-100);
      }
    }
  }
</style>