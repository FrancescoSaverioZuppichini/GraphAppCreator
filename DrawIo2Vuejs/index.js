const {
  program
} = require('../src/index.js')
const {
  VueApp
} = require('../Vue/VueApp.js')
const {
  VueFile
} = require('../Vue/VueFile.js')

const { DrawIoGraphBuilder } = require('../DrawIo/DrawIoGraphBuilder.js')

const drawIoGraphBuilder = new DrawIoGraphBuilder()

program
  .option('-x, --xml <n>', 'xmlPath')
  .description('scaffold Vuejs app from Draw.io')
  .parse(process.argv)

try {
  if (program.xml == undefined || program.dist == undefined) {
    throw new Error("options xml and dist must be provided, use --help")
  }

  const app = new VueApp()

  const root = drawIoGraphBuilder.build(program.xml, VueFile, (root) => {
    app.create(program.dist, root)
  })
} catch (e) {
  console.log(e.message)
  console.log("use --help for more information");
}
