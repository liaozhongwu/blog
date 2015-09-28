var React = require("react");
var Lodash = require("lodash");
var router = require("koa-router")();
var blogDao = require("../dao/blog");
var noticeDao = require("../dao/notice");
var aboutDao = require("../dao/about");

router.get("/error", function* (next) {
	var Error = require("../build/page/Error");
	var content = React.renderToString(React.createElement(Error));
	var Layout = require("../build/layout/Base");
	var props = Lodash.assign({content: content}, Error.getMeta());
	this.body = React.renderToString(React.createElement(Layout, props));
	yield next;
});

router.get("/", function* (next) {
	var data = yield noticeDao.select();
	if (data === null) {
		this.redirect("/error");
		yield next;
		return;
	}
	var Index = require("../build/page/Index");
	var content = React.renderToString(React.createElement(Index, {data: data}));
	var Layout = require("../build/layout/Base");
	var props = Lodash.assign({content: content, APP_PROPS: {data: data} }, Index.getMeta());
	this.body = React.renderToString(React.createElement(Layout, props));
	yield next;
});

router.get("/blogs", function* (next) {
	var data = yield blogDao.select();
	if (data === null) {
		this.redirect("/error");
		yield next;
		return;
	}
	var Blogs = require("../build/page/Blogs");
	var content = React.renderToString(React.createElement(Blogs, {data: data}));
	var Layout = require("../build/layout/Base");
	var props = Lodash.assign({content: content, APP_PROPS: {data: data} }, Blogs.getMeta());
	this.body = React.renderToString(React.createElement(Layout, props));
	yield next;
});

router.get("/blog/:id", function* (next) {
	var data = yield blogDao.selectById({id: this.params.id || 1});
	if (data === null) {
		this.redirect("/error");
		yield next;
		return;
	}
	var Blog = require("../build/page/Blog");
	var content = React.renderToString(React.createElement(Blog, {data: data}));
	var Layout = require("../build/layout/Base");
	var props = Lodash.assign({content: content, APP_PROPS: {data: data} }, Blog.getMeta());
	this.body = React.renderToString(React.createElement(Layout, props));
	yield next;
});

router.get("/about", function* (next) {
	var About = require("../build/page/About");
	var data = yield aboutDao.select();
	if (data === null) {
		this.redirect("/error");
		yield next;
		return;
	}
	var content = React.renderToString(React.createElement(About, {data: data}));
	var Layout = require("../build/layout/Base");
	var props = Lodash.assign({content: content, APP_PROPS: {data: data} }, About.getMeta());
	this.body = React.renderToString(React.createElement(Layout, props));
	yield next;
});

router.get("/other", function* (next) {
	var Other = require("../build/page/Other");
	var content = React.renderToString(React.createElement(Other));
	var Layout = require("../build/layout/Base");
	var props = Lodash.assign({content: content}, Other.getMeta());
	this.body = React.renderToString(React.createElement(Layout, props));
	yield next;
});

module.exports = router;