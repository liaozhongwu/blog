var db = require("../src/database/database");

function* insert (params) { 
	var id = yield db.insert(
		"insert into comment(blog_id, name, phone, email, content) values(?, ?, ?, ?, ?)", 
		[params.blog_id, params.name, params.phone, params.email, params.content])
	.then(function (id) {
		return id;
	});
	return yield selectById({id: id});
}

function* selectByBlogId (params) {
	return yield db.select("select * from comment as c where blog_id = ?", [params.blog_id])
	.then(function (rows) {
		var comments = [];
		rows.map(function (row) {
			comments.push({
				id: row.c.id,
				blog_id: row.c.blog_id,
				name: row.c.name,
				phone: row.c.phone,
				email: row.c.email,
				content: row.c.content,
				createTime: row.c.createTime.toLocaleDateString()
			});
		});
		return comments;
	});
}
function* selectById (params) {
	return yield db.select("select * from comment as c where id = ?", [params.id])
	.then(function (rows) {
		if (rows.length === 0) {
			return null;
		}
		var row = rows[0];
		var comment = {
			id: row.c.id,
			blog_id: row.c.blog_id,
			name: row.c.name,
			phone: row.c.phone,
			email: row.c.email,
			content: row.c.content,
			createTime: row.c.createTime.toLocaleDateString()
		};
		return comment;
	});
}

exports.insert = insert;
exports.selectByBlogId = selectByBlogId;
exports.selectById = selectById;