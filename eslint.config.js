import eslint from "@eslint/js";
import pluginStylistic from "@stylistic/eslint-plugin";
import pluginImport from "eslint-plugin-import";
import pluginJsxA11y from "eslint-plugin-jsx-a11y";
import pluginReact from "eslint-plugin-react";
import pluginReactHooks from "eslint-plugin-react-hooks";
import pluginTypeScript from "typescript-eslint";

const sources = {
  files: ["**/*.js", "**/*.ts", "**/*.tsx"],
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
        "sort-imports": ["warn", { ignoreDeclarationSort: true }],
        "@typescript-eslint/no-non-null-assertion": "off",
      },
      languageOptions: {
        parserOptions: {
          project: true,
          tsconfigRootDir: import.meta.dirname,
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
      "object-curly-newline": ["warn", { multiline: true, consistent: true }],
      "object-property-newline": ["warn", { allowAllPropertiesOnSameLine: true }],
    },
  },
  {
    ...sources,
    plugins: {
      import: pluginImport,
    },
    rules: {
      ...pluginImport.configs.recommended.rules,
      ...pluginImport.configs.typescript.rules,
      "import/order": [
        "warn", {
          "alphabetize": {
            order: "asc",
            caseInsensitive: true,
          },
          "newlines-between": "always",
        },
      ],
      "import/newline-after-import": "warn",
    },
    settings: {
      "import/resolver": {
        typescript: true,
        node: true,
      },
    },
  },
  {
    files: ["**/*.tsx"],
    plugins: {
      "react": pluginReact,
      "react-hooks": pluginReactHooks,
      "jsx-a11y": pluginJsxA11y,
    },
    rules: {
      ...pluginReact.configs.recommended.rules,
      ...pluginReact.configs["jsx-runtime"].rules,
      ...pluginReactHooks.configs.recommended.rules,
      ...pluginJsxA11y.configs.strict.rules,
    },
    settings: {
      react: { version: "detect" },
    },
  },
];
