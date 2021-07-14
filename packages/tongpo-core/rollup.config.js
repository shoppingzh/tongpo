// import resolve from '@rollup/plugin-node-resolve'
// import commonjs from '@rollup/plugin-commonjs'
import babel from '@rollup/plugin-babel'
import { readdirSync } from 'fs'
import pkg from './package.json'

// const name = pkg.name

const libs = readdirSync('./src', {
  withFileTypes: true
}).reduce((conf, file) => {
  if (file.isDirectory()) return conf
  const filename = file.name
  if (filename === 'index.js') return conf
  conf.push(`src/${file.name}`)
  return conf
}, [])

const baseConfig = {
  external: [/node_modules/],
  plugins: [
    babel({
      exclude: 'node_modules/**',
      babelHelpers: 'runtime'
    })
  ]
}


module.exports = [{
  ...baseConfig,
  input: libs,
  output: {
    dir: 'lib',
    format: 'es'
  }
}]
