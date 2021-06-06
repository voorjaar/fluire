<template>
  <div class='p-2 flex flex-wrap items-center overflow-hidden bg-gray-100/50 dark:bg-dark-400 backdrop-filter backdrop-blur-1px rounded-lg'>
    <button v-for="color in colors" @click.prevent="value = color" class='rounded-full p-1 flex-shrink-0 flex items-center m-1 border-2 border-transparent' :class="{ active: value === color }">
      <span class='flex-shrink-0 p-4 hover:opacity-75 rounded-full' :class="{ [`bg-card-${color}`]: true }"></span>
    </button>
  </div>

</template>

<script setup lang="ts">
  import { ref } from 'vue'
  let value = ref('blue')
  const colors = ['red', 'dark-orange', 'orange', 'yellow', 'green', 'teal', 'light-blue', 'blue', 'dark-blue', 'dark-purple', 'purple', 'pink', 'dark-gray', 'gray', 'brown']
</script>

<style scoped lang="postcss">
  .active {
    @apply border-blue-400 dark:border-blue-500;
  }
</style>