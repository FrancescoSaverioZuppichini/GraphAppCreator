const path = require('path')

exports.File = class File {

  constructor({path = '', name = '', id = name}) {
    this.id = id
    this.type = 'TEXT'
    this.extension = 'txt'
    this.dependencies = []
    this.path = path
    this.name = name
    this.dirName = name
    this.template = 'Hello World!'
    this.created = false
    // going to be overrided based on its position in the graph
    this.absolutePath = this.getFullPath()
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

  getFullPath() {
    return path.normalize(this.path + this.name + '.' + this.extension)
  }
}
