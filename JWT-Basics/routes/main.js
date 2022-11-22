const express = require("express");
const authenticationMiddleWare = require("../middleware/auth");
const router = express.Router();

const { login, dashBoard } = require("../controllers/main");

router.route("/dashboard").get(authenticationMiddleWare, dashBoard);
router.route("/login").post(login);

module.exports = router;
