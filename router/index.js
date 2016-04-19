'use strict'
let React = require("react")
, ReactDOMServer = require('react-dom/server')
, router = require("koa-router")()
, body = require("koa-body")()
, md5 = require("md5")
, Model = require("../model")
, Index = require("../build/page/index").default
,	Blogs = require("../build/page/blogs").default
,	Blog = require("../build/page/blog").default
,	About = require("../build/page/about").default
,	Notice = require("../build/page/notice").default
, Admin = require("../build/page/admin").default
, Error = require("../build/page/error").default
, Layout = require("../build/layout/Base").default

router.get("/", function* (next) {
	let content = ReactDOMServer.renderToString(React.createElement(Index))
	, props = Object.assign({content}, Index.getMeta())

	this.body = ReactDOMServer.renderToString(React.createElement(Layout, props))
	yield next
})

router.get("/blogs", function* (next) {
	let blogs = yield Model.getBlogs()
	,	APP_PROPS = {blogs}
	, content = ReactDOMServer.renderToString(React.createElement(Blogs, APP_PROPS))
	, props = Object.assign({content, APP_PROPS}, Blogs.getMeta())

	this.body = ReactDOMServer.renderToString(React.createElement(Layout, props))
	yield next
})

router.get("/blog/:id", function* (next) {
	let blog = yield Model.getBlog(this.params.id)
	,	comments = yield Model.getCommentsByBid(blog._id)
	,	APP_PROPS = {blog, comments}
	,	content = ReactDOMServer.renderToString(React.createElement(Blog, APP_PROPS))
	, meta = Blog.getMeta()
	meta.title = blog.title + " - " + meta.title
	meta.description = blog.title + " - " + meta.description
	let	props = Object.assign({content, APP_PROPS}, meta)

	this.body = ReactDOMServer.renderToString(React.createElement(Layout, props))
	yield next
})

router.get("/blog/:id/admin", function* (next) {
	let blog = yield Model.getBlog(this.params.id)
	, APP_PROPS = {blog}
	,	content = ReactDOMServer.renderToString(React.createElement(Admin, APP_PROPS))
	,	props = Object.assign({content, APP_PROPS}, Admin.getMeta())

	this.body = ReactDOMServer.renderToString(React.createElement(Layout, props))
	yield next
})

router.get("/blogs/admin", function* (next) {
	let content = ReactDOMServer.renderToString(React.createElement(Admin))
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

router.get("/about", function* (next) {
	let abouts = yield Model.getAbouts()
	,	APP_PROPS = {abouts}
	,	content = ReactDOMServer.renderToString(React.createElement(About, APP_PROPS))
	,	props = Object.assign({content, APP_PROPS}, About.getMeta())

	this.body = ReactDOMServer.renderToString(React.createElement(Layout, props))
	yield next
})

router.get("/notice", function* (next) {
	let notices = yield Model.getNotices()
	, APP_PROPS = {notices}
	,	content = ReactDOMServer.renderToString(React.createElement(Notice, APP_PROPS))
	,	props = Object.assign({content, APP_PROPS}, Notice.getMeta())

	this.body = ReactDOMServer.renderToString(React.createElement(Layout, props))
	yield next
})

router.get("/error", function* (next) {
	let content = ReactDOMServer.renderToString(React.createElement(Error))
	,	props = Object.assign({content}, Error.getMeta())

	this.body = ReactDOMServer.renderToString(React.createElement(Layout, props))
	yield next
})

module.exports = router