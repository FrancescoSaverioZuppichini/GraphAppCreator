'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var path = require('path');

var _require = require('./FilePathFinder.js'),
    filePathFinder = _require.filePathFinder;
/**
 * The File class abstract a file adding
 * new fields in order to be identified as 
 * a node in the app's graph
 */


exports.File = function () {
  function File(_ref) {
    var _ref$path = _ref.path,
        path = _ref$path === undefined ? '' : _ref$path,
        _ref$name = _ref.name,
        name = _ref$name === undefined ? '' : _ref$name,
        _ref$id = _ref.id,
        id = _ref$id === undefined ? name : _ref$id;

    _classCallCheck(this, File);

    this.id = id;
    this.type = 'TEXT';
    this.extension = 'txt';
    // total path from the root folder
    this.path = path;
    this.name = name;
    // name of the first-up directory, by default
    // is the file's name itself
    this.dirName = name;
    // string to be rendered into the file
    this.template = 'Hello World!';
    // life-cycle flags
    this.created = false;
    this.writted = false;
    this.updated = false;
    // files to be imported
    this.dependencies = [];
    // graph logic 
    this.children = [];
    this.parent = null;
  }

  _createClass(File, [{
    key: 'createTemplate',
    value: function createTemplate() {
      var _this = this;

      var imports = this.dependencies.map(function (dep) {
        return 'import ' + dep.name + ' from .' + (filePathFinder.filePathFinder(_this, "", dep) + '/' + dep.name + '.' + dep.extension) + '\n';
      });

      return imports.join('') + this.template;
    }
  }, {
    key: 'render',
    value: function render() {
      return this.createTemplate();
    }
  }]);

  return File;
}();