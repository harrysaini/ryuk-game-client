import React from 'react';

export class WaitingMsg extends React.Component{
	
	render(){		

		return (
			<div>
				<div className="result-div">
					{this.props.msg}
				</div>
				<div className="result-div-background">
				</div>
			</div>
				
		);
	}
}
