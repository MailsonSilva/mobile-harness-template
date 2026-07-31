import { registerExtension, ExtensionContext } from "@earendil-works/pi-coding-agent";
import * as fs from "fs";
import * as path from "path";

interface Feature {
  id: string;
  name: string;
  status: string;
}

registerExtension({
  name: "harness-status-hud",
  description: "Exibe o HUD visual do Harness com progresso e estado da feature ativa.",
  onSessionStart: async (ctx: ExtensionContext) => {
    try {
      const featurePath = path.join(process.cwd(), "feature_list.json");
      if (fs.existsSync(featurePath)) {
        const data = JSON.parse(fs.readFileSync(featurePath, "utf-8"));
        const activeFeature = data.features?.find(
          (f: Feature) => f.status === "pending" || f.status === "in-progress"
        );

        ctx.ui.renderWidget("status-bar", {
          title: "🎯 HARNESS MOBILE COCKPIT",
          activeTask: activeFeature ? `[${activeFeature.id}] ${activeFeature.name}` : "Nenhuma tarefa em andamento",
          protocol: "Sanduíche de Raciocínio (PLAN ➔ EXECUTE ➔ VALIDATE)",
        });
      }
    } catch (e) {
      // Silencioso se o arquivo de estado não estiver presente
    }
  }
});