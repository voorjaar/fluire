<template>
<div class="timer mx-auto my-24">
  <svg class="timer-svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <g class="timer-circle">
      <circle class="timer-path-elapsed" cx="50" cy="50" r="45"></circle>
      <path
        id="timer-path-remaining"
        stroke-dasharray="283"
        class="timer-path-remaining" :class="{ [remainingPathColor]: true }"
        d="
          M 50, 50
          m -45, 0
          a 45,45 0 1,0 90,0
          a 45,45 0 1,0 -90,0
        "
      ></path>
    </g>
  </svg>
  <span id="timer-label" class="timer-label">{{ formatTime(timeLeft) }}</span>
</div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

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

const TIME_LIMIT = 20
let timePassed = 0
let timeLeft = TIME_LIMIT
let timerInterval: number | undefined
let remainingPathColor = ref(COLOR_CODES.info.color)

onMounted(() => {
  startTimer()
})

function onTimesUp() {
  clearInterval(timerInterval)
}

function startTimer() {
  timerInterval = setInterval(() => {
    timePassed = timePassed += 1
    timeLeft = TIME_LIMIT - timePassed
    const timer = document.getElementById("timer-label")
    if (timer) timer.innerHTML = formatTime(timeLeft)
    setCircleDasharray()
    setRemainingPathColor(timeLeft)

    if (timeLeft === 0) {
      onTimesUp()
    }
  }, 1000)
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
  const rawTimeFraction = timeLeft / TIME_LIMIT
  return rawTimeFraction - (1 / TIME_LIMIT) * (1 - rawTimeFraction)
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
  @apply absolute w-72 h-72 top-0 flex items-center justify-center text-5xl text-warm-gray-800 dark:text-warm-gray-300;
}
</style>