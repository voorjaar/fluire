<template>
<div class="flex items-center relative lg:min-w-64">
  <input class="hidden lg:block font-serif text-gray-600 py-1.9 pr-4 pl-9 block w-full appearance-none leading-normal rounded text-left text-base select-none truncate blur-5 bg-blue-gray-100 hocus:bg-blue-gray-200 placeholder-gray-500 dark:(bg-dark-700 hocus:bg-dark-500 text-gray-100 placeholder-gray-300) dark:focus:border-dark-500" placeholder="Search" type="search" name="search">
  <div class="pointer-events-none lg:absolute inset-y-0 left-0 flex items-center text-gray-500 text-lg rounded bg-blue-gray-100 dark:(bg-dark-500 text-light-300) p-2 mx-4 lg:(mx-0 p-0 pl-2 bg-transparent dark:bg-transparent)">
    <i-uil:search/>
  </div>
</div>
</template>

<script setup lang="ts">

</script>