const express = require("express");
const router = express.Router();

const {
	getImages,
	getImage,
	deleteImage,
	createImage,
	updateImage,
} = require("../controllers/images");

router.get("/", getImages);
router.get("/:id", getImage);
router.delete("/delete/:id", deleteImage);
router.post("/create", createImage);
router.put("/update/:id", updateImage);

module.exports = router;
