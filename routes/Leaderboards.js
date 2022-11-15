const express = require("express");
const router = express.Router();
const {
	getLeaderboards,
	postIntoLeaderboards,
} = require("../Controllers/Leaderboards");

router.get("/", (req, res) => res.json({ result: "Mandem Quiz API" }));
router.get("/leaderboards", getLeaderboards);
router.post("/leaderboards", postIntoLeaderboards);

module.exports = router;
