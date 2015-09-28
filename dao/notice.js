var db = require("../src/database/database");

function select (params) {
	return db.select("select * from notice as n order by id desc", [])
	.then(function (rows) {
		var notices = [];
		rows.map(function (row) {
			notices.push({
				id: row.n.id,
				title: row.n.title,
				createTime: row.n.createTime.toLocaleDateString()
			});
		});
		return notices;
	});
}

exports.select = select;