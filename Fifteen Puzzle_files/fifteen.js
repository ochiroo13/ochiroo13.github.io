"use strict";

var arr = [
	[undefined, undefined, undefined, undefined],
	[undefined, undefined, undefined, undefined],
	[undefined, undefined, undefined, undefined],
	[undefined, undefined, undefined, undefined]
];

var newGame = false;

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
        div.style.backgroundImage = 'url("Fifteen Puzzle_files/world.png")';
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

	if (newGame) {
		let win = true;
		let counter = 1;
		for (let i = 0; i < arr.length; i++) {
			for (let j = 0; j < arr[i].length; j++) {
				if (counter < 16 && arr[i][j] != counter) {
					win = false;
					break;
				}
				counter++;
			}
			if (!win)
				break;
		}

		if (win) {
			newGame = false;
			alert("Congratulations you win");
		}
	}
}

function shuffle() {
	var counter = 0;

	function myLoop() {
		setTimeout(function() {
			var x, y;
			var posibleMoves = 0;
			var box = [];
			var arrElem;
			var strId;
			for (let i = 0; i < arr.length; i++) {
				for (let j = 0; j < arr[i].length; j++) {
					if (arr[i][j] == undefined) {
						x = i;
						y = j;
					}
				}
			}
			
			if (x > 0) {
				box.push([x-1, y]);
				posibleMoves++;
			}
			if (y > 0) {
				box.push([x, y-1]);
				posibleMoves++;
			}
			if (x < 3) {
				box.push([x+1, y]);
				posibleMoves++;
			}
			if (y < 3) {
				box.push([x, y+1]);
				posibleMoves++;
			}

			arrElem = box[parseInt(Math.random() * posibleMoves)];

			strId = arrElem[0] * 100 + "_" + arrElem[1] * 100;

			clickPiece(strId);


		      counter++;
		      if (counter < 10) {
		         myLoop();
		      }
		}, 10)
	}

	myLoop();
	newGame = true;
}