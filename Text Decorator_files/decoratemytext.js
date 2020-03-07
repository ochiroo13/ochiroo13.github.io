var script = document.createElement('script');
script.src = 'https://code.jquery.com/jquery-3.4.1.min.js';
script.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(script);

var isTimerStarted = false;
var timer;

function biggerDecoration() {

	if (isTimerStarted) {
		isTimerStarted = false;

		clearInterval(timer);
	}
	else {
		isTimerStarted = true;

		timer = setInterval(() => {
			biggerDec();
		}, 2000);
	}
}

function blingChanged() {
	let checked = document.getElementById("bling").checked;

	if (checked) {

	document.getElementById("text").style.fontWeight = "700";
	document.getElementById("text").style.textDecoration = "underline";
	document.getElementById("text").style.color = "green";
	document.body.style.backgroundImage = "url('http://www.cs.washington.edu/education/courses/190m/CurrentQtr/labs/6/hundred-dollar-bill.jpg')";
	console.log("true");
	}
	else {

	document.getElementById("text").style.fontWeight = "400";
	document.getElementById("text").style.textDecoration = "none";
	document.getElementById("text").style.color = "black";
	document.body.style.backgroundImage = "none";
	console.log("false");
	}

}

function biggerDec() {
	let textElem = document.getElementById("text");

	if (textElem.style.fontSize.length == 0) {
		document.getElementById("text").style.fontSize = "16px";
	}
	textElem.style.fontSize = (parseInt(textElem.style.fontSize.slice(0, 2)) + 2) + "px";
}

function doIgpayAtinlay() {

}

function doMalkovich() {
	let textElem = document.getElementById("text");
	let words = textElem.value.split(" ");
	let res = "";
	for (let i = 0; i < words.length; i ++) {
		if (words[i].length >= 5)
			words[i]  = "Malkovich";

		res += words[i] + " ";
	}

	document.getElementById("text").value = res;
}