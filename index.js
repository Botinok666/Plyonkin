var mysql = require('mysql');
var con = mysql.createConnection({
  host: "localhost",
  user: "stduser",
  password: "p55-cd53",
  database: "mydb"
});
var login = require('./scripts/login');
var express = require('express');
var app = express();
var session = require('express-session');
var bodyParser = require('body-parser');
var formidable = require('formidable');
var fs = require('fs');
var path = require('path');
var pool = require('./scripts/dbpool');
var smtp = require('./scripts/smtp');
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
app.get('/all',function(req,res) {
    res.render('All');
});
app.get('/titles/:tID', function(req, res) {
	var sql = "SELECT news.fullDesc, news.title, news.thumbImage, users.name, " 
		+ "(SELECT SUM(loyce) FROM loyces WHERE loyces.titleID=news.id) AS loyce "
		+ "FROM news INNER JOIN users ON news.authorID=users.userID WHERE news.id=?";
	pool.getConnection(function(error, con) {
		con.query(sql, [req.params.tID], function(err, result) {
			con.release();
			if (err)
				console.log(err);
			if (result == null || result.length == 0)
				return;
			res.render('News', {
				title: "news/" + result[0].fullDesc,
				tID: req.params.tID,
				nImage: '/images/' + result[0].thumbImage,
				nTitle: result[0].title,
				nAuthor: result[0].name,
				rate: (result[0].loyce == null ? 0 : result[0].loyce)
				}, function(errs, thtml) {
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
app.get('/addnews', function(req, res) {
	var result = 'null';
	if (req.query.result != null)
		result = req.query.result;
    res.render('addnews', { ulStatus: result },
	function(errs, thtml) {
		if (errs)
			console.log(errs);
		else
			res.send(thtml);
	});
});
app.get('/registraion', function(req, res) {
    res.render('Registraion');
});
app.get('/profile', function(req, res) {
	var result = 'null';
	if (req.query.result != null)
		result = req.query.result;
    res.render('profile', { ulStatus: result },
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
		+ "WHERE comments.titleID=? ORDER BY comments.commTimeMs DESC";
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
app.post('/post/:tID', textParser, function(req, res) {
	if (req.session.uID == null) {
		res.sendStatus(401);
		return;
	}
	var d = new Date();
	var comm = [req.params.tID, req.session.uID, d.getTime(), req.body];
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
app.post('/load/:offset-:cnt', textParser, function(req, res) {
	var sql = "SELECT titleID FROM extraid WHERE type='Main title'";
	pool.getConnection(function(error, con) {
		con.query(sql, function(err, result) {
			if (err)
				console.log(err);
			var sql2 = '';
			if (req.params.cnt < 1) {
				sql2 = "SELECT id, title, shortDesc, thumbImage, " +
				"(SELECT SUM(loyce) FROM loyces WHERE loyces.titleID=news.id) AS loyce, " +
				"(SELECT COUNT(titleID) FROM comments WHERE comments.titleID=news.id) AS comments " +
				" FROM news WHERE id=" + result[0].titleID;
			} else {
				sql2 = "SELECT users.name, news.id, news.title, news.shortDesc, news.thumbImage, " +
					"(SELECT SUM(loyce) FROM loyces WHERE loyces.titleID=news.id) AS loyce, " +
					"(SELECT COUNT(titleID) FROM comments WHERE comments.titleID=news.id) AS comments " +
					"FROM news LEFT JOIN users ON users.userID=news.authorID WHERE news.id<>" +
					result[0].titleID + " ORDER BY news.id DESC LIMIT " + req.params.offset + ", " + req.params.cnt;
			}
			con.query(sql2, function(err2, result2) {
				con.release();
				if (err2)
					console.log(err2);
				res.type('text/plain');
				res.send(JSON.stringify(result2));
			});
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
					{
						res.redirect('/Profile?result=true');
					}
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
			res.redirect('/AddNews?result=false');
			return;
		}
		fs.rename(files.ejsUp.path, './views/news/' + files.ejsUp.name, function(error) {
			if (error)
			{
				console.log(error);
				res.redirect('/AddNews?result=false');
				return;
			}
			fs.rename(files.imageUp.path, './images/' + files.imageUp.name, function(err2) {
				if (err2)
				{
					console.log(err2);
					res.redirect('/AddNews?result=false');
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
							res.redirect('/AddNews?result=false');
						}
						else
						{
							res.redirect('/AddNews?result=true');
							smtp.notify(fields.ntitle, result.insertId);
						}
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
		var sql = 'SELECT accLevel FROM users WHERE userID=?';

    //res.send(JSON.stringify({ "uID": req.session.uID, "name": req.session.name }));
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
app.post('/api/params', login.auth, textParser, function(req, res) {
	var uparams = JSON.parse(req.body);
	if (uparams.tID != null) {
		var sql = 'SELECT authorID FROM news WHERE id=?';
		pool.getConnection(function(error, con) {
			con.query(sql, [uparams.tID], function(err, result) {
				if (err)
					console.log(err);
				if (result.length > 0)
				{
					var sql2 = "UPDATE extraId SET titleID=? WHERE type='Main title'";
					con.query(sql2, [uparams.tID], function(error2, result2) {
						con.release();
						if (error2)
							console.log(error2);
						res.type('text/plain');
						res.send(JSON.stringify({ "tID": uparams.tID }));
					});
				} else {
					con.release();
					res.type('text/plain');
					res.send(JSON.stringify({ "tID": -1 }));
				}
			});
		});
	} else {
		res.type('text/plain');
		res.send(JSON.stringify({ "tID": -1 }));
	}
});
app.post('/api/profile', login.auth, function(req, res) {
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
app.post('/api/AddNews', login.auth, function(req, res) {
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
//Mailing
app.post('/api/feedback', textParser, smtp.feedback);
app.post('/api/subscribe', textParser, smtp.subscribe);
//Loyce section
app.post('/loyce/:mode-:tID', login.auth, function(req, res) {
	pool.getConnection(function(error, con) {
		var sql = 'SELECT loyce FROM loyces WHERE userID=? AND titleID=?';
		con.query(sql, [req.session.uID, req.params.tID], function(err, result) {
			if (err)
				console.log(err);
			var ret;
			if (result.length > 0) {
				ret = result[0].loyce;
				if (req.params.mode == 'set') {
					ret ^= 1;
					sql = 'UPDATE loyces SET loyce=? WHERE userID=? AND titleID=?';
					con.query(sql, [ret, req.session.uID, req.params.tID], 
						function(err2, result2) {
						if (err2)
							console.log(err2);
						retLoyces(res, con, req.params.tID, ret);
					});
				} else {
					retLoyces(res, con, req.params.tID, ret);
				}
			} else {
				if (req.params.mode == 'set') {
					sql = 'INSERT INTO loyces(userID, titleID, loyce) VALUES (?,?,1)';
					con.query(sql, [req.session.uID, req.params.tID],
						function(err2, result2) {
						if (err2)
							console.log(err2);
						retLoyces(res, con, req.params.tID, 1);
					});
				} else {
					retLoyces(res, con, req.params.tID, 0);
				}
			}
		});
	});
});
function retLoyces(res, con, tID, lval) {
	var sql = "SELECT SUM(loyce) AS loyce FROM loyces WHERE titleID=?";
	con.query(sql, [tID], function(err3, result3) {
		con.release();
		if (err3)
			console.log(err3);
		textRet = JSON.stringify({ "loyce": lval, "sum": result3[0].loyce });
		res.type('text/plain');
		res.send(textRet);
	});
}
app.post('/getPopular', textParser, function(req, res) {
	var sql = "SELECT id, title, " 
		+ "(SELECT SUM(loyce) FROM loyces WHERE loyces.titleID=news.id) AS loyce, "
		+ "(SELECT COUNT(titleID) FROM comments WHERE comments.titleID=news.id) AS comments "
		+ "FROM news ORDER BY loyce DESC LIMIT 4";
	pool.getConnection(function(error, con) {
		con.query(sql, function(err, result) {
			con.release();
			if (err)
				console.log(err);
			var textRet = JSON.stringify(result);
			res.type('text/plain');
			res.send(textRet);
		});
	});
});

app.listen(1666, function(){
    console.log('Node server running @ http://localhost')
});
