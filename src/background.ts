import {Connection} from './background-app';

const connection = new Connection('ws://192.168.31.111:8999');

self.addEventListener('close', () => {
	connection.destroy();
});

// chrome.runtime.onInstalled.addListener(() => {
// 	console.log('!!!!!! ---- 123123');
// });
