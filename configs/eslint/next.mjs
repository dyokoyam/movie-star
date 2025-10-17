import base from "./base.mjs";
import nextPlugin from "eslint-config-next";

/** @type {import("eslint").Linter.FlatConfig[]} */
export default [
  ...base,
  ...nextPlugin(),
];
