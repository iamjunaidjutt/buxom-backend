const express = require("express");
const router = express.Router();

const usersController = require("../controllers/users");

router.post("/create", usersController.createUser);
router.post("/login", usersController.getUser);
router.get("/", usersController.getUsers);

module.exports = router;
