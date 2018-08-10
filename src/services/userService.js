import configVars from '../config/vars';
import {myFetch} from '../utils/fetch_utils.js';

var apiUrl = configVars.apiUrl;

export function addNewUser(userObj){
	return new Promise((resolve,reject)=>{
		myFetch( apiUrl + '/user', 
			{
			  method: 'POST',
			  mode: 'cors',
			  body: JSON.stringify(userObj), 
			  headers: new Headers({
			  	'Content-Type': 'application/json'
			  })
			}
		).then(res =>{ 
		  	resolve(res);
		}).catch((err) => {
			reject(err.message)
		});
	});

	
}



export default {
	addNewUser : addNewUser
}