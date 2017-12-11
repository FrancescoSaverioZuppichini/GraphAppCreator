const path = require('path')
const { App } = require('graph2app-core')

exports.VueApp = class VueApp extends App {
  create(destination = '', root) {
    root.dirName = ''
    this.createPath(root, destination, false)
    root.children.forEach((child) => {
      // first level must be in the components folder
      child.dirName = '/components/' + child.name
      this.createPath(child, destination)
    })
    this.createFile(root, destination)
  }
}
