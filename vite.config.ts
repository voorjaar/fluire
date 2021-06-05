import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import windi from 'vite-plugin-windicss'
import components from 'vite-plugin-components'
import icons, { ViteIconsResolver } from 'vite-plugin-icons'


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    windi(),
    components({
      globalComponentsDeclaration: true,
      customComponentResolvers: ViteIconsResolver()
    }),
    icons(),
  ]
})
