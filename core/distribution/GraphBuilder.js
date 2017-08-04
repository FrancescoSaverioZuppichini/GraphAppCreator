'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var errors = require('./errors.js');

exports.GraphBuilder = function () {
    function GraphBuilder() {
        _classCallCheck(this, GraphBuilder);
    }

    _createClass(GraphBuilder, [{
        key: 'build',
        value: function build(src) {
            throw errors.METHOD_NOT_OVERRIDED;
        }
    }]);

    return GraphBuilder;
}();