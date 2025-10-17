import type { Config } from "tailwindcss";

const config: Config = {
  content: ["../../apps/web/app/**/*.{ts,tsx}", "../../apps/web/src/**/*.{ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};

export default config;
