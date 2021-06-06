<template>
  <div class="overflow-y-scroll w-full lg:px-4 pt-16">
    <div class="border-collapse text-left relative">
      <div class="relative mx-auto">
        <div class="flex" v-for="hour in [...Array(24).keys()]">
          <div class="w-12 text-xs select-none space-y-1 -mt-2 border-r dark:text-warm-gray-600 dark:border-dark-300 ml-4">
            <div class="font-light">{{ getHour(hour) }}</div>
            <div class="font-light hidden">{{ getMinutes(hour, 15) }}</div>
            <div class="font-light hidden">{{ getMinutes(hour, 30) }}</div>
            <div class="font-light hidden">{{ getMinutes(hour, 45) }}</div>
          </div>
          <div class="flex-grow border-t dark:border-dark-300 select-none vstack -ml-2 px-2 h-80px" v-if="layout === 'day'"></div>
          <div class="flex-grow border-t dark:border-dark-300 select-none vstack -ml-2 px-2 h-80px grid grid-cols-7" v-else-if="layout === 'week'">
            <div class="h-full w-full"></div>
            <div class="h-full w-full border-l"></div>
            <div class="h-full w-full border-l"></div>
            <div class="h-full w-full border-l"></div>
            <div class="h-full w-full border-l"></div>
            <div class="h-full w-full border-l"></div>
            <div class="h-full w-full border-l"></div>
          </div>
        </div>
        <div
          class="py-px absolute pl-16 pr-4 w-full z-0"
          :style="{ top: getPosition(todo.date, offsets[todo.id]) + 'px' }"
          v-for="todo in todos"
          :key="todo.id"
          :id="todo.id"
        >
          <div
            @touchstart="touchStart"
            @touchmove="touchMove"
            @touchend="touchEnd"
            @mousedown="dragStart"
            @dblclick="todo.finished = !todo.finished"
            :style="{ height: todo.duration / 15 * 20 - 2 + 'px' }"
            :class="{ 'line-through': todo.finished, [`bg-card-${todo.color}`]: true }"
            class="text-sm rounded-3px px-2 py-1 select-none backdrop-filter backdrop-blur-sm cursor-pointer text-white font-medium bg-opacity-80 dark:bg-opacity-90"
          >{{ todo.title }}, {{ getDuration(todo.date, todo.duration) }}</div>
        </div>
      </div>
      <hr
        class="absolute w-full bg-red-500 dark:bg-red-900 h-0.25 z-25 border-none"
        :style="{ top: timeLength + 'px' }"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import type { Todo } from '../interfaces'

onMounted(() => {
  setInterval(() => {
    timeLength.value = calcTimeLength()
  }, 1000)
})

const config = {
  locale: 'en-US',
  hour12: true
}

const todos = ref<Todo[]>([
  {
    id: '1',
    title: 'Breakfast',
    date: '2021-6-5 07:00',
    duration: 60,
    color: 'blue',
    finished: false
  },
  {
    id: '2',
    title: 'Programming',
    date: '2021-6-5 08:00',
    duration: 150,
    color: 'green',
    finished: false
  },
  {
    id: '3',
    title: 'Play with cats',
    date: '2021-6-5 10:30',
    duration: 30,
    color: 'orange',
    finished: false
  },
  {
    id: '4',
    title: 'Lunch',
    date: '2021-6-5 11:00',
    duration: 60,
    color: 'blue',
    finished: false
  },
  {
    id: '5',
    title: 'Take a nap',
    date: '2021-6-5 12:00',
    duration: 30,
    color: 'dark-orange',
    finished: false
  },
  {
    id: '6',
    title: 'Programming',
    date: '2021-6-5 13:00',
    duration: 180,
    color: 'green',
    finished: false
  },
  {
    id: '7',
    title: 'Dinner',
    date: '2021-6-5 17:00',
    duration: 60,
    color: 'blue',
    finished: false
  },
  {
    id: '8',
    title: 'Play with cats',
    date: '2021-6-5 18:00',
    duration: 30,
    color: 'orange',
    finished: false
  },
  {
    id: '9',
    title: 'Reading',
    date: '2021-6-5 18:30',
    duration: 60,
    color: 'dark-orange',
    finished: false
  },
  {
    id: '10',
    title: 'Programming',
    date: '2021-6-5 20:00',
    duration: 150,
    color: 'green',
    finished: false
  },
])

