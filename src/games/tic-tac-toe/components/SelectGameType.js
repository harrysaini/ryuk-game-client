import React from 'react';

export class SelectGameType extends React.Component{
	
	render(){
		return (
			
			<div className={'select-div select-game-type'} >
				<h3>Would you like to play as</h3>
				<div 
					className={'select-game-options game-btn'}
					onClick={function(){this.props.handleGameTypeSelect('player')}.bind(this)}
				>
					v/s player
				</div>
				<div 
					className={'select-game-options game-btn'}
					onClick={function(){this.props.handleGameTypeSelect('computer')}.bind(this)}
				>
					v/s computer
				</div>
			</div>

			);
	}
}


// SelectGameType.propTypes = {
// 	handleGameTypeSelect : React.PropTypes.func.isRequired
// }

export default SelectGameType;