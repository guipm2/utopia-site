import { defineConfig } from "eslint/config";
import nextPlugin from "@next/eslint-plugin-next";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig([
  // Objeto de configuração para o Next.js
  {
    // Define os arquivos para os quais estas regras se aplicam
    files: ["**/*.{js,jsx,ts,tsx}"],
    
    // Adiciona o plugin do Next.js
    plugins: {
      "@next/next": nextPlugin,
    },
    
    // Aplica as regras 'recommended' e 'core-web-vitals'
    rules: {
      // Regras recomendadas do Next.js
      ...nextPlugin.configs["recommended"].rules,
      // Regras 'Core Web Vitals' (inclui muitas regras de React)
      ...nextPlugin.configs["core-web-vitals"].rules,
    },

    // Garante que o ESLint saiba onde encontrar a configuração do Next.js
    settings: {
        'next/core-web-vitals': nextPlugin.configs["core-web-vitals"],
    }
  },

  // Você pode adicionar outras configurações globais aqui, se necessário
]);