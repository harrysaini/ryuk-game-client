import React from 'react';

export class SelectGameSymbol extends React.Component{
	
	render(){
		return (
			
			<div className='select-div select-game-symbol' >

				<h3>Select your symbol</h3>
				<div 
					className={'select-game-options game-btn'}
					onClick={function(){this.props.handleGameSymbolSelect('X')}.bind(this)}
				>
					X
				</div>
				<div 
					className={'select-game-options game-btn'}
					onClick={function(){this.props.handleGameSymbolSelect('0')}.bind(this)}
				>
					0
				</div>
			</div>

			);
	}
}

// SelectGameSymbol.propTypes={
// 	handleGameSymbolSelect : React.PropTypes.func
// }