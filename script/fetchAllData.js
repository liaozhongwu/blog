'use strict'
let Model = require("../Model")
,	fs = require("fs")
require("../lib/date")

Promise.all([
	Model.getBlogs()
	, Model.getComments()
	, Model.getAbouts()
	, Model.getNotices()
]).then(data => {
	fs.writeFileSync("./data.json", JSON.stringify({blogs: data[0], comments: data[1], abouts: data[2], notices: data[3]}))
	console.log(`write to file data.json`)
	process.exit(0)
}).catch(err => {
	console.error(err)
	process.exit(1)
})
