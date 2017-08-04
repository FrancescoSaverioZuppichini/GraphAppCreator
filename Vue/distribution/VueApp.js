'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _require = require('graph2app-core'),
    App = _require.App;

var path = require('path');

exports.VueApp = function (_App) {
  _inherits(VueApp, _App);

  function VueApp() {
    _classCallCheck(this, VueApp);

    return _possibleConstructorReturn(this, (VueApp.__proto__ || Object.getPrototypeOf(VueApp)).apply(this, arguments));
  }

  _createClass(VueApp, [{
    key: 'create',
    value: function create() {
      var _this2 = this;

      var destination = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      var root = arguments[1];


      root.dirName = '';

      this.createPath(root, destination, false);

      root.children.forEach(function (child) {
        // first level must be in the components folder
        child.dirName = '/components/' + child.name;
        _this2.createPath(child, destination);
      });

      this.createFile(root, destination);
    }
  }]);

  return VueApp;
}(App);