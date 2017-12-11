const path = require('path')
const { filePathFinder } = require('./FilePathFinder.js')
/**
 * The File class abstract a file adding
 * new fields in order to be identified as
 * a node in the app's graph
 */
exports.File = class File {

  constructor ({ path = '', name = '', id = name }) {
    this.id = id
    this.type = 'TEXT'
    this.extension = 'txt'
    // total path from the root folder
    this.path = path
    this.name = name
    // name of the first-up directory, by default
    // is the file's name itself
    this.dirName = name
    // string to be rendered into the file
    this.template = 'Hello World!'
    // life-cycle flags
    this.created = false
    this.writted = false
    this.updated = false
    // files to be imported
    this.dependencies = []
    // graph logic
    this.children = []
    this.parent = null
  }

  createTemplate () {
    const imports = this.dependencies.map(dep => `import ${dep.name} from .${filePathFinder.filePathFinder(this, '', dep) + '/' + dep.name + '.' + dep.extension}\n`)
    return imports.join('') + this.template
  }

  render () {
    return this.createTemplate()
  }
}
