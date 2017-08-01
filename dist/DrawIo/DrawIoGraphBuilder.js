const {
  GraphBuilder
} = require('../GraphBuilder.js')
const parseString = require('xml2js').parseString
// const {Resource} = require('resouce-class')
const fs = require('fs')

exports.DrawIoGraphBuilder = class DrawIoGraphBuilder extends GraphBuilder {

  createNodes(rawNodes, File) {

    return rawNodes.map(rawNode => new File({
      name: rawNode.$.value,
      id: rawNode.$.id
    }))

  }

  createCache(files) {
    var cache = {}
    
    files.forEach(file => cache[file.id] = file)

    return cache
  }

  linkChildren(edges, files, cache) {
    edges.forEach(edge => {
      cache[edge.$.target].children.push(cache[edge.$.source])
      cache[edge.$.source].parent = cache[edge.$.target]
    })
  }

  linkDependencies(edges, files, cache) {
    edges.forEach(edge => {
      cache[edge.$.target].dependencies.push(cache[edge.$.source])
    })
  }

  build(pathToDrawIoXML, File, cb) {

    fs.readFile(pathToDrawIoXML, (err, data) => {
      parseString(data, (err, result) => {
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
        this.linkDependencies(edges, files, cache)

        const graphRoot = cache[nodes[0].$.id]
        // pass root to call back
        cb(graphRoot)       
      });
    })
  }
}