const offsets = reactive<{ [key: string]: number }>({})
todos.value.forEach(({ id }) => offsets[id] = 0)

let timeLength = ref<number>(calcTimeLength())
let item = ref<string | undefined>(undefined)
let start = ref(0)
let dy = ref(0)
let layout = ref('day')

function calcTimeLength() {
  const date = new Date()
  const hour = date.getHours()
  const seconds = hour * 3600 + date.getMinutes() * 60 + date.getSeconds()
  return 20 / 15 / 60 * seconds + hour // increase border size
}

function getHour(hour: number) {
  if (hour === 0) return ''
  return new Date(`2000-10-27 ${hour}:00`).toLocaleTimeString(config.locale, {
    hour12: config.hour12,
    hour: 'numeric'
  })
}

function getMinutes(hour: number, minute: number) {
  return new Date(`2000-10-27 ${hour}:${minute}`).toLocaleTimeString('en-US', {
    hour12: true,
    hour: 'numeric',
    minute: 'numeric'
  }).slice(0, -3)
}

function getDuration(date: string, duration: number) {
  const dateStart = new Date(Date.parse(date))
  const dateEnd = new Date(Date.parse(date) + duration * 60000)
  const option: Intl.DateTimeFormatOptions = {
    hour12: true,
    hour: 'numeric',
    minute: 'numeric'
  }
  return `${dateStart.toLocaleTimeString(config.locale, option)} - ${dateEnd.toLocaleTimeString(config.locale, option)}`
}

function getPosition(date: string, offset = 0) {
  const dateStart = new Date(Date.parse(date))
  const minutes = dateStart.getHours() * 60 + dateStart.getMinutes()
  return (minutes + offset) / 15 * 20
}

function dragStart(e: MouseEvent) {
  const element = e.target as HTMLElement;
  element.style.cursor = "move"
  if (element.parentElement) {
    element.parentElement.style.zIndex = "10"
    item.value = element.parentElement.id
    start.value = e.clientY - dy.value
  }

  document.onmouseup = dragEnd
  document.onmousemove = dragMove
}

function dragMove(e: MouseEvent) {
  if (item.value) {
    const element = document.getElementById(item.value)
    if (!element) return
    const count = Math.ceil((e.clientY - start.value) / 20)
    if (item.value) offsets[item.value] = count * 15
  }
}

function dragEnd() {
  if (item.value) {
    const element = document.getElementById(item.value)
    if (element) {
      element.style.zIndex = "0"
      if (element.firstChild) (element.firstChild as HTMLElement).style.cursor = "pointer"
    }
    const target = todos.value.find(i => i.id === item.value)
    if (target) {
      target.date = new Date(Date.parse(target.date) + offsets[item.value] * 60000).toISOString()
      offsets[item.value] = 0
    }
  }
  item.value = undefined
  document.onmouseup = null
  document.onmousemove = null
}

function touchStart(e: TouchEvent) {
  if (e.target) {
    const element = e.target as HTMLElement
    if (element.parentElement) {
      element.parentElement.style.zIndex = "10"
      item.value = element.parentElement.id
      start.value = e.touches[0].clientY - dy.value
    }
  }
}

function touchMove(e: TouchEvent) {
  if (item.value) {
    const element = document.getElementById(item.value)
    if (!element) return
    const count = Math.ceil((e.touches[0].clientY - start.value) / 20)
    if (item.value) offsets[item.value] = count * 15
  }
}

function touchEnd() {
  if (item.value) {
    const element = document.getElementById(item.value)
    if (element) element.style.zIndex = "0"
    const target = todos.value.find(i => i.id === item.value)
    if (target) {
      target.date = new Date(Date.parse(target.date) + offsets[item.value] * 60000).toISOString()
      offsets[item.value] = 0
    }
  }
  item.value = undefined
}
</script>