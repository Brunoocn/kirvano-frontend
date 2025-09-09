import { MicrofrontendWrapper } from "../../components/microfrontendWrapper";
import { useMicrofrontend } from "../../hooks/useMicrofrontend";
import { MICROFRONTEND_IDS } from "../../constants/microfrontend";

export function TodosPage() {
  useMicrofrontend({
    appId: MICROFRONTEND_IDS.TODOS,
    appLoader: async (id: string) => {
      try {

        const module = await import("remoteTodos/todos-app");
        const app = module.app;

        if (typeof app === "function") {
          app(id);
        }
      } catch (error) {
        console.log(error, "error loading todos microfrontend");
        // Silently fail - fallback handled by MicrofrontendWrapper
      }
    },
  });

  return (
    <MicrofrontendWrapper>
      <div id={MICROFRONTEND_IDS.TODOS}></div>
    </MicrofrontendWrapper>
  );
}
