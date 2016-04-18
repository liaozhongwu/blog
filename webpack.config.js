module.exports = {
    entry: {
        about: './src/entry/about.js',
        admin: './src/entry/admin.js',
        blog: './src/entry/blog.js', 
        blogs: './src/entry/blogs.js', 
        error: './src/entry/error.js', 
        index: './src/entry/index.js', 
        notice: './src/entry/notice.js'
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