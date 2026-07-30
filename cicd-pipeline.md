# 🚀 Pipeline de Integração e Entrega Contínua (CI/CD Mobile)
### Guia de Automação Híbrida para React Native (Expo) e Flutter

Este documento serve como o guia definitivo de execução e governança para os **Agentes de Deploy e Integração Contínua (CI/CD)** do seu projeto. Ele descreve as regras estritas e os fluxos lógicos para automatizar a validação, teste de regressão, compilação nativa e distribuição sem fricção manual.

---

## 🏛️ Filosofia Central: "Acelerar no JS/Dart, Blindar no Nativo"

Compilações nativas mobile (`.ipa` para iOS, `.apk`/`.aab` para Android) são processos computacionalmente caros e demorados. Portanto, a regra de ouro do nosso pipeline de CI/CD é a **otimização inteligente baseada em Fingerprint** para tomar caminhos rápidos sempre que possível.

---

## 🛠️ 1. Pipeline de React Native (EAS Workflows + GitHub Actions)

Para a stack React Native/Expo, utilizamos o **EAS Workflows** como nosso mecanismo nativo de orquestração [251]. Ele gerencia o ciclo completo (build, submit, update, testes de regressão e telemetria) sob um único teto, dispensando configurações complexas em scripts manuais de Bash ou Fastlane [251].

### Fluxo Lógico do EAS Workflow:
```yaml
# .expo/workflows/ci-cd.yaml
name: CI/CD Pipeline (React Native)

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

jobs:
  validate:
    name: 🔍 Validação Estática e Testes Unitários
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - name: 📦 Instalar Dependências
        run: npm ci
      - name: 🛑 Lint & Verificação de Tipos (Linter Erros como Prompts)
        run: npm run lint && npx tsc --noEmit
      - name: 🧪 Executar Testes Unitários
        run: npm test

  check_fingerprint:
    name: 🔍 Análise de Fingerprint Nativo
    needs: validate
    runs-on: ubuntu-latest
    outputs:
      native_changed: ${{ steps.fingerprint.outputs.native_changed }}
    steps:
      - uses: actions/checkout@v4
      - name: 🧬 Comparar EAS Fingerprint
        id: fingerprint
        run: |
          npx @expo/fingerprint . > .fingerprint-current.json
          # Compara o fingerprint atual com o histórico persistido
          if [ -f .fingerprint-previous.json ] && cmp -s .fingerprint-current.json .fingerprint-previous.json; then
            echo "native_changed=false" >> $GITHUB_OUTPUT
            echo "⚡ Nenhuma alteração nativa detectada. Usando JS Fast Path."
          else
            echo "native_changed=true" >> $GITHUB_OUTPUT
            echo "⚠️ Alterações nativas detectadas (Config ou dependência nativa)."
            cp .fingerprint-current.json .fingerprint-previous.json
          fi

  deploy_ota:
    name: ⚡ Deploy Rápido (OTA Update)
    needs: check_fingerprint
    if: needs.check_fingerprint.outputs.native_changed == 'false'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: expo/expo-github-action@v8
        with:
          expo-version: latest
          eas-version: latest
          token: ${{ secrets.EXPO_TOKEN }}
      - name: 🚀 Publicar EAS Update
        run: eas update --auto --non-interactive
      - name: 🧪 Rodar Testes de Interface de Fumaça (Maestro Headless)
        run: |
          # Executa testes E2E do Maestro contra o novo bundle carregado no build existente
          maestro test .maestro/smoke-tests.yaml

  deploy_native:
    name: 📦 Compilação Nativa Completa (EAS Build)
    needs: check_fingerprint
    if: needs.check_fingerprint.outputs.native_changed == 'true'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: expo/expo-github-action@v8
        with:
          expo-version: latest
          eas-version: latest
          token: ${{ secrets.EXPO_TOKEN }}
      - name: 🏗️ Compilar Dev Client
        run: eas build --profile development --platform all --non-interactive
```

---

## 📱 2. Pipeline de Flutter (GitHub Actions + Codemagic)

No ecossistema Flutter, o pipeline é estruturado em GitHub Actions utilizando a CLI oficial do Flutter para a execução das tarefas. O papel do Fingerprint de hardware nativo é emulado por meio de um hash de arquivos nativos de configuração (como `build.gradle`, `Podfile`, `AndroidManifest.xml` e `Info.plist`).

