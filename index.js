const {App} = require('./dist/App.js')
const {File} = require('./dist/File.js')
const {VueFile} =  require('./dist/Vue/VueFile.js')
const {DrawIoGraphBuilder} =  require('./dist/DrawIo/DrawIoGraphBuilder.js')

const app = new App()

// var file1 = new File('','file1');
// var file2 = new File('','file2');
// var file3 = new File('','file3');

var file1 = new VueFile({path:'',name:'file1'});
var file2 = new VueFile({path:'',name:'file2'});
var file3 = new VueFile({path:'',name:'file3'});

file1.children = [file2]
file1.dependencies = [file2,file3]

file2.parent = file1
file2.children = [file3]
file2.dependencies = [file3]

file3.parent = file2
file3.dependencies = [file1]


const drawIoGraphBuilder = new DrawIoGraphBuilder()

const root = drawIoGraphBuilder.build('./test/small.xml',VueFile,(root)=>{
    app.create('destination',root)
})

