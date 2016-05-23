var webpack = require("webpack")
, config = require("config")
, path = require("path")
, glob = require("glob")

var entry = {}
glob.sync("./src/entry/*.js")
.forEach(function (path) {
    var name = path.match(/^\.\/src\/entry\/(.*)\.js$/, '')[1]
    entry[name] = path
})

var webpack_config = {
    entry: entry,
    output: {
        path: __dirname + "/public/page",
        filename: "/[name]/index.js"
    },
    resolve: {
        alias: {
            "@app": path.resolve("."),
            "@lib": path.resolve("./lib"),
            "@cdn": path.resolve("./cdn")
        },
        extensions: ["", ".js", ".jsx", ".json"]
    },
    module: {
        loaders: [
            { test: /\.js$/, exclude: /node_modules/, loaders: ["babel"] },
            { test: /\.jsx$/, exclude: /node_modules/, loaders: ["babel"] },
            { test: /\.json$/, exclude: /node_modules/, loaders: ["json"] }
        ]
    },
    externals: {
        "react": "React",
        "react-dom": "ReactDOM"
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({compress: {warnings: false}}),
        new webpack.EnvironmentPlugin(["NODE_ENV"])
    ]
}

if (config.debug) {
    webpack_config.plugins.push(
        new webpack.SourceMapDevToolPlugin({filename: "[name]/index.js.map", append: "//# sourceMappingURL=index.js.map"})
    )
}

module.exports = webpack_config