```yaml
name: CI/CD Pipeline (Flutter)

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

jobs:
  validate_flutter:
    name: 💙 Validação e Análise Estática Flutter
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: subosito/flutter-action@v2
        with:
          channel: 'stable'
      - name: 📦 Obter Pacotes
        run: flutter pub get
      - name: 🛑 Linter & Análise de Tipos Estáticos
        run: flutter analyze
      - name: 🧪 Executar Testes Unitários
        run: flutter test

  check_native_hashes:
    name: 🧬 Check de Alteração Física Nativa
    needs: validate_flutter
    runs-on: ubuntu-latest
    outputs:
      native_changed: ${{ steps.check.outputs.native_changed }}
    steps:
      - uses: actions/checkout@v4
      - name: 🧮 Calcular Hash de Dependências e Códigos Nativos
        id: check
        run: |
          # Gera um hash único baseado nas configurações nativas do projeto
          find android/ ios/ -name "build.gradle" -o -name "Podfile" -o -name "AndroidManifest.xml" -o -name "Info.plist" | sort | xargs md5sum > .flutter-native-current.hash
          if [ -f .flutter-native-previous.hash ] && cmp -s .flutter-native-current.hash .flutter-native-previous.hash; then
            echo "native_changed=false" >> $GITHUB_OUTPUT
            echo "⚡ Sem mudanças de pacotes nativos. Executando compilação otimizada."
          else
            echo "native_changed=true" >> $GITHUB_OUTPUT
            cp .flutter-native-current.hash .flutter-native-previous.hash
          fi

  build_flutter:
    name: 🏗️ Compilação e Distribuição Completa
    needs: check_native_hashes
    runs-on: macos-latest # Necessário para compilação iOS
    steps:
      - uses: actions/checkout@v4
      - uses: subosito/flutter-action@v2
        with:
          channel: 'stable'
      - name: 📦 Build APK (Android)
        run: flutter build apk --release
      - name: 📦 Build IPA (iOS)
        run: flutter build ipa --no-codesign # Ou assinado configurando os certificados no keychain
```

---

## 🧪 3. Integração do TestSprite (Validação E2E e Automação de APIs)

Os nossos pipelines de CI/CD utilizam o **TestSprite** como a camada final e autônoma de controle de qualidade, rodando testes tanto no frontend de forma visual quanto no backend (Supabase) [217]:

1.  **Testes de UI (Frontend):** O TestSprite se conecta de forma headless e executa jornadas completas de usuário baseadas no mapa de recursos derivado do PRD, validando os fluxos críticos de negócio do aplicativo [217, 218].
2.  **Validação Automática de APIs:** O TestSprite executa sondas automáticas contra as bordas do Supabase, validando a integridade das tabelas, esquemas, integridade de autenticação e fluxos lógicos entre chamadas [217, 219, 223].
3.  **Auto-Heal e Resiliência:** Caso ocorram pequenas mudanças na interface visual do app (alterações estéticas em componentes), o mecanismo de **Auto-Heal** do TestSprite corrige automaticamente as interações para evitar quebras falsas no pipeline de integração [222].

---

## 📈 4. Monitoramento e Telemetria pós-lançamento (Sentry & Langfuse)

Não limitamos as métricas de qualidade apenas ao ambiente de desenvolvimento. O pipeline injeta chaves de monitoramento ativas:

*   **Sentry:** Acoplado diretamente ao fluxo de build [252, 253]. Erros em produção no React Native (mobile), no Supabase Edge Functions (backend) ou no painel de controle são roteados para um dashboard unificado de tratamento [252].
*   **Langfuse:** Rastreia e avalia o comportamento dos seus agentes de IA durante a execução das tarefas, fornecendo tracing detalhado sobre o consumo e o custo de tokens em tempo real de cada PR mesclado [98, 238].

---

## 📜 5. Mandamentos do CI/CD Mobile para o Agente de IA

Seja você um agente ou humano, **você deve obedecer rigorosamente a estas 4 regras:**
1.  **Nunca pule o Linter:** Builds nativos disparados sem aprovação prévia do `tsc --noEmit` (React Native) ou `flutter analyze` (Flutter) serão abortados pelo pipeline imediatamente para economizar recursos.
2.  **Armazene Segredos com Segurança:** Todas as chaves nativas de upload (`EXPO_TOKEN`, Keystores, arquivos de provisionamento da Apple) devem ser injetadas exclusivamente via variáveis de ambiente criptografadas do GitHub ou repositório de segredos [251].
3.  **Use `testID` para Elementos Clínicos:** Em qualquer nova interface desenvolvida, forneça um identificador exclusivo para que o Maestro e o TestSprite não dependam de traduções quebradiças de textos visíveis [250].
4.  **Auto-Limpeza (Continuous Garbage Collection):** No final de cada execução bem-sucedida ou falha do pipeline, todos os caches de build do Expo Metro, resíduos temporários do simulador e bancos locais de teste devem ser completamente purgados para evitar decaimento de estado na próxima execução [237].
