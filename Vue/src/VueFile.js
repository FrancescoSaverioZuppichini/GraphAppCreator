const path = require('path')
const {
  File,
  filePathFinder
} = require('graph2app-core')

const vueComponent = `<template>
  <div class="<NAME_TO_CLASS>"><NAME></div>
</template>

<script>
  export default {
    name: '<NAME>',
    props: {},
    data () {
      return {}
    },
    computed: {},
    methods: {},
    components: {}
  }
</script>

<style scoped>
  .<NAME_TO_CLASS> {
    color: <COLOR>;
  }
</style>
`

exports.VueFile = class VueFile extends File {

  constructor (path = '', name = '', id = name) {
    super(path, name, id)
    this.extension = 'vue'
    this.template = vueComponent
    this.type = 'VUE'
  }

  get randomHex () {
    return `#${Math.floor(Math.random()*16777215).toString(16)}`
  }

  normalize (importPath) {
    // add '.' in front of lonely path '/example/'
    // so Vue knows the are in the same folder
    if (path.parse(importPath).root === '/') {
      return `.${importPath}`
    }
    return importPath
  }

  update (text) {
    const imports = this.dependencies.map((dep) => {
      const findPath = filePathFinder.findPathFromFile(this, '', dep)
      const pathNormalized = `${this.normalize(path.normalize(findPath))}`
      const importText = `import ${dep.name} from '${pathNormalized}'`
      const regexImport = `import[\\s]*${dep.name}.*`
      const matches = text.match(new RegExp(regexImport, 'g'))
      // replace if match
      if (matches !== null) {
        text = text.replace(matches[0], importText)
      } else {
        return importText + '\n  '
      }
    })

    if (!this.updated) {
      if (imports.length) text = text.replace(/<script>/gm, `<script>\n  ${imports.join('')}`)
    } else {
      if (imports.length) text = text.replace(/<script>/gm, `<script>  ${imports.join('')}`)
    }

    if (this.dependencies.length) {
      text = text.replace(/components[\s]*:[\s]*{[\s]*[^\}]*[\s]*[^\}]*}/gm, `components: {\n      ${this.dependencies.map(dep => dep.name).join(',\n      ')}\n    }`)
    }
    const nameToClass = this.name.replace(/\.?([A-Z])/g, (x,y) => `_${y.toLowerCase()}`).replace(/^_/, '')
    text = text.replace(/<NAME>/g, this.name)
               .replace(/<NAME_TO_CLASS>/g, nameToClass)
               .replace(/<COLOR>/g, this.randomHex)
    return text
  }

  render (file, text) {
    return this.update(this.template)
  }
}
