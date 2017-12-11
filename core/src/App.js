const path = require('path')
const fs = require('fs')
const mkdirp = require('mkdirp')
const colors = require('colors');

exports.App = class App {

  createDependencies (file, destination) {
    const dependencies = file.children
    // const newPath = destination + '/' + file.dirName
    dependencies.forEach(file => this.createPath(file, destination))
  }

  createPath (file, destination, createDependencies = true) {
    if (file.created) return
    destination = `${destination}/${file.dirName}`
    file.path = path.normalize(`${destination}/index.${file.extension}`)
    if (createDependencies) {
      this.createDependencies(file, destination)
    }
  }

  writeFile (file) {}

  createFile (file) {
    if (file.created) return

    mkdirp (path.dirname(file.path), (err) => {
      if (err) throw err

      if (fs.existsSync(file.path)) {

        fs.readFile(file.path, 'utf8', (err, data) => {
          if (err) throw err

          file.template = data
          file.updated = true

          fs.writeFile(file.path, file.render(), (err) => {
            if (err) throw err

            console.log(`${colors.underline(file.name)} ${colors.green('updated')}`)
            file.children.forEach(file => this.createFile(file))
          })
        })
      } else {

        fs.writeFile(file.path, file.render(), (err) => {
          if (err) throw err

          console.log(`${colors.underline(file.name)} ${colors.green('saved')} into ${colors.italic(file.path)}`)
          file.created = true
          file.children.forEach(file => this.createFile(file))
        })
      }
    })
  }

  renderFile (file) {
    if (file.writted) return

    fs.writeFile(`${file.path}/${file.name}/index.${file.extension}`, file.render(), (err) => {
      if (err) throw err

      console.log(`Template ${colors.green('rendered')} into ${colors.underline(file.name)}`)
      file.writted = true
      file.children.forEach(file => this.renderFile(file))
    })
  }

  create (destination = '', root) {
    this.createPath(root, destination)
    this.createFile(root)
  }

  addWatchers() {}

  update() {}
}
