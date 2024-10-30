import globals from "globals";
//import pluginJs from "@eslint/js";
import * as js from "@eslint/js"; 
import pluginReact from "eslint-plugin-react";


export default [
  {files: ["**/*.{js,mjs,cjs,jsx}"]},
  {languageOptions: { globals: {
    ...globals.browser,  // 브라우저 전역 객체(localStorage 등) 인식
    ...globals.es2021,   // 최신 JavaScript 기능 포함
    localStorage: "readonly", 
  }, 
  parserOptions: {
    ecmaFeatures: {
      jsx: true,  // JSX 사용 활성화
    },
  },},
  settings: {
    react: {
      version: "detect", 
      pragma: "React", // React 버전을 자동으로 감지하도록 설정
    },
  },
  rules: {
    "react/react-in-jsx-scope": "off",  // JSX에서 React import 강제 사용 해제
    "no-undef": "error",  // 정의되지 않은 변수 사용 금지
  },},
  js.configs.recommended,
  react.configs.flat.recommended,
  //pluginJs.configs.recommended,
  //pluginReact.configs.flat.recommended,
];