import React from 'react';

export class ScoreBoard extends React.Component{
	
	render(){
		var secondName = "Computer's ";

		if(this.props.isTwoPlayer){
			secondName = "Player 2's";
		}

		return (
			<div className="score-board">
				<div className = 'score-div first-score'>
					<div> Player 1's </div>
					<div className="score-num"> {this.props.playerOneScore} </div>
				</div>
				<div className = 'score-div second-score'>
					<div> {secondName} </div>
					<div className="score-num"> {this.props.playerTwoScore} </div>
				</div>
			</div>
		);
	}
}
// ScoreBoard.propTypes = {
// 	isTwoPlayer : React.PropTypes.bool,
// 	firstPlayerScore : React.PropTypes.number,
// 	secondPlayerScore : React.PropTypes.number
// }