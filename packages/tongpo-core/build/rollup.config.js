import babel from '@rollup/plugin-babel'
import { uglify } from 'rollup-plugin-uglify'
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
    uglify({
      sourcemap: false
    })
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
