const express = require("express");
const router = express.Router();
const {
	welcome,
	getLeaderboards,
	postIntoLeaderboards,
} = require("../Controllers/Leaderboards");

router.route("/").get(welcome);
router.route("/leaderboards").get(getLeaderboards).post(postIntoLeaderboards);

module.exports = router;
