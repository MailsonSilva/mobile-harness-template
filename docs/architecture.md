Diretrizes de Arquitetura & Fronteiras de Código
Este documento especifica a arquitetura estrutural rigorosa adotada no projeto, seja ele desenvolvido em React Native ou em Flutter. O agente de IA deve respeitar estritamente as fronteiras descritas abaixo para evitar o desvio arquitetônico.

🏛️ 1. Arquitetura em Camadas
O fluxo de dados e de dependências deve ser sempre unidirecional e "para a frente", seguindo o seguinte caminho fixo:

Types ➔ Config ➔ Repo / Store ➔ Service ➔ UI
Cada camada possui responsabilidades explícitas:

Types: Declaração de interfaces TypeScript, schemas do Zod (React Native) ou classes de modelo de dados congelados (Flutter).
Config: Variáveis de ambiente, constantes do sistema, urls de endpoints e inicializações básicas de bibliotecas.
Repo / Store: Camada de gerenciamento de estado global (Zustand para React Native ou Bloc/Riverpod para Flutter) e adaptadores de acesso a dados offline/local.
Service: Lógica de negócio pura, chamadas HTTP/gRPC, integrações de SDKs externos e controle de fluxos de dados complexos.
UI: Componentes visuais puros, telas, navegações e hooks simples de renderização. A UI nunca executa lógica de negócio direta ou chamadas diretas a bancos de dados.
🚫 2. Fronteiras de Código & Imports Proibidos
Para manter o determinismo e a consistência da base de código, aplicamos as seguintes restrições rígidas:

Proibido importar SDKs nativos de Banco/Auth na UI: Telas e componentes visuais estão proibidos de importar o cliente do Supabase, Firebase ou qualquer outro provedor diretamente. Toda chamada deve ser envelopada em um arquivo dentro de services/ ou acionada via Store.
Errado: import { supabase } from '../config/supabase' ... await supabase.from('users').select() dentro de uma tela.
Certo: const { profile, fetchProfile } = useProfileStore() na tela; a store delega para ProfileService.getUserProfile().
Proibido usar "YOLO Data Probing": O agente nunca deve tentar interagir com estruturas adivinhadas ou tipos soltos. Sempre utilize SDKs tipados ou schemas robustos com validação (Zod) para validar dados no limite.
🔧 3. Mensagens de Erro Guiadas (Mechanical Enforcers)
Nossos linters estruturais estão configurados para validar imports inválidos em tempo de CI. Se você receber um erro de importação, siga a instrução de remediação injetada diretamente no seu terminal:

✖ Error: UI Component [src/screens/Profile.tsx] imported [SupabaseClient] directly.

👉 INSTRUÇÃO DE REMEDIAÇÃO DO HARNESS:
A arquitetura deste projeto proíbe chamadas diretas ao cliente do banco de dados na UI.
Ação Requerida:
1. Recorte a chamada assíncrona da sua tela.
2. Crie ou reutilize uma Service/Hook na pasta 'src/services/'.
3. Injete o resultado do estado na sua tela utilizando uma Store (Zustand) ou useQuery do TanStack Query.
