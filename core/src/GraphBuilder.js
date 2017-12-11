const errors = require('./errors.js')

exports.GraphBuilder = class GraphBuilder {
  build(src){
    throw errors.METHOD_NOT_OVERRIDED
  }
}
