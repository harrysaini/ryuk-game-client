import React from 'react';

export class Result extends React.Component{
	
	render(){
		
		var msg;
		if(this.props.gameType==='computer'){
			if(this.props.winner==='playerOne')
				msg = 'You won  :)';
			else
				msg = "You lost, try again!!";
		}

		if(this.props.gameType==='player'){
			if(this.props.winner==='playerOne')
				msg = 'Player 1 won :)';
			else
				msg = "Player 2 won :) ";
		}
		if(this.props.isTied){
			msg = "It's a tie ;) ";
		}

		return (
			<div>
				<div className="result-div">
					{msg}
				</div>
				<div className="result-div-background">
				</div>
			</div>
				
		);
	}
}
