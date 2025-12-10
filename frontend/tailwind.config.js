
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html','./src/**/*.{vue,js,ts}'],
  theme: {
    extend: {
      colors: { success:'#16a34a', warning:'#f59e0b', danger:'#dc2626' }
    }
  },
  plugins: []
}
