/// <reference types="vite/client" />

declare module "remoteTodos/todos-app" {
  export const app: (containerId: string) => void;
}

declare module "remoteUsers/users-app" {
  export const app: (containerId: string) => void;
}

import type { ComponentType } from "react";

declare module "auth/*" {
  const component: ComponentType;
  export default component;
}

