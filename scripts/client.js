function showLogIn(elem) {
	$(elem).empty();
	var form0 = $('<form/>').html('Логин: ').appendTo(elem);
	var input0 = $('<input/>', { 'id': 'uname', 'type': 'text' }).appendTo(form0);
	$(form0).append('Пароль: ');
	var input1 = $('<input/>', { 'id': 'psw', 'type': 'password' }).appendTo(form0);
	var input2 = $('<input/>', { 'id': 'Login', 'type': 'button',
		'onclick': 'logIn()', 'value': 'Войти' }).appendTo(form0);
	var input3 = $('<input/>', { 'id': 'Register', 'type': 'button',
		'onclick': 'regNew()', 'value': 'Новый пользователь' }).appendTo(form0);
	var p0 = $('<p/>', { 'id': 'logInfo' }).html('Войдите, чтобы оставить комментарий').appendTo(elem);
}

function showLogOut(uname, elem) {
	$(elem).empty();
	var form0 = $('<form/>').html('Вы вошли как ').appendTo(elem);
	var a0 = $('<a/>', { 'href': '/profile' }).html(uname).appendTo(form0);
	var input0 = $('<input/>', { 'type': 'button', 'onclick': 'logOut()', 'value': 'Выйти' }).appendTo(form0);
}

function putPreviewTitle(obj, elem) {
	var divc = $('<div/>', { 'class': 'content' }).appendTo(elem);
	var ac = $('<a/>', { 'href': '/titles/' + obj.id }).appendTo(divc);
	var imgc = $('<img/>', { 'class': 'imgcol', 'src': '/images/' + obj.thumbImage }).appendTo(ac);
	var h4c = $('<h4/>').html(obj.title).appendTo(divc);
	var h3c = $('<h3/>').html(obj.name).appendTo(divc);
	var h2c = $('<h2/>').html(obj.shortDesc).appendTo(divc);
	var ac2 = $('<a/>', { 'href': '/titles/' + obj.id }).appendTo(divc);
	var pc = $('<p/>').html('Читать далее…').appendTo(ac2);
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
				var img0 = $('<img/>', { 'class': 'gek',
					'src': '/images/' + obj[0].thumbImage }).appendTo(a0);
				var h3c = $('<h3/>').appendTo($('.main_news'));
				var a1 = $('<a/>', { 'href': '/titles/' + obj[0].id }).html(obj[0].title).appendTo(h3c);
				var p0 = $('<p/>').html(obj[0].shortDesc).appendTo($('.main_news'));
			}
		}
	};
	xhttp.open("POST", "/load/0", true);
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
				putPreviewTitle(obj[1], $("#leftCol"));
				putPreviewTitle(obj[2], $("#rightCol"));
				putPreviewTitle(obj[3], $("#rightCol"));
				$(document).ready(function(){
					$('.main_news').mouseout(function(){
						$('.gek').stop().animate({opacity:'0.35'},600);
					});
					$('.main_news').mouseover(function(){
						$('.gek').stop().animate({opacity:'0.7'},300);
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
	xhttp.open("POST", "/load/" + newsCnt, true);
	xhttp.send(null);
}

function getComm(tID)	{
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var obj = JSON.parse(this.responseText);
			$("#comments").empty();
			if (obj.length == 0) {
				$("#comments").html("Комментариев пока нет, будьте первыми");
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

function logIn() {
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

function logOut() {
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			showLogIn($('#loginarea'));
			$("#sendBtn").attr("disabled", true);
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
			else
				showLogIn($('#loginarea'));
		}
	};
	xhttp.open("POST", "/api/auth", true);
	xhttp.send(null);
	getComm(tID);
}
