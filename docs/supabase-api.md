Diretrizes de Integração de Backend (Supabase API)
Este documento dita como o agente de IA deve se comunicar com o Supabase e estruturar as transações de dados do aplicativo.

🔐 1. Autenticação & Fluxos de Sessão
Tokens Resilientes (Auto-Auth): O harness está configurado com processos que refrescam tokens de autenticação automaticamente antes de sessões longas de testes ou requisições críticas.
Armazenamento de Sessão: Sempre utilize o SecureStore (Expo) ou flutter_secure_storage para guardar chaves JWT e tokens do Supabase localmente no dispositivo. Nunca armazene segredos em texto puro ou no AsyncStorage padrão.
🗄️ 2. Gerenciamento de Dados & Tipagem Estrita
Não tente adivinhar as tabelas, colunas ou relacionamentos do banco de dados.

Automação de Codegen de Tipos: Sempre que o schema do banco de dados sofrer alterações, ou se você criar uma nova tabela, execute o comando de geração de tipos nativos:
npm run supabase:types  # Equivale a 'supabase gen types typescript'
Isso gerará os tipos estritos em src/types/supabase.ts (ou equivalente no seu framework). O agente deve referenciar esses tipos em todas as chamadas de banco.
Validação de Limites: Utilize schemas do Zod ou classes de validação Dart para sanitizar os payloads recebidos do Supabase antes de repassá-los para a camada visual (UI). Isso blinda o app contra quebras inesperadas se houver drift no schema remoto.
🛡️ 3. Regras de Segurança & Transações
Row Level Security (RLS): Todas as tabelas do banco de dados no Supabase local/remoto devem ter RLS ativo por padrão. Qualquer inserção ou leitura que viole RLS resultará em falha nos testes E2E do Maestro.
Controle de Concorrência (Rate Limit): Evite chamadas paralelas descontroladas ao banco de dados. Use a nossa função auxiliar de mapeamento com concorrência para rodar loops pesados de rede de forma enfileirada e segura.