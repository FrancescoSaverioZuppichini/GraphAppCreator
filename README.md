# GraphAppCreator
## A General Structure to define custom Application using a Graph Structured

### Overview
The repository is structured as follow:

```
.
├── DrawIo
│   └── src
│       ├── DrawIoGraphBuilder.js
│       └── index.js
├── DrawIo2Vuejs
│   ├── README.md
│   ├── index.js
├── Vue
│   └── src
│       ├── VueApp.js
│       ├── VueFile.js
│       └── index.js
├── core
│   └── src
│       ├── App.js
│       ├── File.js
│       ├── FilePathFinder.js
│       ├── GraphBuilder.js
│       ├── errors.js
│       └── index.js
├── index.js
```
There are three main classes that provide the necessary API to create a custom app-graph builder: `App`, `File` and `GraphBuilder`.
`File` defines how a file is created and rendered, `GraphBuilder` creates a graph structured and `App` is the glue between, 
it takes a graoh and create each file in the correct place. You can create custom graph-2-app by subclassing them.

### Graph Builders available
[DrawIo2Vuejs](https://github.com/FrancescoSaverioZuppichini/DrawIo2Vuejs)
