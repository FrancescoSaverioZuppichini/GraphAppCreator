const path = require('path')

/**
 * The File class abstract a file adding
 * new fields in order to be identified as 
 * a node in the app's graph
 */
exports.File = class File {

  constructor({ path = '', name = '', id = name }) {
    this.id = id
    this.type = 'TEXT'
    this.extension = 'txt'
    // total path from the root folder
    this.path = path
    this.name = name
    // name of the first-up directory, by default
    // is the File's name itself
    this.dirName = name
    // string to be rendered into the file
    this.template = 'Hello World!'
    // life-cycle flags
    this.created = false
    this.writted = false
    this.update = false
    // files to be imported
    this.dependencies = []
    // graph logic 
    this.children = []
    this.parent = null
  }

  createTemplate() {
    const imports = this.dependencies.map(dep => `import ${dep.name} from .${this.findPathFromFile(this,"",dep)+ '/' + dep.name +'.' + dep.extension}\n`)

    return imports.join('') + this.template
  }

  findPathFromFile(start, path, toFind) {
    var Q = []
    return this.findFileFromNodeInner(start, path, toFind, false, Q)

  }

  findFileFromNodeInner(start, path, toFind, wentDown, Q) {

    if (Q.indexOf(start) >= 0) return false

    if (!start) return false

    if (start.id == toFind.id) return path

    Q.push(start)

    if (wentDown) return this.searchInChildren(start, path, toFind, Q)

    return this.searchInChildren(start, path, toFind, Q) || this.searchInParent(start, path, toFind, Q)
  }

  searchInParent(start, path, toFind, Q) {
    return this.findFileFromNodeInner(start.parent, "../" + path, toFind, false, Q)
  }

  searchInChildren(start, path, toFind, Q) {
    for (let dep of start.children) {
      var realPath = this.findFileFromNodeInner(dep, path + '/' + dep.dirName, toFind, true, Q)
      if (realPath != false) return realPath
    }
    return false
  }

  render() {
    return this.createTemplate()
  }

}
