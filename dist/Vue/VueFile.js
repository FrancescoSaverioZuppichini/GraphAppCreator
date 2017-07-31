const {File} = require('../File.js')
const {vueTemplate} = require('./VueTemplate.js')
const path = require('path')

exports.VueFile = class VueFile extends File {

  constructor(path = '', name = '', id = name) {
        super(path , name, id)
        this.extension = 'vue'
        this.type = 'VUE'
    }

    template (file) {
    const imports = this.dependencies.map(dep => `import ${dep.name} from '.${path.normalize(this.findPathFromFile(this,"",dep)+ '/' + dep.name +'.' + dep.extension)}'\n`)


  return `<template>

</template>

<script>
${imports.join('')}
export default {
    name: '${this.name}',
    data: function() {	
        return {}
    },
    methods: {}
}
</script>

<style scoped>

</style>`
}

}