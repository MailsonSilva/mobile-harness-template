#!/usr/bin/env bash

# init.sh - Script de Inicialização, Sanidade e Coleta de Lixo para Harness Mobile
# Autor: Harness Engineering Agent (2026)

set -e

echo "======================================================================"
echo "🚀 INICIALIZANDO O HARNESS MOBILE DE SESSÃO DO AGENTE"
echo "======================================================================"

# --- 1. DETECÇÃO AUTOMÁTICA DE FRAMEWORK ---
FRAMEWORK="unknown"
if [ -f "pubspec.yaml" ]; then
    FRAMEWORK="flutter"
elif [ -f "package.json" ]; then
    if grep -q '"react-native"' package.json || grep -q '"expo"' package.json; then
        FRAMEWORK="react-native"
    fi
fi

echo "🔍 Framework Detectado: ${FRAMEWORK^^}"

# --- 2. INTEROPERABILIDADE MULTI-AGENTE (SYMLINK) ---
echo "🔄 [1/4] Criando Link Simbólico de Interoperabilidade..."
if [ -f "AGENTS.md" ]; then
    ln -sf AGENTS.md CLAUDE.md
    echo "✅ Link Simbólico CLAUDE.md -> AGENTS.md estabelecido com sucesso."
else
    echo "⚠️ AGENTS.md não foi encontrado. Certifique-se de que ele esteja na raiz."
fi

# --- 3. CONTINUOUS GARBAGE COLLECTION (COLETA DE LIXO) ---
echo "🧹 [2/4] Iniciando Coleta de Lixo Contínua (Garbage Collection)..."
if [ "$FRAMEWORK" = "react-native" ]; then
    echo "  -> Limpando caches do Expo Metro Bundler..."
    rm -rf .expo/cache
    rm -rf node_modules/.cache
    echo "  -> Removendo logs antigos do Maestro..."
    rm -rf .maestro/logs/
    
    # Reset do Supabase local (opcional/defensivo)
    if [ -d "supabase" ] && command -v supabase &> /dev/null; then
        echo "  -> Detectado projeto Supabase. Tentando resetar DB local..."
        supabase db reset --linked=false 2>/dev/null || echo "  ℹ️ Supabase local não inicializado ou Docker indisponível. Ignorando reset."
    fi
elif [ "$FRAMEWORK" = "flutter" ]; then
    echo "  -> Limpando caches de compilação do Flutter..."
    flutter clean 2>/dev/null || echo "  ℹ️ Flutter não está no PATH global ou não pôde limpar."
    echo "  -> Removendo logs antigos do Maestro..."
    rm -rf .maestro/logs/
else
    echo "  ⚠️ Framework desconhecido. Limpando apenas logs de testes gerais..."
    rm -rf .maestro/logs/ tmp/
fi
echo "✅ Coleta de Lixo concluída com sucesso."

# --- 4. VERIFICAÇÃO DE MUDANÇA NATIVA (EAS FINGERPRINT) ---
echo "🔍 [3/4] Analisando Estado Nativo do Aplicativo..."
if [ "$FRAMEWORK" = "react-native" ]; then
    if command -v npx &> /dev/null; then
        echo "  -> Calculando EAS Fingerprint..."
        if npx @expo/fingerprint . > .fingerprint-current.json 2>/dev/null; then
            if [ -f ".fingerprint-previous.json" ]; then
                if ! cmp -s .fingerprint-current.json .fingerprint-previous.json; then
                    echo "⚠️ ATENÇÃO: Mudança nativa detectada no Expo!"
                    echo "👉 É altamente recomendável recompilar o Dev Client nativo (npx expo run:ios ou run:android)."
                    mv .fingerprint-current.json .fingerprint-previous.json
                else
                    echo "⚡ Nenhuma mudança nativa encontrada desde a última execução. Usando Fast Path do Metro (JS/TS)."
                    rm -f .fingerprint-current.json
                fi
            else
                echo "📝 Primeiro rastreamento nativo. Salvando fingerprint inicial..."
                mv .fingerprint-current.json .fingerprint-previous.json
            fi
        else
            echo "  ℹ️ Não foi possível rodar o @expo/fingerprint. Ignorando verificação nativa."
        fi
    fi
elif [ "$FRAMEWORK" = "flutter" ]; then
    echo "  -> Monitorando alterações no Android/iOS (Flutter pubspec & Gradle)..."
    # Flutter utiliza pubspec.yaml e pastas nativas
    find ios/ pubspec.yaml android/ -type f \( -name "*.gradle" -o -name "Podfile" -o -name "pubspec.yaml" \) -exec md5sum {} \; > .flutter-fingerprint-current 2>/dev/null || true
    if [ -f ".flutter-fingerprint-previous" ] && [ -f ".flutter-fingerprint-current" ]; then
        if ! cmp -s .flutter-fingerprint-current .flutter-fingerprint-previous; then
            echo "⚠️ ATENÇÃO: Mudanças nativas/dependências detectadas no Flutter!"
            echo "👉 Execute 'flutter pub get' antes de rodar seu emulador."
            mv .flutter-fingerprint-current .flutter-fingerprint-previous
        else
            echo "⚡ Nenhuma alteração nativa de dependências. Continuando..."
            rm -f .flutter-fingerprint-current
        fi
    else
        [ -f ".flutter-fingerprint-current" ] && mv .flutter-fingerprint-current .flutter-fingerprint-previous
    fi
fi
echo "✅ Estado nativo verificado."

# --- 5. VERIFICAÇÃO DE SANIDADE FINAL ---
echo "📝 [4/4] Verificando arquivos de governança do agente..."
if [ ! -f "feature_list.json" ]; then
    echo "  -> Criando arquivo feature_list.json padrão para controle de tarefas..."
    echo '{"features": [{"id": "feat-001", "name": "Setup Inicial do App", "status": "pending", "description": "Configure as dependências e o ambiente"}]}' > feature_list.json
fi

if [ ! -f "progress.md" ]; then
    echo "  -> Criando diário de progresso progress.md inicial..."
    echo "# Diário de Progresso do Agente\n\nSessão iniciada em: $(date)" > progress.md
fi

echo "======================================================================"
echo "✅ HARNESS MOBILE PRONTO E SAUDÁVEL PARA SESSÃO DO AGENTE!"
echo "======================================================================"
