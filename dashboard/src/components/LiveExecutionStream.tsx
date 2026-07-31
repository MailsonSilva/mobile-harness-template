import React, { useState, useEffect } from 'react';

interface StreamLog {
  id: string;
  phase: 'PLAN' | 'EXECUTE' | 'VALIDATE' | 'INFO';
  content: string;
  tokensUsed?: number;
  timestamp: string;
}

export const LiveExecutionStream: React.FC = () => {
  const [logs, setLogs] = useState<StreamLog[]>([]);
  const [totalTokens, setTokens] = useState<number>(0);

  // Exemplo de manipulação de logs recebidos do PiBridge
  const addLog = (log: StreamLog) => {
    setLogs((prev) => [log, ...prev]);
    if (log.tokensUsed) {
      setTokens((prev) => prev + log.tokensUsed);
    }
  };

  return (
    <div className="bg-slate-900 text-slate-100 p-6 rounded-xl border border-slate-800 shadow-2xl font-mono">
      {/* Headbar do Dashboard */}
      <div className="flex justify-between items-center pb-4 border-b border-slate-800">
        <div className="flex items-center space-x-3">
          <span className="h-3 w-3 rounded-full bg-emerald-500 animate-pulse" />
          <h2 className="text-lg font-bold">Pi Execution Stream</h2>
        </div>
        <div className="text-sm bg-slate-800 px-3 py-1 rounded-md text-emerald-400">
          Tokens Acumulados: <span className="font-bold">{totalTokens.toLocaleString()}</span>
        </div>
      </div>

      {/* Stream do Sanduíche de Raciocínio */}
      <div className="mt-4 space-y-3 max-h-96 overflow-y-auto pr-2">
        {logs.map((log) => (
          <div key={log.id} className="p-3 bg-slate-950 rounded-lg border border-slate-800/60">
            <div className="flex items-center justify-between text-xs mb-1">
              <span
                className={`font-bold px-2 py-0.5 rounded ${
                  log.phase === 'PLAN'
                    ? 'bg-blue-500/20 text-blue-400'
                    : log.phase === 'EXECUTE'
                    ? 'bg-amber-500/20 text-amber-400'
                    : 'bg-emerald-500/20 text-emerald-400'
                }`}
              >
                {log.phase}
              </span>
              <span className="text-slate-500">{log.timestamp}</span>
            </div>
            <p className="text-sm text-slate-300 whitespace-pre-wrap">{log.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};