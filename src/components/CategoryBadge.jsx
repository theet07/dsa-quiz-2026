import React from 'react';
import { Sparkles, Terminal } from 'lucide-react';

export default function CategoryBadge({ category, difficulty }) {
  const getDifficultyColor = (diff) => {
    switch (diff) {
      case 'Fácil':
        return 'bg-[#A3E635] text-black'; // Verde lima Codédex
      case 'Médio':
        return 'bg-[#FFE600] text-black'; // Amarelo Codédex
      case 'Avançado':
        return 'bg-[#FF0080] text-white'; // Rosa neon Codédex
      default:
        return 'bg-white text-black';
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="inline-flex items-center gap-1.5 rounded-md border-2 border-black bg-[#E0E7FF] px-2.5 py-1 font-pixel text-[10px] font-bold text-black shadow-neo-sm dark:bg-[#312E81] dark:text-[#E0E7FF] dark:border-black">
        <Terminal className="h-3 w-3" />
        {category}
      </span>

      {difficulty && (
        <span className={`inline-flex items-center gap-1 rounded-md border-2 border-black px-2 py-0.5 font-pixel text-[9px] font-bold uppercase shadow-neo-sm ${getDifficultyColor(difficulty)}`}>
          <Sparkles className="h-2.5 w-2.5" />
          {difficulty}
        </span>
      )}
    </div>
  );
}
