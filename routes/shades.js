const express = require("express");
const router = express.Router();

const shadesController = require("../controllers/shades");

router.get("/", shadesController.getAllShades);
router.get("/:id", shadesController.getShade);
router.post("/create", shadesController.createShade);
router.delete("/delete/:id", shadesController.deleteShade);
router.put("/update/:id", shadesController.updateShade);

module.exports = router;
