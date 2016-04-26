'use strict'
var Model = require("../model")
, data = require("../data.json")
, ps = []

data.blogs.forEach(blog => {
	ps.push(
		Model.addBlog(blog)
		.then(blog => console.log(`insert blog ${blog._id} success`))
	)
})
data.comments.forEach(comment => {
	ps.push(
		Model.addComment(comment)
		.then(comment => console.log(`insert comment ${comment._id} success`))
	)
})
data.abouts.forEach(about => {
	ps.push(
		Model.addAbout(about)
		.then(about => console.log(`insert about ${about._id} success`))
	)
})

Promise
.all(ps)
.then(_ => {
	console.log("insert over")
	process.exit(0)
})
.catch(err => {
	console.error(err)
	process.exit(1)
})