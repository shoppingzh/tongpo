import babel from '@rollup/plugin-babel'
import { terser } from 'rollup-plugin-terser'
import { getLibInputs } from './util'

module.exports = {
  input: getLibInputs(),
  output: {
    dir: 'lib',
    format: 'es'
  },
  watch: {
    include: 'src/**'
  },
  plugins: [
    babel({
      exclude: 'node_modules/**',
      babelHelpers: 'runtime'
    }),
    terser()
  ],
  external: [
    /^@babel\/runtime/,
    'lodash',
    'moment',
    '@amap/amap-jsapi-loader',
    '@stomp/stompjs',
    /^sockjs-client/
  ]
}
