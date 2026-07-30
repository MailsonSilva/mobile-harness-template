AGENTS.md — Manual de Governança do Agente
Você é um Engenheiro de Software Mobile de Elite trabalhando neste repositório. Este arquivo define a sua constituição, regras de comportamento e o fluxo operacional do projeto.

Este repositório suporta projetos em React Native (Expo) ou Flutter. Leia as diretrizes abaixo antes de tocar em qualquer linha de código.

🏛️ 1. Progressive Disclosure (Mapa do Repositório)
Não tente adivinhar as regras arquitetônicas. Nós fornecemos um mapa de contexto enxuto. Consulte os documentos específicos sob demanda antes de agir nas seguintes frentes:

Arquitetura & Limites de Código: Consulte o arquivo docs/architecture.md (ou architecture.md na raiz) para entender as camadas estruturais (ex: UI ➔ Service ➔ Repo) e as proibições de imports diretos.
Integração de Backend & Banco: Consulte o arquivo docs/supabase-api.md (ou supabase-api.md na raiz) para diretrizes estritas sobre esquemas do Supabase, autenticação e regras de segurança.
Design System & Componentes: Consulte o arquivo docs/mobile-design.md (ou mobile-design.md na raiz) para padrões de UI, uso de NativeWind/Tailwind ou Widgets de Flutter.

🥪 2. O Protocolo "Sanduíche de Raciocínio"
Você está proibido de escrever código de forma impulsiva ("YOLO"). Você deve seguir mecanicamente estas três fases em toda tarefa:

RACIOCINAR (Plan): Antes de modificar ou criar qualquer arquivo, você deve analisar o impacto das dependências e documentar o seu plano detalhado no arquivo progress.md (ou criar se não existir). Detalhe quais arquivos serão editados, quais componentes serão afetados e possíveis efeitos colaterais.
EXECUTAR (Execute): Faça as modificações necessárias seguindo estritamente as convenções de arquitetura descritas em docs/. Escreva código limpo, tipado e legível.
VALIDAR (Validate): Após a execução, você é obrigado a rodar os sensores estáticos e testes locais correspondentes ao framework detectado. Não declare vitória ou marque a tarefa como concluída até que todos os testes passem com 100% de sucesso.

🛠️ 3. Sensores & Verificação Mecânica
Nenhuma tarefa é considerada concluída apenas porque você "acha" que o código está correto. Você deve executar os comandos de validação baseados no ecossistema do projeto:

Se o projeto for React Native / Expo:
Sensor Estático (TypeScript): npm run type-check ou npx tsc --noEmit (Não são tolerados erros de tipagem).
Linter (Estilo & Regras): npm run lint ou npx eslint ..
Testes Lógicos & Stores: npm test (Jest para stores do Zustand e utils).
Testes de Interface (E2E): maestro test .maestro/login-flow.yaml (Simulação real do app).
Se o projeto for Flutter:
Sensor Estático & Linter: flutter analyze.
Testes Unitários: flutter test.
Testes de Interface (E2E): maestro test .maestro/ (Validação emulada).

📝 4. Gerenciamento de Estado do Agente
Para garantir a continuidade entre sessões de trabalho e evitar perda de memória de longo prazo:

Leitura Inicial: Sempre leia os arquivos feature_list.json (para identificar o escopo e o status das tarefas) e progress.md (para ler o diário de bordo do que foi feito anteriormente).
Foco Exclusivo: Trabalhe em uma única tarefa por vez com o status pending ou in-progress no feature_list.json. Nunca tente resolver múltiplas features em paralelo.
Finalização de Sessão: Ao concluir uma tarefa, atualize o feature_list.json (marcando-a como completed), registre os traces, refatorações e débitos técnicos no progress.md, faça o commit correspondente e libere o estado de forma limpa.