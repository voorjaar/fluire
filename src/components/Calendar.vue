<template>
  <div class="overflow-y-scroll w-full lg:px-12">
    <!-- 0..23 -->
    <div class="border-collapse text-left relative">
      <div class="flex lg:w-3/4 mx-auto" v-for="hour in [...Array(24).keys()]">
        <div class="w-12 text-xs select-none space-y-1 -mt-2 border-r ml-4">
          <div class="font-light">{{ getHour(hour) }}</div>
          <div class="font-light hidden">{{ getMin(hour, 15) }}</div>
          <div class="font-light hidden">{{ getMin(hour, 30) }}</div>
          <div class="font-light hidden">{{ getMin(hour, 45) }}</div>
        </div>
        <div class="flex-grow border-t select-none vstack -ml-2 px-2">
          <div :id="`t${hour}-00`" class="h-20px" @drop="drop" @dragover.prevent>
            <div class="py-px">
              <div
                :id="hour.toString()"
                :style="{ height: 20 - 2 + 'px' }"
                class="text-xs bg-green-500 rounded px-2 line-through"
                draggable="true"
                @touchstart="touchStart"
                @touchmove="touchMove"
                @dragstart="dragStart"
              >冥想, 5:30am</div>
            </div>
          </div>
          <div :id="`t${hour}-15`" class="h-20px" @drop="drop" @dragover.prevent>
            <!-- <div id={hour} class="bg-green-500 rounded px-2" draggable="true" on:dragstart={dragStart}>冥想, 5:30am</div> -->
          </div>
          <div :id="`t${hour}-30`" class="h-20px" @drop="drop" @dragover.prevent>
            <!-- <div id={hour} class="bg-green-500 rounded px-2" draggable="true" on:dragstart={dragStart}>冥想, 5:30am</div> -->
          </div>
          <div :id="`t${hour}-45`" class="h-20px" @drop="drop" @dragover.prevent>
            <!-- <div id={hour} class="bg-green-500 rounded px-2" draggable="true" on:dragstart={dragStart}>冥想, 5:30am</div> -->
          </div>
          <!-- <div id={hour} class="bg-green-500 rounded px-2" draggable="true" on:dragstart={dragStart}>冥想, 5:30am</div> -->
        </div>
      </div>
      <hr class="absolute w-full bg-red-500 h-0.5 z-50" :style="{ top: size + 'px' }" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
export default defineComponent({
  mounted() {
    setInterval(() => {
      this.size = this.calcSize();
    }, 1000);
  },
  setup() {
    const config = {
      locale: 'en-US',
      hour12: true
    }
    let size = ref<number>(calcSize())
    let item = ref<string | undefined>(undefined)
    let start = ref(0)
    let dy = ref(0)

    function calcSize() {
      const date = new Date();
      const hour = date.getHours();
      const seconds = hour * 3600 + date.getMinutes() * 60 + date.getSeconds();
      return 20 / 15 / 60 * seconds + hour; // increase border size
    }

    function getHour(hour: number) {
      if (hour === 0) return '';
      return new Date(`2000-10-27 ${hour}:00`).toLocaleTimeString(config.locale, {
        hour12: config.hour12,
        hour: 'numeric'
      })
    }

    function getMin(hour: number, minute: number) {
      return new Date(`2000-10-27 ${hour}:${minute}`).toLocaleTimeString('en-US', {
        hour12: true,
        hour: 'numeric',
        minute: 'numeric'
      }).slice(0, -3)
    }

    function drop(e: DragEvent) {
      if (e.dataTransfer && e.target) {
        const data = e.dataTransfer.getData("text")
        const item = document.getElementById(data) as HTMLElement | null
        if (item) (e.target as HTMLElement).appendChild(item)
      }
    }

    function dragStart(e: DragEvent) {
      if (e.dataTransfer && e.target) {
        e.dataTransfer.setData("text", (e.target as HTMLElement).id);
      }
    }

    function touchStart(e: TouchEvent) {
      if (e.target) {
        item.value = (e.target as HTMLElement).id;
        start.value = e.touches[0].clientY - dy.value;
      }
    }

    function touchMove(e: TouchEvent) {
      const id = item.value ? document.getElementById(item.value) : undefined;
      if (!id) return;
      // // id.style.position = 'absolute';
      // // console.log(e.path);
      // // console.log(e.touches[0].clientY - start)
      const count = (e.touches[0].clientY > start.value ? Math.ceil: Math.round)((e.touches[0].clientY - start.value)/20);
      // // console.log(Math.floor(count/4) * 2);
      // // dy = *20;
      // // console.log(dy/20);
      id.style.transform=`translate(0, ${count * 20 + Math.floor(count/4)}px)`;
      // e.path[1].appendChild(id);
      // id.style.left = `${e.touches[0].clientX}px`;
      // id.style.top = `${e.touches[0].clientY}px`;
      // console.log(e.touches[0].clientX, e.touches[0].clientY);
    }

    return { config, size, calcSize, getHour, getMin, drop, dragStart, touchStart, touchMove }
  }
})
</script>