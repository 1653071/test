import express from "express"
import { createServer } from "http";
import { Server, Socket } from "socket.io";
import chalk from "chalk";
import repl from "repl"
const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

io.on("connection", (socket) => {
	console.log('=== start chatting ===')
});

httpServer.listen(3000,()=>{
	console.log("rurn")
});
repl.start({
	prompt: '',
	eval: (cmd) => {
		io.send(cmd)
	}
})