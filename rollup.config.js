const babel = require('@rollup/plugin-babel');
const resolve = require('@rollup/plugin-node-resolve');
const commonjs = require('@rollup/plugin-commonjs');
const terser = require('@rollup/plugin-terser');
const postcss = require('rollup-plugin-postcss');
const peerDepsExternal = require('rollup-plugin-peer-deps-external');
const pkg = require('./package.json');

module.exports = {
  input: 'src/index.js',
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
    }
  ],
  plugins: [
    peerDepsExternal(),
    resolve({
      extensions: ['.js', '.jsx']
    }),
    commonjs(),
    babel({
      babelHelpers: 'bundled',
      exclude: 'node_modules/**',
      presets: ['@babel/preset-env', '@babel/preset-react'],
      extensions: ['.js', '.jsx']
    }),
    postcss({
      extract: true,
      modules: false,
      minimize: true,
      inject: false
    }),
    terser()
  ],
  external: Object.keys(pkg.peerDependencies || {})
};