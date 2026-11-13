/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        codedex: {
          yellow: '#FFE600',    // Amarelo marca Codédex
          purple: '#7928CA',    // Roxo vibrante Codédex
          pink: '#FF0080',      // Rosa neon Codédex
          cyan: '#00DFD8',      // Ciano brilhante
          green: '#22C55E',     // Verde acerto/XP
          red: '#FF4343',       // Vermelho dano/erro
          cream: '#FDFBF7',     // Fundo pastel quente
          card: '#FFFFFF',
          dark: '#121316',      // Fundo escuro Codédex
          surface: '#1F2024',   // Cartão no modo escuro
          borderDark: '#32343A'
        }
      },
      boxShadow: {
        'neo-sm': '2px 2px 0px 0px #000000',
        'neo': '4px 4px 0px 0px #000000',
        'neo-hover': '5px 5px 0px 0px #000000',
        'neo-lg': '6px 6px 0px 0px #000000',
        'neo-xl': '8px 8px 0px 0px #000000',
        // Sombras invertidas para modo escuro
        'neo-dark-sm': '2px 2px 0px 0px #FFFFFF',
        'neo-dark': '4px 4px 0px 0px #FFE600',
        'neo-dark-lg': '6px 6px 0px 0px #FFE600',
      },
      fontFamily: {
        pixel: ['Silkscreen', 'cursive', 'monospace'],
        sans: ['Space Grotesk', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      }
    },
  },
  plugins: [],
}
