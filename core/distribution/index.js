'use strict';

var _require = require('./App.js'),
    App = _require.App;

var _require2 = require('./File.js'),
    File = _require2.File;

var _require3 = require('./GraphBuilder.js'),
    GraphBuilder = _require3.GraphBuilder;

var _require4 = require('./FilePathFinder.js'),
    filePathFinder = _require4.filePathFinder;

var program = require('commander');
program.version('0.0.1').option('-d, --dist <n>', 'Output destination');

module.exports = {
    App: App,
    File: File,
    GraphBuilder: GraphBuilder,
    filePathFinder: filePathFinder,
    program: program
};