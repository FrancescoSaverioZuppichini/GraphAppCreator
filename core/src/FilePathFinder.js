/**
 * This class provide a way to find the path from
 * one file to another
 */
class FilePathFinder {
  findPathFromFile (start, path, toFind) {
    var Q = []
    return this.findFileFromNodeInner(start, path, toFind, false, Q)
  }

  findFileFromNodeInner (start, path, toFind, wentDown, Q) {

    if (Q.indexOf(start) >= 0) return false

    if (!start) return false

    if (start.id == toFind.id) return path

    Q.push(start)

    if (wentDown) return this.searchInChildren(start, path, toFind, Q)

    return this.searchInChildren(start, path, toFind, Q) || this.searchInParent(start, path, toFind, Q)
  }

  searchInParent (start, path, toFind, Q) {
    return this.findFileFromNodeInner(start.parent, '../' + path, toFind, false, Q)
  }

  searchInChildren (start, path, toFind, Q) {
    for (let dep of start.children) {
      var realPath = this.findFileFromNodeInner(dep, `${path}/${dep.dirName}`, toFind, true, Q)
      if (realPath != false) return realPath
    }
    return false
  }
}

exports.filePathFinder = new FilePathFinder()
