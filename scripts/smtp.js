var pool = require('./dbpool');
var mailer = require('nodemailer');
let transporter = mailer.createTransport({
	host: 'smtp.mail.yahoo.com',
	port: 465,
	secureConnection: true,
	pool: true,
	maxConnections: 2,
	auth: {
		user: 'itnewstg@yahoo.com',
		pass: '01010111it'
	}
});

function validateEmail(email) {
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

module.exports = {

notify: function(title, id) {
	var sql = "SELECT email FROM subscribers";
	pool.getConnection(function(err, con) {
		con.query(sql, function(errs, result) {
			con.release();
			if (errs) {
				console.log(errs);
				return;
			}
			var mail = {
				from: '"IT NEWS" <itnewstg@yahoo.com>',
				to: '',
				subject: 'Свежие новости',
				html: '<h3>Опубликована новость: <h3>' 
					+ '<a href=http://lenovo-pc/titles/' + id + '>' + title + '</a>'
			};
			transporter.on('idle', () => {
				while (transporter.isIdle() && result.length) {
					mail.to = result.shift().email;
					transporter.sendMail(mail, function(error, info) {
						if (error) {
							console.log(error);
						} else {
							console.log('Mail to ' + mail.to + ': ' + info.response);
						}
					});
				}
			});
			if (transporter.isIdle())
				transporter.emit('idle');
		});
	});
},

subscribe: function(req, res) {
	var udata = JSON.parse(req.body);
	pool.getConnection(function(error, con) {
		var rtext = { text: '' };
		var sql = "SELECT id FROM subscribers WHERE email=?";
		con.query(sql, [udata.email], function(err, result) {
			if (err) {
				console.log(err);
				rtext.text = "Ошибка доступа к БД";
			}
			if (result.length > 0)
				rtext.text = "Вы уже подписаны!";
		});
		if (!validateEmail(udata.email))
			rtext.text = "Неверный адрес";
		if (rtext.text.length == 0) {
			sql = "INSERT INTO subscribers (email) VALUES (?)";
			con.query(sql, [udata.email], function(err, result) {
				con.release();
				if (err)
					console.log(err);
				else {
					console.log('New subscriber ID: ' + result.insertId);
					rtext.text = "Теперь вы подписаны!";
				}
				res.type('text/plain');
				res.send(JSON.stringify(rtext));
			});
		}
		else {
			con.release();
			res.send(JSON.stringify(rtext));
		}
	});
},

feedback: function(req, res) {
	var udata = JSON.parse(req.body);
	if (!validateEmail(udata.email))
	{
		res.sendStatus(400);
		return;
	}
	var mail = {
		from: '"Feedback" <itnewstg@yahoo.com>',
		to: 'umbraanima@yandex.ru',
		subject: 'Обратная связь IT NEWS',
		text: 'От ' + udata.name + '(' + udata.email + '): ' + udata.text
	};
	transporter.sendMail(mail, function(error, info) {
		if (error) {
			console.log(error);
		} else {
			console.log('Feedback sent: ' + info.response);
			res.sendStatus(200);
		}
	});
}
}