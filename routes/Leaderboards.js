const express = require("express");
const router = express.Router();
const {
	welcome,
	getLeaderboards,
	postIntoLeaderboards,
} = require("../controllers/Leaderboards");

router.route("/").get(welcome);
router.route("/leaderboards").get(getLeaderboards).post(postIntoLeaderboards);

module.exports = router;
