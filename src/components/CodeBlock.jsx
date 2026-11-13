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
    <div className="relative my-3 overflow-hidden rounded-xl border border-slate-700/60 bg-slate-900 font-mono text-xs shadow-lg">
      {/* Barra superior de terminal */}
      <div className="flex items-center justify-between border-b border-slate-800 bg-slate-950/80 px-3.5 py-1.5 text-slate-400">
        <div className="flex items-center gap-2">
          <Terminal className="h-3.5 w-3.5 text-brand-400" />
          <span className="text-[11px] font-medium text-slate-300">javascript</span>
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1 rounded px-2 py-0.5 text-[10px] text-slate-400 transition hover:bg-slate-800 hover:text-slate-200"
          title="Copiar código"
        >
          {copied ? (
            <>
              <Check className="h-3 w-3 text-emerald-400" />
              <span className="text-emerald-400">Copiado!</span>
            </>
          ) : (
            <>
              <Copy className="h-3 w-3" />
              <span>Copiar</span>
            </>
          )}
        </button>
      </div>

      {/* Conteúdo com numeração de linhas */}
      <div className="overflow-x-auto p-3 text-slate-200">
        <table className="border-collapse">
          <tbody>
            {lines.map((line, idx) => (
              <tr key={idx} className="leading-5">
                <td className="select-none pr-3 text-right text-[11px] text-slate-600">
                  {idx + 1}
                </td>
                <td className="whitespace-pre font-mono text-slate-200">
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
