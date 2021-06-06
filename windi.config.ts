import scrollsnap from 'windicss/plugin/scroll-snap';
import plugin from 'windicss/plugin';
import colors from 'windicss/colors';
import { defineConfig } from 'vite-plugin-windicss';

export default defineConfig({
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        gray: colors.blueGray,
        card: {
          'red': '#F26267',
          'dark-orange': '#FF8467',
          'orange': '#F7A64F',
          'yellow': '#EDC400',
          'green': '#43C85E',
          'teal': '#00CEAC',
          'light-blue': '#00CBDE',
          'blue': '#00B7F7',
          'dark-blue': '#4767C6',
          'dark-purple': '#B755C2',
          'purple': '#BA79E4',
          'pink': '#F68BD5',
          'dark-gray': '#86919B',
          'gray': '#939F95',
          'brown': '#9D908C'
        }
      },
    },
  },
  safelist: ['red', 'dark-orange', 'orange', 'yellow', 'green', 'teal', 'light-blue', 'blue', 'dark-blue', 'dark-purple', 'purple', 'pink', 'dark-gray', 'gray', 'brown'].map(i => `bg-card-${i}`),
  shortcuts: {
    hstack: 'flex items-center',
    vstack: 'flex flex-col',
    grow: 'flex-grow',
    icon: 'w-6 h-6 fill-current',
    'app-border': 'border-gray-200 dark:border-dark-300',
    'app-modal': 'fixed top-0 w-full h-screen z-10 bg-white bg-opacity-70 blur-5 shadow-lg',
  },
  plugins: [
    scrollsnap,
    plugin(({ addBase, addVariant }) => {
      addBase({
        'button:focus, input:focus': {
          'outline': 'none',
        },
      });
      addVariant('hocus', ({ modifySelectors }) => {
        return modifySelectors(({ className }) => {
          return `.${className}:hover, .${className}:focus`;
        });
      });
    }),
  ],
});