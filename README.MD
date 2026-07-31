---

# 🚀 README.md

```markdown
# 🚀 Mobile Harness Template (Pi Agent Base)

> **Template de Engenharia de Harness para Desenvolvimento Mobile Autónomo com Agentes de IA (React Native / Expo & Flutter).**

Este repositório é um **Template de Repositório do GitHub** pronto para produção, construído sobre o **Pi Coding Agent** (`@earendil-works/pi-coding-agent`). Ele fornece uma infraestrutura determinística de governança, validação automática e observabilidade visual para que agentes de IA (Pi, Claude Code, Cursor, Codex) desenvolvam aplicações mobile sem regressões de código nem decaimento de estado.

---

## 🏛️ As 5 Camadas da Arquitetura do Harness

```text
┌──────────────────────────────────────────────────────────────────────────────────┐
│                   CAMADA 1: INTERFACE & INTEROPERABILIDADE                       │
│  • Pi TUI HUD / Cockpit Web (RPC) / Cursor  • Symlink Universal: CLAUDE.md <-> AGENTS.md│
└────────────────────────────────────────┬─────────────────────────────────────────┘
                                         │
┌────────────────────────────────────────▼─────────────────────────────────────────┐
│              CAMADA 2: CONTEXTO ENXUTO & GOVERNAÇÃO DE RACIOCÍNIO                │
│  • AGENTS.md Index (~100 linhas)    • Progressive Disclosure (docs/*)            │
│  • Reasoning Sandwich (Plan → Execute → Validate) em progress.md                 │
└────────────────────────────────────────┬─────────────────────────────────────────┘
                                         │
┌────────────────────────────────────────▼─────────────────────────────────────────┐
│              CAMADA 3: EXTENSÕES, PIPELINE & OTIMIZAÇÃO NATIVA                   │
│  • EAS Fingerprint / Flutter Check  • Supabase Codegen  • Metro & Maestro Tools    │
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
Plaintext
mobile-harness-template/
├── AGENTS.md               # Manual de Governação enxuto (Protocolo Sanduíche de Raciocínio)
├── CLAUDE.md -> AGENTS.md  # Link simbólico para interoperabilidade multi-agente
├── init.sh                 # Script de automação de ambiente, verificação e limpeza
├── feature_list.json       # Matriz de tarefas e épicos da aplicação
├── progress.md             # Diário de bordo e estado persistente do agente
├── cicd-pipeline.md        # Documentação do pipeline de CI/CD (EAS Workflows & GitHub Actions)
├── .gitignore              # Proteção contra caches, logs e segredos
├── .pi/                    # Extensões e tsconfig dedicado do Pi Agent
│   ├── tsconfig.json       # Configuração TypeScript isolada para a pasta .pi
│   └── extensions/
│       └── status-hud.ts   # HUD visual para o terminal
├── docs/                   # Progressive Disclosure (Contexto sob procura)
│   ├── architecture.md     # Limites estruturais e regras de imports (UI ➔ Service ➔ Repo)
│   ├── supabase-api.md     # Codegen de tipos, RLS e autenticação
│   ├── mobile-ui.md        # Design System e seletores testID / ValueKey
│   └── testing.md          # Pirâmide de testes (Estático, Unidade e Maestro E2E)
└── dashboard/              # Cockpit Visual Web
    ├── package.json
    └── src/
        ├── components/
        │   └── LiveExecutionStream.tsx # Stream de execução em tempo real
        └── server/
            └── pi-bridge.ts            # Ponte de comunicação RPC com o Pi Agent
🥪 O Protocolo "Sanduíche de Raciocínio"
Todos os agentes a operar neste repositório são mecanicamente obrigados a seguir três fases para qualquer alteração:

PLAN (Raciocinar): Ler a feature_list.json e registar no progress.md o plano de execução, ficheiros afetados e potenciais efeitos colaterais.

EXECUTE (Executar): Implementar o código em TypeScript/Dart de forma enxuta e tipada.

VALIDATE (Validar): Executar a suíte de validação estática e testes (npm run check / flutter analyze). A tarefa só é dada como concluída se passar em todos os sensores.

🚀 Como Iniciar um Novo Projeto
1. Usar como Template
No GitHub, clique em "Use this template" ➔ "Create a new repository".

2. Clonar e Inicializar o Ambiente
Bash
git clone [https://github.com/SEU_USUARIO/meu-novo-app.git](https://github.com/SEU_USUARIO/meu-novo-app.git)
cd meu-novo-app

# Instalar definições de tipos locais para extensões
npm install --save-dev @types/node @earendil-works/pi-coding-agent

# Executar o script de inicialização e sanidade
chmod +x init.sh
./init.sh
3. Iniciar a Execução com o Pi Agent
📱 Modo Terminal (TUI com HUD):
Bash
pi
🖥️ Modo Cockpit Visual Web:
Bash
cd dashboard
npm install
npm run dev
Aceda a http://localhost:3000 para orquestrar o agente visualmente.

🛡️ Regras Invioláveis do Repositório
Zero any: Proibido o uso de tipos fracos ou ignorar verificações estáticas.

UI Isolada: Componentes de tela nunca acedem diretamente a clientes de banco de dados ou SDKs de backend (consulte docs/architecture.md).

Testability: Todo o elemento interativo deve possuir testID (React Native) ou ValueKey (Flutter).

Continuous Garbage Collection: O init.sh purga ficheiros temporários e caches a cada execução.

📄 Licença
Licença MIT. Livre para utilização e customização em projetos comerciais e pessoais.