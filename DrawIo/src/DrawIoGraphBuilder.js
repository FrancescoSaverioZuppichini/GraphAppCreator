const fs = require('fs')
const { GraphBuilder } = require('graph2app-core')
const parseString = require('xml2js').parseString
// const {Resource} = require('resouce-class')

exports.DrawIoGraphBuilder = class DrawIoGraphBuilder extends GraphBuilder {

  createNodes(rawNodes, File) {
    return rawNodes.map(rawNode => new File({
      name: rawNode.$.value,
      id: rawNode.$.id
    }))
  }

  createCache(files) {
    const cache = {}
    files.forEach(file => cache[file.id] = file)
    return cache
  }

  linkChildren(edges, files, cache) {
    edges.forEach((edge) => {
      var target = cache[edge.$.target]
      var source = cache[edge.$.source]
      if (target.children.indexOf(source) < 0) {
        target.children.push(source)
      }
      source.parent = target
    })
  }

  linkDependencies(edges, files, cache) {
    edges.forEach((edge) => {
      var target = cache[edge.$.target]
      var source = cache[edge.$.source]
      if (source.dependencies.indexOf(target) < 0) {
        source.dependencies.push(target)
      }
    })
  }

  build(pathToDrawIoXML, File, cb) {

    fs.readFile(pathToDrawIoXML, (err, data) => {
      if (err) throw err

      parseString(data, (err, result) => {
        if (err) throw err
        const cells = result.mxGraphModel.root[0].mxCell
        // fetch the data we need from the graph
        const edges = cells.filter(cell => cell.$.edge && cell.$.value !== 'Use')
        const dependenciesEdges = cells.filter(cell => cell.$.value === 'Use')
        const nodes = cells.filter(cell => cell.$.value && cell.$.value !== 'Use')
        // create the correct files from the passed File isntance
        const files = this.createNodes(nodes, File)
        // cache is used to fast access the stored files
        const cache = this.createCache(files)

        this.linkChildren(edges, files, cache)
        this.linkDependencies(dependenciesEdges, files, cache)

        const graphRoot = cache[nodes[0].$.id]
        // pass root to call back
        cb(graphRoot)
      })
    })
  }
}
