/// <reference types="vite/client" />

declare const DEV_MODE: boolean;

declare module "*.vue" {
  import { Component } from "vue";

  export default {} as Component;
}
