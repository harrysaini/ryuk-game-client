/*
* function to check if all squares are filled
*/
export function areAllSquaresFilled(square){
	var count=0;

	for(var i=0;i<3;i++){
		for(var j=0;j<3;j++){
			if(square[i][j]){
				count++;
			}
		}
	}
	if(count===9){
		return true;
	}else{
		return false;
	}
}

/*
* function to check if line is matched
*/
export function isLineFilled(square,indexes){
	if(square[indexes[0][0]][indexes[0][1]] && square[indexes[0][0]][indexes[0][1]] === square[indexes[1][0]][indexes[1][1]] && square[indexes[1][0]][indexes[1][1]] === square[indexes[2][0]][indexes[2][1]]){
		return true;
	}else{
		return false;
	}

}

/*
* function to calculate winner
*/
export function calculateWinner(square){
	var winSquences = [
	['0-0','0-1','0-2'],
	['0-0','1-0','2-0'],
	['0-0','1-1','2-2'],
	['0-1','1-1','2-1'],
	['0-2','1-2','2-2'],
	['0-2','1-1','2-0'],
	['1-0','1-1','1-2'],
	['2-0','2-1','2-2']
	];


	for(var i=0;i<winSquences.length;i++){
		var sequence = winSquences[i];
		var indexes = sequence.map(function(seq){
			return seq.split('-');
		});
		if(isLineFilled(square , indexes) ){
			return {
				isFinished : true,
				winSquares : sequence,
				winSymbol  : square[indexes[0][0]][indexes[0][1]]
			}
		}
	}

	//if all squares are filled , game is tie
	if(areAllSquaresFilled(square)){
		return {
			isFinished : true,
			isTied : true
		}
	}

	return {
		isFinished : false
	}
}
