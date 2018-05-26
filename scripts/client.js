function showLogIn2() {
	$('#textfield').hide();
	$('#sendBtn').hide();
	$("#hExit2").hide()
	$("#hExit").hide()
	$("#hEnter").show()	
	$('#hProfile').hide();		
}
function showLogIn(elem) {
	$(elem).empty();
	showLogIn2();
}
function showLogOut(uname, elem) {
	$(elem).empty();
	$('#modal').hide();
	$("#hExit").hide()
	$("#hEnter").hide()	
	$("#hExit2").show()
	$('#hProfile').show();		
	$('#hProfile2').html(uname);	
}
function showLogOut2(uname) {
	$('#modal').hide();
	$("#hExit").hide()
	$("#hEnter").hide()	
	$("#hExit2").show()
	$('#hProfile').show();		
	$('#hProfile2').html(uname);	
}


function putPreviewTitle(obj, elem) {
	var divc = $('<div/>', { 'class': 'content' }).appendTo(elem);
	var divc4 = $('<div/>', { 'class': 'picblock' }).appendTo(divc);
	var ac = $('<a/>', { 'href': '/titles/' + obj.id }).appendTo(divc4);
	$('<img/>', { 'class': 'imgcol', 'src': '/images/' + obj.thumbImage }).appendTo(ac);
	$('<h4/>').html(obj.title).appendTo(divc);
	$('<h3/>').html(obj.name).appendTo(divc);
	$('<h2/>').html(obj.shortDesc).appendTo(divc);
	
	var divc2 = $('<div/>').appendTo(divc);
	var text = '&#10000;' + " " + obj.comments + " ";
	$('<h1/>').html(text).appendTo(divc2);
	$('<h1/>').html('&#x2764; ' + (obj.loyce == null ? 0 : obj.loyce)).appendTo(divc2);
		
	var divc3 = $('<div/>').appendTo(divc);
	var ac2 = $('<a/>', { 'href': '/titles/' + obj.id }).appendTo(divc3);
	$('<p/>').html('Читать далее').appendTo(ac2);
}

function putComment(obj, elem) {
	var d = new Date(obj.commTimeMs);
	var divc = $('<div/>', { 'class': 'comments' }).appendTo(elem);
	if (obj.userPic == null)
		obj.userPic = 'null.jpg';
	var imgc = $('<img/>', { 'class': 'imgcol',
		'src': '/images/' + obj.userPic }).appendTo(divc);
	var h4c = $('<h4/>').html(obj.name + " в " + d.toLocaleString()).appendTo(divc);
	var pc = $('<p/>').html(obj.commText).appendTo(divc);
}

function loadHeadTitle() {
	$('.main_news').empty();
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var obj = JSON.parse(this.responseText);
			if (obj.length > 0) {
				var a0 = $('<a/>', { 'href': '/titles/' + obj[0].id }).appendTo($('.main_news'));
				var img0 = $('<img/>', { 'class': 'newsPicture',
					'src': '/images/' + obj[0].thumbImage }).appendTo(a0);
				var h3c = $('<h3/>').appendTo($('.main_news'));
				var a1 = $('<a/>', { 'href': '/titles/' + obj[0].id }).html(obj[0].title).appendTo(h3c);
				var p0 = $('<p/>').html(obj[0].shortDesc).appendTo($('.main_news'));
				var divc1 = $('<div/>').appendTo(p0);

				$('<h1/>').html('&#10000; ' + obj[0].comments).appendTo(divc1);
				$('<h1/>').html('&#x2764; ' + (obj[0].loyce == null ? 0 : obj[0].loyce)).appendTo(divc1);
			}
		}
	};

	xhttp.open("POST", "/load/0-0", true);
	xhttp.send(null);
}

