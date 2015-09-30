var React = require("react");
var Lodash = require("lodash");
var router = require("koa-router")();
var body = require("koa-body")();
var aboutDao = require("../dao/about");
var blogDao = require("../dao/blog");
var commentDao = require("../dao/comment");
var noticeDao = require("../dao/notice");
var md5 = require("md5");

router.get("/error", function* (next) {
	var Error = require("../build/page/Error");
	var content = React.renderToString(React.createElement(Error));
	var Layout = require("../build/layout/Base");
	var props = Lodash.assign({content: content}, Error.getMeta());
	this.body = React.renderToString(React.createElement(Layout, props));
	yield next;
});

router.get("/", function* (next) {
	var data = yield blogDao.selectById({id: 1});
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

router.get("/blog/:id/admin", function* (next) {
	var data = yield blogDao.selectById({id: this.params.id || 1});
	if (data === null) {
		this.redirect("/error");
		yield next;
		return;
	}
	var Admin = require("../build/page/Admin");
	var content = React.renderToString(React.createElement(Admin, {data: data}));
	var Layout = require("../build/layout/Base");
	var props = Lodash.assign({content: content, APP_PROPS: {data: data} }, Admin.getMeta());
	this.body = React.renderToString(React.createElement(Layout, props));
	yield next;
});

router.get("/admin", function* (next) {
	var Admin = require("../build/page/Admin");
	var content = React.renderToString(React.createElement(Admin));
	var Layout = require("../build/layout/Base");
	var props = Lodash.assign({content: content}, Admin.getMeta());
	this.body = React.renderToString(React.createElement(Layout, props));
	yield next;
});

router.post("/blog/save", body, function* (next) {
	var id = this.request.body.id;
	var title = this.request.body.title;
	var content = this.request.body.content;
	var password = this.request.body.password;

	// I'm lazy to save in databse
	// if you are searching for the password, please try to decode
	if (md5(password).toLowerCase() === "ea6ddfe6ed0a06f5837aeba4f984db1e") {
		if (id) {
			yield blogDao.update({id: id, title: title, content: content});
			this.redirect("/blog/" + id);
		} else {
			var id = yield blogDao.insert({title: title, content: content});
			yield noticeDao.insert({title: '<a href="/about">lzw</a> published a blog <a href="/blog/' + id + '">' + title + '</a>'})
			this.redirect("/blog/" + id);
		}
	} else {	
		this.redirect("/error");
	}
	yield next;
});

router.post("/comment/save", body, function* (next) {
	var id = this.request.body.id;
	var name = this.request.body.name;
	var phone = this.request.body.phone;
	var email = this.request.body.email;
	var content = this.request.body.content;

	var params = {
		blog_id: id, 
		name: name, 
		phone: phone, 
		email: email, 
		content: content
	};
	this.body = yield commentDao.insert(params);
	yield next;
});

module.exports = router;