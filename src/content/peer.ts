import {Peer} from 'peerjs';

const randomId = '0296b895-b0a8-96a9-cae1-fcc0ced0119R';

const peer = new Peer(randomId);

console.log('Peer!!!!', peer)

peer.on('connection', (conn) => {
	console.log('Peer!!! connection', conn);
	conn.on('data', (data) => {
		// Will print 'hi!'
		console.log('Peer!!!', data);
	});
	conn.on('open', () => {
		console.log('Peer!!! open');
		conn.send('hello!');
	});
});