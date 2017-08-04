'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var path = require('path');
var fs = require('fs');
var mkdirp = require('mkdirp');
var colors = require('colors');

exports.App = function () {
  function App() {
    _classCallCheck(this, App);
  }

  _createClass(App, [{
    key: 'createDependencies',
    value: function createDependencies(file, destination) {
      var _this = this;

      var dependencies = file.children;
      // const newPath = destination + '/' + file.dirName

      dependencies.forEach(function (file) {
        return _this.createPath(file, destination);
      });
    }
  }, {
    key: 'createPath',
    value: function createPath(file, destination) {
      var createDependencies = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      if (file.created) return;

      destination = destination + '/' + file.dirName;
      file.path = path.normalize(destination + '/' + file.name + '.' + file.extension);

      if (createDependencies) this.createDependencies(file, destination);
    }
  }, {
    key: 'writeFile',
    value: function writeFile(file) {}
  }, {
    key: 'createFile',
    value: function createFile(file) {
      var _this2 = this;

      if (file.created) return;

      mkdirp(path.dirname(file.path), function (err) {
        if (err) throw err;

        if (fs.existsSync(file.path)) {

          fs.readFile(file.path, 'utf8', function (err, data) {
            if (err) throw err;

            file.template = data;
            file.updated = true;

            fs.writeFile(file.path, file.render(), function (err) {
              if (err) throw err;

              console.log(colors.underline(file.name) + ' ' + colors.green('updated'));

              file.children.forEach(function (file) {
                return _this2.createFile(file);
              });
            });
          });
        } else {

          fs.writeFile(file.path, file.render(), function (err) {
            if (err) throw err;

            console.log(colors.underline(file.name) + ' ' + colors.green('saved') + ' into ' + colors.italic(file.path));

            file.created = true;

            file.children.forEach(function (file) {
              return _this2.createFile(file);
            });
          });
        }
      });
    }
  }, {
    key: 'renderFile',
    value: function renderFile(file) {
      var _this3 = this;

      if (file.writted) return;

      fs.writeFile(file.path + '/' + file.name + '.' + file.extension, file.render(), function (err) {
        if (err) throw err;

        console.log('Template ' + colors.green('rendered') + ' into ' + colors.underline(file.name));

        file.writted = true;
        file.children.forEach(function (file) {
          return _this3.renderFile(file);
        });
      });
    }
  }, {
    key: 'create',
    value: function create() {
      var destination = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      var root = arguments[1];

      this.createPath(root, destination);
      this.createFile(root);
    }
  }, {
    key: 'addWatchers',
    value: function addWatchers() {}
  }, {
    key: 'update',
    value: function update() {}
  }]);

  return App;
}();