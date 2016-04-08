var React = require("react")
,	app = require("koa")()
,	_static = require("koa-static")
,	router = require("./router")
, config = require("config")
, port = config.port || 80

app.use(router.routes());
app.use(_static("public"));
app.listen(port, () => {
  console.log('========================')
  console.log('App is listening to ' + port)
  console.log('========================')
})
