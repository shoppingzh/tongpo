import { readdirSync } from 'fs'

export function getLibInputs() {
  return readdirSync('./src', {
    withFileTypes: true
  }).reduce((conf, file) => {
    if (file.isDirectory()) return conf
    const filename = file.name
    if (filename === 'index.js') return conf
    conf.push(`src/${file.name}`)
    return conf
  }, [])
}
