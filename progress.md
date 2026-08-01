📊 Histórico de Progresso & Estado do Agente (progress.md)
Este arquivo é o sistema de estado persistente do harness. Toda sessão de IA deve ler este arquivo no início e atualizá-lo antes do encerramento, garantindo o alinhamento de contexto através do protocolo Sanduíche de Raciocínio (Plan ➔ Execute ➔ Validate).

🟢 Sessão Ativa Atual
Tarefa Alvo: F-01 (Autenticação Supabase Auth, SecureStore e Gestão de Perfil)
ID da Feature: F-01
Modelo Utilizado: Pi Coding Agent
Carimbos de Data/Hora (Estampa): 2026-07-31

🥪 Protocolo Sanduíche de Raciocínio (Sessão Ativa)

1. Raciocinar & Planejar (PLAN)
Antes de fazer qualquer alteração de código, preencha este planejamento.

Objetivo da alteração: Implementar a Feature F-01 do Lotae (Autenticação Supabase Auth, persistência segura via SecureStore, Zustand store, tela de Login/Cadastro com validação estática e testIDs, testes unitários Jest e fluxo Maestro).
Arquivos que serão impactados:
[x] feature_list.json (Bootstrapping F-00 concluído)
[ ] package.json (Adicionar dependências: @supabase/supabase-js, zustand, expo-secure-store, react, react-native, etc., e scripts de teste/lint/type-check)
[ ] tsconfig.json (Configuração TypeScript rigorosa)
[ ] src/types/supabase.ts (Tipos estritos do banco de dados)
[ ] src/config/supabase.ts (Cliente Supabase seguro)
[ ] src/stores/authStore.ts (Zustand store de autenticação com SecureStore)
[ ] src/screens/LoginScreen.tsx (Tela de Login/Cadastro com testIDs)
[ ] src/stores/__tests__/authStore.test.ts (Testes unitários)
[ ] .maestro/login-flow.yaml (Fluxo E2E)

Análise de Dependências & Efeitos Colaterais: Respeitar a arquitetura em camadas (UI ➔ Store ➔ Service ➔ Config). A UI não acessa o Supabase diretamente. Todos os elementos interativos possuem testID.

Estratégia de Implementação:
1. Configurar package.json e tsconfig.json com dependências necessárias.
2. Criar src/types/supabase.ts e src/config/supabase.ts.
3. Criar src/stores/authStore.ts (Zustand + SecureStore).
4. Criar src/screens/LoginScreen.tsx com validação e testIDs.
5. Criar testes unitários em src/stores/__tests__/authStore.test.ts e fluxo Maestro em .maestro/login-flow.yaml.
6. Executar validações estáticas (tsc, eslint, test).

2. Executar Mudanças (EXECUTE)
[Em andamento]

3. Validar Alterações (VALIDATE)
[Pendente]

📜 Histórico de Sprints & PRs Realizados
[Sprint 1] - Setup & Infraestrutura de Segurança
PR #001: feat(harness-setup): inicialização das diretrizes AGENTS.md e init.sh ➔ Aprovado e Mesclado
Status da Feature F-01: todo
Status da Feature F-02: todo
Status da Feature F-03: todo

⚠️ Dívida Técnica Conhecida (Backlog de Limpeza / Garbage Collection)
[ ] F-01 (Segurança): Verificar se chaves de criptografia locais no SecureStore estão sendo purgadas quando a sessão é deslogada.
[ ] F-02 (Database): Adicionar índices na coluna created_at e user_id da tabela notes para otimizar queries de listagem.