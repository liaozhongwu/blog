var glob = require("glob")
, entry = {}

glob.sync("./src/entry/*.js")
.forEach(function (path) {
    var name = path.match(/^\.\/src\/entry\/(.*)\.js$/, '')[1]
    entry[name] = path
})

module.exports = {
    entry: entry,
    output: {
        path: __dirname,
        filename: "./public/js/[name]/index.js"
    },
    resolve: {
        extensions: ["", ".js", ".jsx"]
    },
    module: {
        loaders: [
            { test: /\.js$/, exclude: /node_modules/, loaders: ["babel"] },
            { test: /\.jsx$/, exclude: /node_modules/, loaders: ["babel"] }
        ]
    }
}