import React from 'react';
import {TurnDisplayer} from './TurnDisplayer';
import {ScoreBoard} from './ScoreBoard';
import {Board} from './Board';
import { Result } from './Result';
import { ResetButton } from './ResetButton';


export class Game extends React.Component{
	
	render(){

		var resultDivJSX , 
			scoreBoardJSX,
			turnDisplayerJSX,
			resetBtnJSX;

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
				gameType = {this.props.gameType}
			/>
			);
		resetBtnJSX = (
			<ResetButton
				onClick={this.props.handleResetClick}
			/>
			);

		

		if(this.props.isFinished===true){
			
			resultDivJSX = (
			<Result
				isTied = {this.props.isTied}
				winner = {this.props.winner}
				gameType = {this.props.gameType}
			/>
			);

			return (
				<div className="game-box-inner">
					{resetBtnJSX}
					{resultDivJSX}
					{scoreBoardJSX}
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
					{resetBtnJSX}
					{scoreBoardJSX}
					<Board 
						square={this.props.square} 
						onClick={this.props.onSquareClick}
						isAICalculating={this.props.isAICalculating}
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