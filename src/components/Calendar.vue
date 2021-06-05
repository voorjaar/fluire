<template>
  <div class="overflow-y-scroll w-full lg:px-12">
    <!-- 0..23 -->
    <div class="border-collapse text-left relative">
      <div class="relative lg:w-3/4 mx-auto">
        <div class="flex" v-for="hour in [...Array(24).keys()]">
          <div class="w-12 text-xs select-none space-y-1 -mt-2 border-r ml-4">
            <div class="font-light">{{ getHour(hour) }}</div>
            <div class="font-light hidden">{{ getMinutes(hour, 15) }}</div>
            <div class="font-light hidden">{{ getMinutes(hour, 30) }}</div>
            <div class="font-light hidden">{{ getMinutes(hour, 45) }}</div>
          </div>
          <div class="flex-grow border-t select-none vstack -ml-2 px-2 h-80px"></div>
        </div>
        <div class="py-px absolute pl-16 pr-4 w-full" :style="{ top: getPosition(todo.date) + 'px' }" v-for="todo in todos" :id="todo.id">
          <div
            :style="{ height: todo.duration/15 * 20 - 2 + 'px' }"
            :class="{ 'line-through': todo.finished, [`bg-${todo.color}-300`]: true }"
            class="text-xs rounded-3px px-2 py-1 bg-opacity-70"
            @touchstart="touchStart"
            @touchmove="touchMove"
            @touchend="touchEnd"
            @mousedown="dragStart"
          >{{ todo.title }}, {{ getDuration(todo.date, todo.duration) }}</div>
        </div>
      </div>
      <hr class="absolute w-full bg-red-500 h-0.5 z-50" :style="{ top: timeLength + 'px' }" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import type { Todo } from '../interface'

export default defineComponent({
  mounted() {
    setInterval(() => {
      this.timeLength = this.calcTimeLength()
    }, 1000)
  },
  setup() {
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
        color: 'teal',
        finished: false
      },
      {
        id: '2',
        title: 'Programming',
        date: '2021-6-5 08:00',
        duration: 150,
        color: 'blue',
        finished: false
      },
      {
        id: '3',
        title: 'Play with cats',
        date: '2021-6-5 10:30',
        duration: 30,
        color: 'purple',
        finished: false
      },
      {
        id: '4',
        title: 'Lunch',
        date: '2021-6-5 11:00',
        duration: 60,
        color: 'teal',
        finished: false
      },
      {
        id: '5',
        title: 'Take a nap',
        date: '2021-6-5 12:00',
        duration: 30,
        color: 'pink',
        finished: false
      },
      {
        id: '6',
        title: 'Programming',
        date: '2021-6-5 13:00',
        duration: 180,
        color: 'blue',
        finished: false
      },
      {
        id: '7',
        title: 'Dinner',
        date: '2021-6-5 17:00',
        duration: 60,
        color: 'teal',
        finished: false
      },
      {
        id: '8',
        title: 'Play with cats',
        date: '2021-6-5 18:00',
        duration: 30,
        color: 'purple',
        finished: false
      },
      {
        id: '9',
        title: 'Reading',
        date: '2021-6-5 18:30',
        duration: 60,
        color: 'pink',
        finished: false
      },
      {
        id: '10',
        title: 'Programming',
        date: '2021-6-5 20:00',
        duration: 150,
        color: 'blue',
        finished: false
      },
    ])

    let timeLength = ref<number>(calcTimeLength())
    let item = ref<string | undefined>(undefined)
    let start = ref(0)
    let dy = ref(0)

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
      return `${dateStart.toLocaleTimeString()} - ${dateEnd.toLocaleTimeString()}`
    }

    function getPosition(date: string) {
      const dateStart = new Date(Date.parse(date))
      const minutes = dateStart.getHours() * 60 + dateStart.getMinutes()
      return minutes/15 * 20
    }

    function dragStart(e: MouseEvent) {
      item.value = (e.target as HTMLElement).id
      start.value = e.clientY - dy.value

      document.onmouseup = dragEnd
      document.onmousemove = dragMove
    }

    function dragMove(e: MouseEvent) {
      const id = item.value ? document.getElementById(item.value) : undefined
      if (!id) return
      const count = Math.ceil((e.clientY - start.value) / 20)
      id.style.transform = `translate(0, ${count * 20 + Math.floor(count / 4)}px)`
    }

    function dragEnd() {
      item.value = undefined;
      document.onmouseup = null;
      document.onmousemove = null
    }

    function touchStart(e: TouchEvent) {
      if (e.target) {
        item.value = (e.target as HTMLElement).id
        start.value = e.touches[0].clientY - dy.value
      }
    }

    function touchMove(e: TouchEvent) {
      const id = item.value ? document.getElementById(item.value) : undefined
      if (!id) return
      const count = (e.touches[0].clientY > start.value ? Math.ceil : Math.round)((e.touches[0].clientY - start.value) / 20)
      id.style.transform = `translate(0, ${count * 20 + Math.floor(count / 4)}px)`
    }

    function touchEnd(e: TouchEvent) {
      item.value = undefined;
    }

    return { config, todos, timeLength, calcTimeLength, getHour, getMinutes, getDuration, getPosition, dragStart, touchStart, touchMove, touchEnd }
  }
})
</script>