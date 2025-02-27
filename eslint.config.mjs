import globals from "globals";
import tseslint from "typescript-eslint";

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ["**/*.{js,mjs,cjs,ts}"] },
  { languageOptions: { globals: globals.browser } },
  ...tseslint.configs.recommended,
  {
    rules: {
      // TS2564 관련 규칙 비활성화
      "@typescript-eslint/no-unnecessary-condition": "off", // 조건부 검사에서 불필요한 타입 검사 무시
      "@typescript-eslint/no-unsafe-argument": "off", // unsafe argument 관련 경고 무시
      "@typescript-eslint/explicit-module-boundary-types": "off", // 함수 반환 타입 명시를 강제하지 않음
      "@typescript-eslint/no-extraneous-class": "off", // 클래스를 불필요하게 사용하지 않도록 하는 규칙 비활성화
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { args: "all", argsIgnorePattern: "^_" },
      ], // 사용되지 않는 인자 경고
    },
  },
];
