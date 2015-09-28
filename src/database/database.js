var mysql = require("mysql");

var conn = mysql.createConnection({
	host: "localhost",
	port: "3306",
	user: "root",
	password: "",
	database: "blog"
});

function select (sql, params) {
	return new Promise(function (resolve, reject) {
		conn.query({
			sql: sql,
			values: params,
			nestTables: true
		}, function (err, rows) {
			if (err) {
				reject(err);
				return;
			}
			resolve(rows);
		});
	});
}

function insert (sql, params) {
	return new Promise(function (resolve, reject) {
		conn.query(sql, params, function (err, data) {
			if (err) {
				reject(err);
				return;
			}
			resolve(data.insertId);
		});
	});
}

function update (sql, params) {
	return new Promise(function (resolve, reject) {
		conn.query(sql, params, function (err, data) {
			if (err) {
				reject(err);
				return;
			}
			resolve(data);
		});
	});
}

exports.select = select;
exports.insert = insert;
exports.update = update;