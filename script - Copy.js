$(document).ready(function (){
	'use strict';
	var playerOneSymbol = "";	//variable for storing X or O for player one
	var playerTwoSymbol = "";	//variable for storing X or O for player two
	var numberOfPlayers = "";
	var controlNumber = 0;	//checking whose turn is it
	var fieldsClicked = 0;	//counting how mony fields has ben clicked, 9 is max and if nobody wins before it is a draw
	var playerOneFields = [];	//array for storing names of field marked by player one
	var playerTwoFields = [];	//array for storing names of field marked by player two
	var result = "";
	var playerOneScore = 0;
	var playerTwoScore = 0;
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
	var combinedResults =[];
	var emptyFields = ["a1","a2","a3","b1","b2","b3","c1","c2","c3"];
		// PROGRAM STARTS HERE
		game;
		
		function singlePlayerGame(){
			for(var i = 0; i<emptyFields.length; i++){
				$("#"+emptyFields[i]).html("");
				$('#'+emptyFields[i]).css('pointer-events', 'auto');
			}
			$("#number-of-players-box").css('display','none');
			$("#choose-symbol-box").css('display','block');
			console.log("here");
			symbolsMenu();
			clickedFieldSinglePlayer();
		}
		
		function twoPlayersGame(){	//multiplayer game
			$("#number-of-players-box").css('display','none');
			$("#choose-symbol-box").css('display','block');
			symbolsMenu();
			clickedField;
		}
		//playerMoves function writing player symbol on clicked field and making this field inactive
		function playerMoves(player, symbol, control, playerNumber, field){
			$('#'+field).html(symbol);
			var lastSymbol = field;
			$('#'+field).css('pointer-events', 'none');
			console.log("here");
			player.push(field);
			controlNumber = control;	//changing control number to signalize that turn is over
			
			for(let i = 0; i < 8;i++){ //checking if winConditions and player(One/Two)Field have common elements
				
				var res = winConditions[i].filter(function(v){
					return player.indexOf(v) > -1;
				});
				if(res.length === 3){ //if all 3 elements from winConditions array are in player(One/Two)Field player wins
					for(let i = 0; i<=emptyFields.length; i++){
						$('#'+emptyFields[i]).css('pointer-events', 'none');
					}
					if(controlNumber === 1){
						$("#player-one-win").css('display','block');
						setTimeout(function() {
							$("#player-one-win").css('display','none');
							playerOneScore++;
							$('#score-player-one').html(playerOneScore);
							restart();
						}, 2000);
					} else {
						$("#player-two-win").css('display','block');
						setTimeout(function() {
							$("#player-two-win").css('display','none');
							playerTwoScore++;
							$('#score-player-two').html(playerTwoScore);
							restart();
						}, 2000);
					}
					
					
					result = "win";
					
					
	
					res = "";
					
				} 
			}
		}
		
	function symbolsMenu(){ //choosing symbol 'X' or 'O'
		$('.symbols').click(function(event){
		playerOneSymbol = event.target.id;
		
		if(playerOneSymbol == "X"){
					playerTwoSymbol = "O";
					} else if(playerOneSymbol == "O"){
						playerTwoSymbol = "X";
					}
		$("#choose-symbol-box").css('display','none');
		$(".fields").css('border','1px solid white');
	});
	}
	
	var game = $('.players').click(function(event){	//
		numberOfPlayers = event.target.id;
		
		console.log(numberOfPlayers);
		if(numberOfPlayers === 'one-player'){
			singlePlayerGame(numberOfPlayers);
		} else if(numberOfPlayers === 'two-players'){
			console.log("2 players");
			twoPlayersGame();
		}
	});
	
	var clickedField = $('.fields').click(function(event){	//checking which field was clicked and getting id of this field
		var field = event.target.id;
			
		if(controlNumber === 0){
			playerMoves(playerOneFields, playerOneSymbol, 1, "One", field);
			console.log("playerOneMoves");
		} else if(controlNumber === 1){
			playerMoves(playerTwoFields, playerTwoSymbol, 0, "Two", field);
			console.log("playerTwoMoves");
		}
		fieldsClicked++;	//increment number of field clicked
	
		if(fieldsClicked === 9 && result !="win"){	//if nobody wins and all field (9) has been clicked it is draw
			
			$("#draw").css('display','block');
						setTimeout(function() {
							$("#draw").css('display','none');
							restart();
						}, 2000);
						
						restart();
					$('#'+lastField).html("");
					res = "";
		}
	});
	
	function clickedFieldSinglePlayer(single){
		do{
	$('.fields').click(function(event){	//checking which field was clicked and getting id of this field
	console.log("clickedFieldSinglePlayer");
		var field = event.target.id;
			
		if(controlNumber === 0){
			
			playerMoves(playerOneFields, playerOneSymbol, 1, "One", field);
			console.log("playerOneMoves");
		} else if(controlNumber === 1 && result !== "win"){
			setTimeout(function() {
			combinedResults = playerOneFields.concat(playerTwoFields);
			do{
			var ran = Math.floor((Math.random() * (8)) + 0);
			var ran2 = Math.floor((Math.random() * (2)) + 0);
			var ff = winConditions[ran][ran2];
			if(combinedResults.indexOf(ff) == -1){
			$('#'+ff).html(playerTwoSymbol);
			console.log(ff);
			$('#'+ff).css('pointer-events', 'none');
			console.log("here");
			playerTwoFields.push(ff);
			console.log("playerTwoFields "+playerTwoFields);
			} else {
				console.log(ff+" used");
			}
			}while(combinedResults.indexOf(ff) != -1 && combinedResults.length<=8);
			for(let i = 0; i < 8;i++){ //checking if winConditions and player(One/Two)Field have common elements
				
				var res = winConditions[i].filter(function(v){
					return playerTwoFields.indexOf(v) > -1;
				});
				if(res.length === 3){ //if all 3 elements from winConditions array are in player(One/Two)Field player wins
				for(let j = 0;j<9;j++){
				$('#'+emptyFields[j]).css('pointer-events', 'none');
				}
					$("#cpu-win").css('display','block');
						setTimeout(function() {
							$("#cpu-win").css('display','none');
							playerTwoScore++;
							$('#score-player-two').html(playerTwoScore);
							restart();
						}, 2000);
					result = "win";
					return;
				} 
			}
			}, 500);
			
			controlNumber = 0;
		}
		fieldsClicked++;	//increment number of field clicked
		
		if(fieldsClicked === 9 && result !="win"){	//if nobody wins and all field 990 has been clicked it is draw
			
			$("#draw").css('display','block');
						setTimeout(function() {
							$("#draw").css('display','none');
							restart();
						}, 2000);
		}
	});
	}while(single === 'one-player');
		
	}
	
	
		
		function restart(){
			
			result = "";
			playerOneFields = [];	
			playerTwoFields = [];
			fieldsClicked = 0;	
			controlNumber = 0;
			combinedResults =[];
			
			
			for(var i = 0; i<=emptyFields.length; i++){
				$("#"+emptyFields[i]).html("");
				$('#'+emptyFields[i]).css('pointer-events', 'auto');
			}
			
			
		}
		
		
			$('#restart').click(function(){
				 location.reload();
	});
		
	
});