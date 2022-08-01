import { io } from "socket.io-client";
import repl from "repl"

const socket = io("http://localhost:3000");
socket.on('connection', () => {
	console.log('=== start chatting ===')
})

socket.on('message', (data) => {
	const { msg, username } = data
	console.log(username + ': ' + msg.split('\n')[0]);
})
socket.emit('message', {username: "quang", msg: "N"})
repl.start({
	prompt: '',
	eval: (msg) => {
		socket.send({username: "quang", msg :msg})
	}
})


