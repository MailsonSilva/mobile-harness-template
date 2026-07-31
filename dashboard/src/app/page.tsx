'use client'; // <-- ESTA LINHA RESOLVE O ERRO DE EVENT HANDLERS

import React from 'react';

export default function DashboardHome() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 p-8 font-sans">
      <header className="flex justify-between items-center mb-8 pb-4 border-b border-slate-800">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-emerald-400">
            🎯 Mobile Harness Cockpit (Pi Agent)
          </h1>
          <p className="text-sm text-slate-400">
            Centro de controle autônomo para desenvolvimento mobile com IA
          </p>
        </div>
        <div className="flex space-x-2">
          <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-full text-xs font-mono">
            ● Status: Pronto para Sessão
          </span>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Painel 1: Status do Protocolo */}
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl shadow-lg">
          <h2 className="text-lg font-semibold mb-2 text-slate-200">Protocolo Ativo</h2>
          <div className="text-sm text-slate-400 space-y-2">
            <p><strong>Sanduíche de Raciocínio:</strong> PLAN ➔ EXECUTE ➔ VALIDATE</p>
            <p><strong>Governança:</strong> Ativa via <code>AGENTS.md</code></p>
            <p><strong>Interoperabilidade:</strong> Symlink <code>CLAUDE.md</code> ok</p>
          </div>
        </div>

        {/* Painel 2: Métricas de Execução */}
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl shadow-lg">
          <h2 className="text-lg font-semibold mb-2 text-slate-200">Métricas & Tokens</h2>
          <div className="text-2xl font-bold text-emerald-400 font-mono">0 Tokens</div>
          <p className="text-xs text-slate-500 mt-1">Sessão atual via Modo RPC</p>
        </div>

        {/* Painel 3: Ações Rápidas */}
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl shadow-lg flex flex-col justify-between">
          <h2 className="text-lg font-semibold mb-2 text-slate-200">Ações do Harness</h2>
          <button 
            onClick={() => alert('Execute ./init.sh no terminal para limpar o ambiente.')}
            className="w-full py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-medium rounded-lg text-sm transition-colors cursor-pointer"
          >
            Rodar Coleta de Lixo
          </button>
        </div>
      </div>

      {/* Seção Principal de Stream */}
      <section className="mt-8">
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl shadow-lg">
          <h2 className="text-lg font-semibold mb-4 text-slate-200">Fluxo de Execução do Agente</h2>
          <div className="bg-slate-950 p-4 rounded-lg border border-slate-800/80 font-mono text-xs text-slate-400 h-48 flex items-center justify-center">
            Aguardando sinal do processo RPC do Pi... (Execute 'pi' ou inicie a ponte)
          </div>
        </div>
      </section>
    </main>
  );
}