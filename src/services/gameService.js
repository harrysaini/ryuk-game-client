import configVars from '../config/vars';
import {myFetch} from '../utils/fetch_utils.js';

var apiUrl = configVars.apiUrl;

export function startNewGame(id , obj){
	return new Promise((resolve,reject)=>{
		myFetch( apiUrl + '/game/'+ id +'/start', 
			{
			  method: 'POST',
			  mode: 'cors',
			  body: JSON.stringify(obj), 
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


export function getGameObj(id) {
	
	return new Promise((resolve,reject)=>{
		myFetch( apiUrl + '/game/'+ id , 
			{
			  method: 'GET',
			  mode: 'cors'
			}
		).then(res =>{ 
		  	resolve(res);
		}).catch((err) => {
			reject(err.message)
		});
	});

}


export function joinGame(id , obj){
	return new Promise((resolve,reject)=>{
		myFetch( apiUrl + '/game/'+ id+'/join' , 
			{
			  method: 'POST',
			  mode: 'cors',
			  body: JSON.stringify(obj), 
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
	startNewGame : startNewGame,
	getGameObj : getGameObj,
	joinGame : joinGame
}