import { calculateWinner } from '../helpers/resultCalc';
import './protoTypeMethods';


export function calculateNextMove(square , winSymbol){
	var state = square.clone2DArray(),
		bestMove;
	bestMove = minMax(state , winSymbol , winSymbol==="X" ? "0" : "X" , winSymbol, 15);
	
	return bestMove.move;
}

function getAllEmptySquare(square){
	var emptySquare= [];
	for(var i=0 ;i<3;i++){
		for(var j=0;j<3;j++){
			if(!square[i][j]){
				emptySquare.push([i,j]);
			}
		}
	}

	return emptySquare;
}

function getMoveWithMaxScore(resultArray){
	var maxIndex = 0;
	resultArray.forEach(function(result , index){
		if(result.score > resultArray[maxIndex].score){
			maxIndex = index;
		}
	});
	return resultArray[maxIndex]
}


function getMoveWithMinScore(resultArray){
	var minIndex = 0;
	resultArray.forEach(function(result , index){
		if(result.score < resultArray[minIndex].score){
			minIndex = index;
		}
	});
	return resultArray[minIndex]
}

function minMax(state , playerSymbol, opponentSymbol , turnSymbol , score  ){
	var result,
		minMaxResultArray =[],
		maxScoreMove,
		minScoreMove;

	result = calculateWinner(state);

	//recursion finish state
	if(result.isFinished){
		if(result.isTied){
			return{
				score : 0
			}
		}else{
			if(result.winSymbol===playerSymbol ){
				return{
					score : score
				}
			}else if(result.winSymbol===opponentSymbol){
				return {
					score : -score
				}
			}
		}
	}

	var allPossibleEmptySquare = getAllEmptySquare(state);
	
	allPossibleEmptySquare.forEach(function(possibleMove){
		var minMaxResult,
			minMaxResultObj,
			newState = state.clone2DArray();
		newState[possibleMove[0]][possibleMove[1]] = turnSymbol;
		minMaxResult = minMax(newState , playerSymbol , opponentSymbol , turnSymbol ==="X" ? "0" : "X" , score-1);
		minMaxResultObj = {
			score : minMaxResult.score,
			move : possibleMove
		}
		minMaxResultArray.push(minMaxResultObj);
	});
	if(turnSymbol===playerSymbol){
		maxScoreMove = getMoveWithMaxScore(minMaxResultArray);
		return {
			score : maxScoreMove.score,
			move : maxScoreMove.move
		};
	}else if(turnSymbol===opponentSymbol){
		minScoreMove = getMoveWithMinScore(minMaxResultArray);
		return {
			score : minScoreMove.score,
			move : minScoreMove.move
		};
	}

}