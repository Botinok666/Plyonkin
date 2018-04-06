var emptyLogin = "<form>Логин: <input id='uName' type='text'>" +
	"Пароль: <input id='psw' type='password'>" + 
	" <input type='button' id='Login' onclick='logIn()' value='Войти'>" + 
	" <input type='button' id='Register' onclick='regNew()' value='Новый пользователь'>" +
	"</form><p id='logInfo'>Войдите, чтобы оставить комментарий</p>";
var uPw = "";
var uID = -1;

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
		'src': '/images/' + obj.userPic}).appendTo(divc);
	var h4c = $('<h4/>').html(obj.name + " в " + d.toLocaleString()).appendTo(divc);
	var pc = $('<p/>').html(obj.commText).appendTo(divc);
}

function loadMainPageTitles() {
	var xhttp = new XMLHttpRequest();
	var newsCnt = 4;
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var obj = JSON.parse(this.responseText);
			if (obj.length == newsCnt) {
				putPreviewTitle(obj[0], $("#leftCol"));
				putPreviewTitle(obj[1], $("#leftCol"));
				putPreviewTitle(obj[2], $("#rightCol"));
				putPreviewTitle(obj[3], $("#rightCol"));
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
	if (document.getElementById("textfield").value.length < 2)	{
		window.alert("Вам нужно напечатать хотя бы 2 символа!");
		return;
	}
	if (uID < 0)
		return;
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			getComm(tID);
		}
	};
	xhttp.open("POST", "/post/" + tID + "-" + uID, true);
	xhttp.setRequestHeader("Content-type", "text/plain");
	xhttp.send(document.getElementById("textfield").value);
	document.getElementById("textfield").value = "";
}

function logIn() {
	var uData = {
		"name": document.getElementById("uName").value,
		"password": document.getElementById("psw").value
	}
	uPw = "";
	if ((uData.name.length < 3) || (uData.password.length < 3)) {
		document.getElementById("logInfo").innerHTML = 
			"Имя и пароль должны состоять хотя бы из 3 символов!";
		return;
	}
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var obj = JSON.parse(this.responseText);
			uID = obj.uID;
			if (obj.uID > -1) {
				showLogOut(document.getElementById("uName").value, document.getElementById("loginarea"));
				document.getElementById("sendBtn").disabled = false;
			}
			else
				document.getElementById("logInfo").innerHTML = obj.text;
		}
	};
	xhttp.open("POST", "/api/login", true);
	xhttp.setRequestHeader("Content-type", "text/plain");
	xhttp.send(JSON.stringify(uData));
}

function regNew() {
	var uData = {
		"name": document.getElementById("uName").value,
		"password": document.getElementById("psw").value
	}
	if ((uData.name.length < 3) ||
		(uData.password.length < 3)) {
		document.getElementById("logInfo").innerHTML = 
			"Имя и пароль должны состоять хотя бы из 3 символов!";
		return;
	}
	if (uPw.length < 3) {
		document.getElementById("logInfo").innerHTML = 
			"Для завершения регистрации введите пароль ещё раз";
		uPw = document.getElementById("psw").value;
		document.getElementById("psw").value = "";
		return;
	}
	else {
		if (uPw != document.getElementById("psw").value) {
			document.getElementById("logInfo").innerHTML = 
				"Пароли не совпали";
			uPw = "";
			return;
		}
		uPw = "";
	}
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var obj = JSON.parse(this.responseText);
			uID = obj.uID;
			if (obj.uID > -1) {
				showLogOut(document.getElementById("uName").value, document.getElementById("loginarea"));
				document.getElementById("sendBtn").disabled = false;
			}
			else
				document.getElementById("logInfo").innerHTML = obj.text;
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
			document.getElementById("loginarea").innerHTML = emptyLogin;
			document.getElementById("sendBtn").disabled = true;
			uID = -1;
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
				uID = obj.uID;
				showLogOut(obj.name, document.getElementById("loginarea"));
				document.getElementById("sendBtn").disabled = false;
			}
			else
				document.getElementById("loginarea").innerHTML = emptyLogin;
		}
	};
	xhttp.open("POST", "/api/auth", true);
	xhttp.send(null);
	getComm(tID);
}