import React from 'react';
// import ReactCSSTransitionGroup from 'react-addons-css-transition-group';


export class TurnDisplayer extends React.Component{
	
	

	constructor(props){
		super(props);
		this.timeInterval ; 
		

		this.state={
			animClass : ""
		}
	}

	componentWillUpdate(nextProps, nextState) {
		if(this.props.currentPlayer !==nextProps.currentPlayer){
			this.setState({
				animClass : 'slide-me-up-down'
			});
			clearInterval(this.timeInterval);
		}
	}


	componentDidUpdate(){
		this.timeInterval =  setTimeout(function(){
			if(this.state.animClass!==""){
				this.setState({
					animClass : ''
				});
			}
			
		}.bind(this),700);
	}

	

	render(){
		

		var displayTurn ;
		if( this.props.gameType === 'computer' && this.props.currentPlayer === "playerTwo"){
			displayTurn = "Computer's turn ";
		}

		if( this.props.gameType === 'computer' && this.props.currentPlayer === "playerOne"){
			displayTurn = "Your's turn ";
		}

		if( this.props.gameType === 'player' && this.props.currentPlayer === "playerTwo"){
			displayTurn = "Player 2's turn ";
		}

		if( this.props.gameType === 'player' && this.props.currentPlayer === "playerOne"){
			displayTurn = "Player 1's turn  ";
		}

		return (

			
			
			<div className={'turn-displayer '+this.state.animClass}>
			{displayTurn}
			</div>
			


			
			);
	}
}

/*{<ReactCSSTransitionGroup
			transitionName="slide"
			transitionAppear={true}
			transitionAppearTimeout={700}
			transitionEnterTimeout={700}
			transitionLeaveTimeout={700}
			>}

			/*</ReactCSSTransitionGroup>*/

// TurnDisplayer.propTypes = {
// 	displayTurn : React.PropTypes.string
// }