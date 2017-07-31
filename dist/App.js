const path = require('path')
const fs = require('fs')
const mkdirp = require('mkdirp');

exports.App = class App {

  createDependencies(file, destination) {
    const dependencies = file.children
    const newPath = destination + '/' + file.name
    console.log(newPath)
    dependencies.forEach(file => this.createFile(file, destination))
  }

  createFile(file, destination) {
    if (file.created) return
    
    destination = destination + '/' + file.name
    const filePath = destination + '/' + file.name + '.' + file.extension
    const dirName = path.dirname(destination)

    mkdirp(destination, (err) => {
      if (err) throw err

      fs.writeFile(filePath, file.render(), (err) => {
        if (err) throw err;
        console.log(`${file.name} saved into ${destination}`);
        file.path = destination
      })

      file.created = true

      this.createDependencies(file, destination)

    })


  }

  renderFile(file){
    if(file.writted) return

    fs.writeFile(file.path + '/' + file.name + '.' + file.extension, file.render(), (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
         file.writted = true
         file.children.forEach(file => this.renderFile(file))
      })
  }

  create(destination = '', root) {
    this.createFile(root, destination)
    setTimeout(()=>{
          this.renderFile(root)

    },1000)
  }

  addWatchers() {

  }

  update() {

  }
}
