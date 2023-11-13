module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "standard-with-typescript",
    "plugin:react/recommended",
    "eslint:recommended",
    "plugin:react/recommended",
    "next/core-web-vitals",
    "plugin:@next/next/recommended",
    "plugin:tailwindcss/recommended",
    "prettier",
  ],
  overrides: [
    {
      env: {
        node: true,
      },
      files: [".eslintrc.{js,cjs}"],
      parserOptions: {
        sourceType: "script",
      },
    },
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react", "simple-import-sort", "tailwindcss", "prettier"],
  rules: {
    "simple-import-sort/imports": "warn",
    "simple-import-sort/exports": "warn",
    "@typescript-eslint/no-unused-vars": "warn",
    "tailwindcss/no-custom-classname": "off",
    "tailwindcss/classnames-order": "off",
    "@typescript-eslint/no-misused-promises": [
      "error",
      {
        checksVoidReturn: false,
      },
    ],
  },
};
