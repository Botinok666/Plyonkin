function showNewsUploadForm(elem) {
	var form0 = $('<form/>', { 'action': '/uploadNews', 'class': 'form2', 'style': "padding-bottom: 15px;", 'enctype': 'multipart/form-data',
		'method': 'post'}).appendTo(elem);
	$(form0).append('<h1>Добавление новости </h1>');
	$(form0).append('<hr/>');
	$(form0).append('<p>Заголовок: </p>');
	$('<input>', { 'name': 'ntitle', 'type': 'text', 'maxlength': '90' }).appendTo(form0);
	$(form0).append('<p>Краткое содержание: </p>');
	var input1 = $('<input>', { 'name': 'ndescr', 'type': 'text', 'maxlength': '120' }).appendTo(form0);
	$(form0).append('<p>Картинка новости: </p>');
	var input2 = $('<input>', { 'name': 'imageUp', 'type': 'file', 
		'accept': 'image/*' }).appendTo(form0);
	$(form0).append('<p>Текст новости: </p>');
	var input3 = $('<input>', { 'name': 'ejsUp', 'type': 'file', 
		'accept': '.ejs' }).appendTo(form0);
	$(form0).append('<hr/>');
	var input4 = $('<input>', { 'type': 'submit', 'value':'Добавить новость' }).appendTo(form0);
}

function sendtID() {
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4) {
			if (this.status == 200) {
				var obj = JSON.parse(this.responseText);
				$('#mainID').val(obj.tID);
			} else {
				$('#mainID').val(-1);
			}
		}
	};
	xhttp.open("POST", "/api/params", true);
	xhttp.send(JSON.stringify({ "tID": $('#mainID').val() }));
}

function showMainTitleSetForm(elem) {
	var form0 = $('<form/>', { 'action': 'javascript:sendtID();', 'class': 'form2' }).appendTo(elem);
	$(form0).append('<p>ID новости в заголовке: </p>');

	var input0 = $('<input/>', { 'id': 'mainID', 'type': 'text' }).appendTo(form0);
	var input1 = $('<input/>', { 'type': 'submit' }).appendTo(form0);
}

function pLoad() {
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4) {
			if (this.status == 200) {
				var obj = JSON.parse(this.responseText);
				//showUserPicForm($('#tContent'));
				if (obj.accLevel == 2) {
					//var br = $('<br>').appendTo($('#tContent'));
					showNewsUploadForm($('#tContent'));
					//showMainTitleSetForm($('#tContent'));
				}
			}
		}
	};
	xhttp.open("POST", "/api/addnews", true);
	xhttp.send(null);
}