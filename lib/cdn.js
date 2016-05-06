'use strict'
// let config = require("config")
// let URL = ""
// if (config.online) {
// 	URL = "http://o6r6xrvx6.bkt.clouddn.com"
// }
let URL = "http://o6r6xrvx6.bkt.clouddn.com"
function CDN (path) {
	path = path || ""
	if (!path.startsWith("/")) {
		path = "/" + path
	}
	return URL + path
}
CDN.URL = URL
module.exports = CDN