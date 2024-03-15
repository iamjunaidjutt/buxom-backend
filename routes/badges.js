const express = require("express");
const router = express.Router();

const {
	createBadge,
	getBadges,
	getBadge,
	deleteBadge,
	updateBadge,
} = require("../controllers/badges");

router.post("/create", createBadge);
router.get("/", getBadges);
router.get("/:id", getBadge);
router.delete("/delete/:id", deleteBadge);
router.put("/update/:id", updateBadge);

module.exports = router;
