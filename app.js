'use strict'
let React = require("react")
,	app = require("koa")()
,	_static = require("koa-static")
,	router = require("./router")
,	config = require("config")
,	port = config.port || 80

app
.use(function* (next) {
	try {
		if (config.online) {
			console.log(this.method + " " + this.href + " from " + this.ip)
			if ( /www\.liaozhongwu\.cn/.test(this.host) ) {
				this.status = 404
				this.body = "404 Not Found."
				return
			}
			if ( !(/www\.liaozhongwu\.com/.test(this.host)) ) {
				this.status = 301
				this.redirect(this.href.replace(this.host, "www.liaozhongwu.com"))
				return
			}
		}
		yield next
	} catch (err) {
		console.log(this.method + " " + this.href + " errored")
		console.error(err)
		this.status = 301
		this.redirect("/")
	}
})
.use(_static("public"))
.use(router.routes())
.use(function* (next) {
	if (this.status === 404) {
		console.log(this.method + " " + this.href + " was not found")
		this.status = 301
		this.redirect("/")
	}
	yield next
})
.listen(port, () => {
  console.log('========================')
  console.log('App is listening to ' + port)
  console.log('========================')

	if (!config.online) {
		require("./gulpfile")
		require("gulp").start("default")
	}
})