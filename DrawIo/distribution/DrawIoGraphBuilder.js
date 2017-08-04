'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _require = require('graph2app-core'),
    GraphBuilder = _require.GraphBuilder;

var parseString = require('xml2js').parseString;
// const {Resource} = require('resouce-class')
var fs = require('fs');

exports.DrawIoGraphBuilder = function (_GraphBuilder) {
  _inherits(DrawIoGraphBuilder, _GraphBuilder);

  function DrawIoGraphBuilder() {
    _classCallCheck(this, DrawIoGraphBuilder);

    return _possibleConstructorReturn(this, (DrawIoGraphBuilder.__proto__ || Object.getPrototypeOf(DrawIoGraphBuilder)).apply(this, arguments));
  }

  _createClass(DrawIoGraphBuilder, [{
    key: 'createNodes',
    value: function createNodes(rawNodes, File) {

      return rawNodes.map(function (rawNode) {
        return new File({
          name: rawNode.$.value,
          id: rawNode.$.id
        });
      });
    }
  }, {
    key: 'createCache',
    value: function createCache(files) {
      var cache = {};

      files.forEach(function (file) {
        return cache[file.id] = file;
      });

      return cache;
    }
  }, {
    key: 'linkChildren',
    value: function linkChildren(edges, files, cache) {
      edges.forEach(function (edge) {
        var target = cache[edge.$.target];
        var source = cache[edge.$.source];
        if (target.children.indexOf(source) < 0) target.children.push(source);
        source.parent = target;
      });
    }
  }, {
    key: 'linkDependencies',
    value: function linkDependencies(edges, files, cache) {
      edges.forEach(function (edge) {
        var target = cache[edge.$.target];
        var source = cache[edge.$.source];
        if (source.dependencies.indexOf(target) < 0) source.dependencies.push(target);
      });
    }
  }, {
    key: 'build',
    value: function build(pathToDrawIoXML, File, cb) {
      var _this2 = this;

      fs.readFile(pathToDrawIoXML, function (err, data) {
        if (err) throw err;

        parseString(data, function (err, result) {
          if (err) throw err;
          var cells = result.mxGraphModel.root[0].mxCell;
          // fetch the data we need from the graph
          var edges = cells.filter(function (cell) {
            return cell.$.edge && cell.$.value !== 'Use';
          });
          var dependenciesEdges = cells.filter(function (cell) {
            return cell.$.value === 'Use';
          });
          var nodes = cells.filter(function (cell) {
            return cell.$.value && cell.$.value !== 'Use';
          });
          // create the correct files from the passed File isntance
          var files = _this2.createNodes(nodes, File);
          // cache is used to fast access the stored files
          var cache = _this2.createCache(files);

          _this2.linkChildren(edges, files, cache);
          _this2.linkDependencies(dependenciesEdges, files, cache);

          var graphRoot = cache[nodes[0].$.id];
          // pass root to call back
          cb(graphRoot);
        });
      });
    }
  }]);

  return DrawIoGraphBuilder;
}(GraphBuilder);