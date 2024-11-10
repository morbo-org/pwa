import eslint from "@eslint/js";
import pluginStylistic from "@stylistic/eslint-plugin";
import pluginImportX from "eslint-plugin-import-x";
import pluginVue from "eslint-plugin-vue";
import pluginTypeScript from "typescript-eslint";
import parserVue from "vue-eslint-parser";

const sources = {
  files: ["**/*.js", "**/*.ts", "**/*.vue"],
  ignores: ["dist/*", "node_modules/*"],
};

export default [
  ...pluginTypeScript.config(
    {
      ...sources,
      extends: [
        eslint.configs.recommended,
        ...pluginTypeScript.configs.strictTypeChecked,
        ...pluginTypeScript.configs.stylisticTypeChecked,
      ],
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
      },
      languageOptions: {
        parser: parserVue,
        parserOptions: {
          parser: pluginTypeScript.parser,
          project: true,
          tsconfigRootDir: import.meta.dirname,
          extraFileExtensions: [".vue"],
        },
      },
    },
    {
      files: ["**/*.js"],
      ...pluginTypeScript.configs.disableTypeChecked,
    },
  ),
  {
    ...sources,
    plugins: {
      "@stylistic": pluginStylistic,
    },
    rules: {
      ...pluginStylistic.configs.customize({
        braceStyle: "1tbs",
        quotes: "double",
        semi: true,
      }).rules,
      "object-curly-newline": ["error", { multiline: true, consistent: true }],
      "object-property-newline": ["error", { allowAllPropertiesOnSameLine: true }],
    },
  },
  {
    ...sources,
    plugins: {
      "import-x": pluginImportX,
    },
    rules: {
      ...pluginImportX.configs.recommended.rules,
      ...pluginImportX.configs.typescript.rules,
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
          ],
        },
      ],
      "import-x/newline-after-import": "error",
    },
    settings: {
      "import-x/resolver": {
        typescript: true,
        node: true,
      },
    },
  },
  ...[
    ...pluginVue.configs["flat/recommended"],
    {
      rules: {
        "vue/max-attributes-per-line": "off",
        "vue/multi-word-component-names": "off",
        "vue/singleline-html-element-content-newline": "off",
      },
    },
  ],
];
