# 🗺️ Manual de Governança Agênica & Arquitetura (AGENTS.md)

> Este repositório utiliza Engenharia de Harness para desenvolvimento mobile determinístico com qualquer Agente de IA.

---

## 🥪 Protocolo Sanduíche de Raciocínio (Inviolável)

Todo agente a operar neste repositório deve seguir as 3 fases em cada alteração:

1. **PLAN:** Ler o `PRD.md` / `feature_list.json` e registrar o plano em `progress.md`.
2. **EXECUTE:** Desenvolver o código em TypeScript respeitando os limites da arquitetura.
3. **VALIDATE:** Executar os sensores estáticos e testes (`npm run type-check`, `npm run lint`, `npm test`).

---

## 🏛️ Regras de Arquitetura (Mobile)
* **Unidirecionalidade:** `Types ➔ Config ➔ Store ➔ Service ➔ UI`
* **Zero `any`:** Proibido tipagem fraca.
* **Testability:** Todos os componentes interativos devem ter `testID`.