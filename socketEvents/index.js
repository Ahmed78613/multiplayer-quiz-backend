const { io } = require("../ioServer");

let users = [];
let userResults = [];

function socketInit(socket) {
	socket.on("create_room", ({ username, category, difficulty }) => {
		console.log(category, difficulty);
		// Generate Random Room number
		const room = Math.floor(Math.random() * 10);
		// Crate User
		const user = {
			username,
			room,
			id: socket.id,
			host: true,
			data: [],
			category: category,
			difficulty: difficulty,
			score: 0,
		};
		// Push User To array
		users.push(user);
		// Join Room
		socket.join(room);
		// Send All Users Array
		io.sockets.in(room).emit(
			"update_room",
			users.filter((users) => users.room == room)
		);
	});

	socket.on("join_room", ({ username, room }) => {
		// Crate User
		const user = {
			username,
			room,
			id: socket.id,
			host: false,
			data: [],
			score: 0,
		};
		// Push User To array
		users.push(user);
		// Join Room
		socket.join(room);
		// Send All Users Array
		io.sockets.in(room).emit(
			"update_room",
			users.filter((users) => users.room == room)
		);
		// sending updated players to host
		const host = users.find((users) => users.host);
		io.to(host.id).emit(
			"update_room",
			users.filter((users) => users.room == room)
		);
	});

	socket.on("send_scores", ({ username, room, score }) => {
		// Crate User
		const user = {
			username: username,
			room: room,
			score: score,
		};
		// Push User To array
		userResults.push(user);
		// Send All Users Array
		socket.to(room).emit(
			"update_room",
			userResults.filter((users) => users.room == room)
		);
	});
}

module.exports = { socketInit };
