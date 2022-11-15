require("dotenv").config();
const { server } = require("./server");
const connectDB = require("./db/connect");

const PORT = process.env.PORT || 3001;

const start = async () => {
	try {
		connectDB(process.env.DATABASE_URL);
		server.listen(PORT, () => console.log(PORT));
	} catch (error) {
		console.log(error);
	}
};

start();
