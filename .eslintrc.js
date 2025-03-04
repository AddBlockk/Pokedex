import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import eslintPluginPrettier from "eslint-plugin-prettier";
import simpleImportSort from "eslint-plugin-simple-import-sort";

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  { files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"] },
  { languageOptions: { globals: globals.browser } },

  eslintPluginPrettier, // Подключаем Prettier
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,

  {
    plugins: {
      "@typescript-eslint": tseslint.plugin,
      react: pluginReact,
      prettier: eslintPluginPrettier,
      "simple-import-sort": simpleImportSort,
    },
    rules: {
      "react/prop-types": "off",
      "react/react-in-jsx-scope": "off",
      "@typescript-eslint/no-shadow": "off",
      "@typescript-eslint/no-unused-vars": "warn",
      "consistent-return": "off",
      "react/function-component-definition": [
        "error",
        { namedComponents: "arrow-function", unnamedComponents: "arrow-function" },
      ],
      "import/prefer-default-export": "off",
      "react/jsx-props-no-spreading": "off",
      "react/require-default-props": "off",
      "react/button-has-type": "off",
      "react/no-unstable-nested-components": ["error", { allowAsProps: true }],
      "react/no-array-index-key": "off",
      "class-methods-use-this": "off",
      "no-param-reassign": "off",

      // ✅ Сортировка импортов
      "import/order": "off",
      "simple-import-sort/exports": "warn",
      "simple-import-sort/imports": [
        "warn",
        {
          groups: [
            ["^"], // Внешние пакеты
            ["^@"], // Внутренние пакеты
            ["^\\u0000"], // Импорты с побочными эффектами
            ["^\\.\\.(?!/?$)", "^\\.\\./?$"], // Родительские импорты
            ["^\\./(?=.*/)(?!/?$)", "^\\.(?!/?$)", "^\\./?$"], // Относительные импорты
            ["^.+\\.s?css$"], // Импорты стилей
          ],
        },
      ],
    },
  },
];
