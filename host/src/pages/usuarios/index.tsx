// import { app } from "auth/users-app";
import { MicrofrontendWrapper } from "../../components/microfrontendWrapper";
import { useMicrofrontend } from "../../hooks/useMicrofrontend";
import { MICROFRONTEND_IDS } from "../../constants/microfrontend";

export function UsuariosPage() {
  useMicrofrontend({
    appId: MICROFRONTEND_IDS.USERS,
    appLoader: () => console.log('Users app loader'),
  });

  return (
    <MicrofrontendWrapper>
      <div id={MICROFRONTEND_IDS.USERS}></div>
    </MicrofrontendWrapper>
  );
}