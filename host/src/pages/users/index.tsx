import { MicrofrontendWrapper } from "../../components/microfrontendWrapper";
import { useMicrofrontend } from "../../hooks/useMicrofrontend";
import { MICROFRONTEND_IDS } from "../../constants/microfrontend";

export function UsersPage() {
  useMicrofrontend({
    appId: MICROFRONTEND_IDS.USERS,
    appLoader: async (id: string) => {
      try {
        const module = await import("remoteUsers/users-app");
        const app = module.app;
        
        if (typeof app === 'function') {
          app(id);
        }
      } catch (error) {
         console.log(error, 'error loading users microfrontend');
      }
    },
  });

  return (
    <MicrofrontendWrapper>
      <div id={MICROFRONTEND_IDS.USERS}></div>
    </MicrofrontendWrapper>
  );
}