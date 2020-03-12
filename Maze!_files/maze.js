var script = document.createElement('script');
script.src = 'https://code.jquery.com/jquery-3.4.1.min.js';
script.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(script);

var noMistake = true;

$(document).ready(function() {
	console.log("ready function!");

	$(".boundary").mouseover(function() {
		console.log("hehe");
		noMistake = false;
		$(".boundary").addClass("youlose");
	});

	$("#start").click(function() {
		noMistake = true;
		$(".boundary").removeClass("youlose");
	});

	$("#end").mouseover(function() {
		if (noMistake) {
			$("h2").text("You win! :]");
		}
		else {
			$("h2").text("Sorry, you lost. :[");
		}
	});
});