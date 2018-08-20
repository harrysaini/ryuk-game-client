import React from 'react';

export class ScoreBoard extends React.Component{
	
	render(){


		return (
			<div className="score-board">
				<div className = 'score-div first-score'>
					<div> Player 1's </div>
					<div className="score-num"> {this.props.playerOneScore} </div>
				</div>
				<div className = 'score-div second-score'>
					<div> Player 2's </div>
					<div className="score-num"> {this.props.playerTwoScore} </div>
				</div>
			</div>
		);
	}
}
