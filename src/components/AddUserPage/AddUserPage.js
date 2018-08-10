import React, {Component} from 'react';
import './addUserPage.css';
import {  Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { toast} from 'react-toastify';
import {addNewUser} from '../../services/userService.js';


class AddUserPage extends Component {
  
  constructor(props){
  	super(props);
  	this.state = {
  		userName : '',
  		userFaceBookID : '',
  		userAddress : ''
  	}
  	this.handleSaveButtonClick = this.handleSaveButtonClick.bind(this);
  }


  handleSaveButtonClick(){
  	var userObj = {
  		name : this.state.userName,
  		facebookId : this.state.userFaceBookID,
  		address : this.state.userAddress
  	}
  	addNewUser(userObj).then(()=>{
  		toast.success('User added sucessfully!');
  	}).catch(err =>{
  		console.log(err);
  		toast.error(err);
  	});
  }

  render() {
    return (
      <div>
      		<h5>Add New User</h5>
      		<hr className='heading-hr'/>
      		<br/>

      		<div className="form-wrapper">
      			<Form>
			        <FormGroup>
			          <Label for="f1">Name</Label>
			            <Input 
			            	type="text"  
		            		id="f1" 
		            		placeholder="name" 
		            		value={this.state.userName}
		            		className='width-100'
		            		onChange={(event)=>{
		            			this.setState({
		            				userName : event.target.value
		            			});
		            		}}/>
			        </FormGroup>
			        <FormGroup>
			          <Label for="f2">Facebook ID</Label>
			            <Input 
			            	type="text"  
			            	id="f2" 
			            	value={this.state.userFaceBookID}
			            	placeholder="facebook id" 
			            	className='width-100'
			            	onChange={(event)=>{
		            			this.setState({
		            				userFaceBookID : event.target.value
		            			});
		            		}}/>
			        </FormGroup>
			         <FormGroup >
			          <Label for="f3" sm={2}>Address</Label>
			            <Input 
			            	type="textarea" 
			            	id="f3" 
			            	className='width-100'
			            	value={this.state.userAddress}
			            	onChange={(event)=>{
		            			this.setState({
		            				userAddress : event.target.value
		            			});
		            		}}/>
			        </FormGroup>
		        </Form>
		        
		        <br/>
		        <div>
	        		<Button 
	        			outline 
	        			color="secondary" 
	        			className='myBtn' 
	        			onClick={this.handleSaveButtonClick}
	        			>
	        				Save
    				</Button>
	        		<Button outline color="secondary" className='myBtn' >Cancel</Button>
	        		<Button outline color="secondary" className='myBtn' >Reset</Button>
		        </div>
      		</div>
      </div>

    )
  }
}

export default AddUserPage;
