'use strict'
let React = require("react")
,	app = require("koa")()
,	_static = require("koa-static")
,	router = require("./router")
,	config = require("config")
,	port = config.port || 80

app
.use(_static("public"))
.use(router.routes())
.listen(port, () => {
  console.log('========================')
  console.log('App is listening to ' + port)
  console.log('========================')

	if (!config.prod) {
		require("./gulpfile")
		require("gulp").start("watch")
	}
})