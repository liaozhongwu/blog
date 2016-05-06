'use strict'
let Model = require("../model")
,	fs = require("fs")
require("../lib/date")

Promise.all([
	Model.removeBlogs()
	, Model.removeComments()
	, Model.removeAbouts()
]).then(data => {
	console.log("remove completed")
	process.exit(0)
}).catch(err => {
	console.error(err)
	process.exit(1)
})
