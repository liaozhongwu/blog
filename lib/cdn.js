'use strict'
// let config = require("config")
// let URL = ""
// if (config.online) {
// 	URL = "http://cdn.liaozhongwu.com"
// }
let URL = "http://cdn.liaozhongwu.com"
function CDN (path) {
	path = path || ""
	if (!path.startsWith("/")) {
		path = "/" + path
	}
	return URL + path
}
CDN.URL = URL
module.exports = CDN