import socketIO from 'socket.io-client';
import configVars from '../config/vars';

var socket;
const host = configVars.host;
export function connectSocket(){
	socket = socketIO.connect(host);

	socket.on('join', function (data) {
		console.log(data);
		socket.emit('ok', { my: 'data' });
	});
}


export default {
	connectSocket : connectSocket
}