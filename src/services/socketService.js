import socketIO from 'socket.io-client';
import configVars from '../config/vars';

const host = configVars.host;

export function connectSocket(namespace){
	var socket = socketIO.connect(host + namespace || host);
	return socket;
}



export function addSocketEventListner(socket ,event , cb){
	socket.on(event,cb);
}

export function emitSocketEvent(socket , event , data ){
	socket.emit(event,data);
}


export default {
	connectSocket : connectSocket,
	addSocketEventListner : addSocketEventListner,
	emitSocketEvent : emitSocketEvent
}