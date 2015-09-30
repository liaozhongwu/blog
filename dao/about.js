var db = require("../src/database/database");

function* select (params) {
	return yield db.select("select * from about as a", [])
	.then(function (rows) {
		var abouts = [];
		rows.map(function (row) {
			abouts.push({
				id: row.a.id,
				title: row.a.title,
				content: row.a.content,
				createTime: row.a.createTime.toLocaleDateString()
			});
		});
		return abouts;
	});
}

exports.select = select;