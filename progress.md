📊 Histórico de Progresso & Estado do Agente (progress.md)
Este arquivo é o sistema de estado persistente do harness. Toda sessão de IA deve ler este arquivo no início e atualizá-lo antes do encerramento, garantindo o alinhamento de contexto através do protocolo Sanduíche de Raciocínio (Plan ➔ Execute ➔ Validate).

🟢 Sessão Ativa Atual
Tarefa Alvo: Nenhuma (Aguardando inicialização)
ID da Feature: [Ex: F-01]
Modelo Utilizado: [Ex: Claude 3.5 Sonnet / Gemini 1.5 Pro]
Carimbos de Data/Hora (Estampa): 2026-07-30

🥪 Protocolo Sanduíche de Raciocínio (Sessão Ativa)

1. Raciocinar & Planejar (PLAN)
Antes de fazer qualquer alteração de código, preencha este planejamento.

Objetivo da alteração: [O que você vai realizar nesta sessão?]
Arquivos que serão impactados:
[ ] caminho/do/arquivo.ts (Criar / Editar / Mover)
Análise de Dependências & Efeitos Colaterais: [O que isso pode quebrar? Alguma store do Zustand ou Widget Flutter depende disso?]

Estratégia de Implementação: [Passo a passo lógico]

2. Executar Mudanças (EXECUTE)
Execute as edições estritamente necessárias para a tarefa acima.

Notas de Implementação: [Logs breves do que foi alterado, novas dependências instaladas, etc.]
Desvios de Plano: [Se teve que mudar algo no meio do caminho, justifique aqui]

3. Validar Alterações (VALIDATE)
Nenhuma tarefa está concluída até passar nos sensores determinísticos.

[ ] Validação Estática: npm run lint ou flutter analyze ➔ [PASSOU / FALHOU]
[ ] Testes de Unidade: npm run test ou flutter test ➔ [PASSOU / FALHOU]
[ ] Testes de Interface (E2E): maestro test .maestro/fluxo.yaml ➔ [PASSOU / FALHOU]
Evidências de Correção: [Injete aqui saídas de logs bem-sucedidas ou prints de sucesso]

📜 Histórico de Sprints & PRs Realizados
[Sprint 1] - Setup & Infraestrutura de Segurança
PR #001: feat(harness-setup): inicialização das diretrizes AGENTS.md e init.sh ➔ Aprovado e Mesclado
Status da Feature F-01: todo
Status da Feature F-02: todo
Status da Feature F-03: todo

⚠️ Dívida Técnica Conhecida (Backlog de Limpeza / Garbage Collection)
[ ] F-01 (Segurança): Verificar se chaves de criptografia locais no SecureStore estão sendo purgadas quando a sessão é deslogada.
[ ] F-02 (Database): Adicionar índices na coluna created_at e user_id da tabela notes para otimizar queries de listagem.