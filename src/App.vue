<template>
  <main class="flex h-screen overflow-hidden">
    <div class="app-border border-r w-60 -sm:hidden flex-shrink-0">
      <Sidebar :navs="navs">
        <Calendar/>
      </Sidebar>
    </div>
    <Navbar @add="openAddModal = !openAddModal" @timer="openTimerModal = !openTimerModal" @setup="openSettingsModal = !openSettingsModal"/>
    <Timeline />
  </main>

  <Modal :open="openSettingsModal" @close="openSettingsModal = false">
    <Settings/>
  </Modal>

  <Modal :open="openTimerModal" @close="openTimerModal = false">
    <Timer/>
  </Modal>

  <Modal :open="openAddModal" @close="openAddModal = false">
    <AddForm/>
  </Modal>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Navbar from './components/Navbar.vue'
import Sidebar from './components/Sidebar.vue'
import Timeline from './components/Timeline.vue'
import Calendar from './components/Calendar.vue'
import Modal from './components/Modal.vue'
import AddForm from './components/AddForm.vue'
import Settings from './components/Settings.vue'
import Timer from './components/Timer.vue'

const openSettingsModal = ref(false)
const openTimerModal = ref(false)
const openAddModal = ref(false)

const navs = [
  {
    title: "Library",
    children: [
      {
        name: "Timeline",
        icon:
          "M12.6,2.86C15.27,4.1 18,5.39 20.66,6.63C20.81,6.7 21,6.75 21,6.95C21,7.15 20.81,7.19 20.66,7.26C18,8.5 15.3,9.77 12.62,11C12.21,11.21 11.79,11.21 11.38,11C8.69,9.76 6,8.5 3.32,7.25C3.18,7.19 3,7.14 3,6.94C3,6.76 3.18,6.71 3.31,6.65C6,5.39 8.74,4.1 11.44,2.85C11.73,2.72 12.3,2.73 12.6,2.86M12,21.15C11.8,21.15 11.66,21.07 11.38,20.97C8.69,19.73 6,18.47 3.33,17.22C3.19,17.15 3,17.11 3,16.9C3,16.7 3.19,16.66 3.34,16.59C3.78,16.38 4.23,16.17 4.67,15.96C5.12,15.76 5.56,15.76 6,15.97C7.79,16.8 9.57,17.63 11.35,18.46C11.79,18.67 12.23,18.66 12.67,18.46C14.45,17.62 16.23,16.79 18,15.96C18.44,15.76 18.87,15.75 19.29,15.95C19.77,16.16 20.24,16.39 20.71,16.61C20.78,16.64 20.85,16.68 20.91,16.73C21.04,16.83 21.04,17 20.91,17.08C20.83,17.14 20.74,17.19 20.65,17.23C18,18.5 15.33,19.72 12.66,20.95C12.46,21.05 12.19,21.15 12,21.15M12,16.17C11.9,16.17 11.55,16.07 11.36,16C8.68,14.74 6,13.5 3.34,12.24C3.2,12.18 3,12.13 3,11.93C3,11.72 3.2,11.68 3.35,11.61C3.8,11.39 4.25,11.18 4.7,10.97C5.13,10.78 5.56,10.78 6,11C7.78,11.82 9.58,12.66 11.38,13.5C11.79,13.69 12.21,13.69 12.63,13.5C14.43,12.65 16.23,11.81 18.04,10.97C18.45,10.78 18.87,10.78 19.29,10.97C19.76,11.19 20.24,11.41 20.71,11.63C20.77,11.66 20.84,11.69 20.9,11.74C21.04,11.85 21.04,12 20.89,12.12C20.84,12.16 20.77,12.19 20.71,12.22C18,13.5 15.31,14.75 12.61,16C12.42,16.09 12.08,16.17 12,16.17Z",
      },
      {
        name: "Schedule",
        icon:
          "M19,19H5V8H19M19,3H18V1H16V3H8V1H6V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3M16.53,11.06L15.47,10L10.59,14.88L8.47,12.76L7.41,13.82L10.59,17L16.53,11.06Z",
      },
      {
        name: "History",
        icon:
          "M13.5,8H12V13L16.28,15.54L17,14.33L13.5,12.25V8M13,3A9,9 0 0,0 4,12H1L4.96,16.03L9,12H6A7,7 0 0,1 13,5A7,7 0 0,1 20,12A7,7 0 0,1 13,19C11.07,19 9.32,18.21 8.06,16.94L6.64,18.36C8.27,20 10.5,21 13,21A9,9 0 0,0 22,12A9,9 0 0,0 13,3",
      },
      {
        name: "Trash",
        icon:
          "M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M7,6H17V19H7V6M9,8V17H11V8H9M13,8V17H15V8H13Z",
      },
    ],
  },
  {
    title: "Todos",
    children: [
      {
        name: "Buy snacks",
        icon:
          "M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,7A5,5 0 0,0 7,12A5,5 0 0,0 12,17A5,5 0 0,0 17,12A5,5 0 0,0 12,7Z",
      },
      {
        name: "Repair computer keyboards",
        icon:
          "M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,7A5,5 0 0,0 7,12A5,5 0 0,0 12,17A5,5 0 0,0 17,12A5,5 0 0,0 12,7Z",
      },
      {
        name: "Go out and watch a movie",
        icon:
          "M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,7A5,5 0 0,0 7,12A5,5 0 0,0 12,17A5,5 0 0,0 17,12A5,5 0 0,0 12,7Z",
      },
      {
        name: "Call Mum",
        icon:
          "M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,7A5,5 0 0,0 7,12A5,5 0 0,0 12,17A5,5 0 0,0 17,12A5,5 0 0,0 12,7Z",
      },
      {
        name: "Practice playing guitar",
        icon:
          "M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,7A5,5 0 0,0 7,12A5,5 0 0,0 12,17A5,5 0 0,0 17,12A5,5 0 0,0 12,7Z",
      },
    ],
  },
]
</script>