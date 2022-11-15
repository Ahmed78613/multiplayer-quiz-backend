const leaderboardsModel = require("../");

const getLeaderboards = async (req, res) => {
	try {
		const leaderboards = await leaderboardsModel.find({});
		res.status(200).json({ result: leaderboards });
	} catch (error) {
		res.status(404).json({ msg: error.message });
	}
};

const postIntoLeaderboards = async (req, res) => {
	try {
		const score = await leaderboardsModel.create(req.body);
		res.status(200).json({ result: score });
	} catch (error) {
		res.status(404).json({ msg: error.message });
	}
};

module.exports = { getLeaderboards, postIntoLeaderboards };
