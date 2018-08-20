import React from 'react';
import {TurnDisplayer} from './TurnDisplayer';
import {ScoreBoard} from './ScoreBoard';
import {Board} from './Board';
import { Result } from './Result';
import { ResetButton } from './ResetButton';
import { WaitingMsg } from './WaitingMsg';



export class Game extends React.Component{
	
	render(){

		var resultDivJSX , 
			scoreBoardJSX,
			turnDisplayerJSX,
			resetBtnJSX,
			waitingMsgJsx;

		scoreBoardJSX = (
			<ScoreBoard 
				isTwoPlayer={this.props.gameType==='player' ? true : false }
				playerOneScore={this.props.playerOneScore}
				playerTwoScore={this.props.playerTwoScore}
			/>
			);

		turnDisplayerJSX = (
			<TurnDisplayer
				currentPlayer = {this.props.currentPlayer}
				userPlayer = {this.props.userPlayer}
				playerSymbol = {this.props.currentPlayer === 'playerOne' ? this.props.playerOneSymbol : this.props.playerTwoSymbol }		
			/>
			);
		resetBtnJSX = (
			<ResetButton
				onClick={this.props.handleResetClick}
			/>
			);


		if(this.props.waiting || this.props.paused){
			waitingMsgJsx = (
				<WaitingMsg
					msg = { this.props.waiting ? 'Wating for opponent' : 'Game paused' }
				/>
				);
		}
		

		if(this.props.isFinished===true){
			
			resultDivJSX = (
			<Result
				isTied = {this.props.isTied}
				winner = {this.props.winner}
				userPlayer = {this.props.userPlayer}
			/>
			);

			return (
				<div className="game-box-inner">
					{resultDivJSX}
					{scoreBoardJSX}
					{waitingMsgJsx}
					<Board 
						isFinished={true}
						isTied={this.props.isTied}
						winSquares={this.props.winSquares}
						square={this.props.square} 
					/>
					{turnDisplayerJSX}
				</div>
				);
		}else{

			return (
				<div className="game-box-inner">
					{scoreBoardJSX}
					{waitingMsgJsx}
					<Board 
						square={this.props.square} 
						onClick={this.props.onSquareClick}
						pauseUserInteraction={this.props.pauseUserInteraction}
					/>
					{turnDisplayerJSX}
				</div>
				);
		}
	}
}

// Game.propTypes = {
// 	square : React.PropTypes.array,
// 	onClick : React.PropTypes.func
// }