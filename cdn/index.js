'use strict'
const CDN_URL = "http://cdn.liaozhongwu.com"
let hash = require("./hash.json")

function CDN (path) {
	path = path || ""
	if (!path.startsWith("/")) {
		path = "/" + path
	}
	if (typeof process !== undefined && process.env.NODE_ENV === "production") {
		if (/^\/(css|img|js)\//.test(path)) {
	    path = path.replace(/\.[^\/]+$/, function (m) { return "." + hash + m})
	  }
		return CDN_URL + path
	}
	return path
}
CDN.URL = CDN_URL
module.exports = CDN