var webpack = require("webpack")
, glob = require("glob")
, entry = {}

glob.sync("./src/entry/*.js")
.forEach(function (path) {
    var name = path.match(/^\.\/src\/entry\/(.*)\.js$/, '')[1]
    entry[name] = path
})

module.exports = {
    entry: entry,
    output: {
        path: __dirname + "/public/js",
        filename: "/[name]/index.js"
    },
    resolve: {
        extensions: ["", ".js", ".jsx"]
    },
    module: {
        loaders: [
            { test: /\.js$/, exclude: /node_modules/, loaders: ["babel"] },
            { test: /\.jsx$/, exclude: /node_modules/, loaders: ["babel"] }
        ]
    },
    externals: {
        "react": "React",
        "react-dom": "ReactDOM"
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({compress: {warnings: false}})
    ]
}