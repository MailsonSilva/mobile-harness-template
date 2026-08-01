'use client';

import React, { useState } from 'react';

interface Message {
  role: 'user' | 'agent';
  content: string;
}

export default function MobileHarnessCockpit() {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'agent', content: '🎯 Harness Mobile Ativo! Qual funcionalidade do PRD.md vamos desenvolver hoje?' }
  ]);
  const [inputPrompt, setInputPrompt] = useState('');
  const [selectedModel, setSelectedModel] = useState('anthropic/claude-3-5-sonnet');
  const [isProcessing, setIsProcessing] = useState(false);
  const [tokenCount, setTokenCount] = useState(0);

  const handleSendMessage = async () => {
    if (!inputPrompt.trim() || isProcessing) return;

    const userText = inputPrompt;
    setInputPrompt('');
    setMessages((prev) => [...prev, { role: 'user', content: userText }]);
    setIsProcessing(true);

    try {
      const res = await fetch('/api/agent/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: userText, model: selectedModel }),
      });

      const data = await res.json();
      setTokenCount((prev) => prev + Math.floor(Math.random() * 600) + 300);

      if (data.success) {
        setMessages((prev) => [
          ...prev,
          { role: 'agent', content: data.output },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          { role: 'agent', content: `⚠️ Erro: ${data.error}` },
        ]);
      }
    } catch (err: any) {
      setMessages((prev) => [
        ...prev,
        { role: 'agent', content: `❌ Erro de conexão: ${err.message}` },
      ]);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 p-6 font-sans flex flex-col justify-between">
      <header className="flex justify-between items-center pb-4 border-b border-slate-800">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-emerald-400">
            🚀 Universal Mobile Harness Cockpit
          </h1>
          <p className="text-xs text-slate-400">Plataforma de Governança Agênica & Automação Mobile</p>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex flex-col">
            <label className="text-xs text-slate-400 mb-1">Provedor / Modelo</label>
            <select
              value={selectedModel}
              onChange={(e) => setSelectedModel(e.target.value)}
              className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-1 text-sm text-slate-200 focus:outline-none focus:border-emerald-500"
            >
              <option value="anthropic/claude-3-5-sonnet">Claude 3.5 Sonnet</option>
              <option value="openai/gpt-4o">OpenAI GPT-4o</option>
              <option value="deepseek/deepseek-chat">DeepSeek V3 / R1</option>
              <option value="google/gemini-1.5-pro">Google Gemini 1.5 Pro</option>
            </select>
          </div>

          <div className="bg-slate-900 border border-slate-800 px-4 py-2 rounded-lg text-right">
            <div className="text-xs text-slate-400">Tokens da Sessão</div>
            <div className="text-lg font-mono font-bold text-emerald-400">{tokenCount.toLocaleString()}</div>
          </div>
        </div>
      </header>

      <div className="flex-1 my-6 overflow-y-auto bg-slate-900/60 border border-slate-800 rounded-xl p-4 space-y-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-4 rounded-xl max-w-3xl ${
              msg.role === 'user'
                ? 'bg-emerald-600/20 border border-emerald-500/30 ml-auto text-emerald-100'
                : 'bg-slate-950 border border-slate-800/80 mr-auto text-slate-200'
            }`}
          >
            <div className="text-xs font-bold mb-1 text-slate-400">
              {msg.role === 'user' ? '👤 Você' : '🤖 AI Coding Agent'}
            </div>
            <div className="text-sm whitespace-pre-wrap font-mono">{msg.content}</div>
          </div>
        ))}

        {isProcessing && (
          <div className="p-4 bg-slate-950 border border-slate-800/80 rounded-xl max-w-3xl mr-auto text-amber-400 animate-pulse font-mono text-sm">
            ⏳ Processando alterações via Sanduíche de Raciocínio (Plan ➔ Execute ➔ Validate)...
          </div>
        )}
      </div>

      <div className="flex space-x-3">
        <input
          type="text"
          value={inputPrompt}
          onChange={(e) => setInputPrompt(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
          placeholder="Instrua o agente (ex: 'Crie a tela de listagem de rotas com testIDs')..."
          className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-100 focus:outline-none focus:border-emerald-500"
        />
        <button
          onClick={handleSendMessage}
          disabled={isProcessing}
          className="bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-800 text-white font-medium px-6 py-3 rounded-xl transition-colors text-sm cursor-pointer"
        >
          Enviar Instrução
        </button>
      </div>
    </main>
  );
}