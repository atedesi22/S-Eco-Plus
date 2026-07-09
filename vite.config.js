import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        seco: {
          navy: '#0F2942',       // Bleu foncé principal
          green: '#20A376',      // Vert dynamique "Eco"
          yellow: '#F4BE2C',     // Jaune d'accentuation
          lightBg: '#F8FAFC',    // Fond gris/bleu très clair
          darkText: '#1E293B',   // Texte principal
        }
      },
      fontFamily: {
        // Le flyer utilise une typographie Sans-Serif moderne et géométrique (style Montserrat ou Inter)
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
})
