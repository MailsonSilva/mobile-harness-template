#!/usr/bin/env bash
# Usage: ./scripts/install-skill.sh <url-git-ou-caminho-local> <nome-da-skill>

SOURCE=$1
SKILL_NAME=$2

if [ -z "$SOURCE" ] || [ -z "$SKILL_NAME" ]; then
  echo "❌ Uso: ./scripts/install-skill.sh <URL_GIT_OU_PASTA> <NOME_DA_SKILL>"
  exit 1
fi

TARGET_DIR=".claude/skills/$SKILL_NAME"
mkdir -p "$TARGET_DIR"

echo "📦 Instalando skill '$SKILL_NAME'..."

if [[ "$SOURCE" == http* ]]; then
  # Se for repositório Git
  git clone --depth 1 "$SOURCE" "tmp_skill"
  cp -r tmp_skill/* "$TARGET_DIR/"
  rm -rf tmp_skill
else
  # Se for arquivo ou pasta local
  cp -r "$SOURCE"/* "$TARGET_DIR/" 2>/dev/null || cp "$SOURCE" "$TARGET_DIR/SKILL.md"
fi

echo "✅ Skill instalada em $TARGET_DIR"

# --- ATUALIZAÇÃO AUTOMÁTICA DO AGENTS.MD ---
echo "🔄 Atualizando o índice de skills no AGENTS.md..."

DESC=$(grep -A 2 "^description:" "$TARGET_DIR/SKILL.md" | head -n 1 | sed 's/description: //')

# Verifica se a skill já está listada no AGENTS.md
if ! grep -q "$SKILL_NAME" AGENTS.md; then
  echo "* **$SKILL_NAME (\`/$SKILL_NAME\`):** $DESC" >> AGENTS.md
  echo "✅ AGENTS.md atualizado com a nova skill!"
else
  echo "ℹ️ Skill já estava registrada no AGENTS.md."
fi