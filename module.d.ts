declare const DEV_MODE: boolean;
declare const NUMBER_OF_MANIFEST_ASSETS: number;

declare module "*.css" {
  export default {} as Record<string, string>;
}

declare module "*.svg" {
  import { FunctionComponent, SVGAttributes } from "react";

  export default {} as FunctionComponent<SVGAttributes<SVGElement>>;
}

declare module "eslint-plugin-import" {
  import type { Linter } from "eslint";

  export default {} as {
    configs: {
      recommended: Linter.BaseConfig;
      typescript: Linter.BaseConfig;
    };
  };
}
