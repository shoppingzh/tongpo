import babel from '@rollup/plugin-babel'
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
    })
  ],
  external: [/node_modules/]
}
