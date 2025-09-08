// import { app } from "remoteTodos/todos-app";
import { MicrofrontendWrapper } from "../../components/microfrontendWrapper";
import { useMicrofrontend } from "../../hooks/useMicrofrontend";
import { MICROFRONTEND_IDS } from "../../constants/microfrontend";

export function TodosPage() {
  useMicrofrontend({
    appId: MICROFRONTEND_IDS.TODOS,
    appLoader: () => console.log('Todo app loader'),
  });

  console.log(MICROFRONTEND_IDS.TODOS, 'MICROFRONTEND_IDS.TODOS');
  return (
    <MicrofrontendWrapper>
      <div id={MICROFRONTEND_IDS.TODOS}></div>
    </MicrofrontendWrapper>
  );
}
