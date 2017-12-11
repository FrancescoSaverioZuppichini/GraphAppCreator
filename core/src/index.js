const { App } = require('./App.js')
const { File } = require('./File.js')
const { GraphBuilder } =  require('./GraphBuilder.js')
const { filePathFinder } =  require('./FilePathFinder.js')

const program = require('commander')
program
  .version('0.0.1')
  .option('-d, --dist <n>', 'Output destination')

module.exports = {
  App,
  File,
  GraphBuilder,
  filePathFinder,
  program
}
