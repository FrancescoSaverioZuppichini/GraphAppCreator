const {
  File
} = require('../File.js')
const {
  vueTemplate
} = require('./VueTemplate.js')
const path = require('path')

var vueComponent = `<template>

</template>

<script>
export default {
    name: "",
    components: {
    },
    data: function() {	
        return {}
    },
    methods: {}
}
</script>

<style scoped>

</style>`

exports.VueFile = class VueFile extends File {

  constructor(path = '', name = '', id = name) {
    super(path, name, id)
    this.extension = 'vue'
    this.template = vueComponent
    this.type = 'VUE'
  }

  normalize(importPath) {
    // add '.' in front of lonely path '/example/' 
    // so Vue knows the are in the same folder
    if (path.parse(importPath).root == '/') return '.' + importPath

    return importPath
  }

  update(text) {

    const imports = this.dependencies.map(dep => {
      const pathNormalized = `${this.normalize(path.normalize(this.findPathFromFile(this,"",dep)+ '/' + dep.name +'.' + dep.extension))}`
      const importText = `import ${dep.name} from '${pathNormalized}'`
      const regexImport = `import[\\s]*${dep.name}.*`

      const matches = text.match(new RegExp(regexImport,'g'))
      // replace if match
      if (matches != null) {
        text = text.replace(matches[0], importText)
      } else {
        return importText + '\n'
      }
    })

    text = text.replace(/<script>/gm, `<script>${imports.join('')}`) 
    text = text.replace(/components[\s]*:[\s]*{[\s]*}/gm, `components: {\n\t\t${this.dependencies.map(dep => dep.name).join(',\n\t\t')}\n\t}`)

    return text

  }

  render(file, text) {

    return this.update(this.template)
  }

}
