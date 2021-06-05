<template>
  <nav class="overflow-y-scroll w-full vstack p-3" in:fade>
    <slot />
    <div class="vstack select-none my-3" v-for="nav in navs">
      <h2 class="text-gray-600 dark:text-gray-400 font-medium text-xs ml-1 mb-1">{{ nav.title }}</h2>
      <div class="vstack">
        <button v-for="child in nav.children" class="hstack rounded py-1.5 px-1 my-0.5 hocus:(bg-gray-100 bg-opacity-70 blur-5) dark:hocus:bg-dark-400">
          <span class="text-blue-500 text-xl" />
          <svg class="w-5 h-5 fill-blue-500 mr-2" viewBox="0 0 24 24"><path :d="child.icon" /></svg>
          <span class="text-gray-900 dark:text-gray-100 text-sm align-bottom inline-block">{{ child.name }}</span>
        </button>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

export interface NavItem {
  id?: string,
  name: string,
  icon: string,
}

export interface Nav {
  title: string;
  children: NavItem[];
};

export default defineComponent({
  props: {
    navs: {
      type: Array as PropType<Nav[]>,
      required: true
    }
  },
})
</script>

<style>

</style>
