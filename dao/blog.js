var db = require("../src/database/database");
var commentDao = require("./comment");

function* insert (params) { 
	var id = yield db.insert("insert into blog(title, content) values(?, ?)", [params.title, params.content])
	.then(function (id) {
		return id;
	});
	return yield selectById({id: id});
}

function* update (params) { 
	return yield db.update("update blog set title = ?, content = ? where id = ?", [params.title, params.content, params.id])
	.then(function (data) {
		return data;
	});
}

function* selectById (params) {
	var blog = yield db.select("select * from blog as b where id = ?", [params.id])
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
	blog.comments = yield commentDao.selectByBlogId({blog_id: blog.id});
	return blog;
}

function* select (params) {
	var blogs = yield db.select("select * from blog as b order by id desc", [])
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
	blogs.map(function* (blog) {
		blog.comments = yield commentDao.selectByBlogId({blog_id: blog.id});
	});
	return blogs;
}

exports.insert = insert;
exports.update = update;
exports.selectById = selectById;
exports.select = select;