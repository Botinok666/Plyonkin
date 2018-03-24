var mysql = require('mysql');

var pool = mysql.createPool({
	connectionLimit: 66,
	host: "127.0.0.1",
	user: "stduser",
	password: "p55-cd53",
	database: "mydb"
});
module.exports = pool;