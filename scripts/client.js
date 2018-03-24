var emptyLogin = "<form>Логин: <input id='uName' type='text'>" +
	"Пароль: <input id='psw' type='password'>" + 
	" <input type='button' id='Login' onclick='logIn()' value='Войти'>" + 
	" <input type='button' id='Register' onclick='regNew()' value='Новый пользователь'>" +
	"</form><p id='logInfo'>Войдите, чтобы оставить комментарий</p>";
var uPw = "";
var uNm = "";
var uID = -1;

function getPreviewTitle(obj) {
	var textRet = "<div class='content'>" +
		"<a href='/titles/" + obj.id + "'><img class='imgcol' src='/images/" + obj.thumbImage + "'/></a>" +
		"<h4>" + obj.title + "</h4> <h3>" + obj.name + "</h3> <h2>" + obj.shortDesc + "</h2>" +
		"<a href='/titles/" + obj.id + "'> <p>Читать далее…</p></a></div> ";
	return textRet;
}

function getComment(obj) {
	var d = new Date(obj.commTimeMs);
	var textRet = "<div class='comments'> <img class='imgcol' src='/images/" + obj.userPic +
		".jpg'/> <h4>" + obj.name + " в " + d.toLocaleString() + "</h4> <p>" + obj.commText + "</p> </div>";
	return textRet;
}

function loadMainPageTitles() {
	var xhttp = new XMLHttpRequest();
	var newsCnt = 4;
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var obj = JSON.parse(this.responseText);
			if (obj.length == newsCnt) {
				document.getElementById("leftCol").innerHTML = getPreviewTitle(obj[3]);
				document.getElementById("leftCol").innerHTML += getPreviewTitle(obj[2]);
				document.getElementById("rightCol").innerHTML = getPreviewTitle(obj[1]);
				document.getElementById("rightCol").innerHTML += getPreviewTitle(obj[0]);
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
			var textRet = "";
			if (obj.length == 0)
				textRet = "Комментариев пока нет, будьте первыми";
			else for (x in obj) {
				textRet += getComment(obj[x]);
			}
			document.getElementById("comments").innerHTML = textRet;
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
	document.getElementById("textfield").innerHTML = "";
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
			uNm = document.getElementById("uName").value;
			if (obj.uID > -1) {
				document.getElementById("loginarea").innerHTML =
					"<form>Вы вошли как " + uNm + 
					" <input type='button' onclick='logOut()' value='Выйти'></form>";
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
				uNm = document.getElementById("uName").value;
				document.getElementById("loginarea").innerHTML =
					"<form>Вы вошли как " + uNm + 
					" <input type='button' onclick='logOut()' value='Выйти'></form>";
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
			uNm = "";
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
				uNm = obj.name;
				document.getElementById("loginarea").innerHTML =
					"<form>Вы вошли как " + obj.name + 
					" <input type='button' onclick='logOut()' value='Выйти'></form>";
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