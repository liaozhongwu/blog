var db = require("../src/database/database");

function insert (params) { 
	return db.insert("insert into blog(title, content) values(?, ?)", [params.title, params.content])
	.then(function (id) {
		return id;
	});
}

function update (params) { 
	return db.update("update blog set title = ?, content = ? where id = ?", [params.title, params.content, params.id])
	.then(function (data) {
		return data;
	});
}

function selectById (params) {
	return db.select("select * from blog as b where id = ?", [params.id])
	.then(function (rows) {
		if (rows.length === 0) {
			return null;
		}
		var row = rows[0];
		var blog = {
			id: row.b.id,
			title: row.b.title,
			content: row.b.content,
			createTime: row.b.createTime.toLocaleDateString()
		}
		return blog;
	});
}

function select (params) {
	return db.select("select * from blog as b order by id desc", [])
	.then(function (rows) {
		var blogs = [];
		rows.map(function (row) {
			blogs.push({
				id: row.b.id,
				title: row.b.title,
				content: row.b.content,
				createTime: row.b.createTime.toLocaleDateString()
			});
		});
		return blogs;
	});
}

exports.insert = insert;
exports.update = update;
exports.selectById = selectById;
exports.select = select;