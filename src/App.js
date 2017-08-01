const path = require('path')
const fs = require('fs')
const mkdirp = require('mkdirp');
const colors = require('colors');

exports.App = class App {

  createDependencies(file, destination) {
    const dependencies = file.children
    // const newPath = destination + '/' + file.dirName

    dependencies.forEach(file => this.createFile(file, destination))
  }

  createFile(file, destination, createDependencies = true) {
    if (file.created) return

    destination = destination + '/' + file.dirName

    const filePath = destination + '/' + file.name + '.' + file.extension

    mkdirp(destination, (err) => {
      if (err) throw err
      file.updated = false
      file.created = false
      if (fs.existsSync(filePath)) {
        fs.readFile(filePath, 'utf8', (err, data) => {
          file.template = data
          file.path = destination
          file.updated = true
         if (createDependencies) this.createDependencies(file, destination)
        })
      } else {

        fs.writeFile(filePath, file.render(), (err) => {
          if (err) throw err

          console.log(`${colors.underline(file.name)} ${colors.green('saved')} into ${colors.italic(destination)}`)

          file.path = destination
          file.created = true
         if (createDependencies) this.createDependencies(file, destination)

        })
      }
    })


  }

  renderFile(file) {
    if (file.writted) return

    fs.writeFile(file.path + '/' + file.name + '.' + file.extension, file.render(), (err) => {
      if (err) throw err

      console.log(`Template ${colors.green('rendered')} into ${colors.underline(file.name)}`)

      file.writted = true
      file.children.forEach(file => this.renderFile(file))
    })
  }

  create(destination = '', root) {
    this.createFile(root, destination)
  }

  addWatchers() {

  }

  update() {

  }
}
