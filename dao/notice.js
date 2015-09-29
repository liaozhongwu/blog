var db = require("../src/database/database");

function insert (params) { 
	return db.insert("insert into notice(title) values(?)", [params.title])
	.then(function (id) {
		return id;
	});
}

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

exports.insert = insert;
exports.select = select;