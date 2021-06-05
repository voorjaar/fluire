import scrollsnap from 'windicss/plugin/scroll-snap';
import plugin from 'windicss/plugin';
import colors from 'windicss/colors';
import { defineConfig } from 'vite-plugin-windicss';

export default defineConfig({
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        gray: colors.coolGray,
      },
    },
  },
  safelist: ['pink' , 'rose' , 'red' , 'orange' , 'yellow' , 'lime' , 'green' , 'teal' , 'cyan' , 'blue' , 'indigo' , 'purple'].map(i => `bg-${i}-300/70 dark:bg-${i}-400/70`),
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