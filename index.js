var mysql = require('mysql');
var con = mysql.createConnection({
  host: "127.0.0.1",
  user: "stduser",
  password: "p55-cd53"
});
var login = require('./scripts/login');
con.connect(function(errc) {
	if (errc) throw errc;
	var sql = "CREATE DATABASE IF NOT EXISTS mydb CHARACTER SET utf8 COLLATE utf8_unicode_ci";
	con.query(sql, function (err, result) {
		if (err) throw err;
	});
	con.changeUser({database : 'mydb'}, function(err) {
		if (err) throw err;
		console.log("Database connected");
	});
	sql = "CREATE TABLE IF NOT EXISTS users (userID INT AUTO_INCREMENT PRIMARY KEY, " +
		"name VARCHAR(30), password CHAR(60) CHARACTER SET ascii COLLATE ascii_bin, " +
		"created DOUBLE, loggedIn DOUBLE, userPic VARCHAR(30) DEFAULT NULL, " +
		"accLevel TINYINT DEFAULT 0) CHARACTER SET utf8 COLLATE utf8_unicode_ci";
	con.query(sql, function (err, result) {
		if (err) throw err;
		console.log("Table users linked");
		con.query("SELECT userID FROM users LIMIT 3", function (erro, res) {
			if (erro) throw erro;
			if (res.length < 2) {
				var req = { "body": JSON.stringify({ 'name': 'Anton Drugalev', 'password': '12345' })}
				login.regnew(req, null);
				req = { "body": JSON.stringify({ 'name': 'Николай Закоморный', 'password': '67890' })}
				login.regnew(req, null);
				req = { "body": JSON.stringify({ 'name': 'Григорий Зотенко', 'password': 'abcde' })}
				login.regnew(req, null);
			}
		});		
	}); 	
	sql = "CREATE TABLE IF NOT EXISTS comments (id INT AUTO_INCREMENT PRIMARY KEY, " +
		"titleID INT, userID INT, commTimeMs DOUBLE, commText TEXT) " +
		"CHARACTER SET utf8 COLLATE utf8_unicode_ci";
	con.query(sql, function (err, result) {
		if (err) throw err;
		console.log("Table comments linked");
	});
	sql = "CREATE TABLE IF NOT EXISTS news (id INT AUTO_INCREMENT PRIMARY KEY, " +
		"authorID INT, title VARCHAR(90), shortDesc VARCHAR(90), fullDesc VARCHAR(30), " + 
		"thumbImage VARCHAR(30), createdTime DATETIME DEFAULT CURRENT_TIMESTAMP) " + 
		"CHARACTER SET utf8 COLLATE utf8_unicode_ci";
	con.query(sql, function (err, result) {
		if (err) throw err;
		console.log("Table news linked");
		con.query("SELECT id FROM news LIMIT 5", function (erro, res) {
			if (erro) throw erro;
			if (res.length < 4) {
				var isql = "INSERT INTO news (authorID, title, shortDesc, fullDesc, thumbImage) " +
					"VALUES ?";
				var values = [
				[1, 'Ошибка в MACOS, IOS и WATCHOS позволяет рушить…', 'Краткое описание 1', 'macos.ejs', '2.jpg'],
				[1, 'Смартфон XIAOMI MI MIX 2S засветился в первом видео', 'Краткое описание 2', 'xiaomi1.ejs', '1.jpg'],
				[2, 'IOS 11.3: Была выпущена бета-версия для разработчиков и тестров', 'Краткое описание 3', 'ios113.ejs', 'ios-logo-icon-100733550.jpg'],
				[1, 'Зачем тебе уши, если ты не слушаешь Антона Другалева?', 'Краткое описание 4', 'master.ejs', 'V-sIxy4oW4g.jpg']
				];
				con.query(isql, [values], function(errq, resq) {
					if (errq) throw errq;
					console.log("Добавлено новостей: " + resq.affectedRows);
				});
			}
		});
	});
});

var express = require('express');
var app = express();
var session = require('express-session');
var bodyParser = require('body-parser');
var formidable = require('formidable');
var fs = require('fs');
var path = require('path');
var pool = require('./scripts/dbpool');
var textParser = bodyParser.text();
app.use('/node_modules', express.static(__dirname + '/node_modules'));
app.use('/style', express.static(__dirname + '/style'));
app.use('/scripts', express.static(__dirname + '/scripts'));
app.use('/css', express.static(__dirname + '/css'));
app.use('/images', express.static(__dirname + '/images'));
app.use('/fonts', express.static(__dirname + '/fonts'));
app.use('/news', express.static(__dirname + '/views/news'));
app.set('view engine', 'ejs');
app.use(session({
    secret: '2C44-4D44-WppQ38S',
    resave: true,
    saveUninitialized: true
}));

app.get('/',function(req,res) {
    res.render('Main');
});
app.get('/titles/:tID', function(req, res) {
	var sql = "SELECT fullDesc FROM news WHERE id=?";
	pool.getConnection(function(error, con) {
		con.query(sql, [req.params.tID], function(err, result) {
			con.release();
			if (err)
				console.log(err);
			res.render('News', { title: "news/" + result[0].fullDesc, tID: req.params.tID }, 
			function(errs, thtml) {
				if (errs)
					console.log(errs);
				else
					res.send(thtml);
			});
		});
	});
});
app.get('/feedback', function(req, res) {
    res.render('Feedback');
});
app.get('/profile', function(req, res) {
	var result = 'null';
	if (req.query.result != null)
		result = req.query.result;
    res.render('Profile', { ulStatus: result },
	function(errs, thtml) {
		if (errs)
			console.log(errs);
		else
			res.send(thtml);
	});
});

