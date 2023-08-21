import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors:{
        'orange':'#ff6700',
        'black-one':'#121212',
        'black-two':'hsl(100, 100%, 100%, 0.1)',
        'beige':'#c0c0c0',
        'white':'#ebebeb'
      },
      fontFamily:{
        Cubano:"Cubano"
      }
    },
  },
  plugins: [],
}
export default config
