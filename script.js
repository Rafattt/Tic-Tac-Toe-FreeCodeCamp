$(document).ready(function (){
	'use strict';
	var	playerOneSymbol = ""; //symbol used by player one 'X' or 'O'
	var playerTwoSymbol = ""; //symbol used by player two 'X' or 'O'
	var	controlNumber = 0;	//holding information about whose turn is it, 0 for player one and 1 for player two
	var	clickedField = "";	//holding information about field name(number) clicked by player
	var playerOneFields = []; //fields selected by player one
	var playerTwoFields = []; //fields selected by player two
	var playerOneScore = 0;
	var playerTwoScore = 0;
	var fieldsClicked = 0; // number of fields clicked
	var result = "";
	var	emptyFields = ["a1","a2","a3","b1","b2","b3","c1","c2","c3"];
	
	var winConditions = [	//cominations of wining fields
		["a1","a2","a3"],
		["a1","b1","c1"],
		["a1","b2","c3"],
		["b1","b2","b3"],
		["c1","b2","a3"],
		["a2","b2","c2"],
		["a3","b3","c3"],
		["c1","c2","c3"]
	];
	
	

	

	choseSymbol();
	
	function choseSymbol(){ //chiosing player symbol 'X' or 'O'
		$('.symbols').click(function(event){	//
			playerOneSymbol = event.target.id;
			if(playerOneSymbol === 'X'){
				playerTwoSymbol ='O';
			} else if( playerOneSymbol === 'O'){
				playerTwoSymbol = 'X';
			}
			$("#choose-symbol-box").css('display','none');
			$(".fields").css('border','1px solid white');
			game();	
			
			
		});
	}
	
	
	function game(){ //easy difficulty single player game
			
				$('.fields').click(function(event){
			
					clickedField = event.target.id;
					playerOneFields.push(clickedField);
					emptyFields.splice(emptyFields.indexOf(clickedField), 1);
					$('#'+clickedField).html(playerOneSymbol).css('pointer-events', 'none');
					checkIfWin(playerOneFields);
					fieldsClicked++;
					console.log("fieldsClicked: "+fieldsClicked);
					checkIfDraw();
					controlNumber = 1; //player one turn ends, changing controlNumber to one to starts CPU turn
					
				let randomField = emptyFields[Math.floor((Math.random() * (emptyFields.length-1)) + 0)];
				setTimeout(function() {
					$('#'+randomField).html(playerTwoSymbol).css('pointer-events', 'none');
					playerTwoFields.push(randomField);
					emptyFields.splice(emptyFields.indexOf(randomField), 1);
					checkIfWin(playerTwoFields);
					fieldsClicked++;
					console.log("fieldsClicked: "+fieldsClicked);
					checkIfDraw();
					controlNumber = 0;
					}, 500);
				});
				
				
					
	}
	

	
	function checkIfWin(player){
		console.log("checkifwin: "+player);
		for(let i = 0; i < 8;i++){ //checking if winConditions and player(One/Two)Field have common elements
			var res = winConditions[i].filter(function(v){
				return player.indexOf(v) > -1;
			});
				
			if(res.length === 3){ //if all 3 elements from winConditions array are in player(One/Two)Field player wins
				
				for(let i = 0; i<=emptyFields.length; i++){
					$('#'+emptyFields[i]).css('pointer-events', 'none');
				}
					
				if(player === playerOneFields){
					$("#player-one-win").css('display','block');
					setTimeout(function() {
						$("#player-one-win").css('display','none');
						playerOneScore++;
						$('#score-player-one').html(playerOneScore);
						for(let j = 0;j<9;j++){
							$('#'+emptyFields[j]).css('pointer-events', 'none');
						}
						result = "win";
						restart();
						return;
					}, 2000);
					
				} else if(player === playerTwoFields) {
					$("#player-two-win").css('display','block');
					setTimeout(function() {
						$("#player-two-win").css('display','none');
						playerTwoScore++;
						$('#score-player-two').html(playerTwoScore);
						for(let j = 0;j<9;j++){
							$('#'+emptyFields[j]).css('pointer-events', 'none');
						}
						result = "win";
						restart();
						return;
						}, 2000);
					}
					
				result = "win";
				res = "";
					
			} else {
					
			}
		}	
	}
	
	function checkIfDraw(){
		if(fieldsClicked === 9 && result !="win"){	//if nobody wins and all field (9) has been clicked it is draw
			
			$("#draw").css('display','block');
						setTimeout(function() {
							$("#draw").css('display','none');
							restart();
						}, 2000);
						
						restart();
					
					var res = "";
		}
	}
	
	
	
	function restart(){
			
			result = "";
			playerOneFields = [];	
			playerTwoFields = [];
			controlNumber = 0;
			fieldsClicked = 0;
			emptyFields = ["a1","a2","a3","b1","b2","b3","c1","c2","c3"];
			
			console.log("restart");
			for(var i = 0; i<=emptyFields.length; i++){
				$("#"+emptyFields[i]).html("");
				$('#'+emptyFields[i]).css('pointer-events', 'auto');
			}
			
			
			
		}
		
	$('#restart').click(function(){
				window.location.href = window.location.href;
	});
	
	
		
	
});