import React from 'react';

export class SelectFirstTurn extends React.Component{
	
	render(){

		var playerOneMsg,
			playerTwoMsg,
			you="";

		if(this.props.gameType==="computer"){
			playerOneMsg = "you";
			playerTwoMsg = "computer";
			you = "you";
		}else if (this.props.gameType==="player"){
			playerOneMsg = "player one";
			playerTwoMsg = "player two";
		}

		return (
			
			<div className={'select-div select-first-turn'} >
				<h3>Who would {you} like to go first ?</h3>
				<div  
					className={' game-btn'}
					onClick={function(){this.props.handleFirstTurnSelect('playerOne')}.bind(this)}
				>
					{playerOneMsg}
				</div>
				<div 
					className={'select-game-options game-btn'}
					onClick={function(){this.props.handleFirstTurnSelect('playerTwo')}.bind(this)}
				>
					{playerTwoMsg}
				</div>
			</div>

			);
	}
}

