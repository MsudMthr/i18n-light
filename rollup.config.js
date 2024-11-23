import typescript from 'rollup-plugin-typescript2';
import packageJson from './package.json';

export default {
    input: 'src/index.ts',
    output: [
        {
            file: 'dist/index.cjs.js',
            format: 'cjs',
            sourcemap: true,
            exports: 'auto'
        },
        {
            file: 'dist/index.esm.js',
            format: 'esm',
            sourcemap: true
        }
    ],
    external: [
        ...Object.keys(packageJson.dependencies || {}),
    ],
    plugins: [
        typescript({
            tsconfig: './tsconfig.json',
            sourcemap: true,
            clean: true
        })
    ],
    preserveSymlinks: true
};
