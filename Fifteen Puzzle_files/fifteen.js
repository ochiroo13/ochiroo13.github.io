"use strict";

var arr = [
	[undefined, undefined, undefined, undefined],
	[undefined, undefined, undefined, undefined],
	[undefined, undefined, undefined, undefined],
	[undefined, undefined, undefined, undefined]
];

var init = function() {
    var puzzleArea = document.getElementById('puzzlearea');
    var divs = puzzleArea.getElementsByTagName("div");
      
    // initialize each piece
    for (var i=0; i< divs.length; i++) {
        var div = divs[i];
        
        // calculate x and y for this piece
        var x = ((i % 4) * 100) ;
        var y = (Math.floor(i / 4) * 100);

        arr[y/100][x/100] = i + 1;

        // set basic style and background
        div.className = "puzzlepiece";
        div.id = y + "_" + x;
        div.style.left = x + 'px';
        div.style.top = y + 'px';
        div.style.backgroundImage = 'url("Fifteen Puzzle_files/background.jpg")';
        div.style.backgroundPosition = -x + 'px ' + (-y) + 'px';
        
        // store x and y for later
        div.x = x;
        div.y = y; 
    }

};

// document.addEventListener("DOMContentLoaded", init);

$(document).ready(function() {
	
	init();

	$("#puzzlearea > div").hover(
		function(){
			if (isMovable($(this).attr("id"))) {
				$(this).addClass("movablepiece");
			}
			else {
				$(this).removeClass("movablepiece");
			}
		},
		function(){
			$(this).removeClass("movablepiece");
		}
	);

	$(".puzzlepiece").click(function() {
		clickPiece($(this).attr("id"));
	});

	$("#shufflebutton").click(shuffle);
});

function isMovable(strId) {
	let i = parseInt(strId.split("_")[0])/100;
	let j = parseInt(strId.split("_")[1])/100;
	let res = false;
	
	if (i > 0 && arr[i-1][j] == undefined) {
		res = true;
	} else if (j > 0 && arr[i][j-1] == undefined) {
		res = true;
	} else if (i < 3 && arr[i+1][j] == undefined) {
		res = true;
	} else if (j < 3 && arr[i][j+1] == undefined) {
		res = true;
	}

	return res;
}

function clickPiece(strId) {
	let i = parseInt(strId.split("_")[0])/100;
	let j = parseInt(strId.split("_")[1])/100;
	let res = false;
	let elem;

	if (i > 0 && arr[i-1][j] == undefined) {
		let temp = arr[i][j];
		arr[i-1][j] = temp;
		arr[i][j] = undefined;
		elem = document.getElementById(strId);
		elem.style.top = (i * 100 - 100) + "px";
        elem.id = (i * 100 - 100) + "_" + (j * 100);
	} else if (j > 0 && arr[i][j-1] == undefined) {
		let temp = arr[i][j];
		arr[i][j-1] = temp;
		arr[i][j] = undefined;
		elem = document.getElementById(strId);
		elem.style.left = (j * 100 - 100) + "px";
        elem.id = (i * 100) + "_" + (j * 100 - 100);
	} else if (i < 3 && arr[i+1][j] == undefined) {
		let temp = arr[i][j];
		arr[i+1][j] = temp;
		arr[i][j] = undefined;
		elem = document.getElementById(strId);
		elem.style.top = (i * 100 + 100) + "px";
        elem.id = (i * 100 + 100) + "_" + (j * 100);

	} else if (j < 3 && arr[i][j+1] == undefined) {
		let temp = arr[i][j];
		arr[i][j+1] = temp;
		arr[i][j] = undefined;
		elem = document.getElementById(strId);
		elem.style.left = (j * 100 + 100) + "px";
        elem.id = (i * 100) + "_" + (j * 100 + 100);
	}
	return res;
}

function shuffle() {
	console.log(Math.random())
}