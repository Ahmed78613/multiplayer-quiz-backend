const { io } = require("../ioServer");

let users = [];
<<<<<<< HEAD
let userResults = [];
=======
>>>>>>> d50d5b5e095f18264498a94873c5e579fc157461

function socketInit(socket) {
	console.log("user connected");
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

	socket.on("leave_room", ({ room, username }) => {
		// Remove User from Array
		users = users.filter(
			(users) => users.username !== username && users.room === room
		);
		// Leave Room
		socket.leave(room);
		// Send Updated Users Array
		socket.to(room).emit("update_room", users);
		// Leave Room
		socket.disconnect();
	});
	socket.on("disconnect", () => {});

	socket.on("disconnect", () => {
		console.log("disconnect running");
		// Get Disconnect User Room
		const disconnectUser = users.filter((users) => users.id === socket.id)[0];
		// Remove User from Room
		users = users.filter((user) => user.id !== socket.id);
		// Send Updated Users Array
		io.sockets.in(disconnectUser?.room).emit(
			"update_room",
			users.filter((user) => user.room === disconnectUser?.room)
		);
	});

	// socket.on("start_quiz", ({ room, username, data }) => {
	// 	// sending all clients except sender
	// 	users = users.map((user) => {
	// 		return { ...user, data };
	// 	});
	// 	console.log(users);
	// 	socket.to(room).emit("game_started", users);
	// });

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

// console.log("user connected");

// socket.on("disconnect", () => console.log("user disconnected"));

// socket.on(
// 	"create game",
// 	({ room, category, difficulty, host, questions }) => {
// 		console.log(`Game created with the code ${room}`);
// 		const state = new QuizState(category, difficulty, host, room, questions);
// 		socket.join(room);
// 		io.to(room).emit("change state", state);
// 	}
// );

// socket.on("join game", ({ room, username }) => {
// 	console.log(`User with ID: ${username} joined room: ${room}`);
// 	socket.join(room);
// 	socket.to(room).emit("user joining lobby", username);
// });

// socket.on("send_message", (data) => {
// 	socket.to(data.room).emit("receive_message", data);
// });

// socket.on("send state to players", (state) => {
// 	io.to(state.room).emit("change state", state);
// });

// socket.on("update player score", ({ room, player, score }) => {
// 	socket.to(room).emit("update all scores", { player, score });
// });

// socket.on("finish quiz", ({ room, player }) => {
// 	io.to(room).emit("update opponent completion", player);
// });
