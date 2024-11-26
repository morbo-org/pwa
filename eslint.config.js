/**
 * Copyright (C) 2024 Pavel Sobolev
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

import eslint from "@eslint/js";
import pluginStylistic from "@stylistic/eslint-plugin";
import pluginImportX from "eslint-plugin-import-x";
import pluginVue from "eslint-plugin-vue";
import pluginTypeScript from "typescript-eslint";
import parserVue from "vue-eslint-parser";

const extraFileExtensions = [".vue"];
export default [
  eslint.configs.recommended,
  pluginStylistic.configs.customize({
    braceStyle: "1tbs",
    quotes: "double",
    semi: true,
  }),
  pluginImportX.flatConfigs.recommended,
  pluginImportX.flatConfigs.typescript,
  ...pluginVue.configs["flat/recommended"],
  ...pluginTypeScript.configs.strictTypeChecked,
  {
    rules: {
      "max-len": ["error", { code: 120 }],
      "sort-imports": ["error", { ignoreDeclarationSort: true }],
      "@typescript-eslint/no-non-null-assertion": "off",
      "@typescript-eslint/no-unused-expressions": ["error", {
        allowShortCircuit: true,
      }],
      "@typescript-eslint/restrict-template-expressions": ["error", {
        allowBoolean: true,
      }],
      "import-x/newline-after-import": "error",
      "import-x/no-named-as-default-member": "off",
      "import-x/order": [
        "error", {
          "alphabetize": {
            order: "asc",
            caseInsensitive: true,
          },
          "newlines-between": "always",
          "pathGroups": [
            {
              pattern: "@/components/*",
              group: "internal",
              position: "before",
            },
            {
              pattern: "@/components/buttons/*",
              group: "internal",
              position: "before",
            },
            {
              pattern: "@/components/icons/*",
              group: "internal",
              position: "before",
            },
          ],
        },
      ],
      "object-curly-newline": ["error", { multiline: true, consistent: true }],
      "object-property-newline": ["error", { allowAllPropertiesOnSameLine: true }],
      "vue/max-attributes-per-line": "off",
      "vue/multi-word-component-names": "off",
      "vue/singleline-html-element-content-newline": "off",
    },
  },
  {
    files: ["**/*.js"],
    ...pluginTypeScript.configs.disableTypeChecked,
  },
  {
    files: ["**/*.ts"],
    languageOptions: {
      parser: pluginTypeScript.parser,
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
        extraFileExtensions,
      },
    },
  },
  {
    files: ["**/*.vue"],
    languageOptions: {
      parser: parserVue,
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
        parser: pluginTypeScript.parser,
        extraFileExtensions,
      },
    },
  },
];
