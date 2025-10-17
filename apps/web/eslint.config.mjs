import nextConfig from "../../configs/eslint/next.mjs";

export default [
  ...nextConfig,
  {
    ignores: ["node_modules/**", ".next/**", "out/**", "build/**", "next-env.d.ts"],
  },
];
