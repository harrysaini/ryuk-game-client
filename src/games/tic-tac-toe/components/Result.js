import React from 'react';

export class Result extends React.Component{
	
	render(){
		
		var msg;
		

		
		if(this.props.winner === this.props.userPlayer){
			msg = 'You won :)';
		}
		else{
			msg = "You lost :( ";
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
