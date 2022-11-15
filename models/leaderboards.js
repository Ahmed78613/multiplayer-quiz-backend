const mongoose = require("mongoose");

const leaderboardsSchema = mongoose.Schema({
	username: { type: String, required: true },
	score: { type: String || Number, required: true },
});

const leaderboardsModel = mongoose.model("leaderboards", leaderboardsSchema);
module.exports = leaderboardsModel;
