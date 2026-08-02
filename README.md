# 🚀 Universal Mobile Harness Template

> **Infraestrutura de Engenharia de Harness para Desenvolvimento Mobile Autónomo e Multi-Agente (React Native / Expo & Flutter).**

Este repositório é um **Template do GitHub** pronto para produção. Ele fornece uma camada determinística de governança, automação de sanidade, instalação dinâmica de **Skills de Especialistas** e um cockpit visual de observabilidade para qualquer agente de IA (Claude Code, Cursor, Codex, OpenCode, entre outros).

---

## 🏛️ A Arquitetura do Harness Mobile em 5 Camadas

```text
┌──────────────────────────────────────────────────────────────────────────────────┐
│ CAMADA 1: INTERFACING & MULTI-AGENTE                                             │
│ • Claude Code / Cursor / Codex / CLI                                             │
│ • Symlink Universal: CLAUDE.md <-> AGENTS.md                                     │
└────────────────────────────────────────┬─────────────────────────────────────────┘
                                         │
┌────────────────────────────────────────▼─────────────────────────────────────────┐
│ CAMADA 2: CONTEXTO ENXUTO & SISTEMA DINÂMICO DE SKILLS                          │
│ • AGENTS.md Index (~100 linhas) + Progressive Disclosure (docs/*)                │
│ • Sistema Dinâmico de Skills (.claude/skills/*)                                  │
│ • Protocolo Sanduíche de Raciocínio (PLAN ➔ EXECUTE ➔ VALIDATE)                  │
└────────────────────────────────────────┬─────────────────────────────────────────┘
                                         │
┌────────────────────────────────────────▼─────────────────────────────────────────┐
│ CAMADA 3: AUTOMATIZAÇÃO DE HABILIDADES (MASTER-SKILL & SCRIPTS)                  │
│ • Master-Skill: skill-manager                                                    │
│ • Autómato de Instalação: scripts/install-skill.sh                               │
│ • Auto-registo dinâmico de novas skills no AGENTS.md                             │
└────────────────────────────────────────┬─────────────────────────────────────────┘
                                         │
┌────────────────────────────────────────▼─────────────────────────────────────────┐
│ CAMADA 4: SENSORES COMPUTACIONAIS & GARBAGE COLLECTION                           │
│ • Mechanical Enforcers (tsc, ESLint, Jest, Maestro E2E)                          │
│ • Continuous Garbage Collection & Expo/Nativo Fingerprint (init.sh)              │
└────────────────────────────────────────┬─────────────────────────────────────────┘
                                         │
┌────────────────────────────────────────▼─────────────────────────────────────────┐
│ CAMADA 5: COCKPIT VISUAL & OBSERVABILIDADE                                       │
│ • Dashboard Web Universal em Next.js (dashboard/)                                │
└──────────────────────────────────────────────────────────────────────────────────┘

🧰 Sistema Dinâmico de Skills
O Harness utiliza o Padrão Aberto de Agent Skills (.claude/skills/). O agente só carrega o contexto do especialista no momento exato em que a tarefa exige essa atuação.

🛠️ Instalação Automática de Novas Skills
Pode instalar novas skills especialistas diretamente a partir de um repositório Git ou de uma pasta local utilizando o script ou a Master-Skill:

1. Via Terminal:
Bash
./scripts/install-skill.sh <URL_GIT_OU_PASTA_LOCAL> <NOME_DA_SKILL>

# Exemplo:
./scripts/install-skill.sh [https://github.com/usuario/skill-react-native-expert](https://github.com/usuario/skill-react-native-expert) react-native-expert
2. Via Prompt de IA (Master-Skill skill-manager):
Basta instruir o seu agente de IA no terminal:

"Baixe a skill do repositório https://github.com/usuario/skill-backend-supabase com o nome backend-supabase e registe no Harness."

O automato irá:

Copiar/clonar os ficheiros da skill para .claude/skills/<nome-da-skill>/.

Ler a descrição YAML no cabeçalho do SKILL.md.

Adicionar automaticamente a entrada no mapa de governança do AGENTS.md.

🚀 Como Iniciar
1. Usar como Template
Clique no botão "Use this template" no topo da página do GitHub para criar o seu repositório.

2. Inicializar o Ambiente
Clone e execute o script de automação e sanidade:

Bash
git clone [https://github.com/SEU_USUARIO/meu-novo-app.git](https://github.com/SEU_USUARIO/meu-novo-app.git)
cd meu-novo-app

chmod +x init.sh scripts/install-skill.sh
./init.sh
3. Executar o Agente ou Cockpit Visual
Modo Terminal: Abra o seu CLI favorito (claude, cursor, codex, opencode).

Modo Cockpit Web:

Bash
cd dashboard
npm install
npm run dev
Aceda a http://localhost:3000 para acompanhar e orquestrar visualmente.

🛡️ Regras Invioláveis do Repositório
Zero any: Estritamente proibido o uso de tipos fracos ou ignorar verificações estáticas de TypeScript.

UI Isolada: Componentes de ecrã nunca acedem diretamente a clientes de banco de dados ou SDKs de backend (consulte docs/architecture.md).

Testability Mandatory: Todo o elemento interativo de UI deve possuir a propriedade testID para automação E2E com Maestro.

Continuous Garbage Collection: O init.sh purga ficheiros temporários, caches e sincroniza alterações nativas automaticamente.

📄 Licença
Licença MIT. Livre para utilização e customização em projetos comerciais e pessoais.