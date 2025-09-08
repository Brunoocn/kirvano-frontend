// import { app } from "remoteTodos/todos-app";
import { MicrofrontendWrapper } from "../../components/microfrontendWrapper";
import { useMicrofrontend } from "../../hooks/useMicrofrontend";
import { MICROFRONTEND_IDS } from "../../constants/microfrontend";

export function TodosPage() {
  useMicrofrontend({
    appId: MICROFRONTEND_IDS.TODOS,
    appLoader: () => console.log('Todo app loader'),
  });

  return (
    <MicrofrontendWrapper>
      <div id={MICROFRONTEND_IDS.TODOS}></div>
    </MicrofrontendWrapper>
  );
}
