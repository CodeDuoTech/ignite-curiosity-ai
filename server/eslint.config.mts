import js from "@eslint/js";
import tseslint from "typescript-eslint";
import globals from "globals";

export default [
  {
    // הגדרות כלליות להתעלמות מקבצים/תיקיות
    ignores: ["dist", "node_modules"],
  },
  // הגדרות עבור קבצי TypeScript
  {
    files: ["**/*.ts", "**/*.tsx", "**/*.mts", "**/*.cts"], // החל הגדרה זו רק על קבצי TypeScript
    languageOptions: {
      parser: tseslint.parser, // השתמש בפרסר של TypeScript
      parserOptions: {
        project: "./tsconfig.json", // ציין את קובץ ה-tsconfig.json
      },
      globals: {
        ...globals.node,
        ...globals.browser,
      },
    },
    plugins: {
      "@typescript-eslint": tseslint.plugin,
    },
    rules: {
      ...js.configs.recommended.rules, // כללי ESLint מומלצים ל-JS
      ...tseslint.configs.recommended[0].rules, // כללי ESLint מומלצים ל-TS
    },
  },
  // הגדרות עבור קבצי JavaScript
  {
    files: ["**/*.js", "**/*.jsx", "**/*.cjs", "**/*.mjs"], // החל הגדרה זו רק על קבצי JavaScript
    languageOptions: {
      // אין צורך בפרסר של TypeScript כאן. ESLint ישתמש בפרסר ברירת המחדל שלו.
      parserOptions: {
        ecmaVersion: 2022, // גרסת ECMAScript - שנה לפי הצורך של הפרויקט שלך (לדוגמה: 2022, 2021, או "latest")
        sourceType: "module", // סוג המודול (module עבור ES Modules, script עבור קבצי סקריפט רגילים)
      },
      globals: {
        ...globals.node,
        ...globals.browser,
      },
    },
    rules: {
      ...js.configs.recommended.rules, // כללי ESLint מומלצים ל-JS
      // הוסף כאן כללים ספציפיים ל-JavaScript אם תרצה
    },
  },
];