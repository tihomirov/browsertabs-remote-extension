import {io} from 'socket.io-client';

const socket = io('wss://127.0.0.1:3000');

console.log('Background Script Run!');

socket.on('connect', () => {
	console.log(socket.id); // x8WIv7-mJelg7on_ALbx
});

socket.send('TEST 123');

socket.on('disconnect', () => {
	console.log(socket.id); // undefined
});
