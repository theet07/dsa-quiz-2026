import React, { useState } from 'react';
import { Copy, Check, Terminal } from 'lucide-react';

export default function CodeBlock({ code }) {
  const [copied, setCopied] = useState(false);

  if (!code) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const lines = code.trim().split('\n');

  return (
    <div className="relative my-4 overflow-hidden rounded-xl border-[2.5px] border-black bg-[#16161A] font-mono text-xs shadow-neo">
      {/* Topo do Terminal estilo Codédex */}
      <div className="flex items-center justify-between border-b-2 border-black bg-[#242629] px-3.5 py-2 text-slate-300">
        <div className="flex items-center gap-2">
          {/* Três botões de janela retro */}
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full border border-black bg-[#FF5F56]" />
            <span className="h-2.5 w-2.5 rounded-full border border-black bg-[#FFBD2E]" />
            <span className="h-2.5 w-2.5 rounded-full border border-black bg-[#27C93F]" />
          </div>
          <span className="ml-2 font-pixel text-[10px] text-[#FFE600]">script.js</span>
        </div>

        <button
          onClick={handleCopy}
          className="neo-btn flex items-center gap-1 rounded bg-[#FDFBF7] px-2 py-0.5 text-[10px] font-bold text-black dark:bg-[#1F2024] dark:text-white"
          title="Copiar código"
        >
          {copied ? (
            <>
              <Check className="h-3 w-3 text-[#22C55E]" />
              <span className="text-[#22C55E] font-pixel text-[9px]">OK!</span>
            </>
          ) : (
            <>
              <Copy className="h-3 w-3" />
              <span className="font-pixel text-[9px]">COPIAR</span>
            </>
          )}
        </button>
      </div>

      {/* Código com linhas */}
      <div className="overflow-x-auto p-3.5 text-slate-100">
        <table className="border-collapse w-full">
          <tbody>
            {lines.map((line, idx) => (
              <tr key={idx} className="leading-6">
                <td className="select-none pr-4 text-right text-[11px] font-mono text-slate-500 w-8">
                  {idx + 1}
                </td>
                <td className="whitespace-pre font-mono text-[#00DFD8]">
                  {line}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
