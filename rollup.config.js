import { readFileSync } from "fs";
import { defineConfig } from "rollup";
import { dts } from "rollup-plugin-dts";
import resolve from "@rollup/plugin-node-resolve";
import terser from "@rollup/plugin-terser";
import typescript from "@rollup/plugin-typescript";
import peerDepsExternal from "rollup-plugin-peer-deps-external";

export default defineConfig([
  {
    input: "./src/index.ts",
    output: [
      {
        file: JSON.parse(readFileSync("./package.json")).main,
        format: "es",
        exports: "named",
        sourcemap: false,
      },
    ],
    plugins: [
      peerDepsExternal(),
      resolve(),
      terser(),
      typescript({
        tsconfig: "./tsconfig.json",
        sourceMap: false,
      }),
    ],
  },
  {
    input: "./src/index.ts",
    output: [
      {
        file: JSON.parse(readFileSync("./package.json")).types,
        format: "es",
      },
    ],
    plugins: [dts()],
  },
]);
