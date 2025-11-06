import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';

export default {
  input: 'index.js',
  output: {
    file: 'dist/maplibre-gl-compare-plus.min.js',
    format: 'umd',
    name: 'MapLibreGLComparePlus',
    exports: 'named',
    globals: {}
  },
  plugins: [
    nodeResolve({
      preferBuiltins: false
    }),
    commonjs(),
    terser({
      compress: {
        drop_console: false
      }
    })
  ]
};

