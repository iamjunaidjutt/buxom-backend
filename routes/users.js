const express = require("express");
const router = express.Router();

const { createUser, getUser } = require("../controllers/users");

router.post("/create", createUser);
router.post("/login", getUser);

module.exports = router;
