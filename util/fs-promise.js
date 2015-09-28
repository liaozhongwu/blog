var fs = require("fs");

module.exports = {
	readFile: function (path) {
		return new Promise(function (resolve, reject) {
			fs.readFile(path, function (err, data) {
				if (err) {
					reject(new Error(path + " file not found"));
				} else {
					resolve(data);
				}
			})
		}).then(function (data) {
			return data.toString();
		});
	}
}