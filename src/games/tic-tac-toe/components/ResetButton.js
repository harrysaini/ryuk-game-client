import React from 'react';

export class ResetButton extends React.Component{
	
	render(){
		return (
			<div className="reset-btn " onClick={this.props.onClick} >

				&#174; Reset all

			</div>

			);
	}
}
