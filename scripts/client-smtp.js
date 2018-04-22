function onSubscribe() {
	var uData = { email: $("#mc-email").val() };
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var obj = JSON.parse(this.responseText);
			window.alert(obj.text);
		}
	};
	xhttp.open("POST", "/api/subscribe", true);
	xhttp.setRequestHeader("Content-type", "text/plain");
	xhttp.send(JSON.stringify(uData));
}