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