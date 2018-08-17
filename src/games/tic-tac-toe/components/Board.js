import React , { Component }from 'react';
import { Square } from './Square';

export class Board extends Component{
	
	getSingleRowJSX(i){

		var squareJSX,
		rowArr=[];

		for(var j=0;j<3;j++){

			//if game is finished render without click 
			if(this.props.isFinished){
				if(this.props.isTied){
					squareJSX = (
						<Square 
						isFilled={ this.props.square[i][j] ? true : false}
						key = {i+"-"+j}
						value={this.props.square[i][j]} 					
						/>
						);
				}else{
					//win
					squareJSX = (
						<Square 
						isWinSquare={ this.props.winSquares.indexOf(i+'-'+j)!==-1 ? true : false }
						isFilled={ this.props.square[i][j] ? true : false}
						key = {i+"-"+j}
						value={this.props.square[i][j]} 					
						/>
						);
				}
			}else{
				if(this.props.square[i][j] || this.props.isAICalculating){
					squareJSX = (
						<Square 
						isFilled={ this.props.square[i][j] ? true : false}
						key = {i+"-"+j}
						value={this.props.square[i][j]} 
						
						/>
						);
				}else{
					squareJSX = (
						<Square 
						isFilled={ this.props.square[i][j] ? true : false}
						key = {i+"-"+j}
						value={this.props.square[i][j]} 
						onClick={(function(j,self){

							return function(){	
								var k = j;
								this.props.onClick(i,k);	
							}.bind(self);

						})(j , this)} 
						/>
						);
				}
			}
			rowArr.push(squareJSX);
		}

		return rowArr;
	}

	getBoardJSX(){

		var boardRowArr = [],
		boardRowJSX;

		for(var i=0;i<3;i++){						
			boardRowJSX = (
				<div className='board-row' key={i}>
				{this.getSingleRowJSX(i)}
				</div> 
				);
			boardRowArr.push(boardRowJSX)
		}
		return boardRowArr;
	}
	

	render(){

		return (
			<div className="board-wrapper">
			<div className="board">
			{this.getBoardJSX()}
			</div>
			</div>
			);
	}
}