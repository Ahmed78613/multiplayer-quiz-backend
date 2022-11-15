const mongoose = require("mongoose");

const connectDB = async (db) => {
	try {
		await mongoose.connect(db);
	} catch (error) {
		console.log(error);
	}
};

module.exports = connectDB;
