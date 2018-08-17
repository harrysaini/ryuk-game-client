import React from 'react';
import { withRouter } from 'react-router-dom';
import { ToastContainer ,toast} from 'react-toastify';

import { Game } from './Game';
import { SelectGameType } from './SelectGameType';
import { SelectGameSymbol } from './SelectGameSymbol';
import { calculateNextMove } from '../helpers/nextMove';
import { calculateWinner } from '../helpers/resultCalc';
import { SelectFirstTurn } from './SelectFirstTurn';
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
			gameState : {
				square : [[null,null,null],[null,null,null],[null,null,null]],
				currentSymbol : "",
				gameState : "select-game-type",
				isFinished : false,
				isTied : false,
				playerOneSymbol : "",
				playerTwoSymbol : "",
				playerOneScore : 0,
				playerTwoScore : 0,
				gameType : '',
				currentPlayer : '',
				winner : '',
				winSquares : null
			},
			UIState : 'game-on',
			started : false,
			paused : true,
			player1 : undefined,
			player2 : undefined

		};
		this.handleSquareClick = this.handleSquareClick.bind(this);
		this.handleGameTypeSelect = this.handleGameTypeSelect.bind(this);
		this.handleGameSymbolSelect = this.handleGameSymbolSelect.bind(this);
		this.handleResetClick = this.handleResetClick.bind(this);
		this.handleFirstTurnSelect = this.handleFirstTurnSelect.bind(this);
		
		this.handleJoinedGame = this.handleJoinedGame.bind(this);
		this.handleNewGame = this.handleNewGame.bind(this);

		socketService.connectSocket();
	}

	getGameID(){
		var gameID = this.props.match.params.gameID
		this.setState({
			gameID : gameID
		});
		return gameID;	
	}

	/*new code starts*/

	

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
					return reject(new Error(response.message));
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
					gameState : this.state.gameState
				};

			gameService.startNewGame(gameID , obj).then( (response) => {
				if(response.status === 1){
					return reject(new Error(response.message));
				}else{
					return resolve(response.gameObj);
				}
			}).catch( (err) => {
				reject(err);
			})
		
		});
	}




	handleJoinedGame(gameObj){
		this.setState({
			paused : false,
			started : true
		});
		utils.saveToLocalStorage(this.state.gameID , 'true');
		toast.success("joined game start playing");
	}

	handleNewGame(gameObj){
		utils.saveToLocalStorage(this.state.gameID , 'true');
		toast.success("waiting for opponent");
	}


	componentDidMount(){
		var gameID = this.getGameID();
		utils.getFromLocalStorage(gameID).then((value) => {
			if(value){
				toast.error("You have already joined the game");
			}else{
				toast.success("Starting game");
				this.checkIfGameExistInServer(gameID).then((game)=> {
					if(game){
						this.joinExistingGame(gameID).then(this.handleJoinedGame);
					}else{
						this.startNewGameSession(gameID).then(this.handleNewGame);
					}
				})
			}

		}).catch((error)=> {
			gameHelpers.showErrorMessage(error);
		});
	}



	/*old code*/



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
				gameState : "game-to-start",
				isFinished : false,
				isTied : false,
				winner : '',
				winSquares : null,
				isAICalculating : false
			});

		}.bind(this) , 3000 );
	}


	/*
	*Function to play computers part
	*/
	playComputerPart(){
		var square,
		result,
		nextMove;
		
		square = this.state.square.clone2DArray();
		
		nextMove = calculateNextMove(square , this.state.playerTwoSymbol );
		

		square[nextMove[0]][nextMove[1]] =  this.state.currentSymbol;
		result = calculateWinner(square);
		//console.log('c',result);

		//if game is tied return
		if(result.isFinished && result.isTied){
			this.setState({
				square :square,
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
				isAICalculating : false,
				square : square,
				currentSymbol : (this.state.currentSymbol==="X") ? "0" : "X",
				currentPlayer : this.state.currentPlayer === "playerOne" ? "playerTwo" : "playerOne"
			});

		}
	}

	/*
	*Function to handle game 
	*/
	handleGameFinish(square , result ){
		this.setState({
			gameState : "finished",
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
	*handle reset btn click
	*/
	handleResetClick(){
		this.setState({
			square : [[null,null,null],[null,null,null],[null,null,null]],
			currentSymbol : "",
			gameState : "select-game-type",
			isFinished : false,
			isTied : false,
			playerOneSymbol : "",
			playerTwoSymbol : "",
			playerOneScore : 0,
			playerTwoScore : 0,
			gameType : '',
			currentPlayer : '',
			winner : '',
			winSquares : null

		});
	}

	/*
	* Handle click on square
	*/
	handleSquareClick(i,j){
		var square,
		result;
		square = this.state.square.clone2DArray();

		if(square[i][j]){
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

			if(this.state.gameState==="game-is-on" && this.state.gameType==="computer" && !this.state.isFinished && !this.state.isTied){			
				this.setState({
					isAICalculating :  true
				});
				setTimeout(function(){
					this.playComputerPart();
				}.bind(this) , 200);
			}

		}
		
	}


	// componentDidUpdate(prevProps, prevState) {
	// 	if(this.state.gameState==="game-is-on" && this.state.gameType==="computer" && this.state.currentPlayer==="playerTwo" && !this.state.isFinished && !this.state.isTied){			
	// 		setTimeout(function(){
	// 			this.playComputerPart();
	// 		}.bind(this) , 200);
	// 	}
	// }


	/*
	* Handle game type select
	*/
	handleGameTypeSelect(type){
		if(type==='computer'){
			this.setState({
				gameState : "select-game-symbol",
				gameType : 'computer'
			});
		}else if(type==='player'){
			this.setState({
				gameState : "select-game-symbol",
				gameType : 'player'
			});
		}
	}


	/*
	* Handle game  symbol select
	*/
	handleGameSymbolSelect(symbol){
		if(symbol==="X"){
			
			this.setState({
				gameState : "game-to-start",
				playerOneSymbol : "X",
				playerTwoSymbol : "0",
			});

		}else if(symbol==="0"){
			
			this.setState({
				gameState : "game-to-start",
				playerOneSymbol : "0",
				playerTwoSymbol : "X",
			});
		}
	}


	/*
	* handle fisrt turn select
	*/
	handleFirstTurnSelect(player){
		this.setState({
			gameState : "game-is-on",
			currentPlayer : player,
			currentSymbol : player==='playerOne' ? this.state.playerOneSymbol : this.state.playerTwoSymbol
		});


		if(this.state.gameType==="computer" && player==="playerTwo" && !this.state.isFinished && !this.state.isTied){			
			this.setState({
				isAICalculating :  true
			});
			setTimeout(function(){
				this.playComputerPart();
			}.bind(this) , 400);
		}
	}
	



	render(){
		//console.log('main-render');

		var displayedComponents;

		

			
		displayedComponents = ( 
				<Game 
				playerOneScore={this.state.gameState.playerOneScore}
				playerTwoScore={this.state.gameState.playerTwoScore}
				isFinished={this.state.gameState.isFinished}
				isTied={this.state.gameState.isTied}
				winSquares={this.state.gameState.winSquares}
				winner={this.state.gameState.winner}
				square={this.state.gameState.square}
				onSquareClick={this.handleSquareClick}
				gameType={this.state.gameState.gameType}
				currentPlayer={this.state.gameState.currentPlayer}
				isAICalculating={this.state.gameState.isAICalculating}
				handleResetClick={this.handleResetClick}
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

