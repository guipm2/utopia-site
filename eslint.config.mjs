import tseslint from "typescript-eslint";

export default tseslint.config(
  // Ignora arquivos gerados e dependências
  {
    ignores: [
      ".next/**/*",
      "node_modules/**/*",
      "out/**/*",
      "build/**/*",
      "dist/**/*",
      "*.config.js",
      "*.config.mjs",
    ],
  },
  
  // Configuração base do TypeScript ESLint
  ...tseslint.configs.recommended,
  
  {
    // Define os arquivos para os quais estas regras se aplicam
    files: ["**/*.{js,mjs,cjs,jsx,ts,tsx}"],
    
    // Configuração do parser e opções
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    
    // Regras personalizadas
    rules: {
      // Desativa algumas regras que podem ser muito rigorosas
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unused-vars": ["warn", { 
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_" 
      }],
      "@typescript-eslint/no-empty-object-type": "off",
      "@typescript-eslint/no-unused-expressions": "off",
      "@typescript-eslint/triple-slash-reference": "off",
      "@typescript-eslint/no-require-imports": "off",
      "@typescript-eslint/ban-ts-comment": "off",
      "@typescript-eslint/no-wrapper-object-types": "off",
      "@typescript-eslint/no-unsafe-function-type": "off",
      "@typescript-eslint/no-this-alias": "off",
    },

    settings: {
      react: {
        version: "detect",
      },
    },
  }
);