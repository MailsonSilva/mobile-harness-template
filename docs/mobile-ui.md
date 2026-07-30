Diretrizes de UI & Sistema de Design Mobile
Este documento orienta sobre a criação de componentes de tela, estilização e como projetar elementos que sejam facilmente testáveis de forma automática por ferramentas como o Maestro.

🎨 1. Estilização & Componentes Visuais
Se React Native (Expo):
NativeWind / Tailwind CSS: Nós utilizamos classes utilitárias baseadas em Tailwind para estilização rápida e AI-friendly.
Performance: Evite inline styles gigantes. Prefira a composição de componentes nativos ou as convenções de estilo unificadas do projeto.
Componentização Reutilizável: Antes de criar um componente visual do zero, verifique na pasta src/components/ se já não existe uma abstração (ex: botões padrões, inputs, cabeçalhos de tela).
Se Flutter:
Widgets Puros & Composições: Siga a convenção de Material Design ou Cupertino definida no projeto.
Clean Widgets: Mantenha métodos de build curtos. Extraia sub-widgets para arquivos separados para que o agente e desenvolvedores consigam ler e compreender a tela em segundos.
🧪 2. Projetando para Confiabilidade de Testes (Testability)
Um dos maiores gargalos de testes automáticos mobile é a fragilidade dos seletores (testes que quebram quando uma tradução ou frase do botão muda). Para evitar isso, aplique estritamente as regras de acessibilidade e teste do projeto:

Uso Obrigatório de testID (React Native) ou ValueKey (Flutter): Nunca faça seu teste do Maestro clicar em botões baseados no texto visível ("Entrar", "Login", "Enviar"). Sempre configure identificadores de teste únicos nos elementos interagíveis.
Errado:
<TouchableOpacity><Text>Entrar</Text></TouchableOpacity>
Certo:
<TouchableOpacity testID="btn-login-submit"><Text>Entrar</Text></TouchableOpacity>
Organização do Fluxo no Maestro: Todos os seus fluxos de teste devem ser descritos em YAML legível na pasta .maestro/. Organize-os em fluxos e subfluxos reutilizáveis (como login-flow, onboarding-flow), garantindo consistência operacional.