function loadPopular() {
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var obj = JSON.parse(this.responseText);
			$('.popular').empty();
			$('<h3/>').html('ПОПУЛЯРНОЕ').appendTo($('.popular'));
			for (x in obj) {
				var pp = $('<p/>').appendTo($('.popular'));
				var ap = $('<a/>', { 'href': '/titles/' + obj[x].id }).html(obj[x].title).appendTo(pp);
				var bp = $('<h2/>').html(' &#x2764; ' + (obj[x].loyce == null ? 0 : obj[x].loyce)).appendTo(pp);
				$('<h2/>').html(' &#10000; ' + obj[x].comments).appendTo(pp);

				
			}
		}
	};

	xhttp.open("POST", '/getPopular', true);
	xhttp.send(null);
}

function loadMainPageTitles() {
	var xhttp = new XMLHttpRequest();
	var newsCnt = 4;
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var obj = JSON.parse(this.responseText);
			if (obj.length > 0) {
				putPreviewTitle(obj[0], $("#leftCol"));
				putPreviewTitle(obj[1], $("#rightCol"));
				putPreviewTitle(obj[2], $("#leftCol"));
				putPreviewTitle(obj[3], $("#rightCol"));
				$(document).ready(function(){
					$('.main_news').mouseout(function(){
						$('.newsPicture').stop().animate({opacity:'0.35'},600);
					});
					$('.main_news').mouseover(function(){
						$('.newsPicture').stop().animate({opacity:'0.7'},300);
					});
					$('.imgcol').mouseout(function(){
						$(this).stop().animate({opacity:'1'},600);
					});
					$('.imgcol').mouseover(function(){
						$(this).stop().animate({opacity:'0.35'},300);
					});
				});
			}
		}
	};
	xhttp.open("POST", "/load/0-" + newsCnt, true);
	xhttp.send(null);
}

function getComm(tID)	{
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var obj = JSON.parse(this.responseText);
			$("#comments").empty();
			if (obj.length == 0) {
				$("#nocommentstext").html("Комментариев пока нет, будьте первыми");
			}
			else for (x in obj) {
				putComment(obj[x], $("#comments"));
			}
		}
	};
	xhttp.open("POST", "/show/" + tID, true);
	xhttp.send(null);
}

function postComm(tID)	{
	if ($("#textfield").val().length < 2)	{
		window.alert("Вам нужно напечатать хотя бы 2 символа!");
		return;
	}
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			getComm(tID);
		}
	};
	xhttp.open("POST", "/post/" + tID, true);
	xhttp.setRequestHeader("Content-type", "text/plain");
	xhttp.send($("#textfield").val());
	$("#textfield").val("");
}

function logIn2() {
	var uData = { "name": $("#uname").val(), "password": $("#psw").val() };
	if ((uData.name.length < 3) || (uData.password.length < 3)) {
		$("#logInfo").html("Имя и пароль должны состоять хотя бы из 3 символов!");
		return;
	}
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var obj = JSON.parse(this.responseText);
			if (obj.uID > -1) {
				//showLogOut(uData.name, $("#loginarea"));
				$('#hExit').show();
				$('#hEnter').hide();
				$('.window').hide();
				$('#mask, .window').hide();
				$('#hProfile').show();		
				$('#hProfile2').html(uData.name);			
			
			}
			else
				$("#logInfo").html(obj.text);
		}
	};
	xhttp.open("POST", "/api/login", true);
	xhttp.setRequestHeader("Content-type", "text/plain");
	xhttp.send(JSON.stringify(uData));
}
function logIn(tID) {
	var uData = { "name": $("#uname").val(), "password": $("#psw").val() };
	if ((uData.name.length < 3) || (uData.password.length < 3)) {
		$("#logInfo").html("Имя и пароль должны состоять хотя бы из 3 символов!");
		return;
	}
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var obj = JSON.parse(this.responseText);
			if (obj.uID > -1) {
				showLogOut(uData.name, $("#loginarea"));
				$("#sendBtn").attr("disabled", false);
				$('#textfield').show();
				$('#sendBtn').show();
				$('.window').hide();
				$('#mask, .window').hide();
				getLoyce(tID);
			}
			else
				$("#logInfo").html(obj.text);
		}
	};
	xhttp.open("POST", "/api/login", true);
	xhttp.setRequestHeader("Content-type", "text/plain");
	xhttp.send(JSON.stringify(uData));
}

