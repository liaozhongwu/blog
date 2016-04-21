'use strict'
let React = require("react")
, ReactDOMServer = require('react-dom/server')
, router = require("koa-router")()
, body = require("koa-body")()
, config = require("config")
, md5 = require("md5")
, Model = require("../model")

router.use(function* (next) {
	try {
		console.log(this.method + " " + this.href + " from " + this.ip)
		if (config.online && /liaozhongwu\.cn/.test(this.hostname)) {
			this.status = 301
			this.redirect(this.href.replace(/liaozhongwu\.cn/, "liaozhongwu.com"))
			return
		}
		yield next
	} catch (err) {
		console.log(this.method + " " + this.href + " errored")
		console.error(err)
		let Error = require("../build/page/error").default
		, content = ReactDOMServer.renderToString(React.createElement(Error))
		,	props = Object.assign({content}, Error.getMeta())
		, Layout = require("../build/layout/Base").default
		this.body = ReactDOMServer.renderToString(React.createElement(Layout, props))
	}
})

router.get("/", function* (next) {
	let Index = require("../build/page/index").default
	,	content = ReactDOMServer.renderToString(React.createElement(Index))
	, props = Object.assign({content}, Index.getMeta())
	, Layout = require("../build/layout/Base").default
	this.body = ReactDOMServer.renderToString(React.createElement(Layout, props))
	yield next
})

router.get("/blogs", function* (next) {
	let blogs = yield Model.getBlogs()
	,	APP_PROPS = {blogs}
	,	Blogs = require("../build/page/blogs").default
	, content = ReactDOMServer.renderToString(React.createElement(Blogs, APP_PROPS))
	, props = Object.assign({content, APP_PROPS}, Blogs.getMeta())
	, Layout = require("../build/layout/Base").default
	this.body = ReactDOMServer.renderToString(React.createElement(Layout, props))
	yield next
})

router.get("/blog/:key", function* (next) {
	let blog = yield Model.getBlogByKey(this.params.key)
	,	comments = yield Model.getCommentsByBid(blog._id)
	,	APP_PROPS = {blog, comments}
	,	Blog = require("../build/page/blog").default
	,	content = ReactDOMServer.renderToString(React.createElement(Blog, APP_PROPS))
	, meta = Blog.getMeta()
	meta.title = blog.title + " - " + meta.title
	meta.description = blog.title + " - " + meta.description
	let	props = Object.assign({content, APP_PROPS}, meta)
	, Layout = require("../build/layout/Base").default
	this.body = ReactDOMServer.renderToString(React.createElement(Layout, props))
	yield next
})

router.get("/blog/:key/admin", function* (next) {
	let blog = yield Model.getBlogByKey(this.params.key)
	, APP_PROPS = {blog}
	, Admin = require("../build/page/admin").default
	,	content = ReactDOMServer.renderToString(React.createElement(Admin, APP_PROPS))
	,	props = Object.assign({content, APP_PROPS}, Admin.getMeta())
	, Layout = require("../build/layout/Base").default
	this.body = ReactDOMServer.renderToString(React.createElement(Layout, props))
	yield next
})

router.get("/blogs/admin", function* (next) {
	let Admin = require("../build/page/admin").default
	, content = ReactDOMServer.renderToString(React.createElement(Admin))
	,	props = Object.assign({content}, Admin.getMeta())
	, Layout = require("../build/layout/Base").default
	this.body = ReactDOMServer.renderToString(React.createElement(Layout, props))
	yield next
})

router.post("/blog/save", body, function* (next) {
	let id = this.request.body.id
	,	key = this.request.body.key
	,	title = this.request.body.title
	,	content = this.request.body.content
	, password = this.request.body.password

	// I'm lazy to save in database
	// if you are searching for the password, please try to decode
	if (md5(password).toLowerCase() === "ea6ddfe6ed0a06f5837aeba4f984db1e") {
		if (id) {
			yield Model.updateBlog({_id: id, key, title, content})
			this.redirect("/blog/" + key)
		} else {
			let blog = yield Model.addBlog({key, title, content})
			yield Model.addNotice({title: '<a href="/about">lzw</a> published a blog <a href="/blog/' + blog.key + '">' + blog.title + '</a>'})
			this.redirect("/blog/" + blog.key)
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
	,	About = require("../build/page/about").default
	,	content = ReactDOMServer.renderToString(React.createElement(About, APP_PROPS))
	,	props = Object.assign({content, APP_PROPS}, About.getMeta())
	, Layout = require("../build/layout/Base").default
	this.body = ReactDOMServer.renderToString(React.createElement(Layout, props))
	yield next
})

router.get("/notice", function* (next) {
	let notices = yield Model.getNotices()
	, APP_PROPS = {notices}
	,	Notice = require("../build/page/notice").default
	,	content = ReactDOMServer.renderToString(React.createElement(Notice, APP_PROPS))
	,	props = Object.assign({content, APP_PROPS}, Notice.getMeta())
	, Layout = require("../build/layout/Base").default
	this.body = ReactDOMServer.renderToString(React.createElement(Layout, props))
	yield next
})

router.get("/error", function* (next) {
	let Error = require("../build/page/error").default
	, content = ReactDOMServer.renderToString(React.createElement(Error))
	,	props = Object.assign({content}, Error.getMeta())
	, Layout = require("../build/layout/Base").default
	this.body = ReactDOMServer.renderToString(React.createElement(Layout, props))
	yield next
})

router.all("/*", function* (next) {
	if (this.status === 404) {
		console.log(this.method + " " + this.href + " was not found")
		let Error = require("../build/page/error").default
		, content = ReactDOMServer.renderToString(React.createElement(Error))
		,	props = Object.assign({content}, Error.getMeta())
		, Layout = require("../build/layout/Base").default
		this.body = ReactDOMServer.renderToString(React.createElement(Layout, props))
	}
	yield next
})

module.exports = router