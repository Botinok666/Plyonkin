function showUserPicForm(elem) {
	var form0 = $('<form/>', { 'action': '/uploadPic', 'enctype': 'multipart/form-data',
		'method': 'post'}).appendTo(elem);
	$(form0).append('<h1>Выберите картинку для профиля</h1>');

	var input0 = $('<input>', { 'type': 'file', 'name': 'imageUp',
		'accept': 'image/*' }).appendTo(form0);
	var input1 = $('<input>', { 'type': 'submit', 'value':"Изменить картинку" }).appendTo(form0);
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
		$(form0).append('<h1>Выберите основную новость для главной страницы</h1>');

	$(form0).append('<p>ID новости в заголовке: </p>');

	var input0 = $('<input/>', { 'id': 'mainID', 'type': 'text' }).appendTo(form0);
	var input1 = $('<input/>', { 'type': 'submit', 'value':"Изменить новость" }).appendTo(form0);
}

function pLoad() {
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4) {
			if (this.status == 200) {
				var obj = JSON.parse(this.responseText);
				showUserPicForm($('#tContent'));
				if (obj.accLevel == 2) {
					var br = $('<hr/>').appendTo($('#tContent'));
					showMainTitleSetForm($('#tContent'));
				}
			}
		}
	};
	xhttp.open("POST", "/api/profile", true);
	xhttp.send(null);
}