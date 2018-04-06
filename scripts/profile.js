var uID = -1;

function showUserPicForm(elem) {
	var form0 = $('<form/>', { 'action': '/uploadPic', 'enctype': 'multipart/form-data',
		'method': 'post'}).html('Выберите картинку для профиля').appendTo(elem);
	var input0 = $('<input>', { 'type': 'file', 'name': 'imageUp',
		'accept': 'image/*' }).appendTo(form0);
	var input1 = $('<input>', { 'type': 'submit' }).appendTo(form0);
}

function showNewsUploadForm(elem) {
	var form0 = $('<form/>', { 'action': '/uploadNews', 'enctype': 'multipart/form-data',
		'method': 'post'}).html('Загрузка новости').appendTo(elem);
	$(form0).append('<br>Заголовок');
	var input0 = $('<input>', { 'name': 'ntitle', 'type': 'text', 'maxlength': '90' }).appendTo(form0);
	$(form0).append('<br>Краткое содержание');
	var input1 = $('<input>', { 'name': 'ndescr', 'type': 'text', 'maxlength': '120' }).appendTo(form0);
	$(form0).append('<br>Картинка новости');
	var input2 = $('<input>', { 'name': 'imageUp', 'type': 'file', 
		'accept': 'image/*' }).appendTo(form0);
	$(form0).append('<br>Текст новости');
	var input3 = $('<input>', { 'name': 'ejsUp', 'type': 'file', 
		'accept': '.ejs' }).appendTo(form0);
	var input4 = $('<input>', { 'type': 'submit' }).appendTo(form0);
}

function pLoad() {
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4) {
			if (this.status == 200) {
				var obj = JSON.parse(this.responseText);
				uID = obj.uID;
				showUserPicForm($('#pcontent'));
				if (obj.accLevel == 2) {
					var br = $('<br>').appendTo($('#pcontent'));
					showNewsUploadForm($('#pcontent'));
				}
			}
		}
	};
	xhttp.open("POST", "/api/profile", true);
	xhttp.send(null);
}