const socket = new WebSocket('ws://192.168.31.111:8999');

// Connection opened
socket.addEventListener('open', event => {
	socket.send('Hello Server!');
});

// Listen for messages
socket.addEventListener('message', event => {
	console.log('Message from server', event.data);
});
