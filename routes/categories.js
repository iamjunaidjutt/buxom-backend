const express = require("express");
const router = express.Router();

const categoriesController = require("../controllers/categories");

router.get("/", categoriesController.getCategories);
router.get("/:id", categoriesController.getCategory);
router.post("/create", categoriesController.createCategory);
router.delete("/delete/:id", categoriesController.deleteCategory);
router.put("/update/:id", categoriesController.updateCategory);

module.exports = router;
