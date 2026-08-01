#!/usr/bin/env bash

# init.sh - Script de Inicialização, Sanidade e Coleta de Lixo para Harness Mobile
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
    rm -rf .expo/cache node_modules/.cache
    echo "  -> Removendo logs antigos do Maestro..."
    rm -rf .maestro/logs/
    
    if [ -d "supabase" ] && command -v supabase &> /dev/null; then
        echo "  -> Resetando DB local do Supabase..."
        supabase db reset --linked=false 2>/dev/null || echo "  ℹ️ Supabase local não inicializado. Ignorando."
    fi
elif [ "$FRAMEWORK" = "flutter" ]; then
    echo "  -> Limpando caches de compilação do Flutter..."
    flutter clean 2>/dev/null || true
    rm -rf .maestro/logs/
else
    rm -rf .maestro/logs/ tmp/
fi
echo "✅ Coleta de Lixo concluída com sucesso."

# --- 4. VERIFICAÇÃO DE MUDANÇA NATIVA (EAS FINGERPRINT / FLUTTER) ---
echo "🔍 [3/4] Analisando Estado Nativo do Aplicativo..."
if [ "$FRAMEWORK" = "react-native" ] && command -v npx &> /dev/null; then
    if npx @expo/fingerprint . > .fingerprint-current.json 2>/dev/null; then
        if [ -f ".fingerprint-previous.json" ]; then
            if ! cmp -s .fingerprint-current.json .fingerprint-previous.json; then
                echo "⚠️ Alteração nativa detectada! Recompilar Dev Client nativo."
                mv .fingerprint-current.json .fingerprint-previous.json
            else
                echo "⚡ Nenhuma alteração nativa. Usando JS/TS Fast Path."
                rm -f .fingerprint-current.json
            fi
        else
            mv .fingerprint-current.json .fingerprint-previous.json
        fi
    fi
fi
echo "✅ Estado nativo verificado."

# --- 5. VERIFICAÇÃO DE ARCHIVOS DE GOVERNAÇÃO ---
echo "📝 [4/4] Verificando arquivos de governança..."
if [ ! -f "feature_list.json" ]; then
    echo '{"features": [{"id": "feat-001", "name": "Setup Inicial", "status": "pending", "description": "Configure o ambiente"}]}' > feature_list.json
fi

if [ ! -f "progress.md" ]; then
    echo -e "# Diário de Progresso do Agente\n\nSessão iniciada em: $(date)" > progress.md
fi

echo "======================================================================"
echo "✅ HARNESS MOBILE PRONTO E SAUDÁVEL!"
echo "======================================================================"