function regNew() {
	if (($("#uname").val().length < 3) || ($("#psw").val().length < 3)) {
		$("#logInfo").html("Имя и пароль должны состоять хотя бы из 3 символов!");
		return;
	}
	$('#Login').attr("disabled", true);
	$('#Register').attr('onclick', "register('" + $('#psw').val() + "')");
	$('#psw').val('');
	$('#logInfo').html('Для завершения регистрации введите пароль ещё раз');
}
function regNew2() {
document.location.href = "/Registraion";
}
function register2() {
	if (($("#uname").val().length < 3) || ($("#password").val().length < 3) || ($("#phone").val().length < 3) 
		|| ($("#name").val().length < 3) || ($("#patronymic").val().length < 3) || ($("#age").val().length < 2))		{
		$("#res").html("Все поля должны быть заполнены!");
		return;
	}
	var uData = { "name": $("#uname").val(), "password": $("#password").val(), "phoneNum": $("#phone").val(),
		"name1": $("#name").val(), "name2": $("#patronymic").val(), "age": $("#age").val()};

	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var obj = JSON.parse(this.responseText);
			if (obj.uID > -1) {
				showLogOut(uData.name, $("#loginarea"));
				$("#sendBtn").attr("disabled", false);
			}
			else
				$("#logInfo").html(obj.text);
		}
	};
	xhttp.open("POST", "/api/register", true);
	xhttp.setRequestHeader("Content-type", "text/plain");
	xhttp.send(JSON.stringify(uData));
		$("#res").html("Аккаунт был успешно создан!");

}
function register(pwd) {
	var uData = { "name": $("#uname").val(), "password": $("#psw").val() };
	if (pwd != uData.password) {
		$("#logInfo").html("Пароли не совпали");
		$('#Login').attr("disabled", false);
		$('#Register').attr('onclick', "regNew()");
		$('#psw').val('');
		return;
	}
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var obj = JSON.parse(this.responseText);
			if (obj.uID > -1) {
				showLogOut(uData.name, $("#loginarea"));
				$("#sendBtn").attr("disabled", false);
			}
			else
				$("#logInfo").html(obj.text);
		}
	};
	xhttp.open("POST", "/api/register", true);
	xhttp.setRequestHeader("Content-type", "text/plain");
	xhttp.send(JSON.stringify(uData));
}
function logOut2() {
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			showLogIn($('#loginarea'));
			$("#sendBtn").attr("disabled", true);
			$('#modal').show();
		}
	};
	xhttp.open("POST", "/api/logout", true);
	xhttp.send(null);
}
function logOut() {
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			showLogIn2();
		}
	};
	xhttp.open("POST", "/api/logout", true);
	xhttp.send(null);
}
function myLoad(tID) {
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4) {
			if (this.status == 200) {
				var obj = JSON.parse(this.responseText);
				showLogOut(obj.name, $("#loginarea"));
				$("#sendBtn").attr("disabled", false);
			}
			else {
				showLogIn2()
			}
		}
	};
	xhttp.open("POST", "/api/auth", true);
	xhttp.send(null);
	getComm(tID);
	getLoyce(tID);
}

function getLoyce(tID) {
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var obj = JSON.parse(this.responseText);
			if (obj.loyce == 1)
				$("#loyceBtn").attr("style", "color:#0177D9");
			else
				$("#loyceBtn").attr("style", "color:gray");
		}
	};
	xhttp.open("POST", "/loyce/get-" + tID, true);
	xhttp.send(null);
}

function setLoyce(tID) {
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var obj = JSON.parse(this.responseText);
			if (obj.loyce == 1)
				$("#loyceBtn").attr("style", "color:#0177D9");
			else
				$("#loyceBtn").attr("style", "color:gray");
			$('#loyceCnt').html('Рейтинг: ' + (obj.sum == null ? 0 : obj.sum));
		}
	};
	xhttp.open("POST", "/loyce/set-" + tID, true);
	xhttp.send(null);	
}
