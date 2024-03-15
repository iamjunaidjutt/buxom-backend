const express = require("express");
const router = express.Router();

const productController = require("../controllers/products");

router.get("/", productController.getProducts);
router.get("/:id", productController.getProduct);
router.post("/create", productController.createProduct);
router.delete("/delete/:id", productController.deleteProduct);
router.put("/update/:id", productController.updateProduct);

module.exports = router;
