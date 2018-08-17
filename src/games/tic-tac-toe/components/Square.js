import React from 'react';

export class Square extends React.Component{
	
	render(){
		return (
			<div className={'square '+( this.props.isFilled ? 'filled ' : '' )+( this.props.isWinSquare ? 'win-square ' : '' ) } onClick={this.props.onClick} >

				<div className='square-inner' >
				{this.props.value}
				</div>

			</div>

			);
	}
}

// Square.propTypes = {
// 	onClick : React.PropTypes.func.isRequired,
// 	key : React.PropTypes.string.isRequired,
// 	value : React.PropTypes.string.isRequired
// }

export default Square ;