const express = require("express");
const router = express.Router();

const {
	getTags,
	getTag,
	createTag,
	updateTag,
	deleteTag,
} = require("../controllers/tags");

router.get("/", getTags);
router.get("/:id", getTag);
router.post("/create", createTag);
router.put("/update/:id", updateTag);
router.delete("/delete/:id", deleteTag);

module.exports = router;
