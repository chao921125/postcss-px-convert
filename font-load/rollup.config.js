import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import { babel } from '@rollup/plugin-babel';
import { terser } from 'rollup-plugin-terser';
import dts from 'rollup-plugin-dts';
import pkg from './package.json' assert { type: 'json' };

const extensions = ['.js', '.jsx', '.ts', '.tsx'];
const external = ['react', 'vue'];

export default [
  // 普通打包
  {
    input: 'src/index.ts',
    output: [
      {
        file: pkg.main,
        format: 'cjs',
        sourcemap: true,
      },
      {
        file: pkg.module,
        format: 'esm',
        sourcemap: true,
      },
      {
        file: 'dist/index.umd.js',
        format: 'umd',
        name: 'FontLoadChecker',
        globals: {
          react: 'React',
          vue: 'Vue'
        },
        sourcemap: true,
      },
    ],
    plugins: [
      resolve({ extensions }),
      commonjs(),
      typescript({ tsconfig: './tsconfig.json' }),
      babel({
        extensions,
        babelHelpers: 'bundled',
        exclude: 'node_modules/**',
      }),
      terser(),
    ],
    external,
  },
  // 类型声明文件打包
  {
    input: 'src/index.ts',
    output: [{ file: pkg.types, format: 'es' }],
    plugins: [dts()],
  },
];