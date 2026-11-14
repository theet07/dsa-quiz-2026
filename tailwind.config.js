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
          mint: '#00E599',       // Assinatura Codédex: Verde neon primário
          mintHover: '#00C782',
          yellow: '#FFE600',     // Ouro / Moeda Codédex
          yellowHover: '#E6CF00',
          purple: '#8B5CF6',     // Roxo Codédex
          purpleDark: '#7928CA',
          pink: '#FF0080',       // Rosa choque Codédex
          cyan: '#00DFD8',       // Ciano brilhante
          red: '#FF4343',        // Vermelho erro / dano
          dark: '#0D0E12',       // Fundo escuro profundo Codédex
          darkAlt: '#12141A',    // Fundo alternativo
          surface: '#181A20',    // Superfície de cards / painéis
          surfaceHover: '#20232B',
          borderDark: '#282B35', // Borda sutil de painel
          borderDarkStrong: '#3A3F4D',
          cream: '#FAF7EE',      // Fundo claro estilo papel Codédex
          creamSurface: '#FFFFFF',
        }
      },
      boxShadow: {
        'neo-sm': '2px 2px 0px 0px #000000',
        'neo': '4px 4px 0px 0px #000000',
        'neo-hover': '5px 5px 0px 0px #000000',
        'neo-lg': '6px 6px 0px 0px #000000',
        'neo-xl': '8px 8px 0px 0px #000000',
        // Sombras escuras neon estilo Codédex
        'codedex-mint': '0px 0px 20px rgba(0, 229, 153, 0.25)',
        'codedex-yellow': '0px 0px 20px rgba(255, 230, 0, 0.25)',
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
