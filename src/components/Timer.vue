<template>
  <div class="timer mx-auto mt-24">
    <svg class="timer-svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <g class="timer-circle">
        <circle class="timer-path-elapsed" cx="50" cy="50" r="45" />
        <path
          id="timer-path-remaining"
          stroke-dasharray="283"
          class="timer-path-remaining"
          :class="{ [remainingPathColor]: true }"
          d="
          M 50, 50
          m -45, 0
          a 45,45 0 1,0 90,0
          a 45,45 0 1,0 -90,0
        "
        />
      </g>
    </svg>
    <span id="timer-label" class="timer-label">{{ formatTime(timeLeft) }}</span>
  </div>

  <div class="flex items-center justify-center mt-12 mb-24 gap-8">
    <button class="timer-button" @click="resetTimer">
      <i-ic:round-replay />Reset
    </button>
    <div class="relative">
      <select
        name="timer-select"
        id="timer-select"
        class="appearance-none focus:outline-none timer-button !pr-10"
        :value="timerValue"
        @change="resetTimer"
      >
        <option v-for="option in timerOptions" :value="option.value">{{ option.label }}</option>
      </select>
      <span class="absolute right-0 top-0 mt-2.5 mr-3 dark:text-warm-gray-200">
        <i-mdi:chevron-down />
      </span>
    </div>
    <button class="timer-button" @click="timerRunning ? pulseTimer() : startTimer()">
      <i-mdi:play-circle-outline v-show="!timerRunning" />
      <i-mdi:pause-circle-outline v-show="timerRunning" />
      <span>{{ timerRunning ? 'Pause' : 'Start' }}</span>
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps } from 'vue'
import type { PropType } from 'vue'
import type { Option } from '../interfaces'

const props = defineProps({
  timerOptions: {
    type: Object as PropType<Option[]>,
    required: true,
    default: [
    {
        label: '15 min',
        value: 15 * 60
      },
      {
        label: '25 min',
        value: 25 * 60
      },
      {
        label: '30 min',
        value: 30 * 60
      },
      {
        label: '1 hour',
        value: 60 * 60
      },
      {
        label: '1.5 hours',
        value: 90 * 60
      },
      {
        label: '2 hours',
        value: 120 * 60
      },
      {
        label: '2.5 hours',
        value: 150 * 60
      },
      {
        label: '3 hours',
        value: 180 * 60
      }
    ]
  },
  timerValue: {
    type: Number,
    required: true,
    default: 25 * 60
  }
})

const FULL_DASH_ARRAY = 283
const WARNING_THRESHOLD = 10
const ALERT_THRESHOLD = 5

const COLOR_CODES = {
  info: {
    color: "green"
  },
  warning: {
    color: "orange",
    threshold: WARNING_THRESHOLD
  },
  alert: {
    color: "red",
    threshold: ALERT_THRESHOLD
  }
}

let timerValue = ref(props.timerValue)
let timerRunning = ref(false)
let timePassed = 0
let timeLeft = timerValue.value
let timerInterval: number | undefined
let remainingPathColor = ref(COLOR_CODES.info.color)

function onTimesUp() {
  timerRunning.value = false
  clearInterval(timerInterval)
}

function startTimer() {
  timerRunning.value = true
  timerInterval = setInterval(() => {
    timePassed = timePassed += 1
    timeLeft = timerValue.value - timePassed
    const timer = document.getElementById("timer-label")
    if (timer) timer.innerHTML = formatTime(timeLeft)
    setCircleDasharray()
    setRemainingPathColor(timeLeft)

    if (timeLeft === 0) {
      onTimesUp()
    }
  }, 1000)
}

function pulseTimer() {
  timerRunning.value = false
  clearInterval(timerInterval)
}

function resetTimer() {
  const select = document.getElementById('timer-select')
  if (select) {
    timerValue.value = +(select as HTMLSelectElement).value
  }
  timerRunning.value = false
  clearInterval(timerInterval)
  timePassed = 0
  timeLeft = timerValue.value
  const timer = document.getElementById("timer-label")
  if (timer) timer.innerHTML = formatTime(timeLeft)
  setCircleDasharray()
  const element = document.getElementById("timer-path-remaining")
  if (element) {
    element.classList.add(COLOR_CODES.info.color)
    element.classList.remove(COLOR_CODES.alert.color)
    element.classList.remove(COLOR_CODES.warning.color)

  }
}

function formatTime(time: number) {
  const minutes = Math.floor(time / 60)
  let seconds: string | number = time % 60

  if (seconds < 10) {
    seconds = `0${seconds}`
  }

  return `${minutes}:${seconds}`
}

function setRemainingPathColor(timeLeft: number) {
  const { alert, warning, info } = COLOR_CODES
  const element = document.getElementById("timer-path-remaining")
  if (!element) return
  if (timeLeft <= alert.threshold) {
    element.classList.remove(warning.color)
    element.classList.add(alert.color)
  } else if (timeLeft <= warning.threshold) {
    element.classList.remove(info.color)
    element.classList.add(warning.color)
  }
}

function calculateTimeFraction() {
  const rawTimeFraction = timeLeft / timerValue.value
  return rawTimeFraction - (1 / timerValue.value) * (1 - rawTimeFraction)
}

function setCircleDasharray() {
  const circleDasharray = `${(
    calculateTimeFraction() * FULL_DASH_ARRAY
  ).toFixed(0)} 283`
  document.getElementById("timer-path-remaining")?.setAttribute("stroke-dasharray", circleDasharray)
}

</script>

<style scoped lang="postcss">
.timer {
  @apply relative w-72 h-72;
}

.timer-svg {
  transform: scaleX(-1);
}

.timer-circle {
  fill: none;
  stroke: none;
}

.timer-path-elapsed {
  @apply stroke-7 stroke-gray-300 dark:stroke-dark-300;
}

.timer-path-remaining {
  @apply stroke-7 stroke-cap-round;
  transform: rotate(90deg);
  transform-origin: center;
  transition: 1s linear all;
  fill-rule: nonzero;
  stroke: currentColor;
}

.timer-path-remaining.green {
  @apply text-green-400;
}

.timer-path-remaining.orange {
  @apply text-orange-300;
}

.timer-path-remaining.red {
  @apply text-red-400 dark:text-red-500;
}

.timer-label {
  @apply absolute w-72 h-72 top-0 flex items-center justify-center text-5xl text-warm-gray-800 dark:text-warm-gray-300 select-none;
}

.timer-button {
  @apply rounded-full bg-white/50 hover:bg-gray-100/80 dark:(bg-dark-500/50 text-warm-gray-200 hover:bg-dark-500/90) select-none px-5 py-2 flex items-center gap-2;
}
</style>