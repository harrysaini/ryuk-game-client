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

		if(this.props.currentPlayer === this.props.userPlayer){
			displayTurn = "Your turn - " + this.props.playerSymbol ;
		}else{
			displayTurn = "Opponent's turn - " + this.props.playerSymbol ;
		}

		return (

			
			
			<div className={'turn-displayer '+this.state.animClass}>
			{displayTurn}
			</div>
			


			
			);
	}
}

