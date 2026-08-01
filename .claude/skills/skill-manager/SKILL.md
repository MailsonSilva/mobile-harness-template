---
name: skill-manager
description: Ative esta skill quando o usuário pedir para instalar, atualizar ou remover skills de especialistas (Designer, Backend, QA, etc.) a partir de URLs Git ou caminhos locais.
---

# 🛠️ Master-Skill: Gerenciador de Skills do Harness

Quando o usuário solicitar adicionar uma nova habilidade ou especialista:

1. Execute o script de instalação no terminal:
   `./scripts/install-skill.sh <URL_OU_CAMINHO> <NOME_DA_SKILL>`
2. Abra o arquivo `.claude/skills/<NOME_DA_SKILL>/SKILL.md` gerado e confirme que o cabeçalho YAML possui `name` e `description` claros.
3. Garanta que o `AGENTS.md` descreva quando a skill deve ser acionada nas etapas de `PLAN`, `EXECUTE` ou `VALIDATE`.