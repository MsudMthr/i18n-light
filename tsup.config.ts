import { defineConfig } from "tsup";

export default defineConfig({
    entry: ["./src/index.ts"],
    format: ["cjs", "esm"],
    dts: true,
    shims: true,
    clean: true,
    outDir: "dist",
    target: "es2015",
    skipNodeModulesBundle: true,
    splitting: false,
});
