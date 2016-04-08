'use strict'
let React = require("react")
, ReactDOMServer = require('react-dom/server')
, router = require("koa-router")()
, body = require("koa-body")()
, md5 = require("md5")
, Model = require("../model")
require("../lib/date")

router.get("/", function* (next) {
	this.redirect("/blogs")
})

router.get("/error", function* (next) {
	let Error = require("../build/page/Error")
	,	content = ReactDOMServer.renderToString(React.createElement(Error))
	,	Layout = require("../build/layout/Base")
	,	props = Object.assign({content}, Error.getMeta())

	this.body = ReactDOMServer.renderToString(React.createElement(Layout, props))
	yield next
})

router.get("/blogs", function* (next) {
	let blogs = yield Model.getBlogs()
	,	APP_PROPS = {blogs}
	,	Blogs = require("../build/page/Blogs")
	, content = ReactDOMServer.renderToString(React.createElement(Blogs, APP_PROPS))
	, Layout = require("../build/layout/Base")
	, props = Object.assign({content, APP_PROPS}, Blogs.getMeta())

	this.body = ReactDOMServer.renderToString(React.createElement(Layout, props))
	yield next
})

router.get("/blog/:id", function* (next) {
	let blog = yield Model.getBlog(this.params.id)
	,	comments = yield Model.getCommentsByBid(blog._id)
	,	APP_PROPS = {blog, comments}
	,	Blog = require("../build/page/Blog")
	,	content = ReactDOMServer.renderToString(React.createElement(Blog, APP_PROPS))
	, Layout = require("../build/layout/Base")
	,	props = Object.assign({content, APP_PROPS}, Blog.getMeta())

	this.body = ReactDOMServer.renderToString(React.createElement(Layout, props))
	yield next
})

router.get("/about", function* (next) {
	let abouts = yield Model.getAbouts()
	,	APP_PROPS = {abouts}
	,	About = require("../build/page/About")
	,	content = ReactDOMServer.renderToString(React.createElement(About, APP_PROPS))
	,	Layout = require("../build/layout/Base")
	,	props = Object.assign({content, APP_PROPS}, About.getMeta())

	this.body = ReactDOMServer.renderToString(React.createElement(Layout, props))
	yield next
})

router.get("/notice", function* (next) {
	let notices = yield Model.getNotices()
	, APP_PROPS = {notices}
	,	Notice = require("../build/page/Notice")
	,	content = ReactDOMServer.renderToString(React.createElement(Notice, APP_PROPS))
	,	Layout = require("../build/layout/Base")
	,	props = Object.assign({content, APP_PROPS}, Notice.getMeta())

	this.body = ReactDOMServer.renderToString(React.createElement(Layout, props))
	yield next
})

router.get("/blog/:id/admin", function* (next) {
	let blog = yield Model.getBlog(this.params.id)
	, APP_PROPS = {blog}
	,	Admin = require("../build/page/Admin")
	,	content = ReactDOMServer.renderToString(React.createElement(Admin, APP_PROPS))
	,	Layout = require("../build/layout/Base")
	,	props = Object.assign({content, APP_PROPS}, Admin.getMeta())

	this.body = ReactDOMServer.renderToString(React.createElement(Layout, props))
	yield next
})

router.get("/blogs/admin", function* (next) {
	let Admin = require("../build/page/Admin")
	, content = ReactDOMServer.renderToString(React.createElement(Admin))
	,	Layout = require("../build/layout/Base")
	,	props = Object.assign({content}, Admin.getMeta())

	this.body = ReactDOMServer.renderToString(React.createElement(Layout, props))
	yield next
})

router.post("/blog/save", body, function* (next) {
	let id = this.request.body.id
	,	title = this.request.body.title
	,	content = this.request.body.content
	, password = this.request.body.password

	// I'm lazy to save in database
	// if you are searching for the password, please try to decode
	if (md5(password).toLowerCase() === "ea6ddfe6ed0a06f5837aeba4f984db1e") {
		if (id) {
			yield Model.updateBlog({_id: id, title, content})
			this.redirect("/blog/" + id)
		} else {
			let blog = yield Model.addBlog({title, content})
			yield Model.addNotice({title: '<a href="/about">lzw</a> published a blog <a href="/blog/' + blog.id + '">' + blog.title + '</a>'})
			this.redirect("/blog/" + blog.id)
		}
	} else {	
		this.redirect("/error")
	}
	yield next
})

router.post("/comment/save", body, function* (next) {
	let bid = this.request.body.bid
	,	name = this.request.body.name
	,	phone = this.request.body.phone
	,	email = this.request.body.email
	,	content = this.request.body.content

	this.body = yield Model.addComment({bid, name, phone, email, content})
	yield next
})

module.exports = router