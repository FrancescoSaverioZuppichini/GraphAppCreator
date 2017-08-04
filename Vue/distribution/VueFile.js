'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _require = require('graph2app-core'),
    File = _require.File,
    filePathFinder = _require.filePathFinder;

var path = require('path');

var vueComponent = '<template>\n\n</template>\n\n<script>\nexport default {\n    name: "",\n    components: {\n    },\n    data: function() {\t\n        return {}\n    },\n    methods: {}\n}\n</script>\n\n<style scoped>\n\n</style>';

exports.VueFile = function (_File) {
  _inherits(VueFile, _File);

  function VueFile() {
    var path = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    var name = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
    var id = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : name;

    _classCallCheck(this, VueFile);

    var _this = _possibleConstructorReturn(this, (VueFile.__proto__ || Object.getPrototypeOf(VueFile)).call(this, path, name, id));

    _this.extension = 'vue';
    _this.template = vueComponent;
    _this.type = 'VUE';
    return _this;
  }

  _createClass(VueFile, [{
    key: 'normalize',
    value: function normalize(importPath) {
      // add '.' in front of lonely path '/example/' 
      // so Vue knows the are in the same folder
      if (path.parse(importPath).root == '/') return '.' + importPath;

      return importPath;
    }
  }, {
    key: 'update',
    value: function update(text) {
      var _this2 = this;

      var imports = this.dependencies.map(function (dep) {
        var pathNormalized = '' + _this2.normalize(path.normalize(filePathFinder.findPathFromFile(_this2, "", dep) + '/' + dep.name + '.' + dep.extension));
        var importText = 'import ' + dep.name + ' from \'' + pathNormalized + '\'';
        var regexImport = 'import[\\s]*' + dep.name + '.*';

        var matches = text.match(new RegExp(regexImport, 'g'));
        // replace if match
        if (matches != null) {
          text = text.replace(matches[0], importText);
        } else {
          return importText + '\n';
        }
      });

      if (!this.updated) text = text.replace(/<script>/gm, '<script>\n' + imports.join(''));else {
        text = text.replace(/<script>/gm, '<script>' + imports.join(''));
      }
      text = text.replace(/components[\s]*:[\s]*{[\s]*}/gm, 'components: {\n\t\t' + this.dependencies.map(function (dep) {
        return dep.name;
      }).join(',\n\t\t') + '\n\t}');

      return text;
    }
  }, {
    key: 'render',
    value: function render(file, text) {

      return this.update(this.template);
    }
  }]);

  return VueFile;
}(File);