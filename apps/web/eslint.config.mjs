import sharedConfig from "../../eslint.next.mjs";

export default [
  ...sharedConfig,
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
    ],
  },
];
