const { io } = require("../ioServer");

function initialise(socket) {
	console.log("user connected");

	socket.on("disconnect", () => console.log("user disconnected"));
}

module.exports = { initialise };
