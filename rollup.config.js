import { name, version, dependencies } from './package.json';
import { DEFAULT_EXTENSIONS } from '@babel/core';
import builtins from 'builtin-modules';

// import alias from 'rollup-plugin-alias';
import json from 'rollup-plugin-json';
import resolve from 'rollup-plugin-node-resolve';
import typescript2 from 'rollup-plugin-typescript2';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import filesize from 'rollup-plugin-filesize';

const banner = `/* ${name} version is ${version} */`;
const footer = '/* email: kimimi_king@163.com */';

const env = process.env.NODE_ENV;
const isProduction = env === 'production';

export default async () => ({
  input: 'src/index.ts',
  output: {
    file: 'lib/index.js',
    name,
    banner,
    footer,
    sourcemap: false,
    format: 'cjs',
  },
  external: Object.keys(dependencies).concat(builtins),
  plugins: [
    // alias({
    //   resolve: ['.ts', '.js'],
    //   entries: [{ find: 'xxx', replacement: '../../xxx' }],
    // }),
    json(),
    resolve({ preferBuiltins: true }),
    typescript2({ tsconfig: './tsconfig.json' }),
    commonjs({ include: '**/node_modules/**', extensions: ['.js', '.ts'] }),
    babel({
      exclude: '**/node_modules/**',
      extensions: [...DEFAULT_EXTENSIONS, '.ts'],
    }),
    filesize(),
    isProduction && (await import('rollup-plugin-terser')).terser(),
  ],
});
