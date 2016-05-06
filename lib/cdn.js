'use strict'

const URL = "http://o6pdjw9p2.bkt.clouddn.com";

module.exports = function (path) {
	path = path || ""
	if (!path.startsWith("/")) {
		path = "/" + path
	}
	return URL + path
}