app.post('/show/:tID', function(req, res) {
	var sql = "SELECT users.name, users.userPic, comments.commTimeMs, comments.commText "
		+ "FROM comments LEFT JOIN users ON users.userID=comments.userID "
		+ "WHERE comments.titleID=?";
	var textRet = "";		
	pool.getConnection(function(error, con) {
		con.query(sql, [req.params.tID], function(err, result) {
			con.release();
			if (err)
				console.log(err);
			textRet = JSON.stringify(result);
			res.type('text/plain');
			res.send(textRet);
		});
	});
});
app.post('/post/:tID-:uID', textParser, function(req, res) {
	var d = new Date();
	var comm = [req.params.tID, req.params.uID, d.getTime(), req.body];
	var sql = "INSERT INTO comments (titleID, userID, commTimeMs, commText) VALUES (?)";
	pool.getConnection(function(error, con) {	
		con.query(sql, [comm], function (err, result) {
			con.release();
			if (err)
				console.log(err);
			else
				res.sendStatus(200); //Send status OK
		});
	});
});
app.post('/load/:cnt', textParser, function(req, res) {
	var sql = "SELECT users.name, news.id, news.title, news.shortDesc, news.thumbImage " + 
		"FROM news LEFT JOIN users ON users.userID=news.authorID ORDER BY news.id DESC LIMIT " +
		req.params.cnt;
	var textRet = "";		
	pool.getConnection(function(error, con) {
		con.query(sql, function(err, result) {
			con.release();
			if (err)
				console.log(err);
			textRet = JSON.stringify(result);
			res.type('text/plain');
			res.send(textRet);
		});
	});
});
// Uploading section
app.post('/uploadPic', function(req, res) {
	var form = new formidable.IncomingForm();
	form.parse(req, function(err, fields, files) {
		if (err || files.imageUp.name.length < 4) {
			res.redirect('/Profile?result=false');
			return;
		}
		var newpath = 'u' + req.session.uID + path.extname(files.imageUp.name);
		fs.rename(files.imageUp.path, './images/' + newpath, function(error) {
			if (error)
			{
				console.log(error);
				res.redirect('/Profile?result=false');
				return;
			}
			var sql = "UPDATE users SET userPic=? WHERE userID=" + req.session.uID;
			pool.getConnection(function(err2, con) {
				con.query(sql, [newpath], function(errs, result) {
					con.release();
					if (errs) {
						console.log(errs);
						res.redirect('/Profile?result=false');
					}
					else
						res.redirect('/Profile?result=true');
				});
			});
		});
	});
});
app.post('/uploadNews', function(req, res) {
	var form = new formidable.IncomingForm();
	form.parse(req, function(err, fields, files) {
		if (err || files.imageUp.name.length < 4 || files.ejsUp.name.length < 4
			|| fields.ndescr.length < 4 || fields.ntitle.length < 4) {
			res.redirect('/Profile?result=false');
			return;
		}
		fs.rename(files.ejsUp.path, './views/news/' + files.ejsUp.name, function(error) {
			if (error)
			{
				console.log(error);
				res.redirect('/Profile?result=false');
				return;
			}
			fs.rename(files.imageUp.path, './images/' + files.imageUp.name, function(err2) {
				if (err2)
				{
					console.log(err2);
					res.redirect('/Profile?result=false');
					return;
				}
				var sql = "INSERT INTO news (authorID, title, shortDesc, fullDesc, thumbImage) " +
					"VALUES (?)";
				var value = [req.session.uID, fields.ntitle, fields.ndescr, 
					files.ejsUp.name, files.imageUp.name];
				pool.getConnection(function(err3, con) {
					con.query(sql, [value], function(errs, result) {
						con.release();
						if (errs) {
							console.log(errs);
							res.redirect('/Profile?result=false');
						}
						else
							res.redirect('/Profile?result=true');
					});
				});
			});
		});
	});
});
// Authentication and Authorization
app.post('/api/register', textParser, login.regnew);
app.post('/api/login', textParser, login.login);
app.post('/api/logout', login.unauth, function(req, res) {
	req.session.destroy();
	res.sendStatus(200);
});
app.post('/api/auth', login.auth, function(req, res) {
    res.send(JSON.stringify({ "uID": req.session.uID, "name": req.session.name }));
});
app.post('/api/profile', login.auth,function(req, res) {
	var sql = 'SELECT accLevel FROM users WHERE userID=?';
	pool.getConnection(function(error, con) {
		con.query(sql, [req.session.uID], function(err, result) {
			con.release();
			if (err)
				console.log(err);
			textRet = JSON.stringify({ 
				"uID": req.session.uID, 
				"name": req.session.name,
				"accLevel": result[0].accLevel });
			res.type('text/plain');
			res.send(textRet);
		});
	});	
});

app.listen(80, function(){
    console.log('Node server running @ http://localhost')
});