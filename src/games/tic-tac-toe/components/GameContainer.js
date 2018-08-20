import React from 'react';
import { withRouter } from 'react-router-dom';
import { ToastContainer ,toast} from 'react-toastify';

import { Game } from './Game';
import { calculateNextMove } from '../helpers/nextMove';
import { calculateWinner } from '../helpers/resultCalc';

import '../helpers/protoTypeMethods';
import utils from '../../../utils/utils';
import gameHelpers from '../../../utils/gameHelpers';
import gameService from '../../../services/gameService';
import socketService from '../../../services/socketService';

import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class GameContainer extends React.Component{
	
	constructor(props) {
		super(props);
		this.state={
			square : [[null,null,null],[null,null,null],[null,null,null]],
			currentSymbol : "X",
			isFinished : false,
			isTied : false,
			playerOneSymbol : "X",
			playerTwoSymbol : "0",
			playerOneScore : 0,
			playerTwoScore : 0,
			currentPlayer : 'playerOne',
			winner : '',
			winSquares : null,
			UIState : 'game-on',
			started : false,
			paused : false,
			waiting:false
		};

		this.userPlayer = undefined;

		this.handleSquareClick = this.handleSquareClick.bind(this);
		
		this.handleJoinedGame = this.handleJoinedGame.bind(this);
		this.handleNewGame = this.handleNewGame.bind(this);
		this.handleSocketGameUpdate = this.handleSocketGameUpdate.bind(this);
		this.handleSocketGameStartEvent = this.handleSocketGameStartEvent.bind(this);
		this.handleOpponentLeft = this.handleOpponentLeft.bind(this);


		this.socket = socketService.connectSocket('/tic-tac-toe');
	}

	getGameID(){
		var gameID = this.props.match.params.gameID
		this.setState({
			gameID : gameID
		});
		return gameID;	
	}

	/*new code starts*/


	handleSocketGameStartEvent(data){
		this.setState({
			started : true,
			waiting : false
		});
	}

	handleSocketGameUpdate(data){
		this.setState(data.gameState);
	}

	handleOpponentLeft(data){
		this.setState({
			waiting : true
		});
		toast.error("Opponent left");

	}

	initSocketEventListners(){
		socketService.addSocketEventListner(this.socket , 'gameStart' , this.handleSocketGameStartEvent);
		socketService.addSocketEventListner(this.socket , 'gameUpdate' , this.handleSocketGameUpdate);
		socketService.addSocketEventListner(this.socket , 'opponentLeft' , this.handleOpponentLeft);
	}

	checkIfGameExistInServer(gameID){
		return new Promise((resolve , reject ) => {
			gameService.getGameObj(gameID).then((response)=>{
				if(response.status === 0){
					return resolve(response.gameObj);
				} else {
					return resolve(false);
				}
			}).catch( (err)=> {
				reject(err);
			});
		});
	}

	joinExistingGame(gameID){
		return new Promise((resolve , reject ) => {
			var obj = {
					player2 : 'player two'
				};

			gameService.joinGame(gameID , obj).then( (response) => {
				if(response.status === 1){
					return reject(response.message);
				}else{
					return resolve(response.gameObj);
				}
			}).catch( (err) => {
				reject(err);
			});
		});
	}

	startNewGameSession(gameID){
		return new Promise((resolve , reject ) => {
			var obj = {
					player1 : 'player one',
					gameState : this.state
				};

			gameService.startNewGame(gameID , obj).then( (response) => {
				if(response.status === 1){
					return reject(response.message);
				}else{
					return resolve(response.gameObj);
				}
			}).catch( (err) => {
				reject(err);
			})
		
		});
	}




	handleJoinedGame(gameObj){
		this.userPlayer = 'playerTwo';
		utils.saveToLocalStorage(this.state.gameID , 'true');
		socketService.emitSocketEvent(this.socket , 'secondPlayerJoined' , this.state);
		toast.success("joined game start playing");
	}

	handleNewGame(gameObj){
		this.userPlayer = 'playerOne';
		utils.saveToLocalStorage(this.state.gameID , 'true');
		this.setState({
			waiting : true
		});
		toast.success("waiting for opponent");
		socketService.emitSocketEvent(this.socket , 'firstPlayerJoined' , this.state);

	}


	componentDidUpdate(prevProps, prevState){
		if(prevState.currentPlayer !== this.state.currentPlayer || prevState.isFinished !== this.state.isFinished){
			socketService.emitSocketEvent(this.socket , 'playMove' , this.state );
		}
	}


	componentDidMount(){
		var gameID = this.getGameID();
		

		this.checkIfGameExistInServer(gameID).then((game)=> {
		
			if(game){
				return this.joinExistingGame(gameID).then(this.handleJoinedGame);
			}else{
				return this.startNewGameSession(gameID).then(this.handleNewGame);
			}
			
		}).catch((error)=> {
			gameHelpers.showErrorMessage(error);
		});

		this.initSocketEventListners();
	}



// 	/*/*old code*/



	findWinner(symbol){
		if(this.state.playerOneSymbol===symbol){
			return 'playerOne';
		}
		else{
			return 'playerTwo';
		}
	}


	/*
	*Restart game
	*/
	startNewGame(){
		setTimeout(function(){
			this.setState({
				square : [[null,null,null],[null,null,null],[null,null,null]],
				isFinished : false,
				isTied : false,
				winner : '',
				winSquares : null,
				pauseUserInteraction : false,
				started : true,
				paused : false,
				waiting : false,
				currentPlayer : 'playerOne'
			});

		}.bind(this) , 3000 );
	}


	// /*
	// *Function to play computers part
	// */
	// playComputerPart(){
	// 	var square,
	// 	result,
	// 	nextMove;
		
	// 	square = this.state.square.clone2DArray();
		
	// 	nextMove = calculateNextMove(square , this.state.playerTwoSymbol );
		

	// 	square[nextMove[0]][nextMove[1]] =  this.state.currentSymbol;
	// 	result = calculateWinner(square);
	// 	//console.log('c',result);

	// 	//if game is tied return
	// 	if(result.isFinished && result.isTied){
	// 		this.setState({
	// 			square :square,
	// 			isTied : true,
	// 			isFinished : true
	// 		});

	// 		this.startNewGame();
	// 		return;
	// 	}

	// 	if(result.isFinished){
	// 		this.handleGameFinish(square , result );
	// 	}else{
	// 		this.setState({
	// 			isAICalculating : false,
	// 			square : square,
	// 			currentSymbol : (this.state.currentSymbol==="X") ? "0" : "X",
	// 			currentPlayer : this.state.currentPlayer === "playerOne" ? "playerTwo" : "playerOne"
	// 		});

	// 	}
	// }


	/*
	*Function to handle game 
	*/
	handleGameFinish(square , result ){
		this.setState({
			isFinished : true,
			winner : this.findWinner(result.winSymbol),
			playerOneScore : this.findWinner(result.winSymbol)==='playerOne' ? this.state.playerOneScore + 1 : this.state.playerOneScore,
			playerTwoScore : this.findWinner(result.winSymbol)==='playerTwo' ? this.state.playerTwoScore + 1 : this.state.playerTwoScore,
			square : square,
			winSquares : result.winSquares
		});

		this.startNewGame();
	}





	/*
	* Handle click on square
	*/
	handleSquareClick(i,j){
		var square,
		result,
		gameState;
		square = this.state.square.clone2DArray();

		if(square[i][j] || this.state.currentPlayer !== this.userPlayer ){
			return ;
		}

		square[i][j] =  this.state.currentSymbol;

		result = calculateWinner(square);
		
		//if game is tied return
		if(result.isFinished && result.isTied){

			this.setState({
				square : square,
				isTied : true,
				isFinished : true
			});
			this.startNewGame();
			return;
		}
		
		if(result.isFinished){
			this.handleGameFinish(square , result );
		}else{

			this.setState({
				square : square,
				currentSymbol : (this.state.currentSymbol==="X") ? "0" : "X",
				currentPlayer : this.state.currentPlayer === "playerOne" ? "playerTwo" : "playerOne"
			});


		}
		
	}


	render(){
		//console.log('main-render');

		var displayedComponents;

		
		


			
		displayedComponents = ( 
				<Game 
				playerOneScore={this.state.playerOneScore}
				playerTwoScore={this.state.playerTwoScore}
				isFinished={this.state.isFinished}
				isTied={this.state.isTied}
				winSquares={this.state.winSquares}
				winner={this.state.winner}
				square={this.state.square}
				onSquareClick={this.handleSquareClick}
				currentPlayer={this.state.currentPlayer}
				pauseUserInteraction={( this.state.currentPlayer === this.userPlayer ? false : true ) }
				paused={this.state.paused}
				waiting={this.state.waiting}
				userPlayer={this.userPlayer}
				playerOneSymbol={this.state.playerOneSymbol}
				playerTwoSymbol={this.state.playerTwoSymbol}
				/>
				);

	
		

		return (
			<div>

			{displayedComponents}

			</div>

			);
	}
}

export default withRouter(GameContainer);

