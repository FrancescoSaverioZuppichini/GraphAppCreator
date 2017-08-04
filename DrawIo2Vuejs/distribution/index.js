'use strict';

var _require = require('graph2app-core'),
    program = _require.program;

var _require2 = require('graph2app-vue-core'),
    VueApp = _require2.VueApp,
    VueFile = _require2.VueFile;

var _require3 = require('graph2app-drawio-graph-builder'),
    DrawIoGraphBuilder = _require3.DrawIoGraphBuilder;

var drawIoGraphBuilder = new DrawIoGraphBuilder();

program.option('-x, --xml <n>', 'xmlPath').description('scaffold Vuejs app from Draw.io').parse(process.argv);

try {
  if (program.xml == undefined || program.dist == undefined) {
    throw new Error("options xml and dist must be provided, use --help");
  }

  var app = new VueApp();

  var root = drawIoGraphBuilder.build(program.xml, VueFile, function (root) {
    app.create(program.dist, root);
  });
} catch (e) {
  console.log(e.message);
  console.log("use --help for more information");
}