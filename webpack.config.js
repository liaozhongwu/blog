module.exports = {
    entry: {
        index: './src/entry/index.js',
        about: './src/entry/about.js',
        blog: './src/entry/blog.js', 
        blogs: './src/entry/blogs.js', 
        error: './src/entry/error.js', 
    },
    output: {
        path: __dirname,
        filename: './public/page/[name].js'
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    module: {
        loaders: [
            { test: /\.js$/, loaders: ['babel'] },
            { test: /\.jsx$/, loaders: ["babel"] }
        ]
    }
}