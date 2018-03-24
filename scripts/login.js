var pool = require('./dbpool');
var bcrypt = require('bcrypt');
module.exports = {
	
login: function(req, res) {
	var time = new Date();
	var udata = JSON.parse(req.body);
	pool.getConnection(function(error, con) {
		var rtext = { uID: -1, text: "" };
		var sql = 'SELECT userID, password FROM users WHERE name=?';
		con.query(sql, [udata.name], function(err, result) {
			if (err)
				console.log(err);
			else if (result.length > 0) { //Пользователь найден - проверим его пароль
				//console.log(result[0].userID);
				bcrypt.compare(udata.password, result[0].password, function(errh, resh) {
					if (resh == true) {
						sql = 'UPDATE users SET loggedIn=' + time.getTime() + 
							' WHERE userID=' + result[0].userID;
						con.query(sql, function(err, result1) {
							con.release();
							if (err)
								console.log(err);
							rtext.text = "Вход выполнен";
							rtext.uID = result[0].userID;
							res.send(JSON.stringify(rtext));
						});
					}
					else {
						rtext.text =  "Неверный пароль!";
						con.release();
						res.send(JSON.stringify(rtext));
					}
				});				
			}
			else {
				rtext.text = "Пользователь " + udata.name + " ещё не зарегистрирован";
				con.release();
				res.type('text/plain');
				res.send(JSON.stringify(rtext));				
			}
		});
	});
},

regnew: function(req, res) {
    var time = new Date();
	var udata = JSON.parse(req.body);
	bcrypt.hash(udata.password, 9, function(errh, hash) {
		pool.getConnection(function(error, con) {
			var rtext = { uID: -1, text: "" };
			var sql = "SELECT userID FROM users WHERE name=?";
			con.query(sql, [udata.name], function(err, result) {
				if (err) {
					rtext.text = "Ошибка доступа к БД";
					console.log(err);
				}
				if (result.length > 0)
					rtext.text = "Пользователь " + udata.name + " уже зарегистрирован!";
			});
			if (rtext.text.length == 0) {
				sql = "INSERT INTO users (name, password, created, loggedIn) VALUES (?)";
				var user = [udata.name, hash, time.getTime(), time.getTime()];
				con.query(sql, [user], function(err, result) {
					con.release();
					if (err)
						console.log(err);
					else {
						rtext.uID = result.insertId;
						console.log('New user ID: ' + rtext.uID);
						rtext.text = "Регистрация прошла успешно";
					}
					if (res != null)
					{
						res.type('text/plain');
						res.send(JSON.stringify(rtext));					
					}
				});
			}
			else {
				con.release();
				if (res != null)
					res.send(JSON.stringify(rtext));
			}
		});
	});
}
}