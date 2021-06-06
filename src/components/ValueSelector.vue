<template>
  <div class="relative">
    <select
      name="event_repeat"
      id="event_repeat"
      class="appearance-none focus:outline-none w-full pl-4 pr-2 py-2 text-gray-700 bg-gray-100 dark:bg-dark-400 dark:text-warm-gray-200 rounded"
      :value="value"
    >
      <option v-for="option in options" :value="option.value">{{ option.label }}</option>
    </select>
    <span class="absolute right-0 mt-2.5 mr-2 dark:text-warm-gray-200">
      <i-mdi:chevron-down />
    </span>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import type { PropType } from 'vue'

interface Option { label: string, value: string }

defineProps({
  options: {
    type: Object as PropType<Option[]>,
    required: true
  },
  value: {
    type: String,
    required: true
  }
})

</script>