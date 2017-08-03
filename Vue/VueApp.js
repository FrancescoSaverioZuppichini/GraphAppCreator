const { App } = require('../src/index.js')

const path = require('path')

exports.VueApp = class VueApp extends App {
  create(destination = '', root) {

    root.dirName = ''

    this.createPath(root, destination,false)

    
    root.children.forEach(child => {
      child.dirName = '/components/' + child.name
      this.createPath(child,destination)
    })
    

    this.createFile(root, destination)
    

  }
}
