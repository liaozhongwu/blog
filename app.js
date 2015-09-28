var React = require("react");
var app = require("koa")();
var _static = require("koa-static");
var router = require("./router/router");
var fs = require("./util/fs-promise");

app.use(router.routes());
app.use(_static("public"));
app.listen(80);