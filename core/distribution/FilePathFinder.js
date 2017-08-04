"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * This class provide a way to find the path from
 * one file to another
 */
var FilePathFinder = function () {
  function FilePathFinder() {
    _classCallCheck(this, FilePathFinder);
  }

  _createClass(FilePathFinder, [{
    key: "findPathFromFile",
    value: function findPathFromFile(start, path, toFind) {
      var Q = [];
      return this.findFileFromNodeInner(start, path, toFind, false, Q);
    }
  }, {
    key: "findFileFromNodeInner",
    value: function findFileFromNodeInner(start, path, toFind, wentDown, Q) {

      if (Q.indexOf(start) >= 0) return false;

      if (!start) return false;

      if (start.id == toFind.id) return path;

      Q.push(start);

      if (wentDown) return this.searchInChildren(start, path, toFind, Q);

      return this.searchInChildren(start, path, toFind, Q) || this.searchInParent(start, path, toFind, Q);
    }
  }, {
    key: "searchInParent",
    value: function searchInParent(start, path, toFind, Q) {
      return this.findFileFromNodeInner(start.parent, "../" + path, toFind, false, Q);
    }
  }, {
    key: "searchInChildren",
    value: function searchInChildren(start, path, toFind, Q) {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = start.children[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var dep = _step.value;

          var realPath = this.findFileFromNodeInner(dep, path + '/' + dep.dirName, toFind, true, Q);
          if (realPath != false) return realPath;
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      return false;
    }
  }]);

  return FilePathFinder;
}();

exports.filePathFinder = new FilePathFinder();