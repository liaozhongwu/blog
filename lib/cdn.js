'use strict'
let config = require("config")
const URL = "http://o6pdjw9p2.bkt.clouddn.com"

module.exports = function (path) {
	if (!config.online) {
		return path
	}
	path = path || ""
	if (!path.startsWith("/")) {
		path = "/" + path
	}
	return URL + path
}