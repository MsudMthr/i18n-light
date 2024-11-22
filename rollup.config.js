import typescript from 'rollup-plugin-typescript2';

export default {
    input: 'src/index.ts', // Entry file
    output: [
        {
            file: 'dist/index.cjs.js', // CommonJS output
            format: 'cjs',
            sourcemap: true, // Enable source maps
        },
        {
            file: 'dist/index.esm.js', // ES module output
            format: 'esm',
            sourcemap: true, // Enable source maps
        },
    ],
    plugins: [
        typescript({
            tsconfig: './tsconfig.json', // Path to tsconfig.json
            sourcemap: true, // Enable source maps for TypeScript files
            clean: true, // Clean output folder before writing new files
        }),
    ],
};
