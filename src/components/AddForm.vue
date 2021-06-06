<template>
  <form class="p-12">
    <p class="text-gray-800 dark:text-warm-gray-300 font-medium font-serif text-xl tracking-wider mb-4">Create New Event</p>
    <div class>
      <label class="block text-sm text-gray-600 dark:text-warm-gray-400 font-serif pb-2" for="event_title">Title</label>
      <input
        class="w-full pl-4 pr-2 py-2 text-gray-700 bg-gray-100 dark:bg-dark-400 dark:text-warm-gray-200 dark:placeholder-warm-gray-500 rounded"
        id="event_title"
        name="event_title"
        type="text"
        placeholder="Enter Title"
        required
        aria-label="Title"
      />
    </div>
    <div class="mt-4">
      <label class="block text-sm text-gray-600 dark:text-warm-gray-400 font-serif pb-2" for="event_date">Date</label>
      <input
        class="w-full pl-4 pr-2 py-2 text-gray-700 bg-gray-100 dark:bg-dark-400 dark:text-warm-gray-200 rounded"
        id="event_date"
        name="event_date"
        type="date"
        required
        aria-label="Date"
      />
    </div>
    <div class="mt-4">
      <label class="block text-sm text-gray-600 dark:text-warm-gray-400 font-serif pb-2" for="event_time">Time</label>
      <input
        class="w-full pl-4 pr-2 py-2 text-gray-700 bg-gray-100 dark:bg-dark-400 dark:text-warm-gray-200 rounded"
        id="event_time"
        name="event_time"
        type="time"
        required
        aria-label="Time"
      />
    </div>
    <div class="mt-4">
      <label class="block text-sm text-gray-600 dark:text-warm-gray-400 font-serif pb-2" for="event_time">Duration</label>
      <ValueSelector
        :options="[
          {
            'label': '15 minutes',
            'value': '15'
          },
          {
            'label': '30 minutes',
            'value': '30'
          },
          {
            'label': '1 hour',
            'value': '60'
          },
          {
            'label': '2 hours',
            'value': '120'
          },
          {
            'label': '2.5 hours',
            'value': '150'
          },
          {
            'label': '3 hours',
            'value': '180'
          },
          {
            'label': '4 hours',
            'value': '240'
          },
          {
            'label': 'Custom...',
            'value': '?'
          }
        ]"
        :value="'60'"
      />
    </div>
    <div class="mt-4">
      <label class="block text-sm text-gray-600 dark:text-warm-gray-400 font-serif pb-2" for="event_repeat">Repeat</label>
      <ValueSelector
        :options="[
          {
            'label': '1 session a month',
            'value': '1/30'
          },
          {
            'label': '2 sessions a month',
            'value': '2/30'
          },
          {
            'label': '1 session a month',
            'value': '1/30'
          },
          {
            'label': '1 session a week',
            'value': '1/7'
          },
          {
            'label': '2 sessions a week',
            'value': '2/7'
          },
          {
            'label': '3 sessions a week',
            'value': '3/7'
          },
          {
            'label': '4 sessions a week',
            'value': '4/7'
          },
          {
            'label': '5 sessions a week',
            'value': '5/7'
          },
          {
            'label': '6 sessions a week',
            'value': '6/7'
          },
          {
            'label': 'Every day',
            'value': '1'
          },
        ]"
        :value="'1'"
      />
    </div>
    <div class="mt-4">
      <label class="block text-sm text-gray-600 dark:text-warm-gray-400 font-serif pb-2" for="event_color">Color</label>
      <ColorSelector />
    </div>

    <div class="mt-6">
      <button
        class="px-4 w-full py-2 text-white font-light tracking-wider bg-gray-900 dark:bg-dark-400 dark:hover:bg-dark-300 rounded"
        type="submit"
      >Add</button>
    </div>
  </form>
</template>

<script setup lang="ts">
import ColorSelector from './ColorSelector.vue'
import ValueSelector from './ValueSelector.vue'
</script>