# 🚀 Universal Mobile Harness Template

> **Template de Engenharia de Harness para Desenvolvimento Mobile Autónomo com Agentes de IA (React Native / Expo & Flutter).**

Este repositório é um **Template de Repositório do GitHub** pronto para produção. Ele fornece uma infraestrutura determinística de governança, validação automática via sensores computacionais e observabilidade visual para que qualquer agente de IA (Claude Code, Cursor, Codex, OpenCode, Copilot, etc.) desenvolva aplicações mobile sem regressões de código nem decaimento de estado.

---

## 🏛️ As 5 Camadas da Arquitetura do Harness

```text
┌──────────────────────────────────────────────────────────────────────────────────┐
│                   CAMADA 1: INTERFACE & INTEROPERABILIDADE                       │
│  • Cockpit Web / CLI do Agente / Cursor  • Symlink Universal: CLAUDE.md <-> AGENTS.md │
└────────────────────────────────────────┬─────────────────────────────────────────┘
                                         │
┌────────────────────────────────────────▼─────────────────────────────────────────┐
│              CAMADA 2: CONTEXTO ENXUTO & GOVERNAÇÃO DE RACIOCÍNIO                │
│  • AGENTS.md Index (~100 linhas)    • Bootstrapping Dinâmico via PRD.md          │
│  • Reasoning Sandwich (Plan → Execute → Validate) em progress.md                 │
└────────────────────────────────────────┬─────────────────────────────────────────┘
                                         │
┌────────────────────────────────────────▼─────────────────────────────────────────┐
│              CAMADA 3: EXTENSÕES, PIPELINE & OTIMIZAÇÃO NATIVA                   │
│  • EAS Fingerprint / Supabase Codegen  • Expo Metro & Maestro Tools               │
└────────────────────────────────────────┬─────────────────────────────────────────┘
                                         │
┌────────────────────────────────────────▼─────────────────────────────────────────┐
│             CAMADA 4: SENSORES INTELIGENTES & COLETA DE LIXO                     │
│  • Mechanical Enforcers (Linters guiados com mensagens de autocorreção)           │
│  • Continuous Garbage Collection (Purge de caches do Metro/Maestro e DB Reset)    │
└────────────────────────────────────────┬─────────────────────────────────────────┘
                                         │
┌────────────────────────────────────────▼─────────────────────────────────────────┐
│                  CAMADA 5: OBSERVABILIDADE & TELEMETRIA                          │
│  • Tracing via Langfuse / OpenTelemetry  • Rastreio de Tokens e Custo por PR       │
└──────────────────────────────────────────────────────────────────────────────────┘

📂 Estrutura de Ficheiros do Repositório

mobile-harness-template/
├── PRD.md                  # Documento de Requisitos do Produto (Definição do App)
├── AGENTS.md               # Manual de Governação enxuto (Protocolo Sanduíche de Raciocínio)
├── CLAUDE.md -> AGENTS.md  # Link simbólico para interoperabilidade multi-agente
├── init.sh                 # Script de automação de ambiente, verificação e limpeza
├── feature_list.json       # Matriz autogerada de tarefas do aplicativo
├── progress.md             # Diário de bordo e estado persistente do agente
├── docs/                   # Progressive Disclosure (Contexto sob procura)
│   ├── architecture.md     # Limites estruturais e regras de imports
│   ├── supabase-api.md     # Codegen de tipos, RLS e autenticação
│   ├── mobile-ui.md        # Design System e seletores testID
│   └── testing.md          # Pirâmide de testes (Estático, Unidade e Maestro E2E)
└── dashboard/              # Cockpit Visual Web Universal
    ├── package.json
    └── src/
        └── app/
            ├── api/agent/chat/route.ts  # API de integração com o Agente
            └── page.tsx                 # Interface gráfica interativa

🚀 Como Iniciar um Novo Projeto
Crie um novo repositório no GitHub a partir deste template.

Adicione ou edite o arquivo PRD.md na raiz com a descrição do seu novo aplicativo.

Inicie a interface visual:

Bash
cd dashboard
npm install
npm run dev
Acesse http://localhost:3000 e envie a instrução inicial ao agente para realizar o bootstrapping do projeto!            