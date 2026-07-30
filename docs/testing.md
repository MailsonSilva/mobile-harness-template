Guia de Testes e Sensores de Validação (testing.md)
Este documento define a estratégia, os padrões de escrita e o ciclo de vida de testes automatizados do nosso projeto móvel. O agente de IA e os engenheiros humanos devem seguir rigorosamente estas diretrizes para garantir que nenhuma alteração seja consolidada sem validação mecânica robusta.

🏛️ A Pirâmide de Testes do Harness
Nosso ecossistema de validação é dividido em três níveis complementares de sensores determinísticos:

┌────────────────────────────────────────────────────────┐
│               NÍVEL 3: E2E (Maestro)                   │  <- Valida fluxos e jornadas reais
├────────────────────────────────────────────────────────┤
│          NÍVEL 2: LÓGICA (Jest / Flutter Test)         │  <- Valida stores, hooks e regras de negócio
├────────────────────────────────────────────────────────┤
│      NÍVEL 1: ESTÁTICO (tsc / eslint / analyze)        │  <- Garante integridade de tipos e regras estruturais
└────────────────────────────────────────────────────────┘
🛠️ Nível 1: Validação Estática e Compilação
Antes de executar qualquer teste lógico, o código precisa compilar sem avisos ou erros.

Para React Native (Expo + TypeScript)
Sensor de Tipos: npx tsc --noEmit
Sensor de Lint: npx eslint . --max-warnings=0
Regra de Ouro: O agente de IA nunca deve ignorar erros de tipagem usando // @ts-ignore ou tipagens genéricas any, a menos que explicitamente autorizado em arquivos de configuração locais.
Para Flutter (Dart)
Sensor Estático: flutter analyze
Regra de Ouro: Toda violação apontada pelo analisador estático deve ser tratada como erro de compilação impeditivo.
🧪 Nível 2: Testes de Unidade e Estado (Lógica)
Focado em garantir o comportamento isolado de funções auxiliares, gerenciadores de estado global (Zustand) e chamadas de serviço.

Para React Native (Jest + React Native Testing Library)
Comando de Execução: npm test ou npm run test:watch
Padrão de Escrita (Zustand Store):
// Exemplo de teste de store Zustand
import { act, renderHook } from '@testing-library/react-hooks';
import { useAuthStore } from './authStore';

describe('AuthStore', () => {
  beforeEach(() => {
    act(() => useAuthStore.getState().reset());
  });

  it('deve atualizar o estado para autenticado ao fazer login', () => {
    const { result } = renderHook(() => useAuthStore());
    act(() => result.current.setSession({ user: { id: '123' } }));
    expect(result.current.isAuthenticated).toBe(true);
  });
});
Para Flutter (Flutter Test)
Comando de Execução: flutter test
Padrão de Escrita:
import 'package:flutter_test/flutter_test.dart';
import 'package:meu_app/stores/auth_store.dart';

void main() {
  group('AuthStore', () {
    late AuthStore authStore;

    setUp(() {
      authStore = AuthStore();
    });

    test('deve inicializar desautenticado', () {
      expect(authStore.isAuthenticated, false);
    });
  });
}
📱 Nível 3: Testes de Interface de Ponta a Ponta (Maestro E2E)
O Maestro é o nosso padrão ouro para testes de interface em 2026. Ele simula toques, digitação e fluxos completos de usuários no emulador de forma rápida e declarativa.

⚠️ Regras Cruciais para Evitar Testes Quebradiços (Flakiness)
Nunca Use Texto Visível para Selecionar Elementos: Textos mudam com traduções, copy ou atualizações de marca. Use identificadores exclusivos de teste.
Em React Native: Adicione a propriedade testID="nome-do-elemento".
Em Flutter: Adicione a propriedade key: ValueKey('nome-do-elemento').
Organize em Fluxos (Flows) e Subfluxos: Isole rotinas comuns (como fazer login) em subfluxos reutilizáveis.
Resets Determinísticos: Toda suite de testes E2E do Maestro deve começar limpando o estado do aplicativo.
📝 Exemplo de Estrutura de Teste do Maestro (.maestro/login-flow.yaml)
appId: com.suaempresa.meuapp
---
# 1. Preparação (Limpando o estado do aplicativo)
- clearState

# 2. Executando jornada de Login usando IDs estáveis
- tapOn:
    id: "input-email"
- inputText: "teste@empresa.com"

- tapOn:
    id: "input-senha"
- inputText: "SenhaSegura123"

- tapOn:
    id: "botao-entrar"

# 3. Verificação de Sucesso (Elemento da Home visível)
- assertVisible:
    id: "dashboard-home"
🔄 Protocolo de Autocorreção de Bugs de Teste (Agent Self-Correction)
Quando o agente de IA executa a suíte de validação durante o Sanduíche de Raciocínio e se depara com uma falha de teste:

Ler o Trace Completo: O agente não deve chutar soluções. Ele deve ler atentamente o log de erro emitido no terminal.
Identificar se é Bug Lógico ou Erro no Teste:
Se for um bug de código, corrija a implementação lógica e re-execute a validação.
Se for um comportamento novo intencional, atualize os assertions do arquivo de teste correspondente para refletir o novo contrato.
Limite de Retentativas (Loop Shield): Se após 3 tentativas consecutivas o teste persistir em falhar, o agente deve parar imediatamente, registrar o trace do erro em seu arquivo de progresso (progress.md) e solicitar assistência humana para evitar desperdício de tokens de API.