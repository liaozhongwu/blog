'use strict'
let React = require("react")
, ReactDOMServer = require('react-dom/server')
, router = require("koa-router")()
, body = require("koa-body")()
, config = require("config")
, md5 = require("md5")
, Model = require("../model")
, Random = require("../lib/random")
, Remarkable = require("remarkable")
, hljs = require("highlight.js")

let remarkable = new Remarkable({
	highlight: function (str, lang) {
		try {
			if (lang && hljs.getLanguage(lang)) {
	    	return hljs.highlight(lang, str).value
			} else {
				return hljs.highlightAuto(str).value
			}
		} catch (err) {
			console.error(err)
		}
		return ""
  }
})

function _require (module) {
	if (!config.online) {
		delete require.cache[require.resolve(module)]
	}
	return require(module)
}

router.get("/", function* (next) {
	let imgs = [
		"/img/bg1.jpg",
		"/img/bg2.jpg",
		"/img/bg3.jpg",
		"/img/bg4.jpg"
	]
	, APP_PROPS = {imgs}
	, Index = _require("../build/page/index").default
	, content = ReactDOMServer.renderToString(React.createElement(Index, APP_PROPS))
	, props = Object.assign({content, APP_PROPS}, Index.getMeta())
	, Layout = _require("../build/layout/Simple").default
	this.body = ReactDOMServer.renderToString(React.createElement(Layout, props))
	yield next
})

router.get("/blogs", function* (next) {
	let blogs = yield Model.getBlogs()
	
	for (let i = 0; i < blogs.length; ++i) {
		let blog = blogs[i]
		blog.counts = {
			comment: yield Model.countCommentsByBid(blog._id)
		}
	}

	let APP_PROPS = {blogs}
	, Blogs = _require("../build/page/blogs").default
	, content = ReactDOMServer.renderToString(React.createElement(Blogs, APP_PROPS))
	, props = Object.assign({content, APP_PROPS}, Blogs.getMeta())
	, Layout = _require("../build/layout/Base").default
	this.body = ReactDOMServer.renderToString(React.createElement(Layout, props))
	yield next
})

router.get("/blog/:key", function* (next) {
	let blog = yield Model.getBlogByKey(this.params.key).then(blog => {
		blog.marked = remarkable.render(blog.content)
		return blog
	})
	, comments = yield Model.getCommentsByBid(blog._id).then(comments => comments.map(comment => {
		comment.marked = remarkable.render(comment.content)
		return comment
	}))
	, APP_PROPS = {blog, comments}
	, Blog = _require("../build/page/blog").default
	, content = ReactDOMServer.renderToString(React.createElement(Blog, APP_PROPS))
	, meta = Blog.getMeta()
	,	props = Object.assign({content, APP_PROPS}, Object.assign(meta, {title: blog.title + " - " + meta.title, description: blog.title + " - " + meta.description}))
	, Layout = _require("../build/layout/Base").default
	this.body = ReactDOMServer.renderToString(React.createElement(Layout, props))
	yield next
})

router.get("/blog/:key/admin", function* (next) {
	let blog = yield Model.getBlogByKey(this.params.key)
	, APP_PROPS = {blog}
	, Admin = _require("../build/page/admin").default
	, content = ReactDOMServer.renderToString(React.createElement(Admin, APP_PROPS))
	, props = Object.assign({content, APP_PROPS}, Admin.getMeta())
	, Layout = _require("../build/layout/Base").default
	this.body = ReactDOMServer.renderToString(React.createElement(Layout, props))
	yield next
})

router.get("/blogs/admin", function* (next) {
	let Admin = _require("../build/page/admin").default
	, content = ReactDOMServer.renderToString(React.createElement(Admin))
	, props = Object.assign({content}, Admin.getMeta())
	, Layout = _require("../build/layout/Base").default
	this.body = ReactDOMServer.renderToString(React.createElement(Layout, props))
	yield next
})

router.post("/blog/save", body, function* (next) {
	let id = this.request.body.id
	, key = this.request.body.key
	, title = this.request.body.title
	, content = this.request.body.content
	, password = this.request.body.password

	// I'm lazy to save in database
	// if you are searching for the password, please try to decode
	if (md5(password).toLowerCase() === "ea6ddfe6ed0a06f5837aeba4f984db1e") {
		if (id) {
			yield Model.updateBlog({_id: id, key, title, content})
			this.redirect("/blog/" + key)
		} else {
			let blog = yield Model.addBlog({key, title, content})
			this.redirect("/blog/" + blog.key)
		}
	} else {	
		this.redirect("/error")
	}
	yield next
})

router.post("/comment/save", body, function* (next) {
	let bid = this.request.body.bid
	, name = this.request.body.name
	, phone = this.request.body.phone
	, email = this.request.body.email
	, content = this.request.body.content
	, comment = yield Model.addComment({bid, name, phone, email, content}).then(comment => {
		comment.marked = remarkable.render(comment.content)
		return comment
	})
	this.body = comment
	yield next
})

router.get("/about", function* (next) {
	let	abouts = yield Model.getAbouts()
	, APP_PROPS = {abouts}
	, About = _require("../build/page/about").default
	, content = ReactDOMServer.renderToString(React.createElement(About, APP_PROPS))
	, props = Object.assign({content, APP_PROPS}, About.getMeta())
	, Layout = _require("../build/layout/Base").default
	this.body = ReactDOMServer.renderToString(React.createElement(Layout, props))
	yield next
})

router.get("/error", function* (next) {
	let Error = _require("../build/page/error").default
	, content = ReactDOMServer.renderToString(React.createElement(Error))
	, props = Object.assign({content}, Error.getMeta())
	, Layout = _require("../build/layout/Base").default
	this.body = ReactDOMServer.renderToString(React.createElement(Layout, props))
	yield next
})

router.get("/baidu_verify_:hash.html", function* (next) {
	this.type = "text/html"
	this.body = this.params.hash
	yield next
})

router.get("/google:hash.html", function* (next) {
	this.type = "text/html"
	this.body = "google-site-verification: google511141f6ed94bec8.html"
	yield next
})

module.exports = router