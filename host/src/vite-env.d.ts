/// <reference types="vite/client" />

import type { ComponentType } from "react";

declare module "auth/*" {
  const component: ComponentType;
  export default component;
}