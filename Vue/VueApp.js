const {
  App
} = require('../src/index.js')

const path = require('path')

exports.VueApp = class VueApp extends App {
  create(destination = '', root) {
    root.dirName = ''
    this.createFile(root, destination, false)

    root.children.forEach(child => {
      child.dirName = '/components/' + child.name
      this.createFile(child, path.normalize(destination))
    })

    setTimeout(() => this.renderFile(root),1000)
  }
}
