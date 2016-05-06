'use strict'
let URL = "http://o6r6xrvx6.bkt.clouddn.com"

module.exports = function (path) {
	path = path || ""
	if (!path.startsWith("/")) {
		path = "/" + path
	}
	return URL + path
}