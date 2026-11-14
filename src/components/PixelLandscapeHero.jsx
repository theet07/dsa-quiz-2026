import React from 'react';
import { Play, Sparkles, Terminal, BookOpen, Trophy } from 'lucide-react';

export default function PixelLandscapeHero({ onStart, onOpenHelp, onOpenLeaderboard }) {
  return (
    <div className="relative w-full overflow-hidden select-none bg-[#2A84C8]">
      
      {/* CENÁRIO PIXEL ART EM SVG ESCALÁVEL (100% DE LARGURA, ZERO MARGEM) */}
      <svg 
        className="w-full h-[540px] sm:h-[600px] lg:h-[680px] object-cover block"
        viewBox="0 0 1440 680" 
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Gradiente do Céu */}
          <linearGradient id="skyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#1C6CA6" />
            <stop offset="35%" stopColor="#3B92CE" />
            <stop offset="70%" stopColor="#78C2EC" />
            <stop offset="100%" stopColor="#B6E5FC" />
          </linearGradient>

          {/* Gradiente das Montanhas Distantes */}
          <linearGradient id="mountainBack" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#5E96B8" />
            <stop offset="100%" stopColor="#2F6687" />
          </linearGradient>

          {/* Gradiente das Montanhas Principais */}
          <linearGradient id="mountainFront" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#39799B" />
            <stop offset="100%" stopColor="#1B4761" />
          </linearGradient>

          {/* Gradiente das Colinas de Grama */}
          <linearGradient id="grassGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#6CBA54" />
            <stop offset="40%" stopColor="#55A140" />
            <stop offset="100%" stopColor="#3E7D2D" />
          </linearGradient>

          {/* Gradiente do Rodapé para Preto */}
          <linearGradient id="fadeToDark" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#3E7D2D" stopOpacity="1" />
            <stop offset="85%" stopColor="#1C4014" stopOpacity="1" />
            <stop offset="100%" stopColor="#08090E" stopOpacity="1" />
          </linearGradient>
        </defs>

        {/* 1. CÉU */}
        <rect width="1440" height="680" fill="url(#skyGrad)" />

        {/* NUVENS PIXELIZADAS FLUTUANTES */}
        <g fill="#FFFFFF" opacity="0.9">
          {/* Nuvem Esquerda */}
          <rect x="80" y="70" width="130" height="24" rx="4" />
          <rect x="100" y="52" width="70" height="24" rx="4" />
          <rect x="130" y="40" width="50" height="24" rx="4" />

          {/* Nuvem Centro-Esquerda */}
          <rect x="360" y="110" width="160" height="28" rx="4" opacity="0.85" />
          <rect x="390" y="88" width="90" height="26" rx="4" opacity="0.85" />

          {/* Nuvem Direita */}
          <rect x="980" y="60" width="180" height="30" rx="4" />
          <rect x="1020" y="38" width="100" height="28" rx="4" />
          <rect x="1060" y="24" width="60" height="24" rx="4" />

          {/* Nuvem Direita Baixa */}
          <rect x="1220" y="120" width="120" height="22" rx="4" opacity="0.75" />
          <rect x="1250" y="104" width="60" height="20" rx="4" opacity="0.75" />
        </g>

        {/* 2. MONTANHAS DO FUNDO (Layer 1) */}
        <path d="M-50,420 L160,210 L380,420 L580,240 L820,430 L1100,210 L1340,410 L1520,250 L1550,460 L-50,460 Z" fill="url(#mountainBack)" />
        {/* Picos com Neve Pixelada */}
        <polygon points="160,210 130,250 150,260 160,245 170,260 190,250" fill="#E6F5FC" />
        <polygon points="580,240 550,275 570,285 580,270 590,285 610,275" fill="#E6F5FC" />
        <polygon points="1100,210 1070,250 1090,260 1100,245 1110,260 1130,250" fill="#E6F5FC" />

        {/* 3. MONTANHAS DA FRENTE (Layer 2) */}
        <path d="M-80,460 L80,290 L280,460 L480,310 L740,470 L940,280 L1200,470 L1380,300 L1520,480 L-80,480 Z" fill="url(#mountainFront)" />
        {/* Picos com Neve Layer 2 */}
        <polygon points="80,290 55,325 70,335 80,320 90,335 105,325" fill="#FFFFFF" />
        <polygon points="480,310 450,350 470,360 480,345 490,360 510,350" fill="#FFFFFF" />
        <polygon points="940,280 910,320 930,330 940,315 950,330 970,320" fill="#FFFFFF" />
        <polygon points="1380,300 1350,340 1370,350 1380,335 1390,350 1410,340" fill="#FFFFFF" />

        {/* 4. PINHEIROS PIXELADOS NA LINHA DO HORIZONTE */}
        <g fill="#1D4E38">
          {[40, 70, 95, 130, 160, 210, 240, 270, 310, 340, 370, 410, 440, 680, 710, 740, 780, 810, 850, 890, 920, 1020, 1050, 1080, 1120, 1160, 1200, 1240, 1270, 1310, 1350, 1390, 1420].map((x, i) => (
            <polygon key={i} points={`${x},430 ${x+12},385 ${x+24},430`} />
          ))}
          {[55, 110, 185, 255, 325, 390, 695, 760, 830, 905, 1035, 1100, 1180, 1255, 1330, 1405].map((x, i) => (
            <polygon key={`t2-${i}`} points={`${x},435 ${x+14},375 ${x+28},435`} fill="#163C2B" />
          ))}
        </g>

        {/* 5. COLINAS DE GRAMA ONDULADAS PIXELADAS */}
        {/* Colina do Meio */}
        <path d="M-50,470 Q240,420 540,460 T1140,450 T1500,470 L1500,680 L-50,680 Z" fill="#4B9338" />
        
        {/* Colina Frontal Principal */}
        <path d="M-20,490 Q320,450 720,490 T1480,480 L1480,680 L-20,680 Z" fill="url(#grassGrad)" />
        
        {/* Base da Grama com transição para Preto */}
        <rect x="0" y="580" width="1440" height="100" fill="url(#fadeToDark)" />

        {/* DETALHES DE FLORES E GRAMA NA MEADOW */}
        <g>
          {/* Flores Rosas */}
          {[[120, 520], [210, 560], [340, 530], [620, 570], [820, 540], [1050, 560], [1280, 530], [1390, 570]].map(([x, y], i) => (
            <g key={`flower-p-${i}`} fill="#FF5E97">
              <rect x={x} y={y} width="6" height="6" />
              <rect x={x+6} y={y-4} width="6" height="6" />
              <rect x={x-6} y={y-4} width="6" height="6" />
              <rect x={x} y={y-8} width="6" height="6" fill="#FFE082" />
            </g>
          ))}
          {/* Flores Amarelas */}
          {[[170, 540], [290, 570], [710, 550], [920, 580], [1140, 540], [1340, 560]].map(([x, y], i) => (
            <g key={`flower-y-${i}`} fill="#FFE600">
              <rect x={x} y={y} width="6" height="6" />
              <rect x={x+5} y={y-4} width="6" height="6" />
              <rect x={x-5} y={y-4} width="6" height="6" />
              <rect x={x} y={y-8} width="6" height="6" fill="#FFFFFF" />
            </g>
          ))}
        </g>

        {/* 6. MASCOTE RETRÔ CRT (Computador sorridente com borboleta) */}
        <g transform="translate(420, 360)">
          {/* Sombra da base */}
          <ellipse cx="60" cy="148" rx="55" ry="14" fill="#000000" opacity="0.35" />
          
          {/* Gabinete do Monitor Bege Retrô */}
          <rect x="10" y="30" width="100" height="90" rx="8" fill="#D3D5D7" stroke="#1A1C20" strokeWidth="4" />
          <rect x="18" y="38" width="84" height="74" rx="6" fill="#B9BCBF" />
          
          {/* Tela CRT Ciano Escuro */}
          <rect x="24" y="44" width="72" height="60" rx="5" fill="#4A757B" stroke="#1A1C20" strokeWidth="3" />
          <rect x="28" y="48" width="64" height="52" rx="4" fill="#6EA5AB" />
          
          {/* Rosto Pixel Cat (^w^) no Monitor */}
          {/* Olho Esquerdo ^ */}
          <polygon points="38,70 44,64 50,70" fill="#14282B" />
          {/* Olho Direito ^ */}
          <polygon points="70,70 76,64 82,70" fill="#14282B" />
          {/* Boquinha w */}
          <path d="M52,78 Q56,84 60,78 Q64,84 68,78" fill="none" stroke="#14282B" strokeWidth="3" strokeLinecap="round" />

          {/* Base e Suporte do Monitor */}
          <path d="M40,120 L80,120 L88,140 L32,140 Z" fill="#B9BCBF" stroke="#1A1C20" strokeWidth="3" />

          {/* Borboleta Rosa na Antena/Topo */}
          <g transform="translate(30, 10)">
            <ellipse cx="6" cy="10" rx="7" ry="5" fill="#FF5E97" transform="rotate(-30, 6, 10)" />
            <ellipse cx="18" cy="10" rx="7" ry="5" fill="#FF5E97" transform="rotate(30, 18, 10)" />
            <rect x="11" y="6" width="3" height="9" rx="1.5" fill="#FFE600" />
          </g>
        </g>
      </svg>

      {/* CONTEÚDO HERO CENTRALIZADO (EXATAMENTE COMO O SCREENSHOT) */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 pointer-events-none pt-4 sm:pt-10">
        
        {/* Título Superior Pixel: START YOUR */}
        <div className="font-pixel text-xs sm:text-sm md:text-base font-bold text-[#14202C] tracking-widest uppercase mb-1 drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)]">
          COMECE SUA JORNADA
        </div>

        {/* Título Principal 3D Pixel: Coding Adventure */}
        <h1 
          className="font-pixel text-4xl sm:text-6xl lg:text-7xl font-extrabold uppercase tracking-tight text-[#FFF8DB] leading-none mb-3"
          style={{
            textShadow: `
              3px 3px 0 #4A270D,
              -3px 3px 0 #4A270D,
              3px -3px 0 #4A270D,
              -3px -3px 0 #4A270D,
              0 5px 0 #4A270D,
              0 8px 0 #2D1405,
              0 11px 0 #1A0901,
              0 15px 15px rgba(0,0,0,0.4)
            `
          }}
        >
          Coding Adventure
        </h1>

        {/* Subtítulo Delicado com estrelas ⋆˙⟡ */}
        <p className="text-xs sm:text-sm md:text-base font-semibold text-[#1B2A36] max-w-xl font-sans drop-shadow-[0_1px_2px_rgba(255,255,255,0.9)] mb-6">
          A maneira mais divertida e interativa de aprender e revisar código. ⋆˙⟡
        </p>

        {/* Botão Amarelo Pixel Central (Get Started) */}
        <div className="pointer-events-auto flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={onStart}
            className="px-8 py-3.5 sm:px-10 sm:py-4 rounded-xl bg-[#FFE600] hover:bg-[#FFD000] text-black font-pixel text-xs sm:text-sm font-bold uppercase border-[3px] border-black shadow-[4px_4px_0px_0px_#000000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[1px_1px_0px_0px_#000000] transition-all cursor-pointer flex items-center gap-2.5"
          >
            <Play className="h-4 w-4 fill-black text-black" />
            <span>COMEÇAR AGORA</span>
          </button>

          <button
            onClick={onOpenHelp}
            className="px-6 py-3.5 sm:py-4 rounded-xl bg-white hover:bg-slate-100 text-black font-pixel text-xs font-bold uppercase border-[3px] border-black shadow-[4px_4px_0px_0px_#000000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[1px_1px_0px_0px_#000000] transition-all cursor-pointer flex items-center gap-2"
          >
            <BookOpen className="h-4 w-4 text-black" />
            <span>GUIA & CÓDIGO</span>
          </button>
        </div>

        {/* Badges de Tecnologias Apoiadas na Grama */}
        <div className="mt-8 flex items-center justify-center gap-6 text-[10px] sm:text-xs font-pixel font-bold text-[#14202C] opacity-90">
          <span>JAVASCRIPT</span>
          <span>•</span>
          <span>REACT 19</span>
          <span>•</span>
          <span>HOOKS</span>
          <span>•</span>
          <span>DOM</span>
        </div>

      </div>

    </div>
  );
}
