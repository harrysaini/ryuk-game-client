
function getFromLocalStorage(key){
	return new Promise(function(resolve,reject){
		if(window.localStorage){
			resolve(window.localStorage.getItem(key));
		}else{
			reject('No local storage');
		}
	});
}


function saveToLocalStorage(key , item){
	return new Promise(function(resolve,reject){
		if(window.localStorage){
			resolve(window.localStorage.setItem(key , item));
		}else{
			reject('No local storage');
		}
	});
}


function generateGameID(game){
	return game + Math.random().toString(36).replace(/[^a-z]+/g, '').substr(2, 10);
}


const utils = {
	getFromLocalStorage : getFromLocalStorage,
	saveToLocalStorage : saveToLocalStorage,
	generateGameID: generateGameID
}


export default utils;

