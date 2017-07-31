exports.vueTemplate = function (file) {
  const imports = file.dependencies.map(dep => `import ${dep.name} from .${path.normalize(file.findPathFromFile(file,"",dep)+ '/' + dep.name +'.' + dep.extension)}\n`).join('')

  return `<template>

</template>

<script>
${imports}
export default {
    name: '${file.name}',
    data: function() {	
        return {}
    },
    methods: {}
}
</script>

<style scoped>

</style>